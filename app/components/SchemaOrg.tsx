const BASE = 'https://www.itcoder.ca';

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${BASE}/#organization`,
  "name": "IT CODER",
  "url": BASE,
  "description":
    "Custom web apps, REST APIs, mobile apps, IoT devices, and embedded firmware — designed and built for your business. Based in Calgary, AB.",
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
  "sameAs": ["https://www.facebook.com/profile.php?id=61575213251739"],
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
  "description": "Custom Web, IoT & Software Development in Calgary, Canada",
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
        "name": "IoT Device & Embedded Firmware Development",
        "description":
          "End-to-end IoT development: custom PCB design, embedded firmware (C/C++), LoRa/RF protocols, and cloud integration.",
        "provider": { "@id": `${BASE}/#organization` },
        "areaServed": { "@type": "Country", "name": "Canada" },
        "serviceType": "IoT Development",
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
