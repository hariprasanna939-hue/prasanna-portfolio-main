/**
 * CENTRALIZED CONTACT CONFIGURATION (Placeholders)
 * 
 * Edit this file to update your contact details, availability,
 * social links, and form submission endpoint.
 * All personal details and endpoints are stored as clean editable placeholders.
 */

export interface ContactSocialLink {
  label: string;
  href: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  availability?: string;
  socials?: ContactSocialLink[];
}

export interface FormConfig {
  endpoint: string;
  emailService: string;
  recipientEmail: string;
  successMessage: string;
  errorMessage: string;
}

export interface ContactConfig {
  info: ContactInfo;
  form: FormConfig;
}

export const contactConfig: ContactConfig = {
  // LEFT COLUMN — CONTACT INFORMATION
  info: {
    email: "[YOUR_EMAIL_ADDRESS]",
    phone: "[YOUR_PHONE_NUMBER]",
    addressLine1: "[YOUR_LOCATION]",
    addressLine2: "",
    availability: "[YOUR_AVAILABILITY]",
    socials: [
      { label: "[LINKEDIN]", href: "[YOUR_LINKEDIN_URL]" },
      { label: "[GITHUB]", href: "[YOUR_GITHUB_URL]" },
      { label: "[TWITTER_X]", href: "[YOUR_TWITTER_URL]" },
    ],
  },

  // RIGHT COLUMN — FORM SUBMISSION CONFIGURATION
  form: {
    endpoint: "[FORM_ENDPOINT]", // Set to your Formspree, Basin, or backend API URL
    emailService: "[EMAIL_SERVICE]", // e.g., Resend, SendGrid, AWS SES
    recipientEmail: "[RECIPIENT_EMAIL]",
    successMessage: "[SUBMISSION_SUCCESS_MESSAGE]", // e.g., "Thank you! Your message has been received."
    errorMessage: "[SUBMISSION_ERROR_MESSAGE]", // e.g., "Unable to send your message. Please reach out directly."
  },
};
