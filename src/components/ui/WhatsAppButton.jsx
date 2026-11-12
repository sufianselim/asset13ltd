import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "../../lib/config.js";

export default function WhatsAppButton() {
  const url = getWhatsAppUrl();
  if (!url) return null;

  return (
    <a
      className="whatsapp-float"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Asset 13 on WhatsApp"
    >
      <MessageCircle size={26} aria-hidden="true" />
    </a>
  );
}
