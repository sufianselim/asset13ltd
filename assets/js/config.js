/**
 * Asset 13 LTD — site configuration
 *
 * Edit the values below, then upload. This is the only file that needs
 * changing to connect the site to real contact details and services.
 */
window.ASSET13_CONFIG = {
  siteUrl: "https://asset13.com",

  /* Shown on the contact page and in the footer. Replace when the real
     company mailbox is confirmed. */
  contactEmail: "info@asset13.com",

  /* International format, digits only (no + or spaces).
     Example: "8801712345678". Leave blank to hide WhatsApp buttons. */
  whatsappNumber: "",

  whatsappMessage:
    "Hello Asset 13, I would like to enquire about your housing and property services.",

  /* Optional form backend. Paste a Formspree / Web3Forms / Basin endpoint
     here to receive submissions by email. Leave blank to fall back to the
     visitor's email app via a pre-filled mailto link. */
  formEndpoint: "",

  /* Google Maps search query for the office, e.g. "Asset 13 LTD, Dhaka".
     Leave blank to show the designed "address on request" panel instead. */
  mapQuery: "",

  /* Full profile URLs. Empty entries are hidden automatically. */
  social: {
    instagram: "",
    facebook: "",
    linkedin: ""
  }
};
