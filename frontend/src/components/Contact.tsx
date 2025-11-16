import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, X } from 'lucide-react';

const serviceOptions = [
  'Corporate Videos',
  'Social Media Clips',
  'Event Highlights',
  'YouTube Content',
  'Real Estate Tours',
  'Personal Projects',
  'Other',
];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    const submissionData = {
      ...formData,
      timestamp: new Date().toISOString(),
      id: Date.now(),
    };

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        console.log('Form submitted successfully:', result.data);
        setSubmittedData(result.data);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', service: '', message: '' });

        setTimeout(() => {
          setIsSubmitted(false);
          setIsSubmitting(false);
        }, 2000);
      } else {
        console.error('Submission failed:', result.message);
        alert('Failed to submit form. Please try again.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please make sure the server is running.');
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative w-full px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ backgroundColor: '#F6F2EB' }}>
      <div className="absolute inset-0 opacity-60" style={{ background: 'radial-gradient(circle at 15% 20%, rgba(232,60,145,0.15), transparent 45%), radial-gradient(circle at 85% 10%, rgba(67,51,76,0.12), transparent 60%)' }}></div>
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-12 md:py-16 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F1B24] mb-3">Let's Create Together</h2>
          <p className="text-base text-[#5C4D61] max-w-2xl mx-auto">Have a project in mind? Fill out the form below and let's start the conversation.</p>
        </div>

        <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-[0_45px_120px_rgba(15,23,42,0.12)] p-6 md:p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/30 to-white/10 pointer-events-none"></div>

          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center"
                onClick={() => setIsSubmitted(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 20 }}
                  className="bg-white rounded-2xl shadow-2xl overflow-hidden mx-4 w-full max-w-md relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="absolute top-4 right-4 p-2 rounded-full text-[#5C4D61] hover:bg-black/5 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <motion.div
                    initial={{ scaleX: 1 }}
                    animate={{ scaleX: 0 }}
                    transition={{ duration: 2, ease: 'linear' }}
                    className="h-1.5 bg-gradient-to-r from-[#1F1B24] via-[#4C2A44] to-[#8A4C6F] origin-left"
                  />

                  <div className="p-8 text-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 200 }}
                      className="inline-block mb-6"
                    >
                      <div className="relative">
                        <CheckCircle className="w-20 h-20 text-[#1F1B24]" strokeWidth={2} />
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 2, opacity: 0 }}
                          transition={{ delay: 0.4, duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
                          className="absolute inset-0 bg-[#1F1B24] rounded-full"
                        />
                      </div>
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="text-2xl font-bold text-[#1F1B24] mb-2"
                    >
                      Thank You, {submittedData?.name}!
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      className="text-[#5C4D61]"
                    >
                      Your message has been received. We'll get back to you soon!
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto relative z-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[#5C4D61] mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl bg-white/80 backdrop-blur px-4 py-3 text-[#1F1B24] placeholder:text-[#89798C] border border-white/0 focus:outline-none focus:ring-2 focus:ring-[#1F1B24]/20 transition"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#5C4D61] mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl bg-white/80 backdrop-blur px-4 py-3 text-[#1F1B24] placeholder:text-[#89798C] border border-white/0 focus:outline-none focus:ring-2 focus:ring-[#1F1B24]/20 transition"
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="service" className="block text-sm font-semibold text-[#5C4D61] mb-1">Service of Interest</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full rounded-2xl bg-white/80 backdrop-blur px-4 py-3 text-[#1F1B24] border border-white/0 focus:outline-none focus:ring-2 focus:ring-[#1F1B24]/20 transition"
              >
                <option value="" disabled>Select a service</option>
                {serviceOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <label htmlFor="message" className="block text-sm font-semibold text-[#5C4D61] mb-1">Project Details</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                required
                className="w-full rounded-2xl bg-white/80 backdrop-blur px-4 py-3 text-[#1F1B24] placeholder:text-[#89798C] border border-white/0 focus:outline-none focus:ring-2 focus:ring-[#1F1B24]/20 transition"
              ></textarea>
            </div>

            <div className="mt-6 text-center">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1F1B24] via-[#2E2234] to-[#4C2A44] text-white font-semibold text-sm tracking-wide px-8 py-3 shadow-[0_35px_80px_rgba(31,27,36,0.3)] transition-transform hover:-translate-y-0.5 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                whileHover={!isSubmitting ? { scale: 1.03 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      SENDING...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      SEND MESSAGE
                    </>
                  )}
                </span>
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    SENDING...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    SEND MESSAGE
                  </>
                )}
              </span>
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
