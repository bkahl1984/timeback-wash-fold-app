import React, { useState } from 'react';
import './index.css';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaStar, FaUser, FaHome, FaRegCalendarAlt, FaMagic } from 'react-icons/fa';

const App = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    date: '',
    washType: 'scented',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const payload = {
      ...formData,
      _subject: `TimeBack Wash & Fold Request from ${formData.name || 'Customer'}`,
    };

    await fetch('https://formsubmit.co/ajax/a4fe4fb1e7a7a9c27a5937d940c3641f', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 text-gray-800 font-sans py-10">
      <div className="max-w-2xl mx-auto space-y-10 px-6">
        <header className="text-center space-y-2">
          <img src="/logo.png" alt="TimeBack Wash & Fold Logo" className="mx-auto w-20 h-20 rounded-full shadow-md border-4 border-white" />
          <h1 className="text-4xl font-extrabold text-indigo-800">TimeBack</h1>
          <p className="text-lg text-gray-500">Professional Laundry & Dry Cleaning Services</p>
        </header>

        <section className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4 text-center">Our Services</h2>
          <div className="grid gap-4">
            {[
              { title: '🧺 Wash & Fold', desc: 'Washing, drying, folding of everyday clothes', price: 'From $2.00/lb' },
              { title: '✨ Dry Cleaning', desc: 'Delicate fabrics, suits, and garments', price: 'From $8.99' },
              { title: '👔 Shirt Service', desc: 'Laundering and pressing for shirts', price: 'From $2.99' },
              { title: '🚚 Pickup & Delivery', desc: 'Doorstep service – we come to you!', price: 'Free over $35' },
            ].map((item, i) => (
              <div key={i} className="bg-indigo-50 rounded-lg p-4 border border-indigo-100 shadow-sm">
                <p className="font-semibold text-indigo-800">{item.title}</p>
                <p className="text-sm text-gray-600">{item.desc}</p>
                <p className="text-sm text-blue-600 font-medium">{item.price}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4 text-center">Why Choose TimeBack?</h2>
          <ul className="space-y-3 text-gray-700 text-sm">
            {[
              'Same-day service available',
              'Eco-friendly cleaning products',
              'Expert stain removal',
              'Hypoallergenic options',
              '24-hour turnaround',
              'Quality guarantee',
            ].map((item, i) => (
              <li key={i} className="flex items-center">
                <FaStar className="text-yellow-400 mr-2" /> {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Get Started Today!</h2>
          <div className="space-y-2 text-gray-600">
            <p><FaPhoneAlt className="inline mr-2 text-indigo-500" /> (555) 123-WASH</p>
            <p><FaEnvelope className="inline mr-2 text-indigo-500" /> hello@timebacklaundry.com</p>
            <p><FaMapMarkerAlt className="inline mr-2 text-indigo-500" /> Cave Spring, VA</p>
          </div>
          <div className="mt-6 space-y-3">
            <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-indigo-700">Schedule Pickup</button>
            <button className="w-full border border-indigo-400 text-indigo-600 py-2 rounded-lg font-semibold hover:bg-indigo-50">Get Quote</button>
          </div>
          <p className="text-xs text-gray-400 mt-4">Mon–Fri 7AM–7PM • Sat 8AM–6PM</p>
        </section>

        {!submitted ? (
          <section className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-2 text-center">Request Service</h2>
            <p className="text-sm text-gray-500 mb-6 text-center">We’ll get back to you shortly to schedule your service.</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { icon: <FaUser />, name: 'name', type: 'text', placeholder: 'Enter your full name', label: 'Full Name' },
                { icon: <FaHome />, name: 'address', type: 'text', placeholder: '123 Main St, City, State 12345', label: 'Service Address' },
                { icon: <FaEnvelope />, name: 'email', type: 'email', placeholder: 'your@email.com', label: 'Email Address' },
{ icon: <FaPhoneAlt />, name: 'phone', type: 'tel', placeholder: '(123) 456-7890', label: 'Phone Number' },
                { icon: <FaRegCalendarAlt />, name: 'date', type: 'date', label: 'Preferred Service Date' }
              ].map((field, i) => (
                <div key={i}>
                  <label className="block font-semibold text-sm mb-1">{field.icon} {field.label} *</label>
                  <input
                    name={field.name}
                    type={field.type}
                    required
                    placeholder={field.placeholder || ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              ))}
              <div>
                <label className="block font-semibold text-sm mb-1"><FaMagic className="inline mr-2" /> Wash Type *</label>
                <select name="washType" onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-400">
                  <option value="scented">Scented</option>
                  <option value="unscented">Unscented</option>
                  <option value="hypoallergenic">Hypoallergenic</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-sm mb-1">Additional Notes (Optional)</label>
                <textarea name="notes" placeholder="Any special instructions, stain alerts, or pickup preferences..." onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-400"></textarea>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center shadow hover:bg-indigo-700">
                <span className="mr-2">📨</span> Submit Service Request
              </button>
            </form>
          </section>
        ) : (
          <section className="text-center py-10 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-green-600">Thank you for your service request!</h2>
            <p className="text-md mt-2">Our team will be contacting you shortly.</p>
          </section>
        )}
      </div>
    </div>
  );
};

export default App;
