import React from 'react';

export const EditorialFooter: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#DADCE0] py-6 px-8 text-center text-xs text-[#5F6368] mt-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#202124]">PulseDaily AI</span>
          <span>•</span>
          <span>Enterprise Feed Powered by Google Material Design 3</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="#privacy"
            onClick={(e) => { e.preventDefault(); alert('PulseDaily AI respects privacy. No personal telemetry stored outside your local session.'); }}
            className="hover:underline text-[#5F6368] hover:text-[#202124]"
          >
            Privacy Policy
          </a>
          <a
            href="#terms"
            onClick={(e) => { e.preventDefault(); alert('Terms of Service: Free for research and personal developer intelligence.'); }}
            className="hover:underline text-[#5F6368] hover:text-[#202124]"
          >
            Terms of Service
          </a>
          <a
            href="#feedback"
            onClick={(e) => { e.preventDefault(); alert('Feedback received! Thank you for helping refine PulseDaily AI.'); }}
            className="hover:underline text-[#5F6368] hover:text-[#202124]"
          >
            Send Feedback
          </a>
          <a
            href="https://github.com/HackerNews/API"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-[#1A73E8]"
          >
            HN Source API
          </a>
        </div>
      </div>
    </footer>
  );
};
