import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { contactConfig } from '../data/contact';
import { prefersReducedMotion } from '../lib/motion';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | 'notice';
    message: string;
    mailtoUrl?: string;
  } | null>(null);

  const reducedMotion = prefersReducedMotion();

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required.';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'Must be at least 2 characters.';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof FormErrors];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!validate()) return;

    setIsSubmitting(true);

    const configuredEndpoint =
      import.meta.env.VITE_FORM_ENDPOINT || contactConfig.form.endpoint;
    const isPlaceholderEndpoint =
      !configuredEndpoint ||
      configuredEndpoint.startsWith('[') ||
      configuredEndpoint.includes('PLACEHOLDER');

    try {
      if (!isPlaceholderEndpoint && configuredEndpoint.startsWith('http')) {
        const response = await fetch(configuredEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            recipient: contactConfig.form.recipientEmail,
          }),
        });

        if (!response.ok) {
          throw new Error('Server returned an error.');
        }

        setStatus({
          type: 'success',
          message:
            contactConfig.form.successMessage.startsWith('[')
              ? 'Thank you! Your message has been sent successfully.'
              : contactConfig.form.successMessage,
        });

        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: '',
        });
      } else {
        // Honest configurable fallback when in placeholder mode
        await new Promise((res) => setTimeout(res, 500));

        const recipient =
          contactConfig.info.email.startsWith('[')
            ? 'hariprasanna939@gmail.com'
            : contactConfig.info.email;

        const subject = encodeURIComponent(
          `Portfolio Inscription from ${formData.firstName} ${formData.lastName}`
        );
        const body = encodeURIComponent(
          `Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        );
        const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

        setStatus({
          type: 'notice',
          message:
            'Form endpoint is in placeholder mode ([FORM_ENDPOINT]). You can dispatch your message directly via email client below.',
          mailtoUrl,
        });
      }
    } catch {
      setStatus({
        type: 'error',
        message:
          contactConfig.form.errorMessage.startsWith('[')
            ? 'Unable to transmit message at this moment. Please reach out directly.'
            : contactConfig.form.errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 lg:py-32 px-3 sm:px-6 lg:px-12 bg-[#363636] text-[#F5F3EF] relative transition-colors duration-500 overflow-hidden"
    >
      {/* Centered Minimalist Black Contact Panel (Reference Image Canvas) */}
      <div className="max-w-[1240px] mx-auto bg-[#151513] rounded-[20px] sm:rounded-[32px] p-5 sm:p-10 lg:p-20 shadow-[0_35px_100px_rgba(0,0,0,0.65)] border border-white/5 relative overflow-hidden">
        
        {/* Top Editorial Nav / Breadcrumb row matching reference mockup */}
        <div className="flex items-center justify-between pb-6 sm:pb-12 border-b border-white/10 relative z-10 text-xs sm:text-[13px] font-sans text-[#BDBBB6]">
          <div className="flex items-center gap-3 sm:gap-8 tracking-wide">
            <span className="hover:text-white transition-colors cursor-pointer">About</span>
            <span className="hover:text-white transition-colors cursor-pointer">Work</span>
            <span className="hidden md:inline-block hover:text-white transition-colors cursor-pointer">Blog</span>
            <span className="hidden md:inline-block hover:text-white transition-colors cursor-pointer">Shop</span>
          </div>

          <div className="font-bold tracking-tight text-white text-xs sm:text-base">
            prasanna hari
          </div>

          <div className="flex items-center gap-3 sm:gap-8 tracking-wide">
            <span className="hidden md:inline-block hover:text-white transition-colors cursor-pointer">Login</span>
            <span className="text-[#F5F3EF] font-semibold border-b border-white pb-0.5">Contact</span>
          </div>
        </div>

        {/* Oversized "Contact me" Heading (Reference Style) */}
        <div className="overflow-hidden pt-8 sm:pt-16 pb-6 sm:pb-10 relative z-10">
          <motion.h2
            initial={reducedMotion ? { opacity: 0 } : { y: '105%', opacity: 0 }}
            whileInView={reducedMotion ? { opacity: 1 } : { y: '0%', opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.95,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-[clamp(2.4rem,9vw,8.5rem)] font-bold text-[#F5F3EF] tracking-[-0.04em] leading-[0.94] select-none"
          >
            Contact me
          </motion.h2>
        </div>

        {/* Two-Column Composition: Contact Info (Left) & Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start pt-6 sm:pt-10 relative z-10">
          
          {/* LEFT COLUMN — CONTACT INFORMATION (Matching Reference Exact Layout) */}
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col space-y-6 sm:space-y-7 text-sm sm:text-base font-normal tracking-wide text-[#BDBBB6]"
          >
            {/* Email */}
            <div>
              <a
                href={
                  contactConfig.info.email.startsWith('[')
                    ? '#'
                    : `mailto:${contactConfig.info.email}`
                }
                className="text-[#BDBBB6] hover:text-[#F5F3EF] transition-colors duration-200 inline-block font-mono text-sm sm:text-base"
              >
                {contactConfig.info.email}
              </a>
            </div>

            {/* Phone */}
            <div>
              <a
                href={
                  contactConfig.info.phone.startsWith('[')
                    ? '#'
                    : `tel:${contactConfig.info.phone.replace(/[^+\d]/g, '')}`
                }
                className="text-[#BDBBB6] hover:text-[#F5F3EF] transition-colors duration-200 inline-block font-mono text-sm sm:text-base"
              >
                {contactConfig.info.phone}
              </a>
            </div>

            {/* Address / Location */}
            <div className="text-[#BDBBB6] leading-relaxed font-mono text-sm sm:text-base">
              <p>{contactConfig.info.addressLine1}</p>
              {contactConfig.info.addressLine2 && (
                <p>{contactConfig.info.addressLine2}</p>
              )}
            </div>

            {/* Optional Availability */}
            {contactConfig.info.availability && (
              <div className="pt-4 text-xs sm:text-sm text-[#BDBBB6]/70 font-mono">
                <p>{contactConfig.info.availability}</p>
              </div>
            )}

            {/* Optional Social Channels */}
            {contactConfig.info.socials && contactConfig.info.socials.length > 0 && (
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-[#BDBBB6]/80">
                {contactConfig.info.socials.map((social, sIdx) => (
                  <a
                    key={sIdx}
                    href={social.href.startsWith('[') ? '#' : social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <span>{social.label}</span>
                    <ArrowUpRight size={11} className="opacity-60" />
                  </a>
                ))}
              </div>
            )}
          </motion.div>

          {/* RIGHT COLUMN — MINIMALIST CONTACT FORM */}
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-8 sm:space-y-10">
              
              {/* Field 1: Name (required) */}
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-[#F5F3EF]">
                  Name (required)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-1">
                  {/* First Name */}
                  <div className="relative group">
                    <span className="block text-xs text-[#BDBBB6]/70 mb-1">First Name</span>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      aria-label="First Name"
                      disabled={isSubmitting}
                      className={`w-full bg-transparent text-[#F5F3EF] text-sm sm:text-base pb-2 outline-none border-b transition-colors ${
                        errors.firstName
                          ? 'border-[#FF5F56]'
                          : 'border-[#A5A39E]/60 focus:border-transparent'
                      }`}
                    />
                    {/* Active Sliding Underline */}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[1.5px] transition-transform duration-300 ease-out pointer-events-none origin-left ${
                        errors.firstName
                          ? 'bg-[#FF5F56] scale-x-100'
                          : 'bg-[#FFFFFF] scale-x-0 group-focus-within:scale-x-100'
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-[11px] font-mono text-[#FF5F56] mt-1 flex items-center gap-1">
                        <AlertCircle size={11} />
                        <span>{errors.firstName}</span>
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="relative group">
                    <span className="block text-xs text-[#BDBBB6]/70 mb-1">Last Name</span>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      aria-label="Last Name"
                      disabled={isSubmitting}
                      className={`w-full bg-transparent text-[#F5F3EF] text-sm sm:text-base pb-2 outline-none border-b transition-colors ${
                        errors.lastName
                          ? 'border-[#FF5F56]'
                          : 'border-[#A5A39E]/60 focus:border-transparent'
                      }`}
                    />
                    {/* Active Sliding Underline */}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[1.5px] transition-transform duration-300 ease-out pointer-events-none origin-left ${
                        errors.lastName
                          ? 'bg-[#FF5F56] scale-x-100'
                          : 'bg-[#FFFFFF] scale-x-0 group-focus-within:scale-x-100'
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-[11px] font-mono text-[#FF5F56] mt-1 flex items-center gap-1">
                        <AlertCircle size={11} />
                        <span>{errors.lastName}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Field 2: Email(required) */}
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-medium text-[#F5F3EF]"
                >
                  Email(required)
                </label>
                <div className="relative group pt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-label="Email Address"
                    disabled={isSubmitting}
                    className={`w-full bg-transparent text-[#F5F3EF] text-sm sm:text-base pb-2 outline-none border-b transition-colors ${
                      errors.email
                        ? 'border-[#FF5F56]'
                        : 'border-[#A5A39E]/60 focus:border-transparent'
                    }`}
                  />
                  {/* Active Sliding Underline */}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[1.5px] transition-transform duration-300 ease-out pointer-events-none origin-left ${
                      errors.email
                        ? 'bg-[#FF5F56] scale-x-100'
                        : 'bg-[#FFFFFF] scale-x-0 group-focus-within:scale-x-100'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] font-mono text-[#FF5F56] mt-1 flex items-center gap-1">
                      <AlertCircle size={11} />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Field 3: Message(required) */}
              <div className="space-y-1">
                <label
                  htmlFor="message"
                  className="block text-xs sm:text-sm font-medium text-[#F5F3EF]"
                >
                  Message(required)
                </label>
                <div className="relative group pt-1">
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    aria-label="Message"
                    disabled={isSubmitting}
                    className={`w-full bg-transparent text-[#F5F3EF] text-sm sm:text-base pb-2 outline-none border-b resize-none transition-colors ${
                      errors.message
                        ? 'border-[#FF5F56]'
                        : 'border-[#A5A39E]/60 focus:border-transparent'
                    }`}
                  />
                  {/* Active Sliding Underline */}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[1.5px] transition-transform duration-300 ease-out pointer-events-none origin-left ${
                      errors.message
                        ? 'bg-[#FF5F56] scale-x-100'
                        : 'bg-[#FFFFFF] scale-x-0 group-focus-within:scale-x-100'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] font-mono text-[#FF5F56] mt-1 flex items-center gap-1">
                      <AlertCircle size={11} />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Status Notice / Feedback Banners */}
              {status && (
                <div
                  className={`p-4 rounded text-xs sm:text-sm font-mono flex items-start gap-3 border ${
                    status.type === 'success'
                      ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20'
                      : status.type === 'notice'
                      ? 'bg-white/5 text-[#F5F3EF] border-white/10'
                      : 'bg-[#FF5F56]/10 text-[#FF5F56] border-[#FF5F56]/20'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 space-y-2">
                    <p>{status.message}</p>
                    {status.mailtoUrl && (
                      <a
                        href={status.mailtoUrl}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-white text-[#151513] font-bold text-xs hover:bg-[#E5E3DF] transition-colors"
                      >
                        <span>Dispatch via Email Client</span>
                        <ArrowUpRight size={13} />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Field 4: Submit Button (Rectangular, Solid White, Dark Monospace Text) */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#FFFFFF] text-[#151513] hover:bg-[#EAE8E4] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed font-mono font-bold text-xs sm:text-sm tracking-widest uppercase px-9 py-3 rounded-none transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      <span>SUBMITTING...</span>
                    </>
                  ) : (
                    <span>SUBMIT</span>
                  )}
                </button>
              </div>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
