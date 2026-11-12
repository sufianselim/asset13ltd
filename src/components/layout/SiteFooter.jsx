import { Link } from "react-router-dom";
import { navItems } from "../../data/site.js";
import { services } from "../../data/services.js";
import { getWhatsAppUrl, siteConfig } from "../../lib/config.js";
import Logo from "../ui/Logo.jsx";
import SocialLinks from "../ui/SocialLinks.jsx";

export default function SiteFooter() {
  const whatsappUrl = getWhatsAppUrl();
  const companyLinks = navItems.filter((item) => item.to !== "/");

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link className="brand" to="/" aria-label="Asset 13 LTD — Home">
            <Logo className="brand-mark" size={42} />
            <span className="brand-text">
              ASSET <span className="brand-accent">13</span>
              <span className="brand-suffix">LTD</span>
            </span>
          </Link>
          <p className="footer-note">
            Housing and real estate, approached with care — considered homes,
            disciplined delivery, and a long-term view of value.
          </p>
          <SocialLinks />
        </div>

        <div className="footer-col">
          <h3>Company</h3>
          <ul>
            {companyLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3>Services</h3>
          <ul>
            {services.map((service) => (
              <li key={service.id}>
                <Link to={`/services#${service.id}`}>{service.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3>Contact</h3>
          <ul>
            <li>
              <a href={`mailto:${siteConfig.contactEmail}`}>
                {siteConfig.contactEmail}
              </a>
            </li>
            <li>
              <Link to="/contact">Enquiry form</Link>
            </li>
            <li>
              <Link to="/contact">Office visits by appointment</Link>
            </li>
            {whatsappUrl && (
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        <p>Housing &amp; Real Estate · asset13.com</p>
      </div>
    </footer>
  );
}
