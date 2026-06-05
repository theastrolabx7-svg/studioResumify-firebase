'use client';

import { ResumeData } from '@/app/lib/types';
import { cn } from '@/lib/utils';

interface TemplateProps {
  data: ResumeData;
}

export default function ModernTemplate({ data }: TemplateProps) {
  const { 
    personalInfo, 
    professionalSummary, 
    education, 
    experience, 
    skills, 
    projects, 
    certifications, 
    languages,
    customization 
  } = data;

  const { shellType, colorPairing, typography, spacingDensity, borderStyle } = customization;

  // Spacing Mappings
  const spacingClass = {
    compact: 'gap-3 p-6',
    standard: 'gap-6 p-10',
    spacious: 'gap-10 p-14',
  }[spacingDensity];

  const sectionSpacing = spacingDensity === 'compact' ? 'mb-2' : spacingDensity === 'spacious' ? 'mb-6' : 'mb-4';

  // Color Mappings
  const colorMap = {
    'classic-blue': 'text-[#0f172a] border-[#2563eb]',
    'elegant-emerald': 'text-[#064e3b] border-[#10b981]',
    'royal-indigo': 'text-[#1e1b4b] border-[#6366f1]',
    'slate-gray': 'text-[#334155] border-[#64748b]',
    'midnight-gold': 'text-[#1a1a1a] border-[#d4af37]',
  }[colorPairing];

  const accentColor = {
    'classic-blue': 'bg-[#2563eb]',
    'elegant-emerald': 'bg-[#10b981]',
    'royal-indigo': 'bg-[#6366f1]',
    'slate-gray': 'bg-[#64748b]',
    'midnight-gold': 'bg-[#d4af37]',
  }[colorPairing];

  const textColor = {
    'classic-blue': 'text-[#2563eb]',
    'elegant-emerald': 'text-[#10b981]',
    'royal-indigo': 'text-[#6366f1]',
    'slate-gray': 'text-[#64748b]',
    'midnight-gold': 'text-[#d4af37]',
  }[colorPairing];

  // Typography Mappings
  const fontClass = {
    'inter-grotesk': 'font-body',
    'serif-classic': 'font-serif',
    'mono-modern': 'font-mono',
  }[typography];

  const headlineFont = {
    'inter-grotesk': 'font-headline',
    'serif-classic': 'font-serif font-bold',
    'mono-modern': 'font-mono font-bold uppercase',
  }[typography];

  // Border Shell Logic
  const shellBorderClass = {
    none: '',
    'thick-top': 'border-t-[8px]',
    'full-shell': 'border-[4px]',
    'accent-left': 'border-l-[12px]',
  }[borderStyle];

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className={cn(
      "text-xs font-bold uppercase tracking-widest border-b pb-1 mb-3",
      textColor,
      headlineFont
    )}>
      {children}
    </h2>
  );

  const ContentWrapper = () => {
    const mainContent = (
      <div className="flex-1 space-y-6">
        {/* Summary */}
        {professionalSummary && (
          <section className={sectionSpacing}>
            <SectionTitle>Professional Summary</SectionTitle>
            <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
              {professionalSummary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className={sectionSpacing}>
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-slate-800 text-sm">{exp.jobTitle}</h3>
                    <span className="text-[10px] font-medium text-slate-500 uppercase">{exp.duration}</span>
                  </div>
                  <div className={cn("text-xs font-semibold italic mb-1", textColor)}>{exp.companyName}</div>
                  <ul className="list-disc list-outside text-xs text-slate-600 space-y-1 ml-4">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className={sectionSpacing}>
            <SectionTitle>Education</SectionTitle>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{edu.institution}</h3>
                    <div className="text-xs text-slate-700">{edu.degree}</div>
                    {edu.gradeOrCGPA && <div className="text-[10px] text-slate-500 italic mt-0.5">Result: {edu.gradeOrCGPA}</div>}
                  </div>
                  <span className="text-[10px] font-medium text-slate-500">{edu.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className={sectionSpacing}>
            <SectionTitle>Projects</SectionTitle>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="font-bold text-slate-800 text-sm">{proj.projectName}</h3>
                  <p className="text-xs text-slate-600 mb-1">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );

    const sideContent = (
      <div className={cn(
        "w-1/3 space-y-6",
        shellType === 'sidebar' ? "border-l pl-6" : ""
      )}>
        {/* Skills */}
        {(skills.technicalSkills.length > 0 || skills.softSkills.length > 0) && (
          <section>
            <SectionTitle>Skills</SectionTitle>
            <div className="space-y-4">
              {skills.technicalSkills.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-2">Technical</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.technicalSkills.map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {skills.softSkills.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-2">Soft Skills</h4>
                  <ul className="text-[10px] text-slate-600 space-y-1">
                    {skills.softSkills.map((skill, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <span className={cn("w-1 h-1 rounded-full", accentColor)} />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <SectionTitle>Certifications</SectionTitle>
            <ul className="space-y-2">
              {certifications.map((cert) => (
                <li key={cert.id} className="text-xs">
                  <span className="font-semibold text-slate-800 block">{cert.certificateName}</span>
                  <span className="text-[10px] text-slate-500">{cert.organization}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );

    if (shellType === 'sidebar') {
      return (
        <div className="flex gap-10">
          {mainContent}
          {sideContent}
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {mainContent}
        <div className="grid grid-cols-2 gap-10">
          {sideContent}
        </div>
      </div>
    );
  };

  return (
    <div className={cn(
      "bg-white text-slate-900 min-h-[297mm] shadow-none print:shadow-none print:p-0 flex flex-col",
      fontClass,
      spacingClass,
      shellBorderClass,
      colorMap
    )}>
      {/* Header */}
      <header className={cn(
        "mb-6",
        shellType === 'blueprint' ? "bg-slate-50 -mx-10 px-10 py-8 border-b" : ""
      )}>
        <h1 className={cn(
          "text-4xl font-bold uppercase tracking-tighter mb-2",
          headlineFont,
          shellType === 'blueprint' ? textColor : "text-slate-900"
        )}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-medium text-slate-500">
          <span>{personalInfo.email || 'hello@resume.com'}</span>
          <span className="opacity-30">|</span>
          <span>{personalInfo.phoneNumber || '+1 000 000 000'}</span>
          <span className="opacity-30">|</span>
          <span>{personalInfo.address || 'City, Country'}</span>
        </div>
      </header>

      {/* Main Grid Content */}
      <ContentWrapper />

      {/* Blueprint Footer Accent */}
      {shellType === 'blueprint' && (
        <div className={cn("mt-auto h-1 w-24 rounded-full", accentColor)} />
      )}
    </div>
  );
}
