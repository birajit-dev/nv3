import React from 'react';

interface LocalSEOProps {
  location: string;
  targetKeywords: string[];
}

export default function LocalSEO({ location, targetKeywords }: LocalSEOProps) {
  
  // Generate location-specific content
  const generateLocationContent = (locationName: string) => {
    const locationData = {
      'Tripura': {
        cities: ['Agartala', 'Udaipur', 'Dharmanagar', 'Kailashahar', 'Belonia', 'Sabroom'],
        landmarks: ['Ujjayanta Palace', 'Neermahal Palace', 'Sepahijala Wildlife Sanctuary', 'Kamalasagar'],
        districts: ['West Tripura', 'South Tripura', 'North Tripura', 'Dhalai', 'Unakoti', 'Khowai', 'Sepahijala', 'Gomati']
      },
      'Agartala': {
        areas: ['New Capital Complex', 'Pandit Nehru Complex', 'Abhoynagar', 'Krishnanagar', 'Ramnagar'],
        landmarks: ['Ujjayanta Palace', 'Tripura State Museum', 'Heritage Park', 'Rose Valley'],
        institutions: ['Tripura University', 'Agartala Government Medical College', 'National Institute of Technology']
      }
    };

    return locationData[locationName as keyof typeof locationData] || locationData['Tripura'];
  };

  const locationInfo = generateLocationContent(location);

  return (
    <>
      {/* Hidden content for search engines - Location SEO */}
      <div className="sr-only" aria-hidden="true">
        <div>
          <h2>News from {location} - Northeast Herald Coverage</h2>
          
          <h3>Latest {location} News Updates</h3>
          <p>
            Northeast Herald provides comprehensive news coverage from {location}, bringing you 
            the latest updates on politics, government, development, and current affairs. 
            Stay informed with real-time {location} news from your trusted source.
          </p>

          {/* City-specific content for Tripura */}
          {location === 'Tripura' && (
            <>
              <h4>News from Major Cities in Tripura</h4>
              <ul>
                {'cities' in locationInfo && locationInfo.cities.map((city, index) => (
                  <li key={index}>
                    <strong>{city} News:</strong> Get latest updates from {city}, Tripura including 
                    local politics, development projects, and community events covered by Northeast Herald.
                  </li>
                ))}
              </ul>

              <h4>Tripura Districts News Coverage</h4>
              <ul>
                {'districts' in locationInfo && locationInfo.districts.map((district, index) => (
                  <li key={index}>
                    <strong>{district} District:</strong> Comprehensive coverage of {district} 
                    district news, government updates, and local developments.
                  </li>
                ))}
              </ul>

              <h4>Tourist Destinations and Landmarks</h4>
              <ul>
                {locationInfo.landmarks.map((landmark, index) => (
                  <li key={index}>
                    <strong>{landmark}:</strong> News and updates about {landmark} and its 
                    significance to Tripura tourism and culture.
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* City-specific content for Agartala */}
          {location === 'Agartala' && (
            <>
              <h4>Agartala Areas Coverage</h4>
              <ul>
                {'areas' in locationInfo && locationInfo.areas.map((area, index) => (
                  <li key={index}>
                    <strong>{area}:</strong> Local news and updates from {area}, Agartala 
                    including community events and local developments.
                  </li>
                ))}
              </ul>

              <h4>Agartala Landmarks and Institutions</h4>
              <ul>
                {locationInfo.landmarks.map((landmark, index) => (
                  <li key={index}>
                    <strong>{landmark}:</strong> News and updates about {landmark} and its 
                    role in Agartala&apos;s development and culture.
                  </li>
                ))}
              </ul>

              <h4>Educational and Government Institutions</h4>
              <ul>
                {'institutions' in locationInfo && locationInfo.institutions.map((institution, index) => (
                  <li key={index}>
                    <strong>{institution}:</strong> Latest news and updates from {institution} 
                    and its contributions to education and development.
                  </li>
                ))}
              </ul>
            </>
          )}

          <h3>Why Choose Northeast Herald for {location} News?</h3>
          <ul>
            <li>Fastest breaking news updates from {location}</li>
            <li>Comprehensive coverage of {location} politics and government</li>
            <li>Local events and community news from {location}</li>
            <li>Expert analysis of {location} current affairs</li>
            <li>Real-time updates on {location} developments</li>
            <li>Mobile-optimized news reading experience</li>
          </ul>

          <h3>{location} News Categories</h3>
          <ul>
            <li>{location} Politics and Government News</li>
            <li>{location} Development and Infrastructure Updates</li>
            <li>{location} Education and Health News</li>
            <li>{location} Sports and Entertainment</li>
            <li>{location} Business and Economy</li>
            <li>{location} Cultural and Social Events</li>
            <li>{location} Weather and Environment</li>
            <li>{location} Crime and Security Updates</li>
          </ul>
        </div>
      </div>

      {/* Visible local SEO content */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Latest {location} News
          </h2>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            Live Updates
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {targetKeywords.map((keyword, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">{keyword}</h3>
              <p className="text-sm text-gray-600">
                Stay updated with the latest {keyword.toLowerCase()} from {location}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-900 mb-2">Coverage Areas in {location}:</h4>
          <div className="flex flex-wrap gap-2">
            {location === 'Tripura' && 'cities' in locationInfo && locationInfo.cities.map((city, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                {city}
              </span>
            ))}
            {location === 'Agartala' && 'areas' in locationInfo && locationInfo.areas.map((area, index) => (
              <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// Generate local business schema
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": "Northeast Herald",
    "description": "Tripura's #1 News Source covering latest Tripura news, Agartala news, and Northeast India updates",
    "url": "https://neherald.com",
    "logo": "https://neherald.com/images/neherald_logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Agartala City Center",
      "addressLocality": "Agartala",
      "addressRegion": "Tripura",
      "postalCode": "799001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "23.8315",
      "longitude": "91.2862"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Agartala",
        "containedInPlace": {
          "@type": "State",
          "name": "Tripura"
        }
      },
      {
        "@type": "State", 
        "name": "Tripura"
      },
      {
        "@type": "Country",
        "name": "India"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "23.8315",
        "longitude": "91.2862"
      },
      "geoRadius": "200000"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Editorial",
      "email": "news@neherald.com",
      "telephone": "+91-XXX-XXXXXXX",
      "availableLanguage": ["English", "Hindi", "Bengali"]
    },
    "sameAs": [
      "https://facebook.com/northeastherald",
      "https://twitter.com/northeastherald",
      "https://youtube.com/c/northeastherald",
      "https://instagram.com/northeastherald"
    ],
    "keywords": [
      "Tripura news",
      "Agartala news",
      "Northeast Herald",
      "Tripura politics",
      "Agartala politics",
      "Tripura government",
      "Northeast India news"
    ]
  };
}
