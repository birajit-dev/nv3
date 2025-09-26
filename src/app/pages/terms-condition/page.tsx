'use client';

import { FileText, Scale, Shield, AlertTriangle, Clock, Mail, MapPin, Phone, CheckCircle } from 'lucide-react';

export default function TermsCondition() {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="bg-indigo-600 p-4 sm:p-6 rounded-full shadow-lg">
              <Scale className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Terms & Conditions</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            Welcome to Northeast Herald. These terms and conditions outline the rules and regulations 
            for the use of our website and services. Please read them carefully before using our platform.
          </p>
          <div className="flex items-center justify-center mt-6 sm:mt-8 text-gray-500 bg-gray-100 rounded-full px-4 sm:px-6 py-3 inline-flex">
            <Clock size={18} className="mr-3" />
            <span className="font-medium text-sm sm:text-base">Last updated: January 15, 2025</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 w-full">
          <div className="p-6 sm:p-8 lg:p-12">
            <div className="prose max-w-none">
              {/* Acceptance of Terms */}
              <section className="mb-12 sm:mb-16">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
                  <div className="bg-indigo-50 p-3 sm:p-4 rounded-xl mb-4 sm:mb-0 sm:mr-6 border border-indigo-100">
                    <CheckCircle className="text-indigo-600" size={24} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Acceptance of Terms</h2>
                </div>
                <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 sm:p-6 rounded-r-lg mb-6">
                  <p className="text-gray-800 leading-relaxed font-medium">
                    By accessing and using Northeast Herald&apos;s website and services, you accept and agree 
                    to be bound by the terms and provision of this agreement.
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 text-base sm:text-lg">
                  These Terms & Conditions constitute a legally binding agreement between you and Northeast Herald. 
                  If you do not agree to abide by the above, please do not use this service. We reserve the right 
                  to modify these terms at any time, and such modifications shall be effective immediately upon 
                  posting on our website.
                </p>
              </section>

              {/* Use License */}
              <section className="mb-12 sm:mb-16">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
                  <div className="bg-green-50 p-3 sm:p-4 rounded-xl mb-4 sm:mb-0 sm:mr-6 border border-green-100">
                    <FileText className="text-green-600" size={24} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Use License and Permissions</h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Permitted Uses</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Personal, non-commercial use of content
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Sharing articles with proper attribution
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Educational and research purposes
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Fair use commentary and criticism
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Prohibited Uses</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Commercial redistribution without permission
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Modification or alteration of content
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Removal of copyright notices
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Use for illegal or harmful purposes
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* User Responsibilities */}
              <section className="mb-12 sm:mb-16">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
                  <div className="bg-blue-50 p-3 sm:p-4 rounded-xl mb-4 sm:mb-0 sm:mr-6 border border-blue-100">
                    <Shield className="text-blue-600" size={24} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">User Responsibilities and Conduct</h2>
                </div>
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Account Responsibilities</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Users are responsible for maintaining the confidentiality of their account information 
                      and for all activities that occur under their account. You must notify us immediately 
                      of any unauthorized use of your account.
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Provide accurate and complete information</li>
                      <li>• Keep your login credentials secure</li>
                      <li>• Update your information when necessary</li>
                      <li>• Report any security breaches immediately</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Prohibited Conduct</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>• Posting false or misleading information</li>
                        <li>• Harassment or abuse of other users</li>
                        <li>• Spam or unsolicited communications</li>
                        <li>• Violation of intellectual property rights</li>
                      </ul>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>• Attempting to hack or disrupt services</li>
                        <li>• Distributing malware or viruses</li>
                        <li>• Impersonating others or entities</li>
                        <li>• Engaging in illegal activities</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Content and Copyright */}
              <section className="mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Content and Intellectual Property</h2>
                <div className="bg-purple-50 border-l-4 border-purple-600 p-4 sm:p-6 rounded-r-lg mb-6">
                  <p className="text-purple-800 font-semibold mb-2">Copyright Protection</p>
                  <p className="text-purple-700">
                    All content published on Northeast Herald, including articles, images, videos, and graphics, 
                    is protected by copyright and other intellectual property laws. Unauthorized reproduction 
                    or distribution is strictly prohibited.
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Our Content Rights</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Original articles and editorial content
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Website design and layout
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Logo, trademarks, and branding
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Proprietary software and technology
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">User-Generated Content</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Comments and feedback submissions
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        News tips and story suggestions
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Social media interactions
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Contest and survey responses
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Disclaimers */}
              <section className="mb-12 sm:mb-16">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
                  <div className="bg-orange-50 p-3 sm:p-4 rounded-xl mb-4 sm:mb-0 sm:mr-6 border border-orange-100">
                    <AlertTriangle className="text-orange-600" size={24} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Disclaimers and Limitations</h2>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 sm:p-6 rounded-r-lg mb-6">
                  <p className="text-red-800 font-semibold mb-2">Important Notice</p>
                  <p className="text-red-700">
                    The information on this website is provided on an &quot;as is&quot; basis. To the fullest extent 
                    permitted by law, Northeast Herald excludes all representations, warranties, obligations, 
                    and liabilities arising out of or in connection with the use of this website.
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Content Accuracy</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      While we strive for accuracy, we cannot guarantee that all information is complete, 
                      current, or error-free. Users should verify information independently before making 
                      decisions based on our content.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Third-Party Links</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Our website may contain links to third-party websites. We are not responsible for 
                      the content, privacy policies, or practices of these external sites.
                    </p>
                  </div>
                </div>
              </section>

              {/* Termination */}
              <section className="mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Account Termination and Service Suspension</h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 sm:p-6 mb-6">
                  <p className="text-yellow-800 font-medium">
                    Northeast Herald reserves the right to terminate or suspend access to our services 
                    immediately, without prior notice or liability, for any reason whatsoever, including 
                    without limitation if you breach the Terms.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="bg-red-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle className="text-red-600" size={20} />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Immediate Termination</h4>
                    <p className="text-gray-600 text-sm">For serious violations or illegal activities</p>
                  </div>
                  <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="bg-yellow-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="text-yellow-600" size={20} />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Warning Period</h4>
                    <p className="text-gray-600 text-sm">For minor violations with opportunity to correct</p>
                  </div>
                  <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200 sm:col-span-2 lg:col-span-1">
                    <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="text-blue-600" size={20} />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Appeal Process</h4>
                    <p className="text-gray-600 text-sm">Right to appeal termination decisions</p>
                  </div>
                </div>
              </section>

              {/* Governing Law */}
              <section className="mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Governing Law and Jurisdiction</h2>
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 sm:p-6">
                  <p className="text-indigo-800 font-medium mb-4">
                    These Terms & Conditions are governed by and construed in accordance with the laws of India. 
                    Any disputes arising under or in connection with these Terms shall be subject to the 
                    exclusive jurisdiction of the courts in Agartala, Tripura.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Applicable Laws</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Indian Constitution</li>
                        <li>• Information Technology Act, 2000</li>
                        <li>• Consumer Protection Act, 2019</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Dispute Resolution</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Mediation preferred first step</li>
                        <li>• Arbitration if mediation fails</li>
                        <li>• Court proceedings as last resort</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Information */}
              <section className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Contact Information</h2>
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    If you have any questions about these Terms & Conditions, please contact us using the 
                    information below. We are committed to addressing your concerns promptly and transparently.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <MapPin className="text-blue-600" size={16} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">Address</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          HGB Road, Post-Office Choumohani<br />
                          Agartala, Tripura (West)<br />
                          India, Pin: 799004
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Mail className="text-green-600" size={16} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">Email</h4>
                        <a 
                          href="mailto:neherald.com@gmail.com" 
                          className="text-blue-600 hover:text-blue-800 transition-colors text-sm"
                        >
                          neherald.com@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-orange-100 p-2 rounded-full">
                        <Phone className="text-orange-600" size={16} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">Phone</h4>
                        <a 
                          href="tel:+919436120508" 
                          className="text-blue-600 hover:text-blue-800 transition-colors text-sm"
                        >
                          +91 9436120508
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
