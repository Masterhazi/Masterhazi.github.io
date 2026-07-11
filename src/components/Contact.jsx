import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { FiMail, FiPhone, FiCopy, FiCheck, FiSend } from "react-icons/fi";
import { AiFillLinkedin } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import Footer from "./Footer";
import FadeIn from "./FadeIn";
import { isOpenToOpportunities } from "../constants";

// Wire these up in a .env.local (see .env.example) to enable in-page sending
// via EmailJS. Until then, the form falls back to opening the visitor's own
// email client with everything pre-filled — so it always works either way.
const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const EMAILJS_CONFIGURED = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

const EMAIL = "hajiafridbaba@gmail.com";
const PHONE_DISPLAY = "+91 94***786*2";
const PHONE_TEL = "+919492333649";
const LINKEDIN_URL = "https://www.linkedin.com/in/hazi-aafrid/";
const GITHUB_URL = "https://github.com/Masterhazi";

const AvailabilityBadge = () => {
  const open = isOpenToOpportunities;

  const wrapClass = open
    ? "inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-sm text-green-300"
    : "inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm text-amber-300";

  const dotClass = open ? "bg-green-400" : "bg-amber-400";

  return (
    <div className={wrapClass}>
      <span className="relative flex h-2 w-2">
        {open && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${dotClass}`} />
      </span>
      {open ? "Open to new opportunities" : "Currently busy at Tiger Analytics"}
    </div>
  );
};

const CopyableRow = ({ icon, label, value, href, external = false, copyValue }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(copyValue || value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — the link itself still works as a fallback.
      window.location.href = href;
    }
  };

  return (
    <div className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/[0.08] transition-colors duration-200 px-4 py-3">
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="flex items-center gap-3 min-w-0"
      >
        <span className="shrink-0 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-purple-300">
          {icon}
        </span>
        <span className="min-w-0">
          <span className="block text-xs text-gray-400">{label}</span>
          <span className="block text-sm sm:text-base text-white truncate">{value}</span>
        </span>
      </a>

      {!external && (
        <button
          onClick={handleCopy}
          aria-label={`Copy ${label}`}
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-200"
        >
          {copied ? <FiCheck className="text-green-400" /> : <FiCopy />}
        </button>
      )}
    </div>
  );
};

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    if (!EMAILJS_CONFIGURED) {
      const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        PUBLIC_KEY
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-xl bg-white/5 border border-white/10 focus:border-purple-400 focus:outline-none px-4 py-3 text-sm sm:text-base text-white placeholder:text-gray-500 transition-colors duration-200";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          required
          className={inputClass}
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your email"
          required
          className={inputClass}
        />
      </div>

      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="What's on your mind?"
        rows={5}
        required
        className={`${inputClass} resize-none`}
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="self-start flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-sm sm:text-base font-semibold text-white hover:opacity-90 disabled:opacity-50 transition-opacity duration-200"
      >
        <FiSend />
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>

      {status === "sent" && (
        <p className="text-sm text-green-400">Thanks — your message is on its way. I'll get back to you soon.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong sending that. Feel free to email me directly at{" "}
          <a href={`mailto:${EMAIL}`} className="underline">{EMAIL}</a>.
        </p>
      )}
      {!EMAILJS_CONFIGURED && status === "idle" && (
        <p className="text-xs text-gray-500">
          This will open your email client with the message pre-filled.
        </p>
      )}
    </form>
  );
};

const Contact = () => {
  return (
    <div className="relative z-0 bg-black w-screen min-h-screen flex flex-col text-white">
      <div className="flex-grow contact overflow-x-hidden pt-24 sm:pt-28 pb-16" id="contact">
        <div className="w-full max-w-4xl mx-auto px-6 sm:px-8">
          <FadeIn>
            <p className="font-light">REACH OUT TO ME</p>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <h2 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-pink-500">
                Contact.
              </h2>
              <AvailabilityBadge />
            </div>

            <p className="mt-6 text-gray-300 max-w-2xl">
              Have a project, a role, or just an idea worth talking through? Send a message
              below, or reach me directly through any of these.
            </p>
          </FadeIn>

          <div className="mt-10 grid lg:grid-cols-2 gap-10">
            <FadeIn delay={0.05}>
              <div className="flex flex-col gap-3">
                <CopyableRow
                  icon={<FiMail />}
                  label="Email"
                  value={EMAIL}
                  href={`mailto:${EMAIL}`}
                />

                <CopyableRow
                  icon={<FiPhone />}
                  label="Phone"
                  value={PHONE_DISPLAY}   // masked or shortened version
                  href={`tel:${PHONE_TEL}`}
                  copyValue={PHONE_TEL}   // full number for clipboard
                />

                <CopyableRow
                  icon={<AiFillLinkedin />}
                  label="LinkedIn"
                  value="linkedin.com/in/contacthazi"
                  href={LINKEDIN_URL}
                  external
                />
                <CopyableRow
                  icon={<FaGithub />}
                  label="GitHub"
                  value="github.com/Masterhazi"
                  href={GITHUB_URL}
                  external
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
                <h3 className="text-xl font-bold mb-4">Send a message</h3>
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
