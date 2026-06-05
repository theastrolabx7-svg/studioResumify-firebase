import { ResumeData } from '@/app/lib/types';

interface TemplateProps {
  data: ResumeData;
}

export default function ModernTemplate({ data }: TemplateProps) {
  const { personalInfo, professionalSummary, education, experience, skills, projects, certifications, languages } = data;

  return (
    <div className="bg-white text-slate-900 p-10 min-h-[297mm] shadow-none print:shadow-none print:p-0 flex flex-col gap-6">
      {/* Header */}
      <header className="border-b-4 border-primary pb-4">
        <h1 className="text-4xl font-headline font-bold text-slate-900 uppercase tracking-tight">
          {personalInfo.fullName || 'Full Name'}
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-slate-600">
          <span>{personalInfo.email || 'email@example.com'}</span>
          <span>•</span>
          <span>{personalInfo.phoneNumber || '+1 234 567 890'}</span>
          <span>•</span>
          <span>{personalInfo.address || 'Location'}</span>
          {personalInfo.linkedIn && (
            <>
              <span>•</span>
              <span>{personalInfo.linkedIn}</span>
            </>
          )}
        </div>
      </header>

      {/* Summary */}
      {professionalSummary && (
        <section>
          <h2 className="text-sm font-headline font-bold text-primary uppercase tracking-widest mb-2 border-b">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
            {professionalSummary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section>
          <h2 className="text-sm font-headline font-bold text-primary uppercase tracking-widest mb-3 border-b">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-800">{exp.jobTitle}</h3>
                  <span className="text-xs font-medium text-slate-500">{exp.duration}</span>
                </div>
                <div className="text-sm font-semibold text-slate-700 italic mb-1">{exp.companyName}</div>
                <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 ml-2">
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
        <section>
          <h2 className="text-sm font-headline font-bold text-primary uppercase tracking-widest mb-3 border-b">Education</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-800">{edu.institution}</h3>
                  <div className="text-sm text-slate-700">{edu.degree}</div>
                  {edu.gradeOrCGPA && <div className="text-xs text-slate-500">Result: {edu.gradeOrCGPA}</div>}
                </div>
                <span className="text-xs font-medium text-slate-500">{edu.year}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section>
          <h2 className="text-sm font-headline font-bold text-primary uppercase tracking-widest mb-3 border-b">Projects</h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="font-bold text-slate-800">{proj.projectName}</h3>
                <p className="text-sm text-slate-600 mb-1">{proj.description}</p>
                {proj.technologiesUsed && proj.technologiesUsed.length > 0 && (
                  <div className="text-xs text-slate-500 font-medium">
                    Tech: {proj.technologiesUsed.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {(skills.technicalSkills.length > 0 || skills.softSkills.length > 0) && (
        <section>
          <h2 className="text-sm font-headline font-bold text-primary uppercase tracking-widest mb-3 border-b">Skills</h2>
          <div className="grid grid-cols-1 gap-2">
            {skills.technicalSkills.length > 0 && (
              <div className="text-sm">
                <span className="font-bold text-slate-800">Technical: </span>
                <span className="text-slate-600">{skills.technicalSkills.join(', ')}</span>
              </div>
            )}
            {skills.softSkills.length > 0 && (
              <div className="text-sm">
                <span className="font-bold text-slate-800">Soft: </span>
                <span className="text-slate-600">{skills.softSkills.join(', ')}</span>
              </div>
            )}
          </div>
        </section>
      )}
      
      {/* Certifications & Languages */}
      <div className="grid grid-cols-2 gap-8">
        {certifications.length > 0 && (
          <section>
            <h2 className="text-xs font-headline font-bold text-primary uppercase tracking-widest mb-2 border-b">Certifications</h2>
            <ul className="space-y-1">
              {certifications.map((cert) => (
                <li key={cert.id} className="text-sm">
                  <span className="font-semibold text-slate-800">{cert.certificateName}</span>
                  <div className="text-xs text-slate-500">{cert.organization}</div>
                </li>
              ))}
            </ul>
          </section>
        )}
        
        {languages.length > 0 && (
          <section>
            <h2 className="text-xs font-headline font-bold text-primary uppercase tracking-widest mb-2 border-b">Languages</h2>
            <ul className="space-y-1">
              {languages.map((lang, i) => (
                <li key={i} className="text-sm">
                  <span className="font-semibold text-slate-800">{lang.language}</span>
                  {lang.proficiency && <span className="text-xs text-slate-500 ml-1">({lang.proficiency})</span>}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
