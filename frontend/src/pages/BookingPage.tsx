import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CalEmbed from '../components/CalEmbed';

const BookingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Header />
      <main className="flex-grow">
        <section
          className="w-full px-4 sm:px-6 lg:px-8 pt-6 pb-12 sm:pb-16"
          style={{
            backgroundColor: 'var(--bg-primary)',
            backgroundImage: 'radial-gradient(circle at 20% 0%, rgba(232,60,145,0.06), transparent 55%), radial-gradient(circle at 80% 0%, rgba(76,42,68,0.05), transparent 60%)'
          }}
        >
          <div className="max-w-5xl mx-auto py-10 sm:py-12 lg:py-16">
            <div className="text-center mb-8 md:mb-12 px-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1F1B24]">Book a Discovery Session</h1>
              <p className="mt-3 md:mt-4 text-base md:text-lg text-[#5C4D61]">Let's discuss how we can bring your vision to life</p>
            </div>
            <div className="bg-white/90 backdrop-blur rounded-3xl shadow-[0_25px_80px_rgba(15,23,42,0.12)] p-3 sm:p-5 lg:p-8">
              <CalEmbed />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BookingPage;
