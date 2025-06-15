
import React from "react";
import { Button } from "@/components/ui/button";

interface Tab {
  key: 'focus' | 'completed' | 'pending';
  label: string;
  count: number;
}

interface PookieTabNavProps {
  activeTab: Tab['key'];
  tabs: Tab[];
  onTabChange: (tab: Tab['key']) => void;
}

const PookieTabNav: React.FC<PookieTabNavProps> = ({
  activeTab,
  tabs,
  onTabChange
}) => (
  <div className="mb-6">
    <div className="flex gap-2 bg-gradient-to-r from-pink-900/20 via-purple-900/20 to-pink-900/20 p-1 rounded-xl w-fit border border-pink-300/20" style={{
      boxShadow: '0 0 20px rgba(255, 105, 180, 0.2)'
    }}>
      {tabs.map(tab => (
        <Button
          key={tab.key}
          variant={activeTab === tab.key ? "default" : "ghost"}
          onClick={() => onTabChange(tab.key)}
          className={`rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
            activeTab === tab.key 
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-sm' 
              : 'hover:bg-pink-500/10 text-pink-200 hover:text-pink-100'
          }`}
          style={{
            textShadow: activeTab === tab.key ? '0 0 10px rgba(255, 255, 255, 0.5)' : 'none'
          }}
        >
          {tab.label}
          {tab.count > 0 && (
            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
              activeTab === tab.key 
                ? 'bg-white/20 text-white' 
                : 'bg-pink-500/20 text-pink-200'
            }`}>
              {tab.count}
            </span>
          )}
        </Button>
      ))}
    </div>
  </div>
);

export default PookieTabNav;
