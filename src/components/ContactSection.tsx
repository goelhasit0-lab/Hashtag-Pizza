import React, { useState } from 'react';
import { Phone, MapPin, Wifi, Star, ExternalLink, Copy, Check } from 'lucide-react';
import { restaurantInfo } from '../data/restaurantInfo';

export const ContactSection: React.FC = () => {
  const [copiedWifi, setCopiedWifi] = useState(false);

  const handleCopyWifi = () => {
    if (restaurantInfo.wifi.passwordValue) {
      navigator.clipboard.writeText(restaurantInfo.wifi.passwordValue);
      setCopiedWifi(true);
      setTimeout(() => setCopiedWifi(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#060B18] border-t border-[#15274E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E92C2C]">
            Get In Touch
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight mt-1">
            VISIT & CONTACT US
          </h2>
          <p className="text-sm text-[#A3B3D4] mt-2">
            Located conveniently in Adarshnagar, Birgunj. Call for takeaway orders, table inquiries,
            or dine-in visits.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact & Location Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Address Card */}
            <div className="p-6 rounded-2xl bg-[#0B152B] border border-[#16274E]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#101F3E] border border-[#1A3570] flex items-center justify-center text-[#E92C2C] shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-lg text-white">Restaurant Location</h3>
                  <p className="text-sm text-[#E0E0E0] mt-1 font-medium">
                    {restaurantInfo.address.complex}, {restaurantInfo.address.street}
                  </p>
                  <p className="text-xs text-[#A3B3D4] mt-0.5">
                    {restaurantInfo.address.area}, {restaurantInfo.address.city}, Nepal
                  </p>
                  <p className="text-[11px] text-[#FFCA28] mt-2 font-medium">
                    Established & Serving in Birgunj Since {restaurantInfo.establishedYear}
                  </p>

                  <div className="mt-4 pt-4 border-t border-[#132247] flex flex-wrap gap-3">
                    <a
                      href={restaurantInfo.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E92C2C] hover:bg-[#D02222] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow"
                    >
                      <span>Get Directions on Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Telephone Numbers Card */}
            <div className="p-6 rounded-2xl bg-[#0B152B] border border-[#16274E]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#101F3E] border border-[#1A3570] flex items-center justify-center text-[#FFCA28] shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-bold text-lg text-white">Call For Orders & Inquiries</h3>
                  <p className="text-xs text-[#A3B3D4] mt-1">
                    Click any verified telephone number below to dial directly:
                  </p>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Primary Mobile */}
                    <a
                      href={`tel:${restaurantInfo.phones.primary}`}
                      className="p-3 rounded-xl bg-[#0E1A36] border border-[#1C3264] hover:border-[#FFCA28] transition-all flex flex-col group"
                    >
                      <span className="text-[10px] uppercase font-bold text-[#FFCA28] tracking-wider">
                        Primary Mobile
                      </span>
                      <span className="text-sm font-extrabold text-white group-hover:text-[#FFCA28] mt-1 truncate">
                        {restaurantInfo.phones.primary}
                      </span>
                    </a>

                    {/* Secondary Mobile */}
                    <a
                      href={`tel:${restaurantInfo.phones.secondary}`}
                      className="p-3 rounded-xl bg-[#0E1A36] border border-[#1C3264] hover:border-[#8EAD48] transition-all flex flex-col group"
                    >
                      <span className="text-[10px] uppercase font-bold text-[#8EAD48] tracking-wider">
                        Secondary Mobile
                      </span>
                      <span className="text-sm font-extrabold text-white group-hover:text-[#8EAD48] mt-1 truncate">
                        {restaurantInfo.phones.secondary}
                      </span>
                    </a>

                    {/* Landline */}
                    <a
                      href={`tel:${restaurantInfo.phones.landline}`}
                      className="p-3 rounded-xl bg-[#0E1A36] border border-[#1C3264] hover:border-[#E92C2C] transition-all flex flex-col group"
                    >
                      <span className="text-[10px] uppercase font-bold text-[#E92C2C] tracking-wider">
                        Landline
                      </span>
                      <span className="text-sm font-extrabold text-white group-hover:text-[#E92C2C] mt-1 truncate">
                        {restaurantInfo.phones.landline}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Search Preview Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0B152B] border border-[#16274E] overflow-hidden shadow-lg max-w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E92C2C] animate-pulse"></span>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Official Restaurant Location
                  </span>
                </div>
                <a
                  href={restaurantInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[11px] font-mono text-[#FFCA28] hover:text-white bg-[#101F3E] hover:bg-[#182C58] px-2.5 py-1 rounded-md border border-[#FFCA28]/20 transition-colors w-fit"
                >
                  <MapPin className="w-3 h-3 text-[#E92C2C]" />
                  <span>Hashtag Pizza (2V6G+498)</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>

              {/* Exact Location Note */}
              <div className="mb-3 px-1 text-xs text-[#A3B3D4] flex flex-wrap items-center justify-between gap-2">
                <span>RB Complex, Loharpati, Adarshnagar, Birgunj, Nepal</span>
                <a
                  href={restaurantInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E92C2C] hover:text-white transition-colors text-[11px] font-semibold flex items-center gap-1 shrink-0"
                >
                  Open in Google Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="w-full h-64 sm:h-72 rounded-xl overflow-hidden bg-[#060B18] relative flex items-center justify-center border border-[#16274E] shadow-inner max-w-full">
                <iframe
                  title="Hashtag Pizza Official Google Maps Location"
                  width="100%"
                  height="100%"
                  className="w-full h-full border-0 rounded-xl transition-all duration-300"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=Hashtag+Pizza+27.0101381,84.8761108&t=&z=19&ie=UTF8&iwloc=&output=embed`}
                />
              </div>
            </div>
          </div>

          {/* Right Column: In-Store Menu QR Codes & Amenities */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#0B152B] border border-[#16274E]">
              <span className="text-[11px] uppercase font-bold text-[#FFCA28] tracking-wider block mb-1">
                In-Restaurant QR Hub
              </span>
              <h3 className="font-heading font-bold text-xl text-white">
                Customer QR Features
              </h3>
              <p className="text-xs text-[#A3B3D4] mt-1 mb-6">
                As printed at the bottom of the original Hashtag Pizza poster menu for dine-in visitors:
              </p>

              {/* QR 1: Wi-Fi Access */}
              <div className="p-4 rounded-xl bg-[#0E1A36] border border-[#182C58] mb-4 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                {/* Visual QR Code SVG placeholder */}
                <div className="w-24 h-24 bg-white p-2 rounded-lg flex items-center justify-center shrink-0 shadow-md">
                  <svg className="w-full h-full text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v2h-4v-2zm-4 0h2v2h-2v-2zm2 2h2v2h-2v-2zm2 2h2v2h-2v-2zm-4 0h2v2h-2v-2zm-2-2h2v2h-2v-2zm4-4h2v2h-2v-2zm-4-2h2v2h-2v-2zm6 0h2v2h-2v-2z" />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-white mb-1">
                    <Wifi className="w-4 h-4 text-[#8EAD48]" />
                    <span>In-Store Customer Wi-Fi</span>
                  </div>
                  <p className="text-[11px] text-[#A3B3D4] leading-snug break-all">
                    SSID: <span className="text-white font-mono font-semibold">{restaurantInfo.wifi.networkName}</span>
                  </p>
                  <p className="text-[10px] text-[#8B9DBF] mt-1">
                    {restaurantInfo.wifi.printedPasswordNotice}
                  </p>

                  {restaurantInfo.wifi.passwordValue && (
                    <button
                      onClick={handleCopyWifi}
                      className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold bg-[#142345] hover:bg-[#1A3166] text-white rounded-md transition-colors cursor-pointer"
                    >
                      {copiedWifi ? (
                        <>
                          <Check className="w-3 h-3 text-green-400" />
                          <span>Copied password!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-[#FFCA28]" />
                          <span>Copy Wi-Fi Password</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* QR 2: Follow & Review QR Code */}
              <div className="p-4 rounded-xl bg-[#0E1A36] border border-[#182C58] flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="w-24 h-24 bg-white p-2 rounded-lg flex items-center justify-center shrink-0 shadow-md">
                  <svg className="w-full h-full text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm10 0h2v2h-2v-2zm2 0h2v2h-2v-2zm2 0h2v2h-2v-2zm-4 2h2v2h-2v-2zm4 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm-2-2h2v2h-2v-2zm-2 2h2v2h-2v-2z" />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-white mb-1">
                    <Star className="w-4 h-4 text-[#FFCA28]" />
                    <span>Follow & Review</span>
                  </div>
                  <p className="text-[11px] text-[#A3B3D4] leading-snug">
                    Scan or tap to leave feedback, share your food photos, and tag{' '}
                    <span className="text-[#E92C2C] font-semibold">#HashtagPizza</span>.
                  </p>

                  <div className="mt-2.5 flex items-center justify-center sm:justify-start gap-2">
                    <a
                      href={restaurantInfo.reviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 text-[11px] font-semibold bg-[#142345] hover:bg-[#1A3166] text-[#FFCA28] rounded-md transition-colors"
                    >
                      <span>Write Review</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
