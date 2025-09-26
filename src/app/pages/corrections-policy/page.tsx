import { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Corrections Policy - Northeast Herald',
  description: 'Northeast Herald Corrections Policy: Our commitment to accuracy and transparency in correcting errors.',
  path: '/pages/corrections-policy',
});

export default function CorrectionsPolicyPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Corrections Policy</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Commitment to Accuracy</h2>
              <p className="text-gray-700 leading-relaxed">
                At Northeast Herald, we strive for accuracy in all our reporting. However, we recognize that 
                errors can occur despite our best efforts. When they do, we are committed to correcting them 
                promptly, transparently, and thoroughly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Types of Corrections</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">Factual Errors</h3>
                  <p className="text-gray-700 leading-relaxed">
                    These include incorrect names, dates, locations, statistics, quotes, or other factual 
                    information. Such errors are corrected immediately upon discovery.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">Clarifications</h3>
                  <p className="text-gray-700 leading-relaxed">
                    When additional context or clarification is needed to better explain a story or provide 
                    more accurate information, we add clarifications to the original article.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">Updates</h3>
                  <p className="text-gray-700 leading-relaxed">
                    When new information becomes available that significantly changes the understanding of 
                    a story, we update the article with the latest information and note when the update was made.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Handle Corrections</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">Immediate Action</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Upon discovering an error, we correct it immediately in the original article. The correction 
                    is made inline where the error occurred, and the article is updated with a correction note.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">Correction Notices</h3>
                  <p className="text-gray-700 leading-relaxed">
                    For significant errors that could mislead readers, we add a prominent correction notice 
                    at the beginning or end of the article. This notice clearly states what was incorrect 
                    and what the correct information is.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">Corrections Archive</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We maintain a public archive of significant corrections made to our articles, ensuring 
                    transparency and accountability in our reporting.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reporting Errors</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you believe you have found an error in our reporting, please contact us immediately. 
                We take all reports seriously and investigate them promptly.
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <h4 className="font-semibold text-blue-800 mb-2">How to Report an Error:</h4>
                <ul className="list-disc list-inside text-blue-700 space-y-1">
                  <li>Email us at: neherald.com@gmail.com</li>
                  <li>Include the article title and URL</li>
                  <li>Specify the incorrect information</li>
                  <li>Provide the correct information with sources if possible</li>
                  <li>Include your contact information for follow-up</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Response Timeline</h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">24 hours</span>
                  <p className="text-gray-700">Acknowledgment of your error report</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">48 hours</span>
                  <p className="text-gray-700">Initial investigation and response</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-medium">1 week</span>
                  <p className="text-gray-700">Completion of investigation and correction if warranted</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Editorial Standards</h2>
              <p className="text-gray-700 leading-relaxed">
                Our corrections policy is part of our broader commitment to journalistic integrity. We 
                follow established journalistic standards and best practices in all our reporting and 
                correction processes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  <strong>Corrections Team:</strong><br />
                  Email: neherald.com@gmail.com<br />
                  Phone: +91-XXX-XXXXXXX<br />
                  Address: Agartala, Tripura - 799001
                </p>
                <p className="text-gray-600 text-sm mt-4">
                  For all correction requests, please use the email address above for fastest response.
                </p>
              </div>
            </section>

            <section>
              <p className="text-gray-600 text-sm">
                This corrections policy is reviewed regularly and updated as needed to ensure we maintain 
                the highest standards of accuracy and transparency. Last updated: January 2025.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
