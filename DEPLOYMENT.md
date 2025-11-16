# Production Deployment Guide

This guide explains how to deploy your frontend to Cloudflare Pages and backend to a VPS, ensuring they communicate properly.

## Architecture Overview

- **Frontend**: Cloudflare Pages (https://keyframestudios.in or *.pages.dev)
- **Backend**: VPS/Server (Node.js Express API on port 3001)

## Backend Deployment (VPS)

### 1. Setup Node.js on your VPS

```bash
# SSH into your VPS
ssh user@your-vps-ip

# Install Node.js (if not already installed)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Or use nvm for version management
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
```

### 2. Upload backend code to VPS

```bash
# Option A: Using git (recommended)
cd /var/www
git clone https://github.com/yashmcoder/keyframes-backend.git
cd keyframes-backend

# Option B: Using rsync/scp from local machine
rsync -avz ~/Desktop/agencyv2/backend/ user@your-vps:/var/www/api/
```

### 3. Configure environment variables

```bash
# On VPS, create .env file
cd /var/www/api  # or your backend directory
nano .env
```

Add these values:
```bash
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=recipient@gmail.com

# Server Configuration
PORT=3001
NODE_ENV=production

# Frontend URL (YOUR CLOUDFLARE PAGES DOMAIN)
FRONTEND_URL=https://keyframestudios.in
```

### 4. Install dependencies and start

```bash
npm install

# Option A: Run with PM2 (recommended for production)
sudo npm install -g pm2
pm2 start api.js --name keyframes-api
pm2 save
pm2 startup  # follow the instructions it gives

# Option B: Run with systemd
sudo nano /etc/systemd/system/keyframes-api.service
```

Example systemd service file:
```ini
[Unit]
Description=Keyframes API Server
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/api
ExecStart=/usr/bin/node api.js
Restart=always
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable keyframes-api
sudo systemctl start keyframes-api
sudo systemctl status keyframes-api
```

### 5. Setup Nginx reverse proxy (recommended)

```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/keyframes-api
```

Nginx config:
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;  # or use your VPS IP

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/keyframes-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 6. Setup HTTPS with Certbot (recommended)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

### 7. Configure firewall

```bash
# Allow HTTP, HTTPS, and SSH
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 3001  # if not using nginx
sudo ufw enable
```

## Frontend Deployment (Cloudflare Pages)

### Option 1: Automatic Git Integration (Recommended)

1. **Push your frontend code to GitHub**
   ```bash
   cd ~/Desktop/agencyv2/frontend
   git add .
   git commit -m "Production ready"
   git push origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages
   - Click "Create a project" → "Connect to Git"
   - Select your GitHub repository: `yashmcoder/keyframes-frontend`
   - Configure build settings:
     - **Framework preset**: Vite
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
     - **Root directory**: `/frontend` (if monorepo) or `/` (if separate repo)

3. **Set Environment Variables**
   - In Cloudflare Pages project settings → Environment variables
   - Add variable:
     - **Name**: `VITE_API_URL`
     - **Value**: `https://api.yourdomain.com` (or `http://your-vps-ip:3001`)
   - Apply to: Production and Preview environments

4. **Deploy**
   - Cloudflare will automatically build and deploy
   - Your site will be live at `*.pages.dev` and your custom domain

### Option 2: Manual Deployment via Wrangler

```bash
cd ~/Desktop/agencyv2/frontend

# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build the project
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name=keyframes-frontend
```

### Custom Domain Setup

1. In Cloudflare Pages → Custom domains
2. Add: `keyframestudios.in` and `www.keyframestudios.in`
3. Cloudflare will automatically configure DNS

## Testing the Production Setup

### 1. Test backend API directly

```bash
# Test GET
curl https://api.yourdomain.com/api/contact

# Test POST
curl -X POST https://api.yourdomain.com/api/contact \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "service": "Corporate Videos",
    "message": "Test message"
  }'
```

### 2. Test CORS from your frontend domain

```bash
# Test preflight
curl -i -X OPTIONS https://api.yourdomain.com/api/contact \
  -H 'Origin: https://keyframestudios.in' \
  -H 'Access-Control-Request-Method: POST' \
  -H 'Access-Control-Request-Headers: Content-Type'
```

Expected response should include:
```
access-control-allow-origin: https://keyframestudios.in
access-control-allow-methods: GET, POST, OPTIONS
access-control-allow-headers: Content-Type, Authorization
```

### 3. Test from browser

Open your Cloudflare Pages site (https://keyframestudios.in), fill the contact form, and submit. Check:
- Browser console for errors
- Network tab to see the POST request succeeds
- Backend logs to see the submission was received

## Troubleshooting

### CORS Errors

**Problem**: "No 'Access-Control-Allow-Origin' header"

**Solution**:
- Verify `FRONTEND_URL` in backend `.env` matches your exact frontend URL
- Check backend logs for "CORS request from origin:" messages
- Ensure backend is running and accessible

### Mixed Content Errors

**Problem**: "Mixed Content: blocked loading"

**Solution**:
- Ensure backend uses HTTPS (setup Certbot/SSL)
- Or temporarily use HTTP for frontend during testing
- Modern browsers block HTTP requests from HTTPS pages

### Connection Refused

**Problem**: Frontend can't reach backend

**Solution**:
- Check VPS firewall allows port 3001 (or 80/443 if using Nginx)
- Verify backend is running: `pm2 status` or `systemctl status keyframes-api`
- Test backend directly: `curl http://your-vps-ip:3001/api/contact`
- Check VPS security groups/firewall rules

### Environment Variables Not Working

**Problem**: `VITE_API_URL` is undefined in production

**Solution**:
- Cloudflare Pages: Set env vars in dashboard (Settings → Environment variables)
- Redeploy after adding env vars
- Verify build logs show the env var being set
- Remember: Vite env vars must be prefixed with `VITE_`

## Monitoring

### Backend Logs

```bash
# PM2
pm2 logs keyframes-api

# Systemd
sudo journalctl -u keyframes-api -f

# Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Cloudflare Pages

- View build logs in Cloudflare dashboard
- Check Functions logs if using Cloudflare Workers

## Quick Reference

### Local Development URLs
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

### Production URLs
- Frontend: https://keyframestudios.in
- Backend: https://api.yourdomain.com (or http://your-vps-ip:3001)

### Environment Variables

**Backend (.env on VPS)**:
```bash
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://keyframestudios.in
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=recipient@gmail.com
```

**Frontend (Cloudflare Pages dashboard)**:
```bash
VITE_API_URL=https://api.yourdomain.com
```

## Security Checklist

- [ ] Backend uses HTTPS in production
- [ ] Environment variables are set correctly
- [ ] CORS only allows your frontend domain
- [ ] Firewall rules are properly configured
- [ ] Gmail App Password is used (not regular password)
- [ ] API rate limiting is considered (add express-rate-limit if needed)
- [ ] Sensitive data is not logged in production
- [ ] `.env` files are in `.gitignore`

## Need Help?

Common issues:
1. CORS errors → Check `FRONTEND_URL` in backend `.env`
2. Can't connect → Check VPS firewall and backend is running
3. Env vars not working → Set in Cloudflare Pages dashboard
4. Mixed content → Use HTTPS for backend

For more detailed logs, enable debug mode temporarily:
```bash
# Backend
DEBUG=* node api.js
```
