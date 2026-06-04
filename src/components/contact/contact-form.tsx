"use client";

import type { ChangeEvent, FormEvent, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { useState } from "react";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: ""
};

function FieldLabel({ children }: Readonly<{ children: string }>) {
  return <label className="mb-2 block text-sm font-medium text-white">{children}</label>;
}

function InputField(props: Readonly<InputHTMLAttributes<HTMLInputElement>>) {
  return (
    <input
      {...props}
      className={`w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400/40 focus:bg-white/[0.05] ${props.className ?? ""}`}
    />
  );
}

function TextareaField(props: Readonly<TextareaHTMLAttributes<HTMLTextAreaElement>>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400/40 focus:bg-white/[0.05] ${props.className ?? ""}`}
    />
  );
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSuccessMessage("Thanks! Your message has been received. I’ll get back to you soon.");
      setFormData(initialState);
    } catch {
      setErrorMessage("Unable to submit your message right now. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-card md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <FieldLabel>First Name</FieldLabel>
          <InputField
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
            autoComplete="given-name"
            required
          />
        </div>
        <div>
          <FieldLabel>Last Name</FieldLabel>
          <InputField
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
            autoComplete="family-name"
            required
          />
        </div>
      </div>

      <div className="mt-5">
        <FieldLabel>Email</FieldLabel>
        <InputField
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
      </div>

      <div className="mt-5">
        <FieldLabel>Subject</FieldLabel>
        <InputField
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="What would you like to build?"
          required
        />
      </div>

      <div className="mt-5">
        <FieldLabel>Message</FieldLabel>
        <TextareaField
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your project, goals, timeline, and what kind of support you need."
          rows={7}
          required
        />
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-semibold text-ink transition hover:scale-[1.02]"
        >
          {isSubmitting ? "Submitting..." : "Submit Message"}
        </button>

        {successMessage ? (
          <p className="max-w-md text-sm leading-6 text-sky-300">{successMessage}</p>
        ) : errorMessage ? (
          <p className="max-w-md text-sm leading-6 text-rose-300">{errorMessage}</p>
        ) : (
          <p className="max-w-md text-sm leading-6 text-slate-400">
            Messages are now saved to the portfolio inbox.
          </p>
        )}
      </div>
    </form>
  );
}
