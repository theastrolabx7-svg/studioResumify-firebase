"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Cpu, Sparkles, Wand2, FileText, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { generateAiResumeContent, GenerateAiResumeContentOutput } from '@/ai/flows/ai-resume-content-generator';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

export default function AiGeneratorPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateAiResumeContentOutput | null>(null);
  const [formData, setFormData] = useState({
    careerGoal: '',
    education: '',
    skills: '',
    experience: ''
  });
  const { toast } = useToast();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.careerGoal || !formData.skills) {
      toast({ title: 'Missing Information', description: 'Please provide at least a career goal and some skills.', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const output = await generateAiResumeContent(formData);
      setResult(output);
      toast({ title: 'Generation Complete', description: 'Your AI resume content is ready!' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to generate content. Please try again.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container mx-auto px-4 mt-12 max-w-5xl">
        <div className="flex flex-col items-center text-center mb-12 space-y-4">
          <div className="bg-primary/10 p-3 rounded-2xl">
            <Cpu className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-headline font-bold">AI Content Assistant</h1>
          <p className="text-muted-foreground max-w-2xl">
            Use our advanced AI to draft professional, ATS-optimized content for your resume. Simply provide basic details and let the magic happen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <Card className="shadow-lg border-none">
            <CardHeader>
              <CardTitle>Input Your Details</CardTitle>
              <CardDescription>The more info you provide, the better the results.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGenerate} className="space-y-4">
                <div className="space-y-2">
                  <Label>Career Goal / Target Role</Label>
                  <Input 
                    placeholder="e.g. Senior Frontend Developer specialized in React" 
                    value={formData.careerGoal}
                    onChange={(e) => setFormData(prev => ({ ...prev, careerGoal: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Key Skills</Label>
                  <Textarea 
                    placeholder="e.g. TypeScript, Next.js, Team Leadership, Agile" 
                    value={formData.skills}
                    onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Education Summary (Optional)</Label>
                  <Input 
                    placeholder="e.g. BS in Computer Science, MIT" 
                    value={formData.education}
                    onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Work History Snippets (Optional)</Label>
                  <Textarea 
                    placeholder="e.g. Worked at Google as SWE for 3 years, led a team of 4" 
                    value={formData.experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    className="min-h-[100px]"
                  />
                </div>
                <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl" disabled={loading}>
                  {loading ? (
                    <>
                      <Sparkles className="mr-2 h-5 w-5 animate-pulse" /> Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-5 w-5" /> Generate Professional Content
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {loading ? (
              <div className="space-y-4 p-6 border rounded-2xl bg-white shadow-lg">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-48 w-full" />
              </div>
            ) : result ? (
              <div className="space-y-6">
                <Card className="shadow-lg border-none bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" /> Professional Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed">{result.professionalSummary}</p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-none">
                  <CardHeader>
                    <CardTitle className="text-lg">Experience Bullets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2">
                      {result.experienceDescriptions.map((desc, i) => (
                        <li key={i} className="text-sm">{desc}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-none">
                  <CardHeader>
                    <CardTitle className="text-lg">Skill Highlights</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {result.skillHighlights.map((skill, i) => (
                      <div key={i} className="px-3 py-1 bg-muted rounded-full text-xs font-medium">
                        {skill}
                      </div>
                    ))}
                  </CardContent>
                </Card>
                
                <div className="p-4 bg-accent/10 border border-accent/20 rounded-xl">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-2">ATS Tips</h4>
                  <p className="text-xs text-muted-foreground italic">{result.atsOptimizationTips}</p>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-12 text-center space-y-4 opacity-50">
                <div className="bg-muted p-4 rounded-full">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="font-bold">Your generated content will appear here</h3>
                <p className="text-sm max-w-xs mx-auto">Fill in the details on the left and click generate to see AI-powered resume sections.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
