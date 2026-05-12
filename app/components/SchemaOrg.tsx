const BASE = 'https://www.itcoder.ca';

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${BASE}/#organization`,
  "name": "IT CODER",
  "url": BASE,
  "description":
    "Custom web apps, REST APIs, mobile apps, and automation — designed and built for your business. Based in Calgary, AB.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Calgary",
    "addressRegion": "AB",
    "addressCountry": "CA",
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-587-968-9089",
    "contactType": "customer service",
    "email": "support@itcoder.ca",
    "availableLanguage": ["English"],
  },
  "sameAs": ["https://www.facebook.com/61575213251739"],
  "priceRange": "$$",
  "areaServed": {
    "@type": "Country",
    "name": "Canada",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE}/#website`,
  "url": BASE,
  "name": "IT CODER",
  "description": "Custom Web & Software Development in Calgary, Canada",
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
        "name": "Custom Web Application Development",
        "description":
          "Full-stack web application development from idea to launch — Next.js, REST API, database, deployment.",
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
        "name": "Mobile App Development",
        "description":
          "Cross-platform mobile applications built with Flutter for iOS and Android.",
        "provider": { "@id": `${BASE}/#organization` },
        "areaServed": { "@type": "Country", "name": "Canada" },
        "serviceType": "Mobile Development",
        "url": `${BASE}/#services`,
      },
    },
    {
      "@type": "ListItem",
      "position": 4,
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
      "position": 5,
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
    </>
  );
}
