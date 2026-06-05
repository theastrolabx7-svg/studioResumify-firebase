import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Github, Linkedin, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-20 max-w-4xl">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-headline font-bold">About <span className="text-primary">Resumify</span></h1>
            <p className="text-xl text-muted-foreground">The journey to your dream job starts with a single, professional page.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-headline font-bold">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                Resumify was born out of a simple observation: high-quality resume builders are often hidden behind expensive subscriptions or confusing paywalls. We believe that professional tools for career advancement should be accessible to everyone, regardless of their financial situation.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By leveraging modern AI technologies, we aim to level the playing field, helping freshers, students, and experienced professionals present their best selves to potential employers.
              </p>
            </div>
            <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <FileText className="h-40 w-40 text-primary" />
               </div>
               <div className="relative z-10 space-y-4">
                 <div className="bg-white p-3 rounded-xl w-fit shadow-sm">
                    <Users className="h-6 w-6 text-primary" />
                 </div>
                 <h3 className="text-2xl font-bold">Developer Team</h3>
                 <p className="text-sm font-medium">Developed with passion by:</p>
                 <div className="space-y-2">
                   <div className="flex items-center space-x-2">
                     <div className="w-8 h-8 rounded-full bg-slate-200" />
                     <span className="font-bold">ANUNAND P.R</span>
                   </div>
                   <div className="flex items-center space-x-2">
                     <div className="w-8 h-8 rounded-full bg-slate-200" />
                     <span className="font-bold">AKASH SUNIL</span>
                   </div>
                 </div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { label: 'Users Helped', value: '10K+' },
              { label: 'Resumes Created', value: '25K+' },
              { label: 'Success Rate', value: '98%' },
            ].map((stat, i) => (
              <Card key={i} className="text-center p-8 bg-white shadow-lg border-none">
                <CardContent className="p-0 space-y-2">
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
