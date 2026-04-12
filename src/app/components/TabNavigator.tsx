import { motion } from "motion/react";
import { X } from "lucide-react";
import { useTabs } from "../context/TabsContext";

export function TabNavigator() {
  const { tabs, activeTabId, switchTab, closeTab } = useTabs();

  if (tabs.length === 0) return null;

  return (
    <div className="h-10 bg-bg-surface border-b border-border-subtle flex items-center px-2 gap-1 overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        return (
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`group flex items-center gap-2 px-3 h-8 rounded-t-md min-w-[120px] max-w-[200px] cursor-pointer transition-colors
              ${isActive ? 'bg-bg-canvas text-text-primary' : 'bg-bg-elevated text-text-secondary hover:bg-bg-surface'}`}
            onClick={() => switchTab(tab.id)}
          >
            <span className="flex-1 truncate text-[12px] font-medium">
              {tab.title}
            </span>
            {tabs.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
                className="w-4 h-4 flex items-center justify-center rounded opacity-0 group-hover:opacity-100 hover:bg-bg-elevated transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
