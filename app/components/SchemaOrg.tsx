const BASE = 'https://www.itcoder.ca';

// ProfessionalService is a subtype of LocalBusiness; the extra "LocalBusiness"
// type makes the local-SEO intent explicit for crawlers. Enriched with geo,
// service area and opening hours so Google treats this as a full local entity.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  "@id": `${BASE}/#organization`,
  "name": "IT CODER",
  "url": BASE,
  "image": `${BASE}/imageLogo.png`,
  "logo": `${BASE}/imageLogo.png`,
  "description":
    "NestJS microservices, REST APIs, AI/LLM integrations, payment systems, and fintech backends — designed and built for SaaS, fintech and crypto products. Based in Calgary, AB.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Calgary",
    "addressRegion": "AB",
    "addressCountry": "CA",
  },
  // City-level coordinates (downtown Calgary) — a local signal without
  // exposing a private home address.
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.0447,
    "longitude": -114.0719,
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-587-968-9089",
    "contactType": "customer service",
    "email": "support@itcoder.ca",
    "availableLanguage": ["English"],
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00",
  },
  "sameAs": ["https://www.facebook.com/profile.php?id=61575213251739"],
  "priceRange": "$$",
  "areaServed": [
    { "@type": "City", "name": "Calgary" },
    { "@type": "AdministrativeArea", "name": "Alberta" },
    { "@type": "Country", "name": "Canada" },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE}/#website`,
  "url": BASE,
  "name": "IT CODER",
  "description": "Backend & AI Development — NestJS Microservices, APIs, Fintech & LLM Integrations in Calgary, Canada",
  "publisher": {
    "@id": `${BASE}/#organization`,
  },
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "IT CODER Services",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Service",
        "name": "Backend & API Development",
        "description":
          "NestJS microservices, REST and GraphQL APIs, event-driven architecture — built for scale from day one.",
        "provider": { "@id": `${BASE}/#organization` },
        "areaServed": { "@type": "Country", "name": "Canada" },
        "serviceType": "Web Development",
        "url": `${BASE}/#services`,
      },
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Service",
        "name": "REST API & Backend Development",
        "description":
          "Flexible and powerful REST APIs based on microservices or monolithic architecture using NestJS.",
        "provider": { "@id": `${BASE}/#organization` },
        "areaServed": { "@type": "Country", "name": "Canada" },
        "serviceType": "Software Development",
        "url": `${BASE}/#services`,
      },
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Service",
        "name": "AI / LLM Integration",
        "description":
          "Connect your product to Claude, GPT-4, or local LLMs (Ollama). Prompt engineering, RAG pipelines, structured output, and production-ready deployment.",
        "provider": { "@id": `${BASE}/#organization` },
        "areaServed": { "@type": "Country", "name": "Canada" },
        "serviceType": "AI Development",
        "url": `${BASE}/#services`,
      },
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "Service",
        "name": "Payment & Fintech Systems",
        "description":
          "Stripe, PayPal, crypto payments, and proprietary payment protocols. Billing engines, subscription management, and PCI-compliant API integrations.",
        "provider": { "@id": `${BASE}/#organization` },
        "areaServed": { "@type": "Country", "name": "Canada" },
        "serviceType": "Fintech Development",
        "url": `${BASE}/#services`,
      },
    },
    {
      "@type": "ListItem",
      "position": 5,
      "item": {
        "@type": "Service",
        "name": "Database Development",
        "description":
          "Stable and secure databases for quick search, accurate accounting, and automation.",
        "provider": { "@id": `${BASE}/#organization` },
        "areaServed": { "@type": "Country", "name": "Canada" },
        "serviceType": "Database Development",
        "url": `${BASE}/#services`,
      },
    },
    {
      "@type": "ListItem",
      "position": 6,
      "item": {
        "@type": "Service",
        "name": "Project Builder — Online Project Configurator",
        "description":
          "Describe your project requirements in 3 steps and receive a detailed development plan within 24 hours.",
        "provider": { "@id": `${BASE}/#organization` },
        "areaServed": { "@type": "Country", "name": "Canada" },
        "serviceType": "IT Consulting",
        "url": `${BASE}/#project-builder`,
      },
    },
  ],
};

const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "IT CODER — Products Portfolio",
  "description": "Real products designed and built by IT CODER from concept to production",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": "WildLink",
        "description": "LoRa-based mesh tracking device and platform for hikers and families in the Canadian Rockies. Works without cell coverage — real-time group location sharing over a proprietary radio mesh network. Includes custom PCB design, embedded firmware, consumer landing page, and Angular CRM dashboard.",
        "url": "https://www.wildlink.ca/",
        "applicationCategory": "NavigationApplication",
        "operatingSystem": "Web, Embedded",
        "author": { "@id": `${BASE}/#organization` },
        "offers": { "@type": "Offer", "availability": "https://schema.org/InStock" },
      },
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "SoftwareApplication",
        "name": "SoloBook",
        "description": "T2125 bookkeeping and invoicing SaaS for Canadian self-employed contractors. Automatically categorizes expenses by CRA T2125 fields, generates professional invoices, and produces tax-ready annual reports. Multilingual: EN, FR, UK, RU.",
        "url": "https://www.solobook.ca/",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "author": { "@id": `${BASE}/#organization` },
        "offers": { "@type": "Offer", "availability": "https://schema.org/InStock" },
      },
    },
  ],
};


export default function SchemaOrg() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
    </>
  );
}
