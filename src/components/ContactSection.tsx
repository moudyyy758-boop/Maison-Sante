import React, { useState } from 'react';
import { Phone, Mail, Instagram, MapPin, Clock, Send, Check } from 'lucide-react';
import { BowIcon, DelicateDivider } from './DecorativeElements';
import { useApp } from '../context/AppContext';

export const ContactSection: React.FC = () => {
  const { addToast } = useApp();
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [sent, setSent] = useState(false);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) {
      addToast('Please enter your name and phone number.', 'remove');
      return;
    }
    setSent(true);
    addToast('Your inquiry has been sent to our concierge! ♡', 'success');
    setTimeout(() => {
      setInquiryName('');
      setInquiryPhone('');
      setInquiryMsg('');
      setSent(false);
    }, 4000);
  };

  return (
    <section id="contact-section" className="w-full bg-[#15130F] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#4E4541]/40">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans-clean text-xs font-semibold uppercase tracking-[0.25em] text-[#E3BEB8] flex items-center justify-center gap-2">
            <BowIcon size={14} /> GET IN TOUCH <BowIcon size={14} />
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#FAF4EC] uppercase tracking-tight mt-2 mb-3">
            WE'D LOVE TO HEAR FROM YOU
          </h2>
          <DelicateDivider icon="flower" className="max-w-[180px] my-3" />
          <p className="font-sans-clean text-sm text-[#D1C4BE] font-light">
            Questions about group dining, custom catering, delivery zones, or special dietary needs?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Info cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="p-6 bg-[#1A1814] border border-[#4E4541]/60 flex items-start gap-4">
              <div className="w-10 h-10 border border-[#9A8E89]/40 bg-[#15130F] flex items-center justify-center flex-shrink-0 text-[#E3BEB8]">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif-luxury text-sm text-[#FAF4EC] uppercase mb-1">
                  Direct Line & WhatsApp
                </h4>
                <p className="font-sans-clean text-xs text-[#D1C4BE]">
                  +234 814 883 9201 / +234 802 345 6789
                </p>
                <span className="text-[10px] text-[#9A8E89]">Available 8:00 AM – 9:00 PM Daily</span>
              </div>
            </div>

            <div className="p-6 bg-[#1A1814] border border-[#4E4541]/60 flex items-start gap-4">
              <div className="w-10 h-10 border border-[#9A8E89]/40 bg-[#15130F] flex items-center justify-center flex-shrink-0 text-[#E3BEB8]">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif-luxury text-sm text-[#FAF4EC] uppercase mb-1">
                  Email Concierge
                </h4>
                <p className="font-sans-clean text-xs text-[#D1C4BE]">
                  orders@maisondesante.kitchen
                </p>
                <span className="text-[10px] text-[#9A8E89]">Fast response for catering inquiries</span>
              </div>
            </div>

            <div className="p-6 bg-[#1A1814] border border-[#4E4541]/60 flex items-start gap-4">
              <div className="w-10 h-10 border border-[#9A8E89]/40 bg-[#15130F] flex items-center justify-center flex-shrink-0 text-[#E3BEB8]">
                <Instagram className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif-luxury text-sm text-[#FAF4EC] uppercase mb-1">
                  Instagram
                </h4>
                <p className="font-sans-clean text-xs text-[#D1C4BE]">
                  @maisondesante.ng
                </p>
                <span className="text-[10px] text-[#9A8E89]">Daily food photography & specials</span>
              </div>
            </div>

            <div className="p-6 bg-[#1A1814] border border-[#4E4541]/60 flex items-start gap-4">
              <div className="w-10 h-10 border border-[#9A8E89]/40 bg-[#15130F] flex items-center justify-center flex-shrink-0 text-[#E3BEB8]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif-luxury text-sm text-[#FAF4EC] uppercase mb-1">
                  Studio Kitchen
                </h4>
                <p className="font-sans-clean text-xs text-[#D1C4BE]">
                  Victoria Island / Ikoyi, Lagos, Nigeria
                </p>
                <span className="text-[10px] text-[#9A8E89]">Delivery across Lagos Island & Mainland</span>
              </div>
            </div>

          </div>

          {/* Quick Message Box (7 cols) */}
          <div className="lg:col-span-7 bg-[#1A1814] border border-[#4E4541]/60 p-6 sm:p-8">
            <h3 className="font-serif-luxury text-xl text-[#FAF4EC] uppercase mb-1">
              SEND A NOTE TO OUR CONCIERGE
            </h3>
            <p className="font-sans-clean text-xs text-[#D1C4BE] font-light mb-6">
              Have a question before submitting your order? Send us a quick note below.
            </p>

            <form onSubmit={handleInquiry} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[11px] font-sans-clean uppercase tracking-wider text-[#FAF4EC]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="e.g. Chinelo"
                    className="w-full bg-[#15130F] border border-[#4E4541] focus:border-[#FAF4EC] p-3 text-xs font-sans-clean text-[#FAF4EC] placeholder-[#9A8E89]/60 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-sans-clean uppercase tracking-wider text-[#FAF4EC]">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    placeholder="e.g. +234..."
                    className="w-full bg-[#15130F] border border-[#4E4541] focus:border-[#FAF4EC] p-3 text-xs font-sans-clean text-[#FAF4EC] placeholder-[#9A8E89]/60 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-sans-clean uppercase tracking-wider text-[#FAF4EC]">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  value={inquiryMsg}
                  onChange={(e) => setInquiryMsg(e.target.value)}
                  placeholder="Tell us what you'd like to ask or request..."
                  className="w-full bg-[#15130F] border border-[#4E4541] focus:border-[#FAF4EC] p-3 text-xs font-sans-clean text-[#FAF4EC] placeholder-[#9A8E89]/60 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sent}
                className="w-full py-3.5 bg-[#FAF4EC] text-[#382D28] hover:bg-[#E3BEB8] font-sans-clean text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 active:scale-98 shadow-md"
              >
                {sent ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>NOTE SENT! WE'LL CALL YOU SHORTLY</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>SEND MESSAGE</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
