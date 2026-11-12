/* ==========================================================================
   Asset 13 LTD — interactions
   Vanilla JavaScript, no dependencies.
   ========================================================================== */
(function () {
  "use strict";

  var config = window.ASSET13_CONFIG || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(selector, context) {
    return (context || document).querySelector(selector);
  }

  function $$(selector, context) {
    return Array.prototype.slice.call((context || document).querySelectorAll(selector));
  }

  /* ----------------------------------------------------------------------
     Header scroll state
     ---------------------------------------------------------------------- */
  var header = $("[data-header]");

  if (header) {
    var updateHeader = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  /* ----------------------------------------------------------------------
     Mobile navigation
     ---------------------------------------------------------------------- */
  var navToggle = $("[data-nav-toggle]");
  var mobileMenu = $("[data-mobile-menu]");
  var pageMain = $("main");
  var pageFooter = $(".site-footer");
  var menuOpen = false;

  function setPageInert(isInert) {
    if (pageMain) pageMain.inert = isInert;
    if (pageFooter) pageFooter.inert = isInert;
  }

  function openMenu() {
    if (!navToggle || !mobileMenu) return;
    menuOpen = true;
    mobileMenu.hidden = false;
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.classList.add("is-open");
    navToggle.querySelector(".sr-only").textContent = "Close menu";
    if (header) header.classList.add("is-menu-open");
    document.body.classList.add("nav-open");
    setPageInert(true);

    window.setTimeout(function () {
      var firstLink = mobileMenu.querySelector("a");
      if (firstLink) firstLink.focus({ preventScroll: true });
    }, 60);
  }

  function closeMenu(returnFocus) {
    if (!navToggle || !mobileMenu) return;
    menuOpen = false;
    mobileMenu.hidden = true;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.classList.remove("is-open");
    navToggle.querySelector(".sr-only").textContent = "Open menu";
    if (header) header.classList.remove("is-menu-open");
    document.body.classList.remove("nav-open");
    setPageInert(false);
    if (returnFocus) navToggle.focus({ preventScroll: true });
  }

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", function () {
      if (menuOpen) closeMenu(true);
      else openMenu();
    });

    $$("a", mobileMenu).forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuOpen) closeMenu(true);
    });

    var desktopQuery = window.matchMedia("(min-width: 1081px)");
    var handleDesktop = function (event) {
      if (event.matches && menuOpen) closeMenu(false);
    };

    if (typeof desktopQuery.addEventListener === "function") {
      desktopQuery.addEventListener("change", handleDesktop);
    } else if (typeof desktopQuery.addListener === "function") {
      desktopQuery.addListener(handleDesktop);
    }
  }

  /* ----------------------------------------------------------------------
     Footer year
     ---------------------------------------------------------------------- */
  $$("[data-year]").forEach(function (element) {
    element.textContent = String(new Date().getFullYear());
  });

  /* ----------------------------------------------------------------------
     Contact details from config
     ---------------------------------------------------------------------- */
  if (config.contactEmail) {
    $$("[data-contact-email]").forEach(function (element) {
      element.textContent = config.contactEmail;
      if (element.tagName === "A") {
        element.href = "mailto:" + config.contactEmail;
      }
    });

    var contactForm = $("[data-contact-form]");
    if (contactForm) {
      contactForm.setAttribute("action", "mailto:" + config.contactEmail);
    }
  }

  /* ----------------------------------------------------------------------
     WhatsApp
     ---------------------------------------------------------------------- */
  var whatsappNumber = String(config.whatsappNumber || "").replace(/[^\d]/g, "");

  if (whatsappNumber.length >= 8) {
    var whatsappMessage = encodeURIComponent(
      config.whatsappMessage || "Hello Asset 13, I would like to make an enquiry."
    );
    var whatsappUrl = "https://wa.me/" + whatsappNumber + "?text=" + whatsappMessage;

    $$("[data-whatsapp-link]").forEach(function (element) {
      element.href = whatsappUrl;
      element.target = "_blank";
      element.rel = "noopener noreferrer";
      element.hidden = false;
    });

    $$("[data-whatsapp-item]").forEach(function (element) {
      element.hidden = false;
    });
  } else {
    $$("[data-whatsapp-link]").forEach(function (element) {
      element.hidden = true;
    });

    $$("[data-whatsapp-item]").forEach(function (element) {
      element.hidden = true;
    });
  }

  /* ----------------------------------------------------------------------
     Social links
     ---------------------------------------------------------------------- */
  var socialWrap = $("[data-social-links]");

  if (socialWrap) {
    var socialIcons = {
      instagram:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/></svg>',
      facebook:
        '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.1H7.7v3h2.6V21h3.2z"/></svg>',
      linkedin:
        '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.2 8.4H3.1V21h3.1V8.4zM4.6 3a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zM21 21v-7c0-3.5-1.9-5.1-4.4-5.1-2 0-2.9 1.1-3.4 1.9V8.4H10V21h3.1v-7c0-1.8.8-2.8 2.2-2.8 1.3 0 2.1.9 2.1 2.8v7H21z"/></svg>'
    };

    var socialLabels = {
      instagram: "Instagram",
      facebook: "Facebook",
      linkedin: "LinkedIn"
    };

    var socialLinks = config.social || {};

    Object.keys(socialLinks).forEach(function (key) {
      if (!socialLinks[key] || !socialIcons[key]) return;

      var anchor = document.createElement("a");
      anchor.className = "social-link";
      anchor.href = socialLinks[key];
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      anchor.setAttribute("aria-label", "Asset 13 LTD on " + socialLabels[key]);
      anchor.innerHTML = socialIcons[key];
      socialWrap.appendChild(anchor);
    });

    if (!socialWrap.children.length) socialWrap.hidden = true;
  }

  /* ----------------------------------------------------------------------
     Google Maps
     ---------------------------------------------------------------------- */
  var mapShell = $("[data-map]");

  if (mapShell) {
    var mapQuery = config.mapQuery || mapShell.getAttribute("data-map-query");

    if (mapQuery) {
      var iframe = document.createElement("iframe");
      iframe.src =
        "https://www.google.com/maps?q=" + encodeURIComponent(mapQuery) + "&output=embed";
      iframe.title = "Map showing the Asset 13 LTD office location";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.setAttribute("allowfullscreen", "");
      mapShell.innerHTML = "";
      mapShell.appendChild(iframe);
    }
  }

  /* ----------------------------------------------------------------------
     Scroll reveals
     ---------------------------------------------------------------------- */
  var revealElements = $$(".reveal");
  var revealObserver = null;

  if (revealElements.length) {
    if (!reduceMotion && "IntersectionObserver" in window) {
      revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
      );

      revealElements.forEach(function (element) {
        revealObserver.observe(element);
      });
    } else {
      revealElements.forEach(function (element) {
        element.classList.add("is-visible");
      });
    }

    var revealInViewport = function () {
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      revealElements.forEach(function (element) {
        if (element.classList.contains("is-visible")) return;

        var rect = element.getBoundingClientRect();
        var withinView =
          rect.top < viewportHeight * 1.05 && rect.bottom > -viewportHeight * 0.05;

        if (withinView) {
          element.classList.add("is-visible");
          if (revealObserver) revealObserver.unobserve(element);
        }
      });
    };

    window.addEventListener("load", function () {
      window.setTimeout(revealInViewport, 250);
    });

    window.addEventListener("hashchange", function () {
      window.setTimeout(revealInViewport, 80);
    });
  }

  $$("[data-stagger]").forEach(function (group) {
    $$(".reveal", group).forEach(function (element, index) {
      element.style.setProperty("--reveal-delay", (index * 0.08).toFixed(2) + "s");
    });
  });

  /* ----------------------------------------------------------------------
     Project filtering
     ---------------------------------------------------------------------- */
  var filterButtons = $$("[data-filter]");

  if (filterButtons.length) {
    var projectCards = $$("[data-project-card]");
    var projectEmpty = $("[data-project-empty]");

    var applyFilter = function (value) {
      var visibleCount = 0;

      projectCards.forEach(function (card) {
        var matches =
          value === "all" || card.getAttribute("data-status") === value;
        card.hidden = !matches;
        if (matches) visibleCount += 1;
      });

      if (projectEmpty) projectEmpty.hidden = visibleCount !== 0;
    };

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        filterButtons.forEach(function (item) {
          item.setAttribute("aria-pressed", String(item === button));
        });
        applyFilter(button.getAttribute("data-filter"));
      });
    });
  }

  /* ----------------------------------------------------------------------
     Gallery lightbox
     ---------------------------------------------------------------------- */
  var galleryButtons = $$("[data-lightbox]");
  var lightbox = $("[data-lightbox-dialog]");

  if (galleryButtons.length && lightbox) {
    var lightboxImage = $("[data-lightbox-img]", lightbox);
    var lightboxCaption = $("[data-lightbox-caption]", lightbox);
    var lightboxClose = $("[data-lightbox-close]", lightbox);
    var lightboxPrev = $("[data-lightbox-prev]", lightbox);
    var lightboxNext = $("[data-lightbox-next]", lightbox);
    var galleryItems = galleryButtons.map(function (button) {
      var image = button.querySelector("img");
      return {
        src: button.getAttribute("data-full") || (image ? image.src : ""),
        caption: button.getAttribute("data-caption") || (image ? image.alt : "")
      };
    });
    var activeIndex = 0;

    var showImage = function (index) {
      activeIndex = (index + galleryItems.length) % galleryItems.length;
      var item = galleryItems[activeIndex];
      lightboxImage.src = item.src;
      lightboxImage.alt = item.caption;
      lightboxCaption.textContent = item.caption;
    };

    var openLightbox = function (index) {
      showImage(index);
      if (typeof lightbox.showModal === "function") {
        lightbox.showModal();
      } else {
        lightbox.setAttribute("open", "");
      }
      lightboxClose.focus();
    };

    galleryButtons.forEach(function (button, index) {
      button.addEventListener("click", function () {
        openLightbox(index);
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener("click", function () {
        lightbox.close();
      });
    }

    if (lightboxPrev) {
      lightboxPrev.addEventListener("click", function () {
        showImage(activeIndex - 1);
      });
    }

    if (lightboxNext) {
      lightboxNext.addEventListener("click", function () {
        showImage(activeIndex + 1);
      });
    }

    lightbox.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") showImage(activeIndex - 1);
      if (event.key === "ArrowRight") showImage(activeIndex + 1);
    });

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) lightbox.close();
    });
  }

  /* ----------------------------------------------------------------------
     Contact form
     ---------------------------------------------------------------------- */
  var form = $("[data-contact-form]");

  if (form) {
    var statusBox = $("[data-form-status]", form);
    var submitButton = form.querySelector('button[type="submit"]');
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var phonePattern = /^[+\d][\d\s().-]{5,24}$/;

    var setError = function (name, message) {
      var errorElement = form.querySelector('[data-error-for="' + name + '"]');
      var input = form.elements[name];

      if (errorElement) errorElement.textContent = message;
      if (input) {
        if (message) input.setAttribute("aria-invalid", "true");
        else input.removeAttribute("aria-invalid");
      }
    };

    var showStatus = function (message, isError) {
      if (!statusBox) return;
      statusBox.textContent = message;
      statusBox.hidden = false;
      statusBox.classList.toggle("form-status--error", Boolean(isError));
    };

    var validate = function () {
      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var phone = form.elements.phone.value.trim();
      var message = form.elements.message.value.trim();
      var valid = true;

      setError("name", "");
      setError("email", "");
      setError("phone", "");
      setError("message", "");

      if (name.length < 2) {
        setError("name", "Please enter your name.");
        valid = false;
      }

      if (!emailPattern.test(email)) {
        setError("email", "Please enter a valid email address.");
        valid = false;
      }

      if (phone && !phonePattern.test(phone)) {
        setError("phone", "Please enter a valid phone number.");
        valid = false;
      }

      if (message.length < 10) {
        setError("message", "Please tell us a little more (at least 10 characters).");
        valid = false;
      }

      return valid;
    };

    var updateProjectContext = function () {
      var params = new URLSearchParams(window.location.search);
      var project = params.get("project");
      var projectField = form.elements.project;
      var context = $("[data-project-context]");

      if (!project) return;

      if (projectField) projectField.value = project;

      if (context) {
        var readable = project
          .replace(/-/g, " ")
          .replace(/\b\w/g, function (letter) {
            return letter.toUpperCase();
          });
        context.textContent = "Enquiry about: " + readable;
        context.hidden = false;
      }
    };

    updateProjectContext();

    form.addEventListener("input", function (event) {
      if (event.target.name) {
        setError(event.target.name, "");
        if (statusBox) statusBox.hidden = true;
      }
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!validate()) {
        var firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var honeypot = form.elements.company;
      if (honeypot && honeypot.value) return;

      var data = new FormData(form);
      var name = String(data.get("name") || "").trim();
      var email = String(data.get("email") || "").trim();
      var phone = String(data.get("phone") || "").trim();
      var message = String(data.get("message") || "").trim();
      var project = String(data.get("project") || "").trim();
      var endpoint = String(config.formEndpoint || "").trim();

      var mailtoFallback = function () {
        var subject = "Website enquiry — " + name;
        var bodyLines = [
          "Name: " + name,
          "Email: " + email,
          "Phone: " + (phone || "Not provided"),
          "Project: " + (project || "General enquiry"),
          "",
          message
        ];
        var mailto =
          "mailto:" +
          (config.contactEmail || "info@asset13.com") +
          "?subject=" +
          encodeURIComponent(subject) +
          "&body=" +
          encodeURIComponent(bodyLines.join("\n"));

        window.location.href = mailto;
        showStatus(
          "Your email app should now open with your message ready to send. If it does not, please email " +
            (config.contactEmail || "info@asset13.com") +
            " directly.",
          false
        );
        form.reset();
        updateProjectContext();
      };

      if (!endpoint) {
        mailtoFallback();
        return;
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.setAttribute("data-loading", "true");
      }

      fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (!response.ok) throw new Error("Form submission failed");
          showStatus(
            "Thank you — your enquiry has been received. We will reply as soon as possible.",
            false
          );
          form.reset();
          updateProjectContext();
        })
        .catch(function () {
          mailtoFallback();
        })
        .finally(function () {
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.removeAttribute("data-loading");
          }
        });
    });
  }
})();
