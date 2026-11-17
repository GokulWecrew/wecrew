import { useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { buttonClass } from "@/components/ui";
import { serviceOptions, budgetOptions, site } from "@/constants/site";
import { contactSchema, type ContactFormData } from "@/schemas/contactSchema";
import { submitContactForm } from "@/services/formSubmit";

export interface ContactFormProps {
  className?: string;
}

export const ContactForm: FC<ContactFormProps> = ({ className = "" }) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      budget: "",
      description: "",
      additionalInfo: "",
      consent: false,
      _honey: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);
    const response = await submitContactForm(data);

    if (response.success) {
      setIsSuccess(true);
      reset();
    } else {
      setServerError(
        response.message ||
          "Something went wrong while sending your message. Please try again, or email us directly at support@wecrew.in."
      );
    }
  };

  if (isSuccess) {
    return (
      <div className="card flex flex-col items-center p-10 text-center" role="status">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-green-100 dark:bg-brand-green-500/10">
          <CheckCircle2 className="h-7 w-7 text-accent-green" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-xl font-semibold text-ink">
          Message received
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-body">
          Thank you for reaching out. Our team will review your inquiry and
          respond to your business email. If your need is urgent, you can also
          write to us directly at{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-semibold text-accent hover:text-accent-strong"
          >
            {site.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className="btn-outline mt-6 px-5 py-2.5 text-sm cursor-pointer rounded-lg border border-line-strong hover:border-ink hover:bg-base-soft font-semibold text-ink transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputCls = (hasError?: boolean) =>
    `mt-1.5 w-full rounded-lg border bg-base-raised px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink-faint transition-colors focus:outline-2 focus:outline-offset-1 focus:outline-brand-500 ${
      hasError ? "border-danger focus:border-danger" : "border-line-strong focus:border-brand-500"
    }`;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="card p-5 sm:p-7 md:p-9"
      aria-label="Contact inquiry form"
    >
      {/* Honeypot field for bot protection — visually hidden */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="cf-honey">Website</label>
        <input
          id="cf-honey"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("_honey")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Full Name */}
        <div>
          <label htmlFor="cf-fullName" className="text-sm font-semibold text-ink">
            Full Name<span className="text-danger"> *</span>
          </label>
          <input
            id="cf-fullName"
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "cf-fullName-error" : undefined}
            className={inputCls(!!errors.fullName)}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p
              id="cf-fullName-error"
              className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-danger"
            >
              <AlertCircle className="h-3.5 w-3.5 flex-none" aria-hidden="true" />
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Business Email */}
        <div>
          <label htmlFor="cf-email" className="text-sm font-semibold text-ink">
            Business Email<span className="text-danger"> *</span>
          </label>
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "cf-email-error" : undefined}
            className={inputCls(!!errors.email)}
            {...register("email")}
          />
          {errors.email && (
            <p
              id="cf-email-error"
              className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-danger"
            >
              <AlertCircle className="h-3.5 w-3.5 flex-none" aria-hidden="true" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label htmlFor="cf-company" className="text-sm font-semibold text-ink">
            Company Name<span className="text-danger"> *</span>
          </label>
          <input
            id="cf-company"
            type="text"
            autoComplete="organization"
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "cf-company-error" : undefined}
            className={inputCls(!!errors.company)}
            {...register("company")}
          />
          {errors.company && (
            <p
              id="cf-company-error"
              className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-danger"
            >
              <AlertCircle className="h-3.5 w-3.5 flex-none" aria-hidden="true" />
              {errors.company.message}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="cf-phone" className="text-sm font-semibold text-ink">
            Phone Number<span className="text-danger"> *</span>
          </label>
          <input
            id="cf-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91..."
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "cf-phone-error" : undefined}
            className={inputCls(!!errors.phone)}
            {...register("phone")}
          />
          {errors.phone && (
            <p
              id="cf-phone-error"
              className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-danger"
            >
              <AlertCircle className="h-3.5 w-3.5 flex-none" aria-hidden="true" />
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Service Interested In */}
        <div>
          <label htmlFor="cf-service" className="text-sm font-semibold text-ink">
            Service Interested In<span className="text-danger"> *</span>
          </label>
          <select
            id="cf-service"
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? "cf-service-error" : undefined}
            className={inputCls(!!errors.service)}
            {...register("service")}
          >
            <option value="">Select a service…</option>
            {serviceOptions.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
          {errors.service && (
            <p
              id="cf-service-error"
              className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-danger"
            >
              <AlertCircle className="h-3.5 w-3.5 flex-none" aria-hidden="true" />
              {errors.service.message}
            </p>
          )}
        </div>

        {/* Project Budget */}
        <div>
          <label htmlFor="cf-budget" className="text-sm font-semibold text-ink">
            Project Budget <span className="font-normal text-ink-faint">(optional)</span>
          </label>
          <select
            id="cf-budget"
            className={inputCls(false)}
            {...register("budget")}
          >
            <option value="">Not sure yet</option>
            {budgetOptions
              .filter((b) => b !== "Prefer not to say")
              .map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
          </select>
        </div>

        {/* Project Description */}
        <div className="sm:col-span-2">
          <label htmlFor="cf-description" className="text-sm font-semibold text-ink">
            Project Description<span className="text-danger"> *</span>
          </label>
          <textarea
            id="cf-description"
            rows={5}
            maxLength={5000}
            placeholder="Tell us about your business challenge, goals, current systems, and timeline…"
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? "cf-description-error" : undefined}
            className={inputCls(!!errors.description)}
            {...register("description")}
          />
          {errors.description && (
            <p
              id="cf-description-error"
              className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-danger"
            >
              <AlertCircle className="h-3.5 w-3.5 flex-none" aria-hidden="true" />
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Additional Information (Optional) */}
        <div className="sm:col-span-2">
          <label htmlFor="cf-additionalInfo" className="text-sm font-semibold text-ink">
            Additional Information <span className="font-normal text-ink-faint">(optional)</span>
          </label>
          <input
            id="cf-additionalInfo"
            type="text"
            placeholder="Any specific architectural preferences, deadlines, or constraints…"
            className={inputCls(false)}
            {...register("additionalInfo")}
          />
        </div>

        {/* Consent */}
        <div className="sm:col-span-2">
          <label
            htmlFor="cf-consent"
            className="flex items-start gap-3 text-sm text-ink-body cursor-pointer"
          >
            <input
              id="cf-consent"
              type="checkbox"
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "cf-consent-error" : undefined}
              className="mt-0.5 h-4 w-4 rounded border-line-strong accent-[#1668d8]"
              {...register("consent")}
            />
            <span>
              I agree that WeCrew Technologies may store and process this
              information to respond to my inquiry, as described in the{" "}
              <Link
                to="/privacy"
                className="font-semibold text-accent hover:text-accent-strong underline"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errors.consent && (
            <p
              id="cf-consent-error"
              className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-danger"
            >
              <AlertCircle className="h-3.5 w-3.5 flex-none" aria-hidden="true" />
              {errors.consent.message}
            </p>
          )}
        </div>
      </div>

      {serverError && (
        <div
          className="mt-6 rounded-lg border border-danger bg-danger-soft p-4 text-sm leading-relaxed text-danger"
          role="alert"
        >
          <strong className="font-semibold">{serverError}</strong>{" "}
          <a href={`mailto:${site.email}`} className="underline font-semibold">
            {site.email}
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`${buttonClass("primary", "lg")} mt-8 w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-8`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send Message
            <Send className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}

export default ContactForm;
