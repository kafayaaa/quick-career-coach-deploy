import { z } from "zod";

// Interface TS
export interface AICVData {
  name: string | null;
  email: string | null;
  phone: string | null;
  address?: string | null;
  bio?: string | null;
  headline: string | null;
  education: string[];
  experience: string[];
  hardSkills: string[];
  softSkills: string[];
  languages: string[];
  tools: string[];
  projects: string[];
  achievements: string[];
  certifications: string[];
  links: string[];
}

// Zod schema untuk validasi
export const AICVDataSchema = z.object({
  name: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  address: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  headline: z.string().nullable(),
  education: z.array(z.string()),
  experience: z.array(z.string()),
  hardSkills: z.array(z.string()),
  softSkills: z.array(z.string()),
  languages: z.array(z.string()),
  tools: z.array(z.string()),
  projects: z.array(z.string()),
  achievements: z.array(z.string()),
  certifications: z.array(z.string()),
  links: z.array(z.string()),
});
