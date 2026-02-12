"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Instagram } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { Locale, Messages } from "@/lib/i18n";

interface ContactClientProps {
  locale: Locale;
  messages: Messages["contact"];
}

const CINEMATIC_EASE = [0.25, 0.1, 0.25, 1] as const;

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export default function ContactClient({ locale, messages }: ContactClientProps) {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const reduced = useReducedMotion();
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, amount: 0.15 });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Simulate sending delay, then open mailto
    setTimeout(() => {
      const subject = encodeURIComponent(
        `New project inquiry from ${formData.name}`
      );
      const body = encodeURIComponent(
        `Name: ${formData.name}\nOrganization: ${formData.organization}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:hello@hencohen.com?subject=${subject}&body=${body}`;
      setStatus("sent");
    }, 800);
  };

  const fieldConfig = [
    { key: "name" as const, type: "text", required: true },
    { key: "organization" as const, type: "text", required: false },
    { key: "email" as const, type: "email", required: true },
    { key: "message" as const, type: "textarea", required: true },
  ];

  return (
    <main className="pt-28 md:pt-36 pb-20 md:pb-28 bg-bg-primary">
      <div className="mx-auto max-w-[700px] px-6 md:px-8">
        <SectionHeading label={messages.label} title={messages.title} />
        <motion.p
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: CINEMATIC_EASE }}
          className="text-text-secondary -mt-8 mb-12"
        >
          {messages.subtitle}
        </motion.p>

        <AnimatePresence mode="wait">
          {status === "sent" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: CINEMATIC_EASE }}
              className="text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-12 h-12 rounded-full bg-[rgba(27,27,25,0.08)] flex items-center justify-center mx-auto mb-6"
              >
                <Check size={24} className="text-text-primary" />
              </motion.div>
              <p className="font-heading text-2xl text-text-primary mb-3">
                {messages.thankYou}
              </p>
              <p className="text-text-secondary">
                {messages.sent}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {fieldConfig.map((field, index) => (
                <motion.div
                  key={field.key}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: reduced ? 0.2 : 0.5,
                    delay: reduced ? 0 : 0.1 + index * 0.08,
                    ease: CINEMATIC_EASE,
                  }}
                >
                  <label
                    htmlFor={field.key}
                    className="block text-xs tracking-[0.15em] text-text-secondary mb-2"
                  >
                    {messages[field.key as keyof typeof messages]}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.key}
                      required={field.required}
                      rows={5}
                      value={formData[field.key]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.key]: e.target.value })
                      }
                      className="w-full bg-transparent px-4 py-3.5 border border-border text-text-primary placeholder:text-text-secondary/40 focus:border-text-primary focus:outline-none transition-colors duration-300 resize-none"
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.key}
                      required={field.required}
                      value={formData[field.key]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.key]: e.target.value })
                      }
                      className="w-full bg-transparent px-4 py-3.5 border border-border text-text-primary placeholder:text-text-secondary/40 focus:border-text-primary focus:outline-none transition-colors duration-300"
                    />
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: reduced ? 0.2 : 0.5,
                  delay: reduced ? 0 : 0.5,
                  ease: CINEMATIC_EASE,
                }}
              >
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-solid w-full bg-bg-dark text-text-light py-4 text-xs tracking-[0.2em] transition-colors duration-300 disabled:opacity-70 disabled:cursor-wait"
                >
                  {status === "sending" ? (
                    <span className="inline-flex items-center gap-2">
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      >
                        {locale === "he" ? "שולח..." : "Sending..."}
                      </motion.span>
                    </span>
                  ) : (
                    messages.send
                  )}
                </button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Direct contact info */}
        <ScrollReveal className="mt-16 pt-10 border-t border-border">
          <p className="text-xs tracking-[0.15em] text-text-secondary mb-4">
            {messages.directContact}
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="https://wa.me/972502727599"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              <WhatsAppIcon size={16} />
              {messages.whatsapp}
            </a>
            <a
              href="https://www.instagram.com/hen_ofir_cohen/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              <Instagram size={16} />
              {messages.instagram}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
