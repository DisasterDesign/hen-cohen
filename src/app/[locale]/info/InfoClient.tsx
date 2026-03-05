"use client";

import { useState, useRef, type FormEvent } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { Locale, Messages } from "@/lib/i18n";

interface InfoClientProps {
  locale: Locale;
  messages: Messages["info"];
}

const CINEMATIC_EASE = [0.25, 0.1, 0.25, 1] as const;

export default function InfoClient({ locale, messages }: InfoClientProps) {
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

    setTimeout(() => {
      const subject = encodeURIComponent(
        `New project inquiry from ${formData.name}`
      );
      const body = encodeURIComponent(
        `Name: ${formData.name}\nOrganization: ${formData.organization}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:chen@hencohen.com?subject=${subject}&body=${body}`;
      setStatus("sent");
    }, 800);
  };

  const fieldConfig = [
    { key: "name" as const, type: "text", required: true },
    { key: "organization" as const, type: "text", required: false },
    { key: "email" as const, type: "email", required: true },
    { key: "message" as const, type: "textarea", required: true },
  ];

  const contactDetails = [
    {
      label: messages.emailLabel,
      value: "chen@hencohen.com",
      href: "mailto:chen@hencohen.com",
    },
    {
      label: messages.phoneLabel,
      value: "+972-50-272-7599",
      href: "tel:+972502727599",
    },
    {
      label: messages.basedInLabel,
      value: messages.basedIn,
      href: null,
    },
  ];

  return (
    <main className="pt-40 md:pt-52 pb-20 md:pb-28 bg-[#0a0a0a]">
      <div className="mx-auto max-w-[900px] px-6 md:px-8">
        {/* Large heading */}
        <SectionHeading label={messages.label} title={messages.title} />

        <motion.p
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: CINEMATIC_EASE }}
          className="text-[#f0f0f0]/60 -mt-4 mb-16 text-lg"
        >
          {messages.subtitle}
        </motion.p>

        {/* Contact details */}
        <ScrollReveal className="mb-20">
          <div className="space-y-6">
            {contactDetails.map((detail) => (
              <div
                key={detail.label}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8"
              >
                <span className="text-xs tracking-[0.2em] uppercase text-[#f0f0f0]/40 w-28 shrink-0">
                  {detail.label}
                </span>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="text-[#f0f0f0] text-lg md:text-xl hover:text-[#f0f0f0]/70 transition-colors duration-300"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <span className="text-[#f0f0f0] text-lg md:text-xl">
                    {detail.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Social links */}
        <ScrollReveal className="mb-20">
          <div className="flex flex-col gap-4">
            <a
              href="https://www.instagram.com/hen_ofir_cohen/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-[0.2em] uppercase text-[#f0f0f0]/60 hover:text-[#f0f0f0] transition-colors duration-300 hover:underline underline-offset-4 w-fit"
            >
              INSTAGRAM
            </a>
            <a
              href="https://vimeo.com/hencohen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-[0.2em] uppercase text-[#f0f0f0]/60 hover:text-[#f0f0f0] transition-colors duration-300 hover:underline underline-offset-4 w-fit"
            >
              VIMEO
            </a>
          </div>
        </ScrollReveal>

        {/* Divider */}
        <div className="h-px bg-[#f0f0f0]/10 mb-16" />

        {/* Contact form */}
        <ScrollReveal>
          <h3 className="font-display text-2xl md:text-3xl text-[#f0f0f0] mb-10">
            {messages.directContact}
          </h3>
        </ScrollReveal>

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
                transition={{
                  duration: 0.4,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
                }}
                className="w-12 h-12 rounded-full bg-[#f0f0f0]/10 flex items-center justify-center mx-auto mb-6"
              >
                <Check size={24} className="text-[#f0f0f0]" />
              </motion.div>
              <p className="font-display text-2xl text-[#f0f0f0] mb-3">
                {messages.thankYou}
              </p>
              <p className="text-[#f0f0f0]/60">{messages.sent}</p>
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
                    className="block text-xs tracking-[0.15em] text-[#f0f0f0]/40 mb-2"
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
                      className="w-full bg-transparent px-4 py-3.5 border border-[#f0f0f0]/10 text-[#f0f0f0] placeholder:text-[#f0f0f0]/20 focus:border-[#f0f0f0]/40 focus:outline-none transition-colors duration-300 resize-none"
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
                      className="w-full bg-transparent px-4 py-3.5 border border-[#f0f0f0]/10 text-[#f0f0f0] placeholder:text-[#f0f0f0]/20 focus:border-[#f0f0f0]/40 focus:outline-none transition-colors duration-300"
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
                  className="w-full bg-[#f0f0f0] text-[#0a0a0a] py-4 text-xs tracking-[0.2em] uppercase transition-colors duration-300 hover:bg-[#f0f0f0]/90 disabled:opacity-70 disabled:cursor-wait"
                >
                  {status === "sending" ? (
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    >
                      {locale === "he" ? "שולח..." : "Sending..."}
                    </motion.span>
                  ) : (
                    messages.send
                  )}
                </button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Footer credits */}
        <div className="mt-24 pt-10 border-t border-[#f0f0f0]/10 text-center">
          <p className="text-xs text-[#f0f0f0]/40">{messages.copyright}</p>
          <p className="text-[10px] text-[#f0f0f0]/25 mt-3">
            {messages.credit}
          </p>
        </div>
      </div>
    </main>
  );
}
