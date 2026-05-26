import {
  education,
  experience,
  profile,
  research,
  skills
} from "@/lib/content";

const printStyles = `
  @page { size: A4; margin: 14mm 16mm; }

  html, body {
    background: #ffffff !important;
    color: #111 !important;
    font-family: var(--font-geist-sans), "Calibri", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
    font-size: 10.5pt;
    line-height: 1.45;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .cv-page { max-width: 760px; margin: 0 auto; padding: 0 24px; }

  .cv-header {
    border-bottom: 2px solid #1d4ed8;
    padding-bottom: 10px;
    margin: 8px 0 14px;
  }
  .cv-name { font-size: 22pt; font-weight: 700; letter-spacing: -0.02em; line-height: 1.05; margin: 0; }
  .cv-roles {
    font-size: 10pt;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: #1d4ed8;
    margin-top: 4px;
  }
  .cv-links { margin-top: 8px; font-size: 9.5pt; color: #555; }
  .cv-links a { color: #1d4ed8; text-decoration: none; margin-right: 14px; }

  .cv-summary { color: #555; font-size: 10pt; margin: 10px 0 16px; }

  .cv-section { margin-bottom: 14px; page-break-inside: avoid; }
  .cv-section h2 {
    font-size: 9pt;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: #777;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 4px;
    margin: 0 0 8px;
    font-weight: 600;
  }

  .cv-entry { display: grid; grid-template-columns: 110px 1fr; gap: 10px; margin-bottom: 8px; page-break-inside: avoid; }
  .cv-entry .when { font-size: 9pt; color: #777; padding-top: 1px; font-family: var(--font-geist-mono), ui-monospace, monospace; }
  .cv-entry h3 { font-size: 10.5pt; font-weight: 700; margin: 0; color: #111; }
  .cv-entry .org { font-size: 9.5pt; color: #555; margin: 1px 0 2px; }
  .cv-entry p { font-size: 9.5pt; color: #555; margin: 2px 0 0; }

  .cv-thesis {
    border: 1px solid #ddd;
    border-left: 3px solid #1d4ed8;
    border-radius: 4px;
    padding: 8px 10px;
    page-break-inside: avoid;
  }
  .cv-thesis .programme { font-size: 8.5pt; color: #1d4ed8; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 700; margin: 0 0 4px; }
  .cv-thesis h3 { font-size: 11pt; font-weight: 700; margin: 0 0 4px; color: #111; }
  .cv-thesis .meta { font-size: 8.5pt; color: #777; margin: 0 0 6px; text-transform: uppercase; letter-spacing: 0.12em; }
  .cv-thesis p { font-size: 9.5pt; color: #555; margin: 4px 0; }
  .cv-thesis .heading { font-size: 8.5pt; font-weight: 700; color: #1d4ed8; text-transform: uppercase; letter-spacing: 0.12em; margin-top: 6px; }

  .cv-proj {
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 6px 10px;
    page-break-inside: avoid;
  }
  .cv-proj h3 { font-size: 10.5pt; font-weight: 700; margin: 0; }
  .cv-proj .meta { font-size: 8.5pt; color: #777; margin: 2px 0 4px; }
  .cv-proj p { font-size: 9.5pt; color: #555; margin: 4px 0; }
  .cv-proj .stack { margin-top: 4px; font-size: 8.5pt; color: #1d4ed8; }

  .cv-skills { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 18px; }
  .cv-skills div { font-size: 9.5pt; color: #555; }
  .cv-skills div strong { color: #111; font-weight: 600; }

  .cv-foot {
    margin-top: 12px;
    font-size: 8.5pt;
    color: #777;
    border-top: 1px solid #e5e5e5;
    padding-top: 6px;
  }
`;

export default function CvPrintPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />
      <div className="cv-page">
        <header className="cv-header">
          <h1 className="cv-name">{profile.name}</h1>
          <p className="cv-roles">{profile.roles.join(" · ")}</p>
          <p className="cv-links">
            <a href={profile.links.orcid}>ORCID: 0009-0008-3277-5405</a>
            <a href={profile.links.scholar}>Google Scholar</a>
            <a href={profile.links.linkedin}>LinkedIn</a>
          </p>
        </header>

        <p className="cv-summary">
          MSc candidate and Research Assistant in Construction Engineering &amp;
          Management at METU, supervised by Prof. Dr. Rıfat Sönmez. Thesis
          applies graph neural networks to BIM models to generate complete
          construction precedence schedules from a building&apos;s geometry and
          standardized activity classifications. Background in civil engineering
          (BSc, METU) with a minor in Corporate Finance and a long-running
          practice in full-stack software development and graphic design.
        </p>

        <section className="cv-section">
          <h2>Education</h2>
          {education.map((e) => (
            <div className="cv-entry" key={`${e.period}-${e.title}`}>
              <div className="when">{e.period}</div>
              <div>
                <h3>{e.title}</h3>
                <p className="org">{e.org}</p>
                <p>{e.detail}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="cv-section">
          <h2>Research</h2>
          <div className="cv-thesis">
            <p className="programme">{research.programme}</p>
            <h3>{research.title}</h3>
            <p className="meta">
              Supervisor: {research.supervisor} · {research.course} ·{" "}
              {research.presentedOn}
            </p>
            <p>{research.pitch}</p>
            {research.sections.map((s) => (
              <div key={s.label}>
                <p className="heading">{s.label}</p>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cv-section">
          <h2>Experience</h2>
          {experience.map((e) => (
            <div className="cv-entry" key={`${e.period}-${e.title}`}>
              <div className="when">{e.period}</div>
              <div>
                <h3>{e.title}</h3>
                <p className="org">{e.org}</p>
                <p>{e.detail}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="cv-section">
          <h2>Skills</h2>
          <div className="cv-skills">
            {skills.map((g) => (
              <div key={g.name}>
                <strong>{g.name}:</strong>{" "}
                {g.pills
                  .map((p) => (p.level ? `${p.label} (${p.level})` : p.label))
                  .join(", ")}
              </div>
            ))}
          </div>
        </section>

        <p className="cv-foot">
          Personal contact details (email, phone, address) are intentionally
          omitted from this CV for privacy. Please reach out through LinkedIn or
          ORCID for academic correspondence.
        </p>
      </div>
    </>
  );
}
