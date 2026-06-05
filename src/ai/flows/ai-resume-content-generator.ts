'use server';
/**
 * @fileOverview This file contains the Genkit flow for generating AI-powered resume content.
 *
 * - generateAiResumeContent - A function that generates professional resume content based on user input.
 * - GenerateAiResumeContentInput - The input type for the generateAiResumeContent function.
 * - GenerateAiResumeContentOutput - The return type for the generateAiResumeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const GenerateAiResumeContentInputSchema = z.object({
  careerGoal: z.string().describe('The user\'s career goal or objective.'),
  education: z.string().describe('Details about the user\'s education (institutions, degrees, years, grades).'),
  skills: z.string().describe('A comma-separated list of the user\'s technical and soft skills.'),
  experience: z.string().describe('Detailed descriptions of the user\'s professional experience (company, title, duration, responsibilities).'),
});
export type GenerateAiResumeContentInput = z.infer<typeof GenerateAiResumeContentInputSchema>;

// Output Schema
const GenerateAiResumeContentOutputSchema = z.object({
  professionalSummary: z.string().describe('A concise, professional summary highlighting the user\'s key qualifications and career aspirations, optimized for Applicant Tracking Systems (ATS).'),
  experienceDescriptions: z.array(z.string()).describe('A list of detailed, ATS-optimized bullet points describing responsibilities and achievements for each professional experience entry.'),
  skillHighlights: z.array(z.string()).describe('A list of key skills presented in a way that stands out and is recognized by ATS.'),
  projectDescriptions: z.array(z.string()).describe('A list of detailed, ATS-optimized descriptions for relevant projects, including technologies used and accomplishments.'),
  atsOptimizationTips: z.string().describe('General advice or observations on how the generated content is ATS-optimized, or further tips for optimization.'),
});
export type GenerateAiResumeContentOutput = z.infer<typeof GenerateAiResumeContentOutputSchema>;

// Wrapper function to call the flow
export async function generateAiResumeContent(input: GenerateAiResumeContentInput): Promise<GenerateAiResumeContentOutput> {
  return generateAiResumeContentFlow(input);
}

// Prompt definition
const generateAiResumeContentPrompt = ai.definePrompt({
  name: 'generateAiResumeContentPrompt',
  input: {schema: GenerateAiResumeContentInputSchema},
  output: {schema: GenerateAiResumeContentOutputSchema},
  prompt: `You are an expert AI-powered resume content generator. Your goal is to create highly professional and ATS-optimized resume content based on the user's input. Ensure the language is impactful, uses strong action verbs, and incorporates relevant keywords for Applicant Tracking Systems.

Based on the following information, generate the specified resume sections in a JSON format.

User's Career Goal: {{{careerGoal}}}

User's Education: {{{education}}}

User's Skills: {{{skills}}}

User's Experience: {{{experience}}}

Instructions:
1.  **Professional Summary**: Generate a 3-4 sentence professional summary.
2.  **Experience Descriptions**: For each piece of experience provided (if multiple, separate them by newline in the input), generate 3-5 bullet points describing responsibilities and quantifiable achievements. Use strong action verbs.
3.  **Skill Highlights**: Transform the provided skills into a concise, impactful list suitable for a resume's skills section, categorizing them if appropriate (e.g., Technical Skills, Soft Skills).
4.  **Project Descriptions**: If projects are implied or can be inferred from the experience/skills, generate 2-4 bullet points for each, highlighting technologies used and outcomes. If no specific project details are given, create plausible placeholder project descriptions based on career goal and skills.
5.  **ATS Optimization Tips**: Provide a brief statement or a few tips explaining how the generated content is ATS-optimized.

Ensure all output is ATS-friendly and professional.
`,
});

// Genkit Flow definition
const generateAiResumeContentFlow = ai.defineFlow(
  {
    name: 'generateAiResumeContentFlow',
    inputSchema: GenerateAiResumeContentInputSchema,
    outputSchema: GenerateAiResumeContentOutputSchema,
  },
  async (input) => {
    const {output} = await generateAiResumeContentPrompt(input);
    return output!;
  }
);
