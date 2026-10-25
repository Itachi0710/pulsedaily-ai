import React from 'react';
import { RadarAlert } from '../types';

interface BreakingAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: RadarAlert[];
  onExplainWithGemini: (alert: RadarAlert) => void;
}

export const BreakingAlertModal: React.FC<BreakingAlertModalProps> = ({
  isOpen,
  onClose,
  alerts,
  onExplainWithGemini
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="breaking-alerts-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#DADCE0] rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#DADCE0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D93025] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D93025]" />
            </span>
            <h2 id="breaking-alerts-title" className="text-lg font-bold text-[#202124]">
              High-Velocity Breaking Radar
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#5F6368] hover:text-[#202124] p-1 rounded-full hover:bg-[#F1F3F4] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 divide-y divide-[#DADCE0] max-h-[70vh] overflow-y-auto">
          {alerts.map((alert) => (
            <div key={alert.id} className="py-4 first:pt-0 last:pb-0 space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-[#D93025] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {alert.tag}
                </span>
                <span className="text-xs text-[#5F6368]">{alert.timeAgo}</span>
              </div>
              <p className="text-sm font-bold text-[#202124] leading-snug">
                {alert.headline}
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-[#5F6368] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-[#188038]">
                    verified
                  </span>
                  Verified High Velocity
                </span>
                <button
                  onClick={() => onExplainWithGemini(alert)}
                  className="bg-[#E8F0FE] hover:bg-[#D2E3FC] text-[#1A73E8] text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-filled text-[14px] text-[#1A73E8]">
                    auto_awesome
                  </span>
                  Explain Impact with Gemini
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#F8F9FA] border-t border-[#DADCE0] flex items-center justify-between text-xs text-[#5F6368]">
          <span>Real-time webhook telemetry active</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1A73E8] text-white font-medium rounded-full hover:bg-[#1765CC] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
