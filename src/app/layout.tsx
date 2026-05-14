import type { Metadata } from "next";
import { Bebas_Neue, Montserrat } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Autoservicio El Morro | Frescura · Calidad · Confianza",
  description:
    "Tu autoservicio de barrio en San Luis. Variedad de productos frescos, ofertas semanales y entrega a domicilio. Abierto hasta las 11 PM.",
  openGraph: {
    title: "Autoservicio El Morro",
    description:
      "Frescura · Calidad · Confianza. Tu minisuper de barrio en San Luis.",
    type: "website",
    locale: "es_AR",
    url: "https://autoservicioelmorro.com",
    images: [
      {
        url: "https://autoservicioelmorro.com/images/tienda.jpg",
        width: 1200,
        height: 630,
        alt: "Interior de Autoservicio El Morro",
      },
    ],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "GroceryStore",
  name: "Autoservicio El Morro",
  description:
    "Autoservicio y minisuper de barrio en San Luis. Variedad de productos frescos, fiambrería, almacén y entrega a domicilio.",
  url: "https://autoservicioelmorro.com",
  telephone: "+542664444019",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Cristo Rey Mza. 464 Casa 26",
    addressLocality: "San Luis",
    postalCode: "D5700",
    addressCountry: "AR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -33.2819553,
    longitude: -66.3000769,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      closes: "23:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.2",
    reviewCount: "329",
    bestRating: "5",
  },
  sameAs: ["https://www.instagram.com/autoservicioelmorro/"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bebasNeue.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
