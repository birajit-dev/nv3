import { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Editorial Policy - Northeast Herald',
  description: 'Northeast Herald Editorial Policy: Our commitment to accurate, unbiased, and ethical journalism in Tripura and Northeast India.',
  path: '/pages/editorial-policy',
});

export default function EditorialPolicyPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Editorial Policy</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                Northeast Herald is committed to delivering accurate, timely, and comprehensive news coverage 
                from Tripura and Northeast India. We strive to be Tripura&apos;s most trusted news source, providing 
                our readers with factual, unbiased, and relevant information that impacts their daily lives.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Editorial Standards</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">Accuracy and Fact-Checking</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We verify all information before publication through multiple reliable sources. Our editorial 
                    team conducts thorough fact-checking to ensure the accuracy of names, dates, locations, and 
                    other factual information. We correct errors promptly and transparently.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">Fairness and Balance</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We present news stories objectively, giving voice to all relevant perspectives. Our coverage 
                    is balanced and free from personal bias, political influence, or commercial pressure.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">Independence</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our editorial decisions are made independently, based on journalistic merit and public interest. 
                    We maintain editorial independence from advertisers, sponsors, and external influences.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Content Guidelines</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">News Coverage</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We prioritize news that is relevant to our readers in Tripura and Northeast India, including:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                    <li>Local government and politics</li>
                    <li>Development and infrastructure news</li>
                    <li>Social issues and community events</li>
                    <li>Economic and business developments</li>
                    <li>Cultural and educational news</li>
                    <li>Sports and entertainment</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">Source Attribution</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We clearly identify and attribute all sources of information. Anonymous sources are used 
                    sparingly and only when necessary to protect individuals from harm or to reveal information 
                    of significant public interest.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">Conflict of Interest</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our journalists and editors must disclose any potential conflicts of interest that could 
                    affect their reporting. We avoid covering topics where we have personal or financial interests.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Corrections and Updates</h2>
              <p className="text-gray-700 leading-relaxed">
                When we make an error, we correct it promptly and transparently. Corrections are clearly 
                marked and published in a timely manner. Significant corrections may warrant a separate 
                correction notice, while minor errors are corrected inline with appropriate notation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reader Engagement</h2>
              <p className="text-gray-700 leading-relaxed">
                We encourage reader feedback and engagement. Readers can contact us through our contact 
                page, email, or social media channels. We respond to legitimate concerns and take reader 
                feedback seriously in our editorial decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  <strong>Editorial Team:</strong><br />
                  Email: neherald.com@gmail.com<br />
                  Phone: +91-XXX-XXXXXXX<br />
                  Address: Agartala, Tripura - 799001
                </p>
                <p className="text-gray-600 text-sm mt-4">
                  For editorial inquiries, corrections, or feedback, please contact our editorial team.
                </p>
              </div>
            </section>

            <section>
              <p className="text-gray-600 text-sm">
                This editorial policy is reviewed annually and may be updated to reflect changes in 
                journalistic standards and practices. Last updated: January 2025.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
