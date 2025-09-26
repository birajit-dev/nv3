'use client';

import { useState } from 'react';
import { Facebook, Twitter, MessageCircle, Mail, Link as LinkIcon, Check } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
  text: string;
}

export default function ShareButtons({ url, title, text }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const shareText = `${title} - ${text}`;

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Share this article</h3>
      <div className="grid grid-cols-2 gap-3">
        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          <Facebook size={16} />
          <span>Facebook</span>
        </a>

        {/* Twitter */}
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 px-3 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-medium text-sm"
        >
          <Twitter size={16} />
          <span>Twitter</span>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${url}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
        >
          <MessageCircle size={16} />
          <span>WhatsApp</span>
        </a>

        {/* Email */}
        <a
          href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${shareText}\n\nRead more: ${url}`)}`}
          className="flex items-center justify-center space-x-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm"
        >
          <Mail size={16} />
          <span>Email</span>
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-lg transition-colors font-medium text-sm col-span-2 ${
            copied 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {copied ? <Check size={16} /> : <LinkIcon size={16} />}
          <span>{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>
      </div>
    </section>
  );
}
