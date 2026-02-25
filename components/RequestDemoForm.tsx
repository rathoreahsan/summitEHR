import React, { useState } from 'react';
import { ArrowRight } from './Icons';

interface RequestDemoFormProps {
  theme?: 'light' | 'blue';
}

const RequestDemoForm: React.FC<RequestDemoFormProps> = ({ theme = 'light' }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000); // Reset after 3s for demo purposes
  };

  const inputClass = "w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-summit-500 text-gray-700 text-base";
  const labelClass = "sr-only"; // Screen reader only, using placeholders

  return (
    <div className={`p-6 md:p-8 rounded-lg shadow-xl ${theme === 'blue' ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'bg-white/90 backdrop-blur-sm'}`}>
      {submitted ? (
        <div className="h-[400px] flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 text-2xl">✓</div>
          <h3 className={`text-2xl font-bold mb-2 ${theme === 'blue' ? 'text-white' : 'text-gray-900'}`}>Request Received!</h3>
          <p className={`${theme === 'blue' ? 'text-white/80' : 'text-gray-600'}`}>Our team will be in touch shortly to schedule your personalized demo.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {theme === 'blue' && <h3 className="text-white text-2xl font-bold mb-6 text-center">Request a Demo</h3>}
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className={labelClass}>First Name</label>
              <input type="text" id="firstName" placeholder="First Name *" required className={inputClass} />
            </div>
            <div>
              <label htmlFor="lastName" className={labelClass}>Last Name</label>
              <input type="text" id="lastName" placeholder="Last Name *" required className={inputClass} />
            </div>
          </div>
          
          <div>
            <label htmlFor="company" className={labelClass}>Company Name</label>
            <input type="text" id="company" placeholder="Company Name *" required className={inputClass} />
          </div>
          
          <div>
            <label htmlFor="email" className={labelClass}>Business Email</label>
            <input type="email" id="email" placeholder="Business Email *" required className={inputClass} />
          </div>
          
          <div>
            <label htmlFor="subject" className={labelClass}>Subject</label>
            <input type="text" id="subject" placeholder="Subject" className={inputClass} />
          </div>
          
          <div>
            <label htmlFor="ehr" className={labelClass}>Current EHR</label>
            <input type="text" id="ehr" placeholder="What EHR are you currently using?" className={inputClass} />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <select className={`${inputClass} text-gray-500`}>
              <option># of Providers</option>
              <option>1-5</option>
              <option>6-20</option>
              <option>20+</option>
            </select>
            <select className={`${inputClass} text-gray-500`}>
              <option>Specialty</option>
              <option>Primary Care</option>
              <option>Cardiology</option>
              <option>Dermatology</option>
              <option>Other</option>
            </select>
          </div>
          
          <select className={`${inputClass} text-gray-500`}>
            <option>Practice Role</option>
            <option>Physician</option>
            <option>Administrator</option>
            <option>IT Professional</option>
            <option>Nurse / Staff</option>
          </select>
          
          <textarea placeholder="Anything else we should know?" rows={3} className={inputClass}></textarea>
          
          <button 
            type="submit" 
            className="w-full bg-summit-600 hover:bg-summit-700 text-white font-semibold py-3 px-6 rounded-full transition-colors flex items-center justify-center gap-2 group text-base"
          >
            Submit
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      )}
    </div>
  );
};

export default RequestDemoForm;