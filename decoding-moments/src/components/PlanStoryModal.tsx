import React, { useState } from 'react';
import { X, Send, Calendar, MapPin, Sparkles, MessageCircle, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PlanStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const PlanStoryModal: React.FC<PlanStoryModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const [eventType, setEventType] = useState(preselectedService || 'Weddings');
  const [destination, setDestination] = useState('Jaipur');
  const [eventDate, setEventDate] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Instant Reels (Same-Day Delivery)',
    '4K Cinematic Highlights',
  ]);
  const [submitted, setSubmitted] = useState(false);

  const eventTypes = [
    'Weddings',
    'Haldi & Mehendi',
    'Sangeet & Reception',
    'Instant Reels',
    'Milestone Celebrations',
    'Brand & Editorial',
  ];

  const destinations = [
    'Jaipur',
    'Udaipur',
    'Jodhpur',
    'Delhi NCR',
    'Goa',
    'Mumbai',
    'International Destination',
    'Other Heritage City',
  ];

  const serviceOptions = [
    'Instant Reels (Same-Day Delivery)',
    '4K Cinematic Highlights Film',
    'Full Ceremony Documentary',
    'Drone Aerial Architecture',
    'Dedicated Social Story Creator',
  ];

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter((s) => s !== srv));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello Decoding Moments Team! I would like to plan our story.\n\n` +
      `• Name: ${name || 'Client'}\n` +
      `• Event Type: ${eventType}\n` +
      `• Destination: ${destination}\n` +
      `• Date: ${eventDate || 'TBD'}\n` +
      `• Desired Services: ${selectedServices.join(', ')}\n\n` +
      `Please let us know your availability.`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // simulated save
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-[#FAF6F0] border border-[#D5C8B7] rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl z-10 my-4 sm:my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-[#7A756D] hover:text-[#171614] hover:bg-[#E8DFC0]/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              {/* Header */}
              <div className="text-center max-w-md mx-auto mb-6 sm:mb-8">
                <span className="text-[10px] uppercase tracking-ultra text-[#B68A55] font-bold block mb-1">
                  COMMISSION OUR STORYTELLERS
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#171614]">
                  Plan Your Story
                </h3>
                <div className="w-12 h-[1px] bg-[#B68A55] mx-auto my-3" />
                <p className="text-xs text-[#7A756D] font-light">
                  Tell us about your celebration. We craft tailored on-ground crews and same-day instant reel deliverables.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* Event Type Grid */}
                <div>
                  <label className="block text-xs uppercase tracking-luxury text-[#4A453E] font-semibold mb-2">
                    1. Celebration Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {eventTypes.map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setEventType(type)}
                        className={`text-xs p-2.5 rounded-lg border text-left transition-all ${
                          eventType === type
                            ? 'border-[#B68A55] bg-[#F3ECE0] font-semibold text-[#171614] shadow-sm'
                            : 'border-[#E8DFC0] bg-white/70 text-[#6B655B] hover:border-[#B68A55]/60'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Destination & Date Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-luxury text-[#4A453E] font-semibold mb-2 flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-[#B68A55]" />
                      <span>Destination</span>
                    </label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full text-xs p-3 rounded-lg border border-[#E8DFC0] bg-white text-[#171614] focus:outline-none focus:border-[#B68A55]"
                    >
                      {destinations.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-luxury text-[#4A453E] font-semibold mb-2 flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-[#B68A55]" />
                      <span>Celebration Date</span>
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full text-xs p-3 rounded-lg border border-[#E8DFC0] bg-white text-[#171614] focus:outline-none focus:border-[#B68A55]"
                    />
                  </div>
                </div>

                {/* Services Checkboxes */}
                <div>
                  <label className="block text-xs uppercase tracking-luxury text-[#4A453E] font-semibold mb-2 flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#B68A55]" />
                    <span>Included Experiences</span>
                  </label>
                  <div className="space-y-2">
                    {serviceOptions.map((srv) => {
                      const isChecked = selectedServices.includes(srv);
                      return (
                        <div
                          key={srv}
                          onClick={() => toggleService(srv)}
                          className={`flex items-center justify-between p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                            isChecked
                              ? 'border-[#B68A55] bg-[#F5EFE6] text-[#171614] font-medium'
                              : 'border-[#E8DFC0] bg-white/60 text-[#7A756D]'
                          }`}
                        >
                          <span>{srv}</span>
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center ${
                              isChecked
                                ? 'bg-[#A67C4E] border-[#A67C4E] text-white'
                                : 'border-[#C5BAA8]'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#6B655B] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Siddharth & Rhea"
                      className="w-full text-xs p-2.5 rounded-lg border border-[#E8DFC0] bg-white text-[#171614] focus:border-[#B68A55] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#6B655B] mb-1">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full text-xs p-2.5 rounded-lg border border-[#E8DFC0] bg-white text-[#171614] focus:border-[#B68A55] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#6B655B] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full text-xs p-2.5 rounded-lg border border-[#E8DFC0] bg-white text-[#171614] focus:border-[#B68A55] outline-none"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-[#E8DFC0]">
                  <button
                    type="submit"
                    className="w-full sm:w-auto flex-1 py-3.5 px-6 bg-[#A67C4E] hover:bg-[#8F663B] text-white text-xs font-semibold uppercase tracking-luxury rounded-sm transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Request Date Check</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppInquiry}
                    className="w-full sm:w-auto py-3.5 px-5 border border-[#3A352D] hover:border-[#25D366] bg-white text-[#171614] text-xs font-semibold uppercase tracking-luxury rounded-sm transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>Quick WhatsApp</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-10 space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#E8D5B5]/60 text-[#8F663B] mx-auto flex items-center justify-center shadow-inner">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>

              <h3 className="font-serif text-3xl font-bold text-[#171614]">
                Inquiry Received
              </h3>

              <p className="text-sm text-[#6B655B] max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-[#171614]">{name || 'there'}</span>. Our studio director will review dates for {destination} and contact you on {phone || 'your phone'} within 4 business hours.
              </p>

              <div className="pt-4 flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={handleWhatsAppInquiry}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider rounded-sm shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp Now</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#171614] text-white text-xs font-semibold uppercase tracking-wider rounded-sm"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
