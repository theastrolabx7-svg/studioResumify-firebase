'use server';
/**
 * @fileOverview A Genkit flow for extracting structured resume information from an uploaded PDF.
 *
 * - extractResumeFromPDF - A function that handles the extraction process.
 * - ExtractResumeFromPDFInput - The input type for the extractResumeFromPDF function.
 * - ExtractResumeFromPDFOutput - The return type for the extractResumeFromPDF function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ExtractResumeFromPDFInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A resume PDF, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractResumeFromPDFInput = z.infer<typeof ExtractResumeFromPDFInputSchema>;

const PersonalInformationSchema = z.object({
  fullName: z.string().describe('The full name of the resume owner.'),
  email: z.string().email().describe('The email address of the resume owner.'),
  phoneNumber: z.string().describe('The phone number of the resume owner.'),
  address: z.string().describe('The address of the resume owner.'),
  linkedIn: z.string().url().optional().describe('The LinkedIn profile URL.'),
  portfolioWebsite: z.string().url().optional().describe('The personal portfolio website URL.'),
});

const EducationEntrySchema = z.object({
  institution: z.string().describe('The name of the educational institution.'),
  degree: z.string().describe('The degree or qualification obtained.'),
  year: z.string().describe('The year of graduation or completion (e.g., "2020" or "Aug 2020").'),
  gradeOrCGPA: z.string().optional().describe('The grade or CGPA obtained (e.g., "3.8/4.0" or "First Class Honours").'),
});

const ExperienceEntrySchema = z.object({
  companyName: z.string().describe('The name of the company.'),
  jobTitle: z.string().describe('The job title held.'),
  duration: z.string().describe('The duration of employment (e.g., "Jan 2020 - Dec 2022" or "Jan 2020 - Present").'),
  responsibilities: z.array(z.string()).describe('A list of key responsibilities and achievements, as bullet points.'),
});

const SkillSetSchema = z.object({
  technicalSkills: z.array(z.string()).describe('A list of technical skills (e.g., programming languages, software, tools).'),
  softSkills: z.array(z.string()).describe('A list of soft skills (e.g., communication, teamwork, problem-solving).'),
});

const ProjectEntrySchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  description: z.string().describe('A brief description of the project and your role.'),
  technologiesUsed: z.array(z.string()).optional().describe('A list of technologies used in the project.'),
});

const CertificationEntrySchema = z.object({
  certificateName: z.string().describe('The name of the certification.'),
  organization: z.string().describe('The organization that issued the certification.'),
});

const LanguageEntrySchema = z.object({
  language: z.string().describe('The language spoken (e.g., "English", "Spanish").'),
  proficiency: z.string().optional().describe('The proficiency level (e.g., "Native", "Fluent", "Conversational").'),
});

const ExtractResumeFromPDFOutputSchema = z.object({
  personalInformation: PersonalInformationSchema.describe('Extracted personal contact and identification details.'),
  professionalSummary: z.string().optional().describe('A concise professional summary or objective statement.'),
  education: z.array(EducationEntrySchema).optional().describe('A list of educational background entries.'),
  experience: z.array(ExperienceEntrySchema).optional().describe('A list of work experience entries.'),
  skills: SkillSetSchema.optional().describe('Categorized technical and soft skills.'),
  projects: z.array(ProjectEntrySchema).optional().describe('A list of significant projects.'),
  certifications: z.array(CertificationEntrySchema).optional().describe('A list of professional certifications.'),
  languages: z.array(LanguageEntrySchema).optional().describe('A list of spoken languages and their proficiency.'),
});
export type ExtractResumeFromPDFOutput = z.infer<typeof ExtractResumeFromPDFOutputSchema>;

export async function extractResumeFromPDF(input: ExtractResumeFromPDFInput): Promise<ExtractResumeFromPDFOutput> {
  return extractResumeFromPDFFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractResumeFromPDFPrompt',
  input: { schema: ExtractResumeFromPDFInputSchema },
  output: { schema: ExtractResumeFromPDFOutputSchema },
  prompt: `You are an expert resume parser. Your task is to accurately extract information from the provided PDF resume and structure it into a JSON object that strictly adheres to the given schema.

Carefully read the entire resume document. For each section, identify the relevant details and map them to the corresponding fields in the output schema.

Pay close attention to:
- Full name, email, phone number, address, LinkedIn, and portfolio website for personal information.
- Professional summary or objective statement.
- Educational institutions, degrees, years, and grades/CGPA.
- Company names, job titles, employment durations, and detailed responsibilities for work experience. Summarize responsibilities concisely if needed, focusing on achievements and impact.
- Technical and soft skills.
- Project names, descriptions, and technologies used.
- Certification names and issuing organizations.
- Languages spoken and proficiency levels.

If a section or field is not present in the resume, omit it from the output or set it to an empty array/string as appropriate for its type (e.g., optional fields can be omitted). Do not hallucinate or invent information not explicitly found in the resume. Ensure the output is a valid JSON object.

Resume Content:
{{media url=pdfDataUri}}`,
});

const extractResumeFromPDFFlow = ai.defineFlow(
  {
    name: 'extractResumeFromPDFFlow',
    inputSchema: ExtractResumeFromPDFInputSchema,
    outputSchema: ExtractResumeFromPDFOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to extract resume information. Output was null.');
    }
    return output;
  }
);
