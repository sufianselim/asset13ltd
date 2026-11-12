export const siteConfig = {
  name: "Asset 13 LTD",
  siteUrl: "https://asset13.com",
  contactEmail: "info@asset13.com",

  /* Digits only, international format (e.g. "8801712345678").
     Leave blank to hide every WhatsApp button. */
  whatsappNumber: "",
  whatsappMessage:
    "Hello Asset 13, I would like to enquire about your housing and property services.",

  /* Optional form backend (Formspree, Web3Forms, Basin).
     Leave blank to use the visitor's email app via a mailto link. */
  formEndpoint: "",

  /* Google Maps search query for the office.
     Leave blank to show the "address on request" panel. */
  mapQuery: "",

  social: {
    instagram: "",
    facebook: "",
    linkedin: ""
  }
};

export function getWhatsAppUrl() {
  const digits = String(siteConfig.whatsappNumber || "").replace(/[^\d]/g, "");
  if (digits.length < 8) return "";

  const message = encodeURIComponent(
    siteConfig.whatsappMessage || "Hello Asset 13, I would like to make an enquiry."
  );

  return `https://wa.me/${digits}?text=${message}`;
}
