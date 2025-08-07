import React, { useState } from 'react';
import { Shirt, Sparkles, Truck, Star, Phone, MapPin, Mail, Calendar, User, Home, Send, Clock } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { generateConfirmationNumber } from '../utils/confirmation';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
}

interface ContactFormData {
  name: string;
  phone: string;
  address: string;
  email: string;
  serviceDate: string;
  pickupTime: string;
  washType: string;
  notes: string;
  orderId: string;
}

const TimeBackLaundryApp: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: '',
    phone: '',
    address: '',
    email: '',
    serviceDate: 'mm/dd/yyyy',
    pickupTime: '',
    washType: '',
    notes: '',
    orderId: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services: Service[] = [
    {
      icon: <Shirt className="w-8 h-8 text-slate-700" />,
      title: "Wash & Fold",
      description: "Professional washing, drying, and folding of your everyday clothes",
      price: "$2.00/lb • $35.00 for 13 gallon bag"
    },
    {
      icon: <Truck className="w-8 h-8 text-slate-700" />,
      title: "Pickup & Delivery",
      description: "Convenient doorstep service - we come to you!",
      price: "Free over $35 • $10 below $35"
    }
  ];

  const features = [
    "Same-day service available",
    "Hypoallergenic options",
    "24-hour turnaround",
    "Quality guarantee"
  ];

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderId = generateConfirmationNumber();

    const templateParams = {
      name: contactForm.name,
      phone: contactForm.phone,
      email: contactForm.email,
      address: contactForm.address,
      serviceDate: contactForm.serviceDate,
      pickupTime: contactForm.pickupTime,
      washType: contactForm.washType,
      notes: contactForm.notes || 'None provided',
      orderId,
    };

    try {
      // First: Send to YOU (business) - New Order Email Template
      const newOrderResult = await emailjs.send(
        import.meta.env.VITE_EMAIL_JS_SERVICE_ID,
        import.meta.env.VITE_EMAIL_JS_NEW_ORDER_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY,
      );

      console.log('New Order Email successfully sent!', newOrderResult.text);

      // Second: Send confirmation to CUSTOMER - Order Confirmation Template
      const confirmationOrderResult = await emailjs.send(
        import.meta.env.VITE_EMAIL_JS_SERVICE_ID,
        import.meta.env.VITE_EMAIL_JS_CONFIRMATION_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY
      );

      console.log('Order Confirmation Email successfully sent!', confirmationOrderResult.text);
      alert(`Booking request submitted for ${contactForm.name}! We'll contact you within 1 hour to confirm your pickup.`);

      setContactForm({
        name: '',
        phone: '',
        email: '',
        address: '',
        serviceDate: '',
        pickupTime: '',
        washType: '',
        notes: '',
        orderId,
      });
    } catch (error) {
      console.error('Email sending failed:', error);
      alert('Sorry, there was an error submitting your request. Please try again or call us directly at (540) 580-4960.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const Logo = () => (
    <div className="text-center md:text-left mb-4">
      <img src={'/logo.jpeg'} alt="TimeBack Wash & Fold Logo" className="mx-auto w-90 h-90 rounded-full shadow-md border-4 border-white" />
      {/* <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-700 mb-1">
        TIME BACK
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium text-slate-600">
        WASH AND FOLD
      </p> */}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-700 to-slate-900 pt-8 pb-8 lg:p-8">
      <div className="max-w-sm mx-auto md:max-w-4xl lg:max-w-7xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Three Column Layout for Desktop, Two for Tablet */}
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-0">

          {/* Column 1: Header & Services */}
          <div className="md:order-1 lg:order-1 md:col-span-1 lg:col-span-1">
            {/* Header */}
            <div className="bg-white p-6 lg:p-8 xl:p-10">
              <Logo />
              <p className="text-center md:text-left text-slate-600 mt-2 md:text-base lg:text-lg xl:text-xl">
                {/* Professional Laundry & Dry Cleaning Services */}
                <i><b>"Buy back your time — one load at a time."</b></i>
              </p>
            </div>

            {/* About Section */}
            <div className="bg-slate-50 p-6 lg:p-8 xl:p-10 border-t border-slate-200">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-slate-800 mb-3 lg:mb-4 text-center md:text-left">About TimeBack</h2>
              <p className="text-sm md:text-base lg:text-lg text-slate-600 leading-relaxed">
                <strong>New in 2025!</strong> TimeBack Wash and Fold was created by a local stay-at-home mom who understands the daily juggle of family life.
                We're here to serve the Cave Spring, VA area with one simple mission: <em>give you your time back</em>.
              </p>
              <p className="text-sm md:text-base lg:text-lg text-slate-600 leading-relaxed mt-3">
                Whether you're a busy parent, working professional, or anyone who'd rather spend their time on what matters most -
                let us handle the laundry while you focus on living your life.
              </p>
            </div>

            {/* Services Section */}
            <div className="p-6 lg:p-8 xl:p-10">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-800 mb-4 lg:mb-6 text-center md:text-left">Our Services</h2>
              <div className="space-y-4 lg:space-y-6">
                {services.map((service, index) => (
                  <div key={index} className="bg-slate-50 rounded-lg p-4 lg:p-6 border border-slate-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3 lg:space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-slate-700 flex items-center justify-center">
                          {service.icon}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold text-slate-800 lg:text-lg xl:text-xl">{service.title}</h3>
                        <p className="text-slate-600 text-sm lg:text-base xl:text-lg mt-1">{service.description}</p>
                        <p className="text-blue-600 font-semibold mt-2 lg:text-lg xl:text-xl">{service.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Features & Contact Info */}
          <div className="md:order-2 lg:order-2 md:col-span-1 lg:col-span-1 bg-slate-50">
            {/* Features Section */}
            <div className="p-6 lg:p-8 xl:p-10">
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-slate-800 mb-3 lg:mb-6 text-center md:text-left">Why Choose TimeBack?</h3>
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-3 lg:gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Star className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-500 flex-shrink-0" />
                    <span className="text-sm md:text-base lg:text-lg text-slate-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="p-6 lg:p-8 xl:p-10 border-t border-slate-200">
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-slate-800 mb-4 lg:mb-6 text-center md:text-left">Contact Information</h3>

              <div className="space-y-4 lg:space-y-6">
                <div className="flex items-center space-x-3 lg:space-x-4 text-slate-600">
                  <User className="w-6 h-6 lg:w-7 lg:h-7 text-slate-700" />
                  <span className="md:text-lg lg:text-xl">Kinsey Kahl</span>
                </div>
                <div className="flex items-center space-x-3 lg:space-x-4 text-slate-600">
                  <Phone className="w-6 h-6 lg:w-7 lg:h-7 text-slate-700" />
                  <span className="md:text-lg lg:text-xl">(540) 580-4969</span>
                </div>
                <div className="flex items-center space-x-3 lg:space-x-4 text-slate-600">
                  <Mail className="w-6 h-6 lg:w-7 lg:h-7 text-slate-700" />
                  <span className="md:text-lg lg:text-xl">timebackwashandfold@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 lg:space-x-4 text-slate-600">
                  <MapPin className="w-6 h-6 lg:w-7 lg:h-7 text-slate-700" />
                  <span className="md:text-lg lg:text-xl">Serving Your Neighborhood</span>
                </div>
              </div>

              <div className="mt-6 lg:mt-8 text-center md:text-left">
                <p className="text-sm md:text-base lg:text-lg text-slate-500">
                  Operating Hours: Mon-Fri 9AM-7PM | Sat-Sun 10AM-5PM
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Contact Form */}
          <div className="md:order-3 lg:order-3 md:col-span-2 lg:col-span-1 bg-slate-100">
            <div className="p-6 lg:p-8 xl:p-10">
              {!isSubmitted ? (
                <>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-800 mb-4 lg:mb-6 text-center md:text-left">Request Service</h3>
                  <p className="text-sm md:text-base lg:text-lg text-slate-600 mb-6 lg:mb-8 text-center md:text-left">
                    Fill out the form below and we'll get back to you to schedule your service.
                  </p>

                  <form onSubmit={handleContactFormSubmit} className="space-y-4 lg:space-y-6">
                    {/* Name Field */}
                    <div>
                      <label className="block text-left text-sm md:text-base lg:text-lg font-semibold text-slate-700 mb-2">
                        <User className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 inline mr-2" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={contactForm.name}
                        onChange={handleContactFormChange}
                        required
                        className="w-full px-4 py-3 lg:py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-base lg:text-lg"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label className="block text-left text-sm md:text-base lg:text-lg font-semibold text-slate-700 mb-2">
                        <Phone className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 inline mr-2" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={contactForm.phone}
                        onChange={handleContactFormChange}
                        required
                        className="w-full px-4 py-3 lg:py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-base lg:text-lg"
                        placeholder="(555) 555-5555"
                      />
                    </div>

                    {/* Address Field */}
                    <div>
                      <label className="block text-left text-sm md:text-base lg:text-lg font-semibold text-slate-700 mb-2">
                        <Home className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 inline mr-2" />
                        Service Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={contactForm.address}
                        onChange={handleContactFormChange}
                        required
                        className="w-full px-4 py-3 lg:py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-base lg:text-lg"
                        placeholder="123 Main St, City, State 12345"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-left text-sm md:text-base lg:text-lg font-semibold text-slate-700 mb-2">
                        <Mail className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 inline mr-2" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleContactFormChange}
                        required
                        className="w-full px-4 py-3 lg:py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-base lg:text-lg"
                        placeholder="your@email.com"
                      />
                    </div>

                    {/* Service Date and Pickup Time Row */}
                    <div className="space-y-4">
                      {/* Service Date Field */}
                      <div>
                        <label className="block text-left text-sm md:text-base lg:text-lg font-semibold text-slate-700 mb-2">
                          <Calendar className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 inline mr-2" />
                          Preferred Service Date *
                        </label>
                        <div className="relative">
                          {/* Custom calendar icon */}
                          {!isMobile && (
                            <input
                              type="date"
                              name="serviceDate"
                              value={contactForm.serviceDate}
                              onChange={handleContactFormChange}
                              min={getTomorrowDate()}
                              required
                              className="w-full px-4 py-3 lg:py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-base lg:text-lg appearance-none bg-white text-slate-900 placeholder:text-slate-400"
                              style={{ color: contactForm.serviceDate === '' || 'mm/dd/yyyy' ? '#94a3b8' : '#0f172a' }}
                            />
                          )}
                          {isMobile && (
                            <>
                              <input
                                type="date"
                                name="serviceDate"
                                value={contactForm.serviceDate}
                                onChange={handleContactFormChange}
                                min={getTomorrowDate()}
                                required
                                className="w-full px-4 py-3 h-12 text-left lg:py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-base lg:text-lg appearance-none bg-white text-slate-900 placeholder:text-slate-400"
                                style={{ color: contactForm.serviceDate === '' || 'mm/dd/yyyy' ? '#94a3b8' : '#0f172a' }}
                              />
                              < div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Pickup Time Field */}
                      <div>
                        <label className="block text-left text-sm md:text-base lg:text-lg font-semibold text-slate-700 mb-2">
                          <Clock className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 inline mr-2" />
                          Preferred Pickup Time *
                        </label>
                        <div className="relative">
                          <select
                            name="pickupTime"
                            value={contactForm.pickupTime}
                            onChange={handleContactFormChange}
                            required
                            className="w-full px-4 py-3 lg:py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-base lg:text-lg appearance-none bg-white pr-12 text-slate-900 placeholder:text-slate-400"
                            style={{ color: contactForm.pickupTime === '' ? '#94a3b8' : '#0f172a' }}
                          >
                            <option value="" style={{ color: '#94a3b8' }}>Select time window</option>
                            <option value="9am-12pm" style={{ color: '#0f172a' }}>9 AM - 12 PM</option>
                            <option value="12pm-3pm" style={{ color: '#0f172a' }}>12 PM - 3 PM</option>
                            <option value="3pm-6pm" style={{ color: '#0f172a' }}>3 PM - 6 PM</option>
                            <option value="6pm-8pm" style={{ color: '#0f172a' }}>6 PM - 8 PM</option>
                          </select>
                          {/* Custom dropdown arrow */}
                          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Wash Type Dropdown */}
                    <div>
                      <label className="block text-left text-sm md:text-base lg:text-lg font-semibold text-slate-700 mb-2">
                        <Sparkles className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 inline mr-2" />
                        Wash Type *
                      </label>
                      <div className="relative">
                        <select
                          name="washType"
                          value={contactForm.washType}
                          onChange={handleContactFormChange}
                          required
                          className="w-full px-4 py-3 lg:py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-base lg:text-lg appearance-none bg-white pr-12"
                          style={{ color: contactForm.washType === '' ? '#94a3b8' : '#0f172a' }}
                        >
                          <option value="" style={{ color: '#94a3b8' }}>Select wash type</option>
                          <option value="scented" style={{ color: '#0f172a' }}>Scented</option>
                          <option value="unscented" style={{ color: '#0f172a' }}>Unscented</option>
                          <option value="hypoallergenic" style={{ color: '#0f172a' }}>Hypoallergenic</option>
                        </select>
                        {/* Custom dropdown arrow */}
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                          <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Notes Field */}
                    <div>
                      <label className="block text-left text-sm md:text-base lg:text-lg font-semibold text-slate-700 mb-2">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        name="notes"
                        value={contactForm.notes}
                        onChange={handleContactFormChange}
                        rows={4}
                        className="w-full px-4 py-3 lg:py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-base lg:text-lg"
                        placeholder="Any special instructions, stain alerts, or pickup preferences..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-slate-700 text-white py-4 lg:py-5 rounded-lg font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg lg:text-xl"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 lg:h-6 lg:w-6 border-b-2 border-white mr-3"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 lg:w-6 lg:h-6 mr-3" />
                          Submit Service Request
                        </>
                      )}
                    </button>

                    <p className="text-xs md:text-sm lg:text-base text-slate-500 text-center md:text-left mt-4">
                      We'll contact you within 24 hours to confirm your service appointment.
                    </p>
                  </form>
                </>
              ) : (
                /* Thank You Message */
                <div className="text-center py-12">
                  <div className="mb-6">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">Thank You!</h3>
                  <p className="text-lg md:text-xl text-slate-600 mb-6">
                    Your service request has been submitted successfully.
                  </p>
                  <p className="text-base md:text-lg text-slate-500 mb-8">
                    Someone from our team will be contacting you shortly to confirm your appointment and provide additional details.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default TimeBackLaundryApp;