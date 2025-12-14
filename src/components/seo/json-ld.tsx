import { SCHOOL_INFO } from '@/lib/constants';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.gurunanakacademydehradun.org';

export function JsonLd() {
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        '@id': `${SITE_URL}/#organization`,
        name: SCHOOL_INFO.name,
        alternateName: ['GNA Dehradun', 'Guru Nanak Academy Dehradun'],
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo.png`,
        image: `${SITE_URL}/images/og-image.jpg`,
        description: `${SCHOOL_INFO.name} is one of the finest co-educational boarding and day-boarding schools in Dehradun, Uttarakhand. Founded in ${SCHOOL_INFO.founded}, offering quality education from Nursery to Class XII.`,
        foundingDate: String(SCHOOL_INFO.founded),
        address: {
            '@type': 'PostalAddress',
            streetAddress: SCHOOL_INFO.address.street,
            addressLocality: SCHOOL_INFO.address.city,
            addressRegion: SCHOOL_INFO.address.state,
            postalCode: SCHOOL_INFO.address.pincode,
            addressCountry: 'IN',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: SCHOOL_INFO.coordinates.lat,
            longitude: SCHOOL_INFO.coordinates.lng,
        },
        telephone: SCHOOL_INFO.phones[0].number,
        email: SCHOOL_INFO.emails[0].email,
        sameAs: [
            `https://www.instagram.com/${SCHOOL_INFO.socialMedia.instagram.replace('@', '')}`,
            `https://www.facebook.com/${SCHOOL_INFO.socialMedia.facebook}`,
        ],
        areaServed: {
            '@type': 'City',
            name: 'Dehradun',
        },
    };

    const schoolSchema = {
        '@context': 'https://schema.org',
        '@type': 'School',
        '@id': `${SITE_URL}/#school`,
        name: SCHOOL_INFO.name,
        description: 'One of the best schools in Dehradun offering CISCE curriculum with boarding and day-boarding facilities.',
        url: SITE_URL,
        telephone: SCHOOL_INFO.phones[0].number,
        address: {
            '@type': 'PostalAddress',
            streetAddress: SCHOOL_INFO.address.street,
            addressLocality: SCHOOL_INFO.address.city,
            addressRegion: SCHOOL_INFO.address.state,
            postalCode: SCHOOL_INFO.address.pincode,
            addressCountry: 'IN',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: SCHOOL_INFO.coordinates.lat,
            longitude: SCHOOL_INFO.coordinates.lng,
        },
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Academic Programs',
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'EducationalOccupationalProgram',
                        name: 'Primary Education (Nursery to Class V)',
                        educationalProgramMode: 'full-time',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'EducationalOccupationalProgram',
                        name: 'Secondary Education (Class VI to X)',
                        educationalProgramMode: 'full-time',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'EducationalOccupationalProgram',
                        name: 'Senior Secondary Education (Class XI to XII)',
                        educationalProgramMode: 'full-time',
                    },
                },
            ],
        },
    };

    const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#localbusiness`,
        name: SCHOOL_INFO.name,
        image: `${SITE_URL}/images/og-image.jpg`,
        address: {
            '@type': 'PostalAddress',
            streetAddress: SCHOOL_INFO.address.street,
            addressLocality: SCHOOL_INFO.address.city,
            addressRegion: SCHOOL_INFO.address.state,
            postalCode: SCHOOL_INFO.address.pincode,
            addressCountry: 'IN',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: SCHOOL_INFO.coordinates.lat,
            longitude: SCHOOL_INFO.coordinates.lng,
        },
        url: SITE_URL,
        telephone: SCHOOL_INFO.phones[0].number,
        priceRange: '$$',
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '07:30',
            closes: '17:00',
        },
    };

    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SCHOOL_INFO.name,
        description: 'Official website of Guru Nanak Academy, Dehradun - One of the best schools in Dehradun',
        publisher: {
            '@id': `${SITE_URL}/#organization`,
        },
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: SITE_URL,
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
        </>
    );
}
