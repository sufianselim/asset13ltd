import { Link } from "react-router-dom";
import { navItems } from "../../data/site.js";
import { siteConfig } from "../../lib/config.js";

export default function MobileMenu({ open, onClose, menuRef }) {
  return (
    <div className="mobile-menu" id="mobile-menu" ref={menuRef} hidden={!open}>
      <div className="mobile-menu-inner">
        <nav aria-label="Mobile">
          <ul className="mobile-nav-list">
            {navItems.map((item, index) => (
              <li key={item.to}>
                <Link to={item.to} onClick={onClose}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu-footer">
          <Link className="btn btn--gold" to="/contact" onClick={onClose}>
            Start an enquiry
          </Link>
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
        </div>
      </div>
    </div>
  );
}
