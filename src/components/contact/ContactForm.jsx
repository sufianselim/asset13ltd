import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { contactPage } from "../../data/site.js";
import { siteConfig } from "../../lib/config.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^[+\d][\d\s().-]{5,24}$/;

const projectOptions = contactPage.projectOptions;

function getProjectValue(projectParam) {
  return projectOptions.some((option) => option.value === projectParam)
    ? projectParam
    : "";
}

function emptyValues(project = "") {
  return {
    name: "",
    email: "",
    phone: "",
    project,
    message: ""
  };
}

export default function ContactForm() {
  const [searchParams] = useSearchParams();
  const projectParam = searchParams.get("project") || "";
  const projectValue = getProjectValue(projectParam);
  const projectLabel = projectOptions.find(
    (option) => option.value === projectValue
  )?.label;

  const [values, setValues] = useState(() => emptyValues(projectValue));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setValues((current) => ({ ...current, project: projectValue }));
  }, [projectValue]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setStatus(null);
  };

  const validate = () => {
    const nextErrors = {};

    if (values.name.trim().length < 2) {
      nextErrors.name = "Please enter your name.";
    }

    if (!emailPattern.test(values.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (values.phone.trim() && !phonePattern.test(values.phone.trim())) {
      nextErrors.phone = "Please enter a valid phone number.";
    }

    if (values.message.trim().length < 10) {
      nextErrors.message =
        "Please tell us a little more (at least 10 characters).";
    }

    return nextErrors;
  };

  const resetForm = () => {
    setValues(emptyValues(projectValue));
    setErrors({});
  };

  const submitViaEmail = () => {
    const subject = `Website enquiry — ${values.name}`;
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone || "Not provided"}`,
      `Project: ${values.project || "General enquiry"}`,
      "",
      values.message
    ].join("\n");

    const mailto =
      `mailto:${siteConfig.contactEmail}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setStatus({
      type: "success",
      message:
        `Your email app should now open with your message ready to send. ` +
        `If it does not, please email ${siteConfig.contactEmail} directly.`
    });
    resetForm();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formData.get("company")) return;

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      window.requestAnimationFrame(() => {
        form.querySelector('[aria-invalid="true"]')?.focus();
      });
      return;
    }

    if (!siteConfig.formEndpoint) {
      submitViaEmail();
      return;
    }

    setSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch(siteConfig.formEndpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (!response.ok) throw new Error("Form submission failed");

      setStatus({
        type: "success",
        message:
          "Thank you — your enquiry has been received. We will reply as soon as possible."
      });
      resetForm();
    } catch {
      submitViaEmail();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {projectLabel && (
        <p className="form-status">Enquiry about: {projectLabel}</p>
      )}

      <form
        className="contact-form"
        action={`mailto:${siteConfig.contactEmail}`}
        method="post"
        encType="text/plain"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="form-row">
          <div className="field">
            <label htmlFor="name">
              Name <span className="req" aria-hidden="true">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              value={values.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
              aria-describedby="name-error"
              required
            />
            <span className="field-error" id="name-error" role="alert">
              {errors.name}
            </span>
          </div>

          <div className="field">
            <label htmlFor="email">
              Email <span className="req" aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby="email-error"
              required
            />
            <span className="field-error" id="email-error" role="alert">
              {errors.email}
            </span>
          </div>
        </div>

        <div className="form-row">
          <div className="field">
            <label htmlFor="phone">
              Phone <span className="muted">(optional)</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+00 000 000 0000"
              value={values.phone}
              onChange={handleChange}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby="phone-error"
            />
            <span className="field-error" id="phone-error" role="alert">
              {errors.phone}
            </span>
          </div>

          <div className="field">
            <label htmlFor="project">
              Project of interest <span className="muted">(optional)</span>
            </label>
            <select
              id="project"
              name="project"
              value={values.project}
              onChange={handleChange}
            >
              {projectOptions.map((option) => (
                <option key={option.value || "general"} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="message">
            Message <span className="req" aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell us a little about what you are looking for, your timeline, and any questions you have."
            value={values.message}
            onChange={handleChange}
            aria-invalid={Boolean(errors.message)}
            aria-describedby="message-error"
            required
          />
          <span className="field-error" id="message-error" role="alert">
            {errors.message}
          </span>
        </div>

        <div className="hp-field" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="form-foot">
          <button className="btn btn--gold" type="submit" disabled={submitting}>
            {submitting ? "Sending…" : "Send enquiry"}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <p className="form-note">
            By submitting, you agree to be contacted about your enquiry. Your
            details are used only to respond and are not shared with third
            parties.
          </p>
        </div>

        {status && (
          <div
            className={`form-status${
              status.type === "error" ? " form-status--error" : ""
            }`}
            role="status"
            aria-live="polite"
          >
            {status.message}
          </div>
        )}
      </form>
    </>
  );
}
