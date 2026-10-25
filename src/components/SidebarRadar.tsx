import React from 'react';
import { RadarAlert } from '../types';

interface SidebarRadarProps {
  alerts: RadarAlert[];
  onSelectAlert: (alert: RadarAlert) => void;
}

export const SidebarRadar: React.FC<SidebarRadarProps> = ({ alerts, onSelectAlert }) => {
  return (
    <div className="bg-white border border-[#DADCE0] rounded-2xl p-5 shadow-none">
      {/* Header with live pinging pulse */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D93025] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D93025]" />
          </span>
          <h3 className="text-base font-bold text-[#202124] tracking-tight">
            Breaking Alert Radar
          </h3>
        </div>
        <span className="bg-[#FCE8E6] text-[#D93025] text-xs font-semibold px-2 py-0.5 rounded-full border border-[#FAD2CF] select-none">
          {alerts.length} High Impact
        </span>
      </div>

      {/* Radar Items with divide-y dividers */}
      <div className="divide-y divide-[#DADCE0]">
        {alerts.map((item, idx) => {
          let badgeClass = 'bg-[#E8F0FE] text-[#1A73E8]';
          if (item.tagType === 'critical') {
            badgeClass = 'bg-[#D93025] text-white';
          } else if (item.tagType === 'hardware') {
            badgeClass = 'bg-[#FEF7E0] text-[#B06000] border border-[#FEEFC3]';
          }

          return (
            <div
              key={item.id}
              onClick={() => onSelectAlert(item)}
              className={`py-3 group cursor-pointer ${idx === 0 ? 'first:pt-0' : ''} ${
                idx === alerts.length - 1 ? 'last:pb-0' : ''
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase select-none ${badgeClass}`}>
                  {item.tag}
                </span>
                <span className="text-[11px] text-[#5F6368]">{item.timeAgo}</span>
              </div>
              <p className="text-xs font-semibold text-[#202124] group-hover:text-[#1A73E8] transition-colors leading-snug">
                {item.headline}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
