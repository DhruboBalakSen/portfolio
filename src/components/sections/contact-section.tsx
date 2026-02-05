"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Github, Linkedin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlurFade from "@/components/ui/blur-fade";
import DeployButton from "@/components/ui/deploy-button";

type FormStatus = "idle" | "submitting" | "success" | "error";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const isSubmitting = formStatus === "submitting";

  useEffect(() => {
    if (formStatus === "success" || formStatus === "error") {
      statusRef.current?.focus();
    }
  }, [formStatus]);

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formStatus === "success" || formStatus === "error") {
      setFormStatus("idle");
      setFormError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("submitting");
    setFormError(null);

    if (!recaptchaSiteKey) {
      setFormStatus("error");
      setFormError("Missing reCAPTCHA site key.");
      return;
    }

    const grecaptcha = window.grecaptcha;

    if (!grecaptcha) {
      setFormStatus("error");
      setFormError("reCAPTCHA failed to load. Please refresh and try again.");
      return;
    }

    try {
      const token = await new Promise<string>((resolve, reject) => {
        grecaptcha.ready(() => {
          grecaptcha
            .execute(recaptchaSiteKey, { action: "contact_form" })
            .then(resolve)
            .catch(reject);
        });
      });

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, token })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error ?? "Unable to send message.");
      }

      setFormStatus("success");
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      setFormStatus("error");
      setFormError(message);
    }
  };

  const statusMessage =
    formStatus === "success"
      ? "Thanks! Your message is on its way."
      : formStatus === "error"
        ? formError ?? "Something went wrong."
        : "";

  return (
    <section id="contact" className="py-12 text-center space-y-8 max-w-2xl mx-auto">
      {recaptchaSiteKey ? (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
          strategy="afterInteractive"
        />
      ) : null}

      <BlurFade delay={0.2} inView>
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight">Get in Touch</h2>
          <p className="text-muted-foreground">
            I'm currently exploring new opportunities. <br />
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left" aria-busy={isSubmitting} aria-describedby="recaptcha-disclaimer">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-muted-foreground">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                disabled={isSubmitting}
                value={formData.name}
                onChange={handleFieldChange}
                className="w-full rounded-md border border-border bg-background/80 px-3 py-2 text-sm text-foreground shadow-sm outline-none transition focus-visible:border-foreground/60 focus-visible:ring-2 focus-visible:ring-foreground/20 disabled:opacity-70"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={isSubmitting}
                value={formData.email}
                onChange={handleFieldChange}
                className="w-full rounded-md border border-border bg-background/80 px-3 py-2 text-sm text-foreground shadow-sm outline-none transition focus-visible:border-foreground/60 focus-visible:ring-2 focus-visible:ring-foreground/20 disabled:opacity-70"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-medium text-muted-foreground">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              required
              disabled={isSubmitting}
              value={formData.company}
              onChange={handleFieldChange}
              className="w-full rounded-md border border-border bg-background/80 px-3 py-2 text-sm text-foreground shadow-sm outline-none transition focus-visible:border-foreground/60 focus-visible:ring-2 focus-visible:ring-foreground/20 disabled:opacity-70"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-muted-foreground">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              disabled={isSubmitting}
              value={formData.message}
              onChange={handleFieldChange}
              className="w-full resize-none rounded-md border border-border bg-background/80 px-3 py-2 text-sm text-foreground shadow-sm outline-none transition focus-visible:border-foreground/60 focus-visible:ring-2 focus-visible:ring-foreground/20 disabled:opacity-70"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto hover:scale-105 transition-transform">
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </div>

          {statusMessage ? (
            <p
              ref={statusRef}
              tabIndex={-1}
              role={formStatus === "error" ? "alert" : "status"}
              aria-live="polite"
              aria-atomic="true"
              className={`text-sm ${formStatus === "error" ? "text-red-400" : "text-emerald-500"}`}
            >
              {statusMessage}
            </p>
          ) : null}

          <p id="recaptcha-disclaimer" className="text-xs text-muted-foreground text-center">
            This site is protected by reCAPTCHA and the Google{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              Terms of Service
            </a>{" "}
            apply.
          </p>
        </form>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <div className="flex gap-4">
            <Button variant="outline" size="icon" asChild className="hover:scale-110 transition-transform">
              <a href="https://github.com/DhruboBalakSen" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild className="hover:scale-110 transition-transform">
              <a href="https://www.linkedin.com/in/dhrubo-balak-sen-39114322a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>

        <div className="text-sm text-muted-foreground pt-8">
          <div className="flex items-center justify-center gap-2">
            <Phone className="h-3 w-3" />
            <a href="tel:+916364606251" className="hover:text-foreground transition-colors">+91-6364606251</a>
          </div>
        </div>

        <div className="pt-12">
          <p className="text-xs text-muted-foreground mb-4 uppercase tracking-widest">Danger Zone</p>
          <DeployButton />
        </div>
      </BlurFade>
    </section>
  );
};

export default ContactSection;
