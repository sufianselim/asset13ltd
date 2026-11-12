import ContactDetails from "../components/contact/ContactDetails.jsx";
import ContactForm from "../components/contact/ContactForm.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import PageMeta from "../components/ui/PageMeta.jsx";
import { contactPage } from "../data/site.js";
import { siteConfig } from "../lib/config.js";

export default function Contact() {
  return (
    <>
      <PageMeta
        title="Contact | Asset 13 LTD"
        description="Contact Asset 13 LTD about a home, development, investment, or property enquiry. Send a message, email us, or arrange an appointment."
        path="/contact"
      />

      <PageHero
        eyebrow={contactPage.hero.eyebrow}
        title={contactPage.hero.title}
        intro={contactPage.hero.intro}
      />

      <section className="section">
        <div className="container contact-grid">
          <div className="reveal">
            <p className="eyebrow">Send an enquiry</p>
            <h2 style={{ marginBottom: "1.75rem" }}>How can we help?</h2>
            <ContactForm />
          </div>

          <ContactDetails />
        </div>

        <div className="container">
          <div className="map-shell">
            {siteConfig.mapQuery ? (
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  siteConfig.mapQuery
                )}&output=embed`}
                title="Map showing the Asset 13 LTD office location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="map-fallback">
                <strong>Office visits by appointment</strong>
                <p>
                  Our full office address and map will be published here once
                  confirmed. In the meantime, contact us by email or WhatsApp to
                  arrange a meeting.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
