import { Metadata } from 'next';
import { MapPin, Users, Eye, Heart, Camera, Globe, Mail, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - Northeast Herald | Premier News Source for Northeast India',
  description: 'Learn about Northeast Herald, your trusted source for comprehensive news coverage of Northeast India. Based in Agartala, Tripura, we bring authentic stories, cultural insights, and breaking news from the vibrant Northeast region.',
  keywords: 'Northeast Herald, about us, Northeast India news, Tripura news, Agartala news, Northeast journalism, Indian regional news, cultural news Northeast',
  openGraph: {
    title: 'About Northeast Herald - Your Gateway to Northeast India News',
    description: 'Discover Northeast Herald\'s mission to provide authentic, unbiased news coverage of India\'s Northeast region. Learn about our commitment to cultural storytelling and community journalism.',
    type: 'website',
    locale: 'en_IN',
  },
  alternates: {
    canonical: '/pages/about-us',
  },
};

export default function AboutUs() {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Northeast Herald
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Your premier source for comprehensive and authentic news coverage of Northeast India
            </p>
            <div className="flex items-center justify-center space-x-2 text-lg">
              <MapPin className="text-blue-200" size={20} />
              <span>Based in Agartala, Tripura</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Welcome to Northeast Herald
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Welcome to Northeast Herald, your premier source for comprehensive and authentic news coverage 
              of the vibrant and diverse Northeast region of India. Based in the capital city of Tripura, 
              Agartala, we embark on a journey to bring you the latest news, captivating news photos, and 
              striking visuals that showcase the rich cultural, historical, and traditional identity of this 
              captivating region.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Heart className="text-red-600 mr-3" size={28} />
                <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                At Northeast Herald, our mission is to provide accurate, unbiased, and insightful news 
                coverage that reflects the true essence of the Northeastern states. We are committed to 
                highlighting the remarkable stories, people, and events that shape the Northeast&apos;s unique 
                tapestry, fostering a sense of unity and understanding among our readers.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Eye className="text-blue-600 mr-3" size={28} />
                <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We envision a platform that not only informs but also celebrates the Northeast&apos;s rich 
                heritage, diverse communities, and progressive developments. Through our news articles 
                and captivating images, we aim to create a bridge between the past, present, and future 
                of this enchanting region.
              </p>
            </div>
          </div>
        </section>

        {/* What Sets Us Apart */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              What Sets Us Apart
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Globe className="text-blue-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Unparalleled Coverage</h3>
                <p className="text-gray-600 text-sm">
                  Our dedicated team traverses the Northeast to bring you up-to-the-minute news and 
                  stunning visuals that capture the region&apos;s spirit.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="text-green-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Cultural Showcase</h3>
                <p className="text-gray-600 text-sm">
                  We shed light on the Northeast&apos;s cultural mosaic – festivals, traditions, indigenous 
                  arts, and crafts – fostering deeper appreciation.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="text-purple-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Community-Centric</h3>
                <p className="text-gray-600 text-sm">
                  We present stories with sensitivity and respect, giving voice to communities and 
                  ensuring accurate representation of their narratives.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Eye className="text-orange-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Reliable Integrity</h3>
                <p className="text-gray-600 text-sm">
                  Our strong Code of Ethics ensures accurate, transparent, and unbiased news, 
                  preserving our reputation as a trusted information source.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Commitment */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Our Commitment
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                    <Globe className="text-blue-600" size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Comprehensive News</h3>
                    <p className="text-gray-600 text-sm">
                      We cover politics, economy, social issues, environment, and more for a holistic 
                      understanding of Northeast dynamics.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                    <Camera className="text-green-600" size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Visual Storytelling</h3>
                    <p className="text-gray-600 text-sm">
                      Our captivating photos and galleries provide a visual journey that complements 
                      written content, immersing you in the region&apos;s beauty.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
                    <Eye className="text-purple-600" size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Educational Content</h3>
                    <p className="text-gray-600 text-sm">
                      Beyond news, we provide insightful articles, historical retrospectives, and 
                      cultural spotlights that add depth to our stories.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 rounded-full p-2 flex-shrink-0">
                    <Users className="text-orange-600" size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Engaging Community</h3>
                    <p className="text-gray-600 text-sm">
                      We encourage interaction and discourse, fostering a community of individuals 
                      passionate about the Northeast.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
              Thank you for joining us on this exciting journey as we strive to shine a spotlight on 
              the heart and soul of India&apos;s Northeast. We invite you to explore, learn, and connect 
              with us at Northeast Herald – your gateway to the stories that shape the region&apos;s narrative.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section>
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Get in Touch
            </h2>
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-6">
                For inquiries, feedback, or collaborations, please contact us:
              </p>
              <div className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
                <Mail size={20} />
                <a href="mailto:neherald.com@neherald.com" className="text-lg font-medium">
                  neherald.com@neherald.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
