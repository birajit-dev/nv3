'use client';

import { useState } from 'react';
import { Link as LinkIcon, Check } from 'lucide-react';

interface CopyLinkButtonProps {
  url: string;
}

export default function CopyLinkButton({ url }: CopyLinkButtonProps) {
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

  return (
    <button
      onClick={handleCopyLink}
      className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
        copied 
          ? 'bg-green-500 text-white' 
          : 'bg-gray-600 text-white hover:bg-gray-700'
      }`}
      title={copied ? 'Copied!' : 'Copy Link'}
    >
      {copied ? <Check size={18} /> : <LinkIcon size={18} />}
    </button>
  );
}
