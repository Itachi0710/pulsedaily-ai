import React, { useState, useRef, useEffect } from 'react';
import { UserRole, UserProfile } from '../types';

interface TopAppBarProps {
  user: UserProfile;
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  breakingCount: number;
  onOpenBreakingModal: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  user,
  activeRole,
  onRoleChange,
  breakingCount,
  onOpenBreakingModal,
  searchQuery,
  onSearchChange
}) => {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setRoleDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roles: UserRole[] = ['Software Engineer', 'Product Manager', 'Founder / Exec'];

  return (
    <header className="bg-white sticky top-0 z-50 h-16 w-full border-b border-[#DADCE0] px-6 flex items-center justify-between">
      {/* Left: Official 4-color Google dots + PulseDaily Brand */}
      <div className="flex items-center gap-6 shrink-0">
        <div className="flex items-center gap-2.5 cursor-pointer select-none">
          {/* Google 4-color dots icon */}
          <svg
            aria-label="Google News Identity"
            className="shrink-0"
            fill="none"
            height="22"
            viewBox="0 0 24 24"
            width="22"
          >
            <circle cx="5" cy="12" fill="#4285F4" r="3" />
            <circle cx="12" cy="5" fill="#EA4335" r="3" />
            <circle cx="19" cy="12" fill="#FBBC05" r="3" />
            <circle cx="12" cy="19" fill="#34A853" r="3" />
          </svg>
          <span className="text-xl font-bold text-[#202124] tracking-tight whitespace-nowrap flex items-center gap-1.5">
            PulseDaily
            <span className="bg-[#E8F0FE] text-[#1A73E8] border border-[#D2E3FC] text-[11px] font-semibold px-1.5 py-0.5 rounded tracking-normal">
              AI
            </span>
          </span>
        </div>

        {/* Tactical Sub-Header Lenses */}
        <nav aria-label="Perspective Lenses" className="hidden xl:flex items-center gap-5 ml-2 text-xs font-medium text-[#5F6368]">
          <span className="text-[#1A73E8] font-semibold border-b-2 border-[#1A73E8] pb-1 cursor-default">
            Live Daily Intelligence
          </span>
          <span className="text-[#5F6368] hover:text-[#202124] transition-colors cursor-pointer">
            Executive Summary
          </span>
          <span className="text-[#5F6368] hover:text-[#202124] transition-colors cursor-pointer">
            Architect Brief
          </span>
        </nav>
      </div>

      {/* Center: Wide Pill Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-xl mx-4">
        <div className="bg-[#F1F3F4] hover:bg-[#E8EAED] rounded-full px-4 py-2 text-sm text-[#5F6368] flex items-center gap-3 w-full border border-transparent focus-within:border-[#1A73E8] focus-within:bg-white transition-all">
          <span className="material-symbols-outlined text-[#5F6368] text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-transparent border-none outline-none w-full text-sm text-[#202124] placeholder-[#5F6368] p-0 focus:ring-0"
            placeholder="Search AI topics, models, or sources..."
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="text-[#5F6368] hover:text-[#202124]"
              title="Clear search"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
          <span
            className="material-symbols-outlined text-[#5F6368] text-[18px] cursor-pointer hover:text-[#202124]"
            title="Search options"
          >
            tune
          </span>
        </div>
      </div>

      {/* Right: Role Lens Selector Pill, Alert Bell & SSO Profile */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Role Lens selector pill */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="bg-[#E8F0FE] text-[#1A73E8] border border-[#D2E3FC] rounded-full px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1.5 hover:bg-[#D2E3FC] transition-colors whitespace-nowrap active:scale-95"
            title="Switch your Role Lens"
            aria-expanded={roleDropdownOpen}
          >
            <span className="material-symbols-filled text-[15px] text-[#1A73E8]">
              bolt
            </span>
            <span>{activeRole}</span>
            <span className="material-symbols-outlined text-[16px]">
              expand_more
            </span>
          </button>

          {/* Role Dropdown Menu */}
          {roleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-[#DADCE0] rounded-2xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-3.5 py-1.5 text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">
                Switch Role Lens
              </div>
              {roles.map((r) => {
                const isSelected = r === activeRole;
                return (
                  <button
                    key={r}
                    onClick={() => {
                      onRoleChange(r);
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'text-[#1A73E8] bg-[#E8F0FE] font-semibold'
                        : 'text-[#202124] hover:bg-[#F8F9FA]'
                    }`}
                  >
                    <span>{r}</span>
                    {isSelected && (
                      <span className="material-symbols-outlined text-xs text-[#1A73E8]">
                        check
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Breaking Alert Bell Icon Button with Red Badge */}
        <button
          onClick={onOpenBreakingModal}
          aria-label="Breaking News Notifications"
          className="relative p-2 rounded-full hover:bg-[#F1F3F4] text-[#5F6368] hover:text-[#202124] transition-colors active:scale-95"
          title="Breaking News Alerts"
        >
          <span className="material-symbols-outlined text-[22px]">
            notifications
          </span>
          {breakingCount > 0 && (
            <span className="absolute top-1 right-1 bg-[#D93025] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
              {breakingCount}
            </span>
          )}
        </button>

        {/* Google SSO Profile Avatar Pill */}
        <div className="relative pl-1 border-l border-[#DADCE0]" ref={profileRef}>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 py-1 px-1.5 rounded-full hover:bg-[#F1F3F4] cursor-pointer transition-colors"
            title="Google SSO Account Profile"
            aria-expanded={profileDropdownOpen}
          >
            <div className="w-8 h-8 rounded-full bg-[#7C3AED] text-white flex items-center justify-center text-sm font-semibold relative shadow-xs">
              {user.avatarLetter}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#34A853] border-2 border-white rounded-full" />
            </div>
            <div className="hidden lg:flex flex-col text-left pr-1">
              <span className="text-xs font-semibold text-[#202124] leading-tight whitespace-nowrap">
                {user.name}
              </span>
              <span className="text-[10px] text-[#5F6368] font-medium leading-tight whitespace-nowrap flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]"></span>
                Google SSO
              </span>
            </div>
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-[#DADCE0] rounded-2xl shadow-lg p-4 z-50 text-left">
              <div className="flex items-center gap-3 pb-3 border-b border-[#DADCE0]">
                <div className="w-10 h-10 rounded-full bg-[#7C3AED] text-white flex items-center justify-center text-base font-bold">
                  {user.avatarLetter}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#202124]">{user.name}</div>
                  <div className="text-xs text-[#5F6368]">{user.email}</div>
                </div>
              </div>
              <div className="py-2.5 space-y-1 text-xs">
                <div className="flex items-center justify-between text-[#5F6368] py-1">
                  <span>Current Role</span>
                  <span className="font-semibold text-[#1A73E8] bg-[#E8F0FE] px-2 py-0.5 rounded-full">
                    {activeRole}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#5F6368] py-1">
                  <span>SSO Session</span>
                  <span className="text-[#188038] font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#188038]" />
                    Verified Active
                  </span>
                </div>
              </div>
              <div className="pt-2 border-t border-[#DADCE0]">
                <button
                  onClick={() => alert('Signed in with Google Account: ' + user.email)}
                  className="w-full text-center py-1.5 text-xs text-[#5F6368] hover:text-[#202124] font-medium rounded-lg hover:bg-[#F8F9FA]"
                >
                  Manage Google Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
