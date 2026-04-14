// Server Component — no 'use client'.
// Renders FAQPage JSON-LD + schema.org microdata + native <details>/<summary>
// (zero JavaScript). Answers are ≤50 words for AI featured-snippet extraction.

const faqItems = [
  {
    question: 'What is the cost of web development services in Canada?',
    answer:
      'A small business website in Canada starts at $500 CAD. Custom web applications range from $3,000 to $15,000+ depending on complexity. Hourly rates are typically $50–$150 CAD. A fixed-price quote is provided after a free initial consultation.',
  },
  {
    question: 'How to hire a web developer in Calgary or remotely across Canada?',
    answer:
      'Define your project scope and budget, then contact a local developer or IT firm. Request a portfolio, references, and a written estimate. IT CODER offers remote work across Canada with clear timelines, fixed pricing, and direct communication — no middlemen.',
  },
  {
    question: 'What is the cost of REST API development for a Canadian startup?',
    answer:
      'A basic REST API starts at $1,500 CAD. A full microservices backend with authentication, documentation, and testing costs $5,000–$12,000+. Pricing depends on the number of endpoints, integrations, and performance requirements. A scoping call is always free.',
  },
  {
    question: 'How to set up a secure server for a small business in Canada?',
    answer:
      'Choose a VPS or dedicated server (cloud or on-premise), then configure Linux, firewalls, SSL, and automated backups. A professional setup takes 1–3 days and costs $200–$800 CAD. IT CODER supports Proxmox, VMware, and major cloud providers.',
  },
  {
    question: 'How to choose the right database for a business application?',
    answer:
      'Use PostgreSQL or MySQL for structured data such as CRM or accounting. Choose MongoDB for flexible document storage. Add Redis for caching and real-time features. A database architect can review your data model and recommend the optimal solution in one day.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function ServicesFAQ() {
  return (
    <>
      {/* ── JSON-LD: FAQPage ──────────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Visual FAQ block ─────────────────────────────────────────────── */}
      <section
        aria-label="Frequently asked questions about IT services in Canada"
        style={{ marginTop: '3rem' }}
      >
        <h3 className="titlePage" style={{ marginBottom: '1.5rem' }}>
          IT Services FAQ — Canada
        </h3>

        <div
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {faqItems.map((item, index) => (
            <details
              key={index}
              className="services-faq-item"
              itemScope
              itemType="https://schema.org/Question"
            >
              <summary className="services-faq-summary" itemProp="name">
                {item.question}
              </summary>

              <div
                className="services-faq-answer"
                itemScope
                itemType="https://schema.org/Answer"
                itemProp="acceptedAnswer"
              >
                <p itemProp="text" style={{ margin: 0 }}>
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
