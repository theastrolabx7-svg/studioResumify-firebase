"use client";

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle, Trash2, Download, ChevronLeft, ChevronRight, FileText, Cpu, Sparkles, Upload, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ModernTemplate from '@/components/templates/ModernTemplate';
import { ResumeData, emptyResumeData, Education, Experience } from '@/app/lib/types';
import { generateAiResumeContent } from '@/ai/flows/ai-resume-content-generator';
import { extractResumeFromPDF } from '@/ai/flows/extract-resume-from-pdf-flow';
import { useToast } from '@/hooks/use-toast';

export default function BuilderPage() {
  const [data, setData] = useState<ResumeData>(emptyResumeData);
  const [activeStep, setActiveStep] = useState(0);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    { label: 'Personal', id: 'personal' },
    { label: 'Summary', id: 'summary' },
    { label: 'Education', id: 'education' },
    { label: 'Experience', id: 'experience' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Finish', id: 'finish' },
  ];

  const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  const updatePersonalInfo = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const addEducation = () => {
    const newEdu: Education = { id: crypto.randomUUID(), institution: '', degree: '', year: '', gradeOrCGPA: '' };
    setData((prev) => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  };

  const removeEducation = (id: string) => {
    setData((prev) => ({ ...prev, education: prev.education.filter((e) => e.id !== id) }));
  };

  const addExperience = () => {
    const newExp: Experience = { id: crypto.randomUUID(), companyName: '', jobTitle: '', duration: '', responsibilities: [''] };
    setData((prev) => ({ ...prev, experience: [...prev.experience, newExp] }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  };

  const removeExperience = (id: string) => {
    setData((prev) => ({ ...prev, experience: prev.experience.filter((e) => e.id !== id) }));
  };

  const handleAiImprove = async () => {
    if (!data.personalInfo.fullName || data.experience.length === 0) {
      toast({ title: 'Need more info', description: 'Please fill in basic personal details and at least one experience to use AI.', variant: 'destructive' });
      return;
    }
    
    setIsAiLoading(true);
    try {
      const result = await generateAiResumeContent({
        careerGoal: data.professionalSummary || 'Professional role in my field',
        education: data.education.map(e => `${e.degree} at ${e.institution}`).join(', '),
        skills: data.skills.technicalSkills.join(', '),
        experience: data.experience.map(e => `${e.jobTitle} at ${e.companyName}`).join('\n')
      });
      
      setData(prev => ({
        ...prev,
        professionalSummary: result.professionalSummary,
        experience: prev.experience.map((exp, idx) => ({
          ...exp,
          responsibilities: result.experienceDescriptions.slice(idx * 3, (idx + 1) * 3)
        })),
        skills: {
          ...prev.skills,
          technicalSkills: result.skillHighlights
        }
      }));
      
      toast({ title: 'AI Content Generated', description: 'Your resume has been improved with professional AI suggestions.' });
    } catch (error) {
      toast({ title: 'AI Error', description: 'Failed to generate content. Please try again.', variant: 'destructive' });
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUri = reader.result as string;
      setIsAiLoading(true);
      try {
        const extracted = await extractResumeFromPDF({ pdfDataUri: dataUri });
        
        setData({
          personalInfo: {
            fullName: extracted.personalInformation.fullName || '',
            email: extracted.personalInformation.email || '',
            phoneNumber: extracted.personalInformation.phoneNumber || '',
            address: extracted.personalInformation.address || '',
            linkedIn: extracted.personalInformation.linkedIn,
            portfolioWebsite: extracted.personalInformation.portfolioWebsite,
          },
          professionalSummary: extracted.professionalSummary || '',
          education: (extracted.education || []).map(edu => ({ ...edu, id: crypto.randomUUID() })),
          experience: (extracted.experience || []).map(exp => ({ ...exp, id: crypto.randomUUID() })),
          skills: {
            technicalSkills: extracted.skills?.technicalSkills || [],
            softSkills: extracted.skills?.softSkills || [],
          },
          projects: (extracted.projects || []).map(p => ({ ...p, id: crypto.randomUUID() })),
          certifications: (extracted.certifications || []).map(c => ({ ...c, id: crypto.randomUUID() })),
          languages: extracted.languages || [],
        });
        
        toast({ title: 'Resume Extracted', description: 'Your data has been successfully imported from the PDF.' });
        setActiveStep(0);
      } catch (err) {
        toast({ title: 'Extraction Error', description: 'Could not extract data from this PDF.', variant: 'destructive' });
      } finally {
        setIsAiLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      <div className="no-print">
        <Navbar />
      </div>
      
      <main className="container mx-auto px-4 mt-8 flex-1 max-w-7xl no-print">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* Form Side */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-headline font-bold flex items-center gap-2">
                <FileText className="text-primary" /> Resume Builder
              </h1>
              <div className="flex gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="application/pdf"
                  onChange={handleFileUpload}
                />
                <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={isAiLoading}>
                  <Upload className="h-4 w-4 mr-2" /> Upload PDF
                </Button>
                <Button variant="outline" size="sm" onClick={handleAiImprove} disabled={isAiLoading} className="text-accent border-accent/30 hover:bg-accent/10">
                  <Sparkles className="h-4 w-4 mr-2" /> {isAiLoading ? 'Magic...' : 'AI Enhance'}
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
              {steps.map((step, idx) => (
                <div key={step.id} className="flex items-center shrink-0">
                  <button
                    onClick={() => setActiveStep(idx)}
                    className={`flex items-center justify-center h-8 w-8 rounded-full text-xs font-bold transition-all ${
                      activeStep === idx ? 'bg-primary text-white scale-110' : 
                      activeStep > idx ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {idx + 1}
                  </button>
                  <span className={`ml-2 text-xs font-medium ${activeStep === idx ? 'text-primary' : 'text-muted-foreground'}`}>
                    {step.label}
                  </span>
                  {idx < steps.length - 1 && <div className="mx-3 w-4 h-px bg-border" />}
                </div>
              ))}
            </div>

            <Card className="border-none shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                {activeStep === 0 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold">Personal Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input value={data.personalInfo.fullName} onChange={(e) => updatePersonalInfo('fullName', e.target.value)} placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input value={data.personalInfo.email} onChange={(e) => updatePersonalInfo('email', e.target.value)} placeholder="john@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input value={data.personalInfo.phoneNumber} onChange={(e) => updatePersonalInfo('phoneNumber', e.target.value)} placeholder="+1 234 567 890" />
                      </div>
                      <div className="space-y-2">
                        <Label>Address</Label>
                        <Input value={data.personalInfo.address} onChange={(e) => updatePersonalInfo('address', e.target.value)} placeholder="New York, NY" />
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold">Professional Summary</h2>
                    <Textarea 
                      value={data.professionalSummary} 
                      onChange={(e) => setData(prev => ({ ...prev, professionalSummary: e.target.value }))} 
                      placeholder="Brief introduction about your professional background and goals..."
                      className="min-h-[200px]"
                    />
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-bold">Education</h2>
                      <Button variant="outline" size="sm" onClick={addEducation}>
                        <PlusCircle className="h-4 w-4 mr-2" /> Add
                      </Button>
                    </div>
                    {data.education.map((edu) => (
                      <div key={edu.id} className="p-4 border rounded-xl relative space-y-4 bg-muted/20">
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => removeEducation(edu.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Institution</Label>
                            <Input value={edu.institution} onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label>Degree</Label>
                            <Input value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label>Year</Label>
                            <Input value={edu.year} onChange={(e) => updateEducation(edu.id, 'year', e.target.value)} placeholder="2018 - 2022" />
                          </div>
                          <div className="space-y-2">
                            <Label>Grade / CGPA</Label>
                            <Input value={edu.gradeOrCGPA} onChange={(e) => updateEducation(edu.id, 'gradeOrCGPA', e.target.value)} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-bold">Experience</h2>
                      <Button variant="outline" size="sm" onClick={addExperience}>
                        <PlusCircle className="h-4 w-4 mr-2" /> Add
                      </Button>
                    </div>
                    {data.experience.map((exp) => (
                      <div key={exp.id} className="p-4 border rounded-xl relative space-y-4 bg-muted/20">
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => removeExperience(exp.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Company Name</Label>
                            <Input value={exp.companyName} onChange={(e) => updateExperience(exp.id, 'companyName', e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label>Job Title</Label>
                            <Input value={exp.jobTitle} onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)} />
                          </div>
                          <div className="space-y-2 col-span-2">
                            <Label>Duration</Label>
                            <Input value={exp.duration} onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)} placeholder="Jan 2020 - Present" />
                          </div>
                          <div className="space-y-2 col-span-2">
                            <Label>Responsibilities (One per line)</Label>
                            <Textarea 
                              value={exp.responsibilities.join('\n')} 
                              onChange={(e) => updateExperience(exp.id, 'responsibilities', e.target.value.split('\n'))}
                              placeholder="Managed a team of 5...&#10;Increased sales by 20%..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeStep === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-bold">Skills</h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Technical Skills (Comma separated)</Label>
                        <Input 
                          value={data.skills.technicalSkills.join(', ')} 
                          onChange={(e) => setData(prev => ({ ...prev, skills: { ...prev.skills, technicalSkills: e.target.value.split(',').map(s => s.trim()) }}))}
                          placeholder="React, Next.js, TypeScript, Node.js"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Soft Skills (Comma separated)</Label>
                        <Input 
                          value={data.skills.softSkills.join(', ')} 
                          onChange={(e) => setData(prev => ({ ...prev, skills: { ...prev.skills, softSkills: e.target.value.split(',').map(s => s.trim()) }}))}
                          placeholder="Leadership, Communication, Time Management"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 5 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-bold">Projects</h2>
                      <Button variant="outline" size="sm" onClick={() => setData(prev => ({ ...prev, projects: [...prev.projects, { id: crypto.randomUUID(), projectName: '', description: '' }] }))}>
                        <PlusCircle className="h-4 w-4 mr-2" /> Add
                      </Button>
                    </div>
                    {data.projects.map((proj) => (
                      <div key={proj.id} className="p-4 border rounded-xl relative space-y-4 bg-muted/20">
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== proj.id) }))}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="space-y-2">
                          <Label>Project Name</Label>
                          <Input value={proj.projectName} onChange={(e) => setData(prev => ({ ...prev, projects: prev.projects.map(p => p.id === proj.id ? { ...p, projectName: e.target.value } : p) }))} />
                        </div>
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea value={proj.description} onChange={(e) => setData(prev => ({ ...prev, projects: prev.projects.map(p => p.id === proj.id ? { ...p, description: e.target.value } : p) }))} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeStep === 6 && (
                  <div className="space-y-6 text-center py-8">
                    <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-10 w-10 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">Resume Ready!</h2>
                    <p className="text-muted-foreground">You have successfully filled in all sections. Review your preview on the right and download your PDF.</p>
                    <div className="flex justify-center gap-4">
                      <Button size="lg" className="bg-primary" onClick={handlePrint}>
                        <Download className="mr-2 h-5 w-5" /> Download PDF
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button variant="ghost" onClick={handleBack} disabled={activeStep === 0}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  {activeStep < steps.length - 1 && (
                    <Button onClick={handleNext}>
                      Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Side */}
          <div className="hidden lg:block sticky top-24 h-[calc(100vh-120px)] overflow-y-auto pr-4 custom-scrollbar">
             <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Live Preview</h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Template: Modern</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-slate-900 border" />
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                </div>
             </div>
             
             <div className="bg-white rounded-lg shadow-2xl origin-top transition-transform duration-300 overflow-hidden">
               <ModernTemplate data={data} />
             </div>
          </div>
        </div>
      </main>

      {/* Print-only View */}
      <div className="hidden print:block print-container">
        <ModernTemplate data={data} />
      </div>
    </div>
  );
}
