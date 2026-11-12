import { getWhatsAppUrl, siteConfig } from "../../lib/config.js";

export default function ContactDetails() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <aside className="contact-aside reveal">
      <p className="eyebrow">Direct contact</p>
      <h2>Prefer to speak directly?</h2>

      <ul className="contact-list">
        <li className="contact-item">
          <span className="contact-label">Email</span>
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
        </li>

        {whatsappUrl && (
          <li className="contact-item">
            <span className="contact-label">WhatsApp</span>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              Message us on WhatsApp
            </a>
          </li>
        )}

        <li className="contact-item">
          <span className="contact-label">Office</span>
          <p>Visits by appointment</p>
        </li>

        <li className="contact-item">
          <span className="contact-label">Response</span>
          <p>We will respond as soon as possible.</p>
        </li>
      </ul>

      <div className="contact-aside-note">
        <strong>Helpful to include</strong>
        The type of home or property you are considering, your preferred
        location, and your timeline. If you are enquiring about a specific
        project, select it in the form so we can send the right information.
      </div>
    </aside>
  );
}
