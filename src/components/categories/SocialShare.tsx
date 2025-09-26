// SocialShare.tsx - Create this as a separate component file
import React from 'react';
import { Facebook, Mail, Link as LinkIcon, Share2 } from 'lucide-react';

interface SocialShareProps {
  url: string;
  title: string;
  summary: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title, summary }) => {
  const shareText = `${title} - ${summary}`;
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // You might want to show a toast notification here
      console.log('Link copied to clipboard');
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="mb-6 border-b border-gray-200 pb-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <span className="text-sm font-medium text-gray-700 flex items-center">
          <Share2 size={16} className="mr-2" />
          Share this article:
        </span>
        
        <div className="flex items-center space-x-3 flex-wrap gap-2">
          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-10 h-10 bg-[#1877F2] text-white rounded-full hover:bg-[#166FE5] transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
            title="Share on Facebook"
            aria-label="Share on Facebook"
          >
            <Facebook size={18} fill="currentColor" />
          </a>

          {/* Twitter/X */}
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-10 h-10 bg-[#000000] text-white rounded-full hover:bg-gray-800 transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
            title="Share on X (Twitter)"
            aria-label="Share on X (Twitter)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${url}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-10 h-10 bg-[#25D366] text-white rounded-full hover:bg-[#22C55E] transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
            title="Share on WhatsApp"
            aria-label="Share on WhatsApp"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-10 h-10 bg-[#0A66C2] text-white rounded-full hover:bg-[#004182] transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
            title="Share on LinkedIn"
            aria-label="Share on LinkedIn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>

          {/* Telegram */}
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-10 h-10 bg-[#229ED9] text-white rounded-full hover:bg-[#0088CC] transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
            title="Share on Telegram"
            aria-label="Share on Telegram"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </a>

          {/* Email */}
          <a
            href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${shareText}\n\nRead more: ${url}`)}`}
            className="group flex items-center justify-center w-10 h-10 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
            title="Share via Email"
            aria-label="Share via Email"
          >
            <Mail size={18} />
          </a>

          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="group flex items-center justify-center w-10 h-10 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
            title="Copy Link"
            aria-label="Copy Link"
          >
            <LinkIcon size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;