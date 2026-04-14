const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://itcoder.ca/#organization",
  "name": "IT CODER",
  "url": "https://itcoder.ca",
  "logo": "https://itcoder.ca/og-image.jpg",
  "image": "https://itcoder.ca/og-image.jpg",
  "description":
    "IT CODER provides expert web development, custom software solutions, and IT consulting services. Specializing in NextJS, Flutter, database management, and server setup.",
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
  "@id": "https://itcoder.ca/#website",
  "url": "https://itcoder.ca",
  "name": "IT CODER",
  "description":
    "Professional Web Development & Software Solutions",
  "publisher": {
    "@id": "https://itcoder.ca/#organization",
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
        "name": "Database Development",
        "description":
          "Stable and secure databases for quick search, accurate accounting, and automation.",
        "provider": { "@id": "https://itcoder.ca/#organization" },
        "areaServed": { "@type": "Country", "name": "Canada" },
        "serviceType": "Database Development",
      },
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Service",
        "name": "Server Configuration",
        "description":
          "Turnkey servers on Linux and Windows, including virtualization via Proxmox or VMWare.",
        "provider": { "@id": "https://itcoder.ca/#organization" },
        "areaServed": { "@type": "Country", "name": "Canada" },
        "serviceType": "IT Infrastructure",
      },
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Service",
        "name": "API Development",
        "description":
          "Flexible and powerful REST APIs based on microservices or monolithic architecture.",
        "provider": { "@id": "https://itcoder.ca/#organization" },
        "areaServed": { "@type": "Country", "name": "Canada" },
        "serviceType": "Software Development",
      },
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "Service",
        "name": "Web Development",
        "description":
          "FullStack web application development from idea to full launch with high-quality implementation.",
        "provider": { "@id": "https://itcoder.ca/#organization" },
        "areaServed": { "@type": "Country", "name": "Canada" },
        "serviceType": "Web Development",
      },
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does development cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The price depends on the complexity of the project. A simple website starts at $500. Applications start at $1,500.",
      },
    },
    {
      "@type": "Question",
      "name": "How long does the project take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It all depends on the scope and complexity of the task. Small projects can be completed in a few days, larger ones in a few weeks. After discussing the requirements, an exact timeframe will be provided.",
      },
    },
    {
      "@type": "Question",
      "name": "Are you working alone?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, working independently, but thanks to experience in team development, processes are built to ensure stable, high-quality, and timely results — just like a whole team does.",
      },
    },
    {
      "@type": "Question",
      "name": "What distinguishes your service from other companies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The service is distinguished by deep technical expertise, an individual approach to each project, and high quality implementation. Optimal architectural solutions that ensure scalability, security, and stable operation of products.",
      },
    },
    {
      "@type": "Question",
      "name": "Is it possible to modify someone else's code?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the code can be changed. It can be adapted to suit your needs, transferred to another version of the framework, or even rewritten in another programming language.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
