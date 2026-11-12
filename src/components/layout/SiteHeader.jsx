import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { navItems } from "../../data/site.js";
import Logo from "../ui/Logo.jsx";
import MobileMenu from "./MobileMenu.jsx";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);

    const main = document.querySelector("main");
    const footer = document.querySelector(".site-footer");
    if (main) main.inert = menuOpen;
    if (footer) footer.inert = menuOpen;

    if (menuOpen && menuRef.current) {
      window.setTimeout(() => {
        const firstLink = menuRef.current?.querySelector("a");
        if (firstLink) firstLink.focus({ preventScroll: true });
      }, 60);
    }

    return () => {
      document.body.classList.remove("nav-open");
      if (main) main.inert = false;
      if (footer) footer.inert = false;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus({ preventScroll: true });
      }
    };

    const desktopQuery = window.matchMedia("(min-width: 1081px)");
    const handleDesktop = (event) => {
      if (event.matches) setMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    desktopQuery.addEventListener("change", handleDesktop);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      desktopQuery.removeEventListener("change", handleDesktop);
    };
  }, [menuOpen]);

  const headerClasses = ["site-header"];
  headerClasses.push(isHome ? "site-header--overlay" : "site-header--solid");
  if (scrolled) headerClasses.push("is-scrolled");
  if (menuOpen) headerClasses.push("is-menu-open");

  return (
    <>
      <header className={headerClasses.join(" ")}>
        <div className="container header-inner">
          <Link className="brand" to="/" aria-label="Asset 13 LTD — Home">
            <Logo className="brand-mark" />
            <span className="brand-text">
              ASSET <span className="brand-accent">13</span>
              <span className="brand-suffix">LTD</span>
            </span>
          </Link>

          <nav className="primary-nav" aria-label="Primary">
            <ul>
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.to === "/"}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <Link className="btn btn--gold btn--sm header-cta" to="/contact">
              Enquire
            </Link>
            <button
              ref={toggleRef}
              className={`nav-toggle${menuOpen ? " is-open" : ""}`}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              {menuOpen ? (
                <X size={20} aria-hidden="true" />
              ) : (
                <Menu size={20} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        menuRef={menuRef}
        onClose={() => {
          setMenuOpen(false);
          toggleRef.current?.focus({ preventScroll: true });
        }}
      />
    </>
  );
}
