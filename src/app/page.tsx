
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { CheckCircle, ArrowRight, Sparkles, FileUp, Cpu, FileText } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-resume');
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-primary/5 rounded-bl-[100px] blur-3xl opacity-50" />
        <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-accent/10 rounded-full border border-accent/20">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">Free AI-Powered Builder</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-headline font-bold leading-tight text-foreground">
              Build your <span className="text-primary">dream career</span> with a professional resume.
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Create, edit, and download high-quality ATS-friendly resumes in under 5 minutes. Completely free, assisted by advanced AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 rounded-xl shadow-xl shadow-primary/20" asChild>
                <Link href="/builder" className="flex items-center">
                  Create Resume Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold border-2 rounded-xl" asChild>
                <Link href="/ai-generator" className="flex items-center">
                  <Cpu className="mr-2 h-5 w-5" /> AI Content Generator
                </Link>
              </Button>
            </div>
            <div className="flex items-center space-x-8 pt-4">
              <div className="flex flex-col">
                <span className="text-2xl font-bold">100%</span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest">Free Forever</span>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold">ATS</span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest">Optimized</span>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold">5 min</span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest">Setup Time</span>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary to-accent opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500" />
            <div className="relative rounded-2xl border-8 border-white shadow-2xl overflow-hidden aspect-[4/3]">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={heroImage.imageHint}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Everything you need to get hired</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our tools are designed to simplify your job application process and help you stand out from the crowd.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border bg-background hover:shadow-xl transition-all duration-300 group">
              <div className="p-3 rounded-xl bg-muted w-fit mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4">AI Smart Content</h3>
              <p className="text-muted-foreground leading-relaxed">
                Generate professional summaries and job descriptions with a single click using our advanced AI.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl border bg-background hover:shadow-xl transition-all duration-300 group">
              <div className="p-3 rounded-xl bg-muted w-fit mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">ATS-Friendly Templates</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our templates are specifically engineered to pass through Applicant Tracking Systems effortlessly.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl border bg-background hover:shadow-xl transition-all duration-300 group">
              <div className="p-3 rounded-xl bg-muted w-fit mb-6 group-hover:scale-110 transition-transform">
                <FileUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">PDF Content Extraction</h3>
              <p className="text-muted-foreground leading-relaxed">
                Upload your old PDF resume and let our AI extract all the data into our editable builder.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 opacity-10" />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10 space-y-8">
          <h2 className="text-4xl font-headline font-bold">Ready to build your next opportunity?</h2>
          <p className="text-primary-foreground/80 text-lg">
            Join thousands of students and professionals who have successfully built their resumes with Resumify.
          </p>
          <div className="flex justify-center">
            <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-bold rounded-xl" asChild>
              <Link href="/builder">Get Started for Free</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-primary" />
                <span className="text-xl font-headline font-bold text-primary">Resumify</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Helping professionals and students create job-ready resumes in minutes.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/builder" className="hover:text-primary">Resume Builder</Link></li>
                <li><Link href="/ai-generator" className="hover:text-primary">AI Content Tool</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Developed By</h4>
              <p className="text-sm text-muted-foreground">ANUNAND P.R & AKASH SUNIL</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Resumify. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
