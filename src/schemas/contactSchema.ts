import { z } from "zod";

const phoneRegex = /^[+\d][\d\s\-()]{6,19}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name (at least 2 characters).")
    .max(120, "Full name must not exceed 120 characters."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .regex(emailRegex, "Please enter a valid business email address.")
    .max(200, "Email must not exceed 200 characters."),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter your contact phone number.")
    .refine((val) => phoneRegex.test(val), {
      message: "Please enter a valid phone number with country/area code.",
    }),
  company: z
    .string()
    .trim()
    .min(2, "Please enter your company name.")
    .max(160, "Company name must not exceed 160 characters."),
  service: z
    .string()
    .min(1, "Please select the service you are interested in."),
  budget: z
    .string()
    .optional(),
  description: z
    .string()
    .trim()
    .min(20, "Please describe your project in at least 20 characters.")
    .max(5000, "Project description must not exceed 5000 characters."),
  additionalInfo: z
    .string()
    .trim()
    .max(2000, "Additional information must not exceed 2000 characters.")
    .optional(),
  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: "Please accept the privacy policy to continue.",
    }),
  // Honeypot field for bot protection (should remain empty)
  _honey: z
    .string()
    .optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
