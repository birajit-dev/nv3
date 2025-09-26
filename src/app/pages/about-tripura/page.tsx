import { Metadata } from 'next';
import Image from 'next/image';
import { Calendar, MapPin, Building, Flag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Tripura - History, Geography & Administration',
  description: 'Learn about Tripura state - from its merger with Indian Union in 1949 to becoming a full-fledged state in 1972. Discover its geography, districts, and tribal autonomous council.',
};

export default function AboutTripura() {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-12">
            <h1 className="text-4xl font-bold text-white mb-4">About Tripura</h1>
            <p className="text-blue-100 text-lg">
              Discover the rich history, diverse geography, and administrative structure of Tripura
            </p>
          </div>

          {/* Content */}
          <div className="px-8 py-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                The erstwhile princely State of Tripura merged with the Indian Union after independence on the 15th October, 1949 and became a Union Territory without legislature with effect from November 1, 1956 and a popular ministry was installed in Tripura on July 1, 1963. Tripura became a full-fledged State on the 21st January, 1972.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                At present, the State has 8 districts, 23 sub-divisions, 58 blocks and also one Tribal Areas Autonomous District Council (TTAADC). The TTAADC was set up in 1982 under the Seventh Schedule of the Constitution, which was then brought under the Sixth Schedule in 1985. The TTAADC covers about 2/3rd of the total area (68.10% of the territory) of the State. It covers all the eight districts and has 1/3rd population of the State.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Tripura is the 3rd smallest State of India located in the North Eastern Region; Tripura has diverse range of topography, people, flora and fauna. Tripura is a landlocked hilly state in northeastern India with altitudes varying from 15 to 940 m above sea level, though the majority of the population lives in the plains. Tripura has a tropical climate and receives considerable rainfall during the monsoons.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                It is surrounded on the north, west, and south by Bangladesh and is accessible to the rest of India through the Karimganj district of Assam and Aizwal district of Mizoram in the east. The length of its international border with Bangladesh is 856 km (84 per cent of its total border) while it shares a 53 km border with Assam and a 109 km border with Mizoram.
              </p>

              <p className="text-gray-700 leading-relaxed">
                The state extends between 22°56&apos;N and 24°32&apos;N and 90°09&apos;E and 92°10&apos;E. Its maximum stretch measures about 184 km (114 mi) from north to south and 113 km (70 mi) from east to west with an area of 10,491.69 sq km.
              </p>
            </div>

            {/* Ujjayanta Palace Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Ujjayanta Palace - The Crown Jewel of Tripura</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="rounded-lg overflow-hidden shadow-md">
                  <Image 
                    src="/images/ujjayanta-palace-front.jpg" 
                    alt="Ujjayanta Palace Front View"
                    width={400}
                    height={256}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4 bg-white">
                    <h4 className="font-semibold text-gray-900">Palace Front View</h4>
                    <p className="text-sm text-gray-600">The magnificent facade of Ujjayanta Palace</p>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <Image 
                    src="/images/ujjayanta-palace-gardens.jpg" 
                    alt="Ujjayanta Palace Gardens"
                    width={400}
                    height={256}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4 bg-white">
                    <h4 className="font-semibold text-gray-900">Palace Gardens</h4>
                    <p className="text-sm text-gray-600">Beautiful landscaped gardens surrounding the palace</p>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <Image 
                    src="/images/ujjayanta-palace-interior.jpg" 
                    alt="Ujjayanta Palace Interior"
                    width={400}
                    height={256}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4 bg-white">
                    <h4 className="font-semibold text-gray-900">Palace Interior</h4>
                    <p className="text-sm text-gray-600">Ornate interiors showcasing royal heritage</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Ujjayanta Palace, built by Maharaja Radha Kishore Manikya in 1901, stands as a testament to Tripura&apos;s royal heritage. This magnificent palace, now serving as the state museum, showcases Indo-Saracenic architecture and houses invaluable artifacts that tell the story of Tripura&apos;s rich cultural past.
              </p>
            </div>

            {/* Key Facts Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Administrative Structure</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Districts:</strong> 8</li>
                  <li><strong>Sub-divisions:</strong> 23</li>
                  <li><strong>Blocks:</strong> 58</li>
                  <li><strong>TTAADC Coverage:</strong> 68.10% of territory</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-900 mb-4">Geography</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Area:</strong> 10,491.69 sq km</li>
                  <li><strong>Altitude:</strong> 15 to 940 m above sea level</li>
                  <li><strong>Bangladesh Border:</strong> 856 km</li>
                  <li><strong>Climate:</strong> Tropical with monsoons</li>
                </ul>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Historical Timeline</h3>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400"></div>
                
                <div className="space-y-8">
                  <div className="relative flex items-start">
                    {/* Timeline Dot */}
                    <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full shadow-lg">
                      <Flag className="text-white" size={24} />
                    </div>
                    {/* Content */}
                    <div className="ml-6 bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600 flex-1">
                      <div className="flex items-center mb-2">
                        <Calendar className="text-blue-600 mr-2" size={16} />
                        <h4 className="text-lg font-bold text-gray-900">October 15, 1949</h4>
                      </div>
                      <p className="text-gray-700">Merger with Indian Union after independence - The erstwhile princely State of Tripura&apos; officially joined the Indian Union, marking the beginning of its modern political journey.</p>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    {/* Timeline Dot */}
                    <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full shadow-lg">
                      <MapPin className="text-white" size={24} />
                    </div>
                    {/* Content */}
                    <div className="ml-6 bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600 flex-1">
                      <div className="flex items-center mb-2">
                        <Calendar className="text-blue-600 mr-2" size={16} />
                        <h4 className="text-lg font-bold text-gray-900">November 1, 1956</h4>
                      </div>
                      <p className="text-gray-700">Became Union Territory without legislature - Tripura was reorganized as a Union Territory, establishing a new administrative framework under direct central government control.</p>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    {/* Timeline Dot */}
                    <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full shadow-lg">
                      <Building className="text-white" size={24} />
                    </div>
                    {/* Content */}
                    <div className="ml-6 bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600 flex-1">
                      <div className="flex items-center mb-2">
                        <Calendar className="text-blue-600 mr-2" size={16} />
                        <h4 className="text-lg font-bold text-gray-900">July 1, 1963</h4>
                      </div>
                      <p className="text-gray-700">Popular ministry installed in Tripura - Democratic governance was established with the installation of a popular ministry, giving the people of Tripura a voice in their administration.</p>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    {/* Timeline Dot */}
                    <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full shadow-lg">
                      <Flag className="text-white" size={24} />
                    </div>
                    {/* Content */}
                    <div className="ml-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg shadow-md p-6 border-l-4 border-gradient-to-b border-green-600 flex-1">
                      <div className="flex items-center mb-2">
                        <Calendar className="text-green-600 mr-2" size={16} />
                        <h4 className="text-lg font-bold text-green-900">January 21, 1972</h4>
                      </div>
                      <p className="text-gray-700 font-medium">Became a full-fledged State - Tripura achieved full statehood, gaining complete autonomy and representation in the Indian federal structure, marking the culmination of its political evolution.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
