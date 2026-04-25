"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "送信に失敗しました");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setErrorMessage("送信に失敗しました。時間をおいて再度お試しください。");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="py-16 text-center">
        <p className="text-white text-lg font-light tracking-wide mb-2">
          お問い合わせを受け付けました
        </p>
        <p className="text-sm text-primary-500">
          3営業日以内にご返信いたします。
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 text-xs text-primary-500 hover:text-white transition-colors tracking-wider uppercase"
        >
          新しいお問い合わせ →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <Field label="お名前" required>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="住友 紀人"
            className={inputClass}
          />
        </Field>
        <Field label="メールアドレス" required>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="example@email.com"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="件名" required>
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          required
          placeholder="ご依頼・ご質問など"
          className={inputClass}
        />
      </Field>

      <Field label="メッセージ" required>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={8}
          placeholder="お問い合わせ内容をご記入ください"
          className={`${inputClass} resize-none`}
        />
      </Field>

      {status === "error" && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-12 py-4 border border-white/20 text-white text-sm tracking-wider uppercase hover:bg-white hover:text-primary-950 transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "送信中..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.15em] text-primary-500 mb-3">
        {label}
        {required && <span className="ml-1 text-primary-600">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full bg-transparent border-b border-white/20 text-white placeholder-primary-700 py-3 text-sm focus:outline-none focus:border-white/60 transition-colors";
