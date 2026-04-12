import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export interface Tab {
  id: string;
  path: string;
  title: string;
}

interface TabsContextType {
  tabs: Tab[];
  activeTabId: string | null;
  openTab: (tab: Tab) => void;
  closeTab: (tabId: string) => void;
  switchTab: (tabId: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function TabsProvider({ children }: { children: ReactNode }) {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: "canvas", path: "/canvas", title: "전체 노트" }
  ]);
  const [activeTabId, setActiveTabId] = useState<string | null>("canvas");
  const location = useLocation();
  const navigate = useNavigate();

  // Update active tab when route changes
  useEffect(() => {
    const currentTab = tabs.find(tab => tab.path === location.pathname);
    if (currentTab) {
      setActiveTabId(currentTab.id);
    }
  }, [location.pathname, tabs]);

  const openTab = (tab: Tab) => {
    const existingTab = tabs.find(t => t.id === tab.id);
    if (existingTab) {
      switchTab(tab.id);
    } else {
      setTabs(prev => [...prev, tab]);
      setActiveTabId(tab.id);
      navigate(tab.path);
    }
  };

  const closeTab = (tabId: string) => {
    const tabIndex = tabs.findIndex(t => t.id === tabId);
    if (tabIndex === -1) return;

    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);

    // If closing active tab, switch to another
    if (activeTabId === tabId && newTabs.length > 0) {
      const nextTab = newTabs[tabIndex] || newTabs[tabIndex - 1];
      setActiveTabId(nextTab.id);
      navigate(nextTab.path);
    }
  };

  const switchTab = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      setActiveTabId(tabId);
      navigate(tab.path);
    }
  };

  return (
    <TabsContext.Provider value={{ tabs, activeTabId, openTab, closeTab, switchTab }}>
      {children}
    </TabsContext.Provider>
  );
}

export function useTabs() {
  const context = useContext(TabsContext);
  if (context === undefined) {
    throw new Error("useTabs must be used within a TabsProvider");
  }
  return context;
}
