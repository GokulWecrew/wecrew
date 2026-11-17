import type { ContactFormData } from "@/schemas/contactSchema";

export const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/support@wecrew.in";

export interface FormSubmitResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Submits contact form data to FormSubmit AJAX endpoint.
 * Destination: support@wecrew.in
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<FormSubmitResponse> {
  // Honeypot check: if bot filled this field, simulate success immediately without sending
  if (data._honey && data._honey.trim().length > 0) {
    return {
      success: true,
      message: "Form submitted successfully.",
    };
  }

  const payload = {
    name: data.fullName,
    email: data.email,
    phone: data.phone,
    company: data.company,
    service: data.service,
    budget: data.budget || "Not specified",
    message: data.description,
    additionalInfo: data.additionalInfo || "None",
    _subject: `New Business Enquiry - ${data.service} - ${data.company}`,
    _template: "table",
    _captcha: "false",
  };

  try {
    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json().catch(() => null);

    if (response.ok && (result?.success === "true" || result?.success === true)) {
      return {
        success: true,
        message: result?.message || "Your message has been sent successfully.",
      };
    }

    return {
      success: false,
      message:
        result?.message ||
        "The submission service encountered an issue. Please try again or email us directly.",
    };
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof Error
          ? err.message
          : "Network error occurred while sending your message. Please check your connection or email support@wecrew.in directly.",
    };
  }
}
