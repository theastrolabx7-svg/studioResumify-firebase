"use client";

import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Message Sent', description: "Thanks for reaching out! We'll get back to you soon." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-headline font-bold">Get in <span className="text-primary">touch</span></h1>
              <p className="text-lg text-muted-foreground">Have questions or feedback about Resumify? We'd love to hear from you.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">Email Us</h3>
                  <p className="text-sm text-muted-foreground">support@resumify.free</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">Call Us</h3>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">Office</h3>
                  <p className="text-sm text-muted-foreground">123 Career Blvd, Suite 400<br />San Francisco, CA 94105</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="shadow-2xl border-none rounded-3xl overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground p-8">
              <CardTitle>Send a Message</CardTitle>
              <CardDescription className="text-primary-foreground/70">Fill out the form below and we'll reply within 24 hours.</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input placeholder="Doe" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input type="email" placeholder="john@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input placeholder="How can we help?" required />
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea placeholder="Type your message here..." className="min-h-[150px]" required />
                </div>
                <Button type="submit" className="w-full h-12 text-lg font-bold rounded-xl bg-primary">
                  <Send className="mr-2 h-5 w-5" /> Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
