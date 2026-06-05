import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8 mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <FileText className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-headline font-bold text-primary tracking-tight">
            Resumify
          </span>
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/builder" className="text-sm font-medium hover:text-primary transition-colors">
            Builder
          </Link>
          <Link href="/ai-generator" className="text-sm font-medium hover:text-primary transition-colors">
            AI Tool
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/builder">Create Resume</Link>
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
            <Link href="/builder">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
