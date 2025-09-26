'use client';

import { Shield, Eye, Lock, UserCheck, FileText, Clock, Mail, MapPin, Phone } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="bg-blue-600 p-4 sm:p-6 rounded-full shadow-lg">
              <Shield className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Privacy Policy</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            Northeast Herald is committed to protecting your privacy and maintaining the highest standards 
            of data protection. This comprehensive policy outlines our practices regarding the collection, 
            use, and protection of your personal information.
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
              {/* Introduction */}
              <section className="mb-12 sm:mb-16">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
                  <div className="bg-blue-50 p-3 sm:p-4 rounded-xl mb-4 sm:mb-0 sm:mr-6 border border-blue-100">
                    <FileText className="text-blue-600" size={24} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Introduction</h2>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 sm:p-6 rounded-r-lg mb-6">
                  <p className="text-gray-800 leading-relaxed font-medium">
                    Northeast Herald (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates as a leading digital news platform 
                    dedicated to delivering accurate, timely, and comprehensive news coverage of India&apos;s 
                    Northeast region.
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 text-base sm:text-lg">
                  This Privacy Policy governs the collection, use, disclosure, and protection of personal 
                  information when you access our website, subscribe to our services, or interact with our 
                  digital platforms. We are committed to transparency and maintaining your trust through 
                  responsible data handling practices.
                </p>
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                  By accessing Northeast Herald&apos;s services, you acknowledge that you have read, understood, 
                  and agree to be bound by the terms of this Privacy Policy. If you do not agree with these 
                  practices, please discontinue use of our services immediately.
                </p>
              </section>

              {/* Information We Collect */}
              <section className="mb-12 sm:mb-16">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
                  <div className="bg-green-50 p-3 sm:p-4 rounded-xl mb-4 sm:mb-0 sm:mr-6 border border-green-100">
                    <Eye className="text-green-600" size={24} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Information Collection Practices</h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      Personal Information
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Information voluntarily provided by users through our platforms:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Full name and professional designation
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Email address and contact information
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Newsletter subscription preferences
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Comments, feedback, and editorial submissions
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Professional inquiries and collaboration requests
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      Technical Information
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Data automatically collected during website interactions:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        IP address and geographic location
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Browser type, version, and device information
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Page navigation patterns and session duration
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Referral sources and search queries
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Cookies and tracking technologies data
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* How We Use Information */}
              <section className="mb-12 sm:mb-16">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
                  <div className="bg-purple-50 p-3 sm:p-4 rounded-xl mb-4 sm:mb-0 sm:mr-6 border border-purple-100">
                    <UserCheck className="text-purple-600" size={24} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Data Usage and Processing</h2>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 sm:p-6 mb-6">
                  <p className="text-gray-800 leading-relaxed font-medium">
                    Northeast Herald processes your information solely for legitimate business purposes 
                    related to our news operations and service delivery.
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Primary Uses</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Delivering news content and editorial services
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Managing newsletter subscriptions and communications
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Responding to professional inquiries and feedback
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Facilitating reader engagement and community building
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Operational Uses</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Website performance optimization and analytics
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Security monitoring and fraud prevention
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Legal compliance and regulatory requirements
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Business development and strategic planning
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Information Sharing */}
              <section className="mb-12 sm:mb-16">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
                  <div className="bg-orange-50 p-3 sm:p-4 rounded-xl mb-4 sm:mb-0 sm:mr-6 border border-orange-100">
                    <Lock className="text-orange-600" size={24} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Data Sharing and Third-Party Disclosure</h2>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 sm:p-6 rounded-r-lg mb-6">
                  <p className="text-red-800 font-semibold mb-2">Strict No-Sale Policy</p>
                  <p className="text-red-700">
                    Northeast Herald does not sell, rent, lease, or trade personal information to third parties 
                    for commercial purposes under any circumstances.
                  </p>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Limited Disclosure Circumstances</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Authorized Disclosures</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Explicit user consent for specific purposes</li>
                      <li>• Essential service providers under strict confidentiality agreements</li>
                      <li>• Technical infrastructure and security service providers</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Legal Requirements</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Court orders and legal process compliance</li>
                      <li>• Protection of rights, property, and safety</li>
                      <li>• Business transfers or corporate restructuring</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Data Security */}
              <section className="mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Data Security and Protection Measures</h2>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6 mb-6">
                  <p className="text-green-800 font-medium">
                    Northeast Herald employs industry-standard security protocols and advanced encryption 
                    technologies to safeguard your personal information against unauthorized access, 
                    alteration, disclosure, or destruction.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lock className="text-blue-600" size={20} />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Encryption</h4>
                    <p className="text-gray-600 text-sm">SSL/TLS encryption for all data transmissions</p>
                  </div>
                  <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="text-green-600" size={20} />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Access Control</h4>
                    <p className="text-gray-600 text-sm">Restricted access with multi-factor authentication</p>
                  </div>
                  <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200 sm:col-span-2 lg:col-span-1">
                    <div className="bg-purple-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Eye className="text-purple-600" size={20} />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Monitoring</h4>
                    <p className="text-gray-600 text-sm">24/7 security monitoring and threat detection</p>
                  </div>
                </div>
              </section>

              {/* Cookies */}
              <section className="mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Cookies and Tracking Technologies</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-base sm:text-lg">
                  Northeast Herald utilizes cookies and similar technologies to enhance user experience, 
                  analyze website performance, and deliver personalized content. These technologies help us 
                  understand reader preferences and improve our editorial offerings.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 sm:p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Cookie Management</h4>
                  <p className="text-gray-700 mb-3">
                    You maintain full control over cookie preferences through your browser settings. 
                    Disabling cookies may limit certain website functionalities but will not prevent 
                    access to our news content.
                  </p>
                  <p className="text-gray-600 text-sm">
                    For detailed cookie management instructions, please refer to your browser&apos;s help documentation.
                  </p>
                </div>
              </section>

              {/* Your Rights */}
              <section className="mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Your Privacy Rights and Controls</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-base sm:text-lg">
                  Northeast Herald respects your privacy rights and provides comprehensive controls over 
                  your personal information. You have the following rights regarding your data:
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-lg p-4 sm:p-6 border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-4">Access and Transparency Rights</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Request access to your personal information</li>
                      <li>• Obtain copies of data we hold about you</li>
                      <li>• Understand how your information is processed</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 sm:p-6 border border-green-200">
                    <h4 className="font-semibold text-gray-900 mb-4">Control and Modification Rights</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Correct inaccurate or incomplete information</li>
                      <li>• Request deletion of your personal data</li>
                      <li>• Opt-out of marketing communications</li>
                      <li>• Object to specific data processing activities</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Children's Privacy */}
              <section className="mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Children&apos;s Privacy Protection</h2>
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 sm:p-6 rounded-r-lg">
                  <p className="text-orange-800 font-medium mb-3">Age Restriction Policy</p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Northeast Herald&apos;s services are designed for and directed to adults and mature audiences. 
                    We do not knowingly collect, store, or process personal information from individuals under 
                    the age of 13 years without verifiable parental consent.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    If we become aware that we have inadvertently collected information from a child under 13, &apos;
                    we will take immediate steps to delete such information from our systems and notify the &apos;  
                    appropriate parties as required by law.
                  </p>
                </div>
              </section>

              {/* Changes to Policy */}
              <section className="mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Policy Updates and Modifications</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-base sm:text-lg">
                  Northeast Herald reserves the right to update this Privacy Policy to reflect changes in our 
                  practices, legal requirements, or business operations. We are committed to maintaining 
                  transparency throughout any modification process.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Notification Process</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Prominent website notification of policy changes</li>
                    <li>• Email notification to registered users for material changes</li>
                    <li>• 30-day advance notice for significant modifications</li>
                    <li>• Updated &quot;Last Modified&quot; date for all revisions</li>
                  </ul>
                </div>
              </section>

              {/* Contact Information */}
              <section className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Contact Information and Support</h2>
                <p className="text-gray-700 leading-relaxed mb-6 sm:mb-8 text-base sm:text-lg">
                  For privacy-related inquiries, data protection concerns, or to exercise your privacy rights, 
                  please contact Northeast Herald through the following official channels:
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 sm:p-8 border border-blue-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    <div className="text-center">
                      <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="text-blue-600" size={20} />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
                      <a 
                        href="mailto:neherald.com@gmail.com" 
                        className="text-blue-600 hover:text-blue-800 transition-colors font-medium break-all"
                      >
                        neherald.com@gmail.com
                      </a>
                    </div>
                    <div className="text-center">
                      <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Phone className="text-green-600" size={20} />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Phone</h4>
                      <a 
                        href="tel:+919436120508" 
                        className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                      >
                        +91 9436120508
                      </a>
                    </div>
                    <div className="text-center sm:col-span-2 lg:col-span-1">
                      <div className="bg-orange-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin className="text-orange-600" size={20} />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
                      <address className="text-gray-700 not-italic text-sm leading-relaxed">
                        HGB Road, Post-Office Choumohani<br />
                        Opposite Sarkar Nursing Home<br />
                        Agartala, Tripura (West)<br />
                        India, Pin: 799004
                      </address>
                    </div>
                  </div>
                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-blue-200 text-center">
                    <p className="text-gray-600 text-sm">
                      <strong>Response Time:</strong> We aim to respond to all privacy inquiries within 48 hours during business days.
                    </p>
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
