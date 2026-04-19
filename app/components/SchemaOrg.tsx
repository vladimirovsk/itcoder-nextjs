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
