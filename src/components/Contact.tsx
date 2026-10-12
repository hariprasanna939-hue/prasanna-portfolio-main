import React, { useState } from 'react';
import { Download, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { resumeUrl, socials, projectTypes } from '../data/site';
import { SectionLabel } from './SectionLabel';
import { MaskText } from './MaskText';
import { SocialIcon } from './Icons';

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  message: string;
}

export const Contact: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: projectTypes[0],
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const linkedinSocial = socials.find((s) => s.id === 'linkedin');

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (form.phone.trim().length > 0) {
      const phoneRegex = /^[+\d][\d\s()-]{6,}$/;
      if (!phoneRegex.test(form.phone.trim())) {
        newErrors.phone = 'Please enter a valid phone number (e.g. +91 9876543210).';
      }
    }

    if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!validate()) return;

    setIsSubmitting(true);
    const endpoint = import.meta.env.VITE_FORM_ENDPOINT;

    try {
      if (endpoint && endpoint.trim().length > 0) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(form),
        });

        if (!response.ok) {
          throw new Error('Form submission failed.');
        }
      } else {
        // Fallback to mailto link
        const subject = encodeURIComponent(`Portfolio enquiry: ${form.projectType}`);
        const body = encodeURIComponent(
          `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${
            form.phone || 'N/A'
          }\nCompany: ${form.company || 'N/A'}\nProject Type: ${
            form.projectType
          }\n\nMessage:\n${form.message}`
        );
        window.location.href = `mailto:hariprasanna939@gmail.com?subject=${subject}&body=${body}`;
      }

      setStatusMessage({
        type: 'success',
        text: "Thank you! Your enquiry has been received. I'll get back to you shortly.",
      });
      setForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: projectTypes[0],
        message: '',
      });
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'Failed to send message. Please email me directly at hariprasanna939@gmail.com.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-28 md:py-36 px-6 md:px-12 bg-[#1A1A1A] text-white relative">
      <div className="max-w-[1440px] mx-auto">
        <SectionLabel>Inquiries &amp; Collaboration</SectionLabel>
        <MaskText
          text="Start a conversation"
          className="text-[clamp(2rem,4vw,3.5rem)] font-semibold text-white leading-[1.15] tracking-tight mb-20 md:mb-28"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-18 items-start">
          {/* Left Column (5 Cols): Direct Contacts & Socials */}
          <div className="lg:col-span-5 flex flex-col items-start gap-8">
            <p className="text-lg md:text-xl text-white/70 leading-relaxed font-normal">
              I’m always open to discussing cutting-edge AI architectures,
              resilient full-stack systems, or innovative enterprise projects.
              Let’s create something extraordinary together.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              {/* Primary CTA button with circular white icon wrapper */}
              <a
                href={resumeUrl}
                download="Resume.pdf"
                className="group bg-[#FF5C35] hover:bg-[#ff7251] text-white rounded-full flex items-center p-1.5 pr-6 gap-3.5 transition-all duration-300 hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(255,92,53,0.2)]"
              >
                <div className="w-9 h-9 bg-white rounded-full flex justify-center items-center text-[#FF5C35] group-hover:scale-95 transition-transform duration-300">
                  <Download size={16} strokeWidth={2.5} />
                </div>
                <span className="font-medium text-sm tracking-wide">
                  Download Resume
                </span>
              </a>

              {linkedinSocial && (
                <a
                  href={linkedinSocial.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#2A2A2A] hover:bg-[#333333] border border-white/5 text-white rounded-full flex items-center px-6 py-3 gap-2.5 transition-all duration-300 hover:-translate-y-0.5 font-medium text-sm"
                >
                  <span>Connect on LinkedIn</span>
                  <ArrowUpRight size={15} className="text-white/40 group-hover:text-white" />
                </a>
              )}
            </div>

            {/* Vertical Social Dark Cards */}
            <div className="flex flex-col gap-3.5 mt-2 w-full max-w-sm">
              {socials.map((social) => {
                const isEmail = social.id === 'email';
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    target={isEmail ? undefined : '_blank'}
                    rel={isEmail ? undefined : 'noopener noreferrer'}
                    className="flex items-center gap-4 p-4 rounded-[20px] bg-[#111111] border border-white/5 shadow-2xl hover:border-white/10 hover:-translate-y-0.5 transition-all group select-none"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#2A2A2A] border border-white/5 text-white/80 flex items-center justify-center group-hover:bg-[#FF5C35] group-hover:text-white transition-colors shrink-0 shadow-sm">
                      <SocialIcon id={social.id} className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold font-mono uppercase tracking-wider text-white group-hover:text-[#FF5C35] transition-colors">
                        {social.label}
                      </span>
                      <span className="text-xs text-white/40 truncate">
                        {social.handle}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column (7 Cols): Dark Form Panel */}
          <div className="lg:col-span-7 bg-[#111111] p-8 sm:p-12 rounded-[32px] border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5C35]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Send an enquiry
                </h3>
                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold text-[#FF5C35] bg-[#2A2A2A] border border-white/5 shadow-sm">
                  Direct Channel
                </span>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-name"
                    className="text-xs font-mono uppercase tracking-wider font-semibold text-white/60"
                  >
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Jenkins"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'error-name' : undefined}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#2A2A2A] border border-white/5 text-white placeholder:text-white/40 text-sm outline-none focus:border-[#FF5C35] transition-colors"
                  />
                  {errors.name && (
                    <p
                      id="error-name"
                      role="alert"
                      className="text-xs text-[#FF5C35] font-medium mt-1 flex items-center gap-1"
                    >
                      <AlertCircle size={13} />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-email"
                    className="text-xs font-mono uppercase tracking-wider font-semibold text-white/60"
                  >
                    Work Email *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'error-email' : undefined}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#2A2A2A] border border-white/5 text-white placeholder:text-white/40 text-sm outline-none focus:border-[#FF5C35] transition-colors"
                  />
                  {errors.email && (
                    <p
                      id="error-email"
                      role="alert"
                      className="text-xs text-[#FF5C35] font-medium mt-1 flex items-center gap-1"
                    >
                      <AlertCircle size={13} />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Grid: Phone & Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-phone"
                      className="text-xs font-mono uppercase tracking-wider font-semibold text-white/60"
                    >
                      Phone Number (Optional)
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 ..."
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'error-phone' : undefined}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#2A2A2A] border border-white/5 text-white placeholder:text-white/40 text-sm outline-none focus:border-[#FF5C35] transition-colors"
                    />
                    {errors.phone && (
                      <p
                        id="error-phone"
                        role="alert"
                        className="text-xs text-[#FF5C35] font-medium mt-1 flex items-center gap-1"
                      >
                        <AlertCircle size={13} />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-company"
                      className="text-xs font-mono uppercase tracking-wider font-semibold text-white/60"
                    >
                      Organization / Company
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="e.g. Acme Innovations"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#2A2A2A] border border-white/5 text-white placeholder:text-white/40 text-sm outline-none focus:border-[#FF5C35] transition-colors"
                    />
                  </div>
                </div>

                {/* Project Type */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-type"
                    className="text-xs font-mono uppercase tracking-wider font-semibold text-white/60"
                  >
                    Opportunity / Project Scope
                  </label>
                  <select
                    id="contact-type"
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#2A2A2A] border border-white/5 text-white text-sm outline-none cursor-pointer focus:border-[#FF5C35] transition-colors"
                  >
                    {projectTypes.map((t) => (
                      <option key={t} value={t} className="bg-[#1A1A1A] text-white">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-mono uppercase tracking-wider font-semibold text-white/60"
                  >
                    Message &amp; Objectives *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your project, timeline, and architectural requirements..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'error-message' : undefined}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#2A2A2A] border border-white/5 text-white placeholder:text-white/40 text-sm outline-none resize-none focus:border-[#FF5C35] transition-colors"
                  />
                  {errors.message && (
                    <p
                      id="error-message"
                      role="alert"
                      className="text-xs text-[#FF5C35] font-medium mt-1 flex items-center gap-1"
                    >
                      <AlertCircle size={13} />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Status Message Feedback */}
                <div aria-live="polite">
                  {statusMessage && (
                    <div
                      className={`p-4 rounded-xl text-sm font-semibold flex items-center gap-2 ${
                        statusMessage.type === 'success'
                          ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30'
                          : 'bg-red-950/40 text-red-300 border border-red-500/30'
                      }`}
                    >
                      {statusMessage.type === 'success' ? (
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                      ) : (
                        <AlertCircle size={16} className="text-red-400 shrink-0" />
                      )}
                      <span>{statusMessage.text}</span>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group bg-[#FF5C35] hover:bg-[#ff7251] text-white rounded-full w-full p-2 pr-6 flex items-center justify-between transition-all duration-300 hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(255,92,53,0.2)] disabled:opacity-50"
                >
                  <div className="w-9 h-9 bg-white rounded-full flex justify-center items-center text-[#FF5C35] group-hover:scale-95 transition-transform duration-300">
                    <ArrowUpRight
                      size={18}
                      strokeWidth={2.5}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                  <span className="font-semibold text-sm tracking-wide">
                    {isSubmitting ? 'Transmitting…' : 'Send Message'}
                  </span>
                  <div className="w-9" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
