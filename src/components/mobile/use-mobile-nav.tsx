import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import type { MobileTabId } from "./MobileBottomNav";

export interface MobileNavState {
  activeTab: MobileTabId;
  setActiveTab: (tab: MobileTabId) => void;
  sheetOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;
  toggleSheet: () => void;
}

const MobileNavContext = createContext<MobileNavState | null>(null);

export function MobileNavProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<MobileTabId>("home");
  const [sheetOpen, setSheetOpen] = useState(false);

  const openSheet = useCallback(() => setSheetOpen(true), []);
  const closeSheet = useCallback(() => setSheetOpen(false), []);
  const toggleSheet = useCallback(() => setSheetOpen((v) => !v), []);

  const value = useMemo<MobileNavState>(
    () => ({ activeTab, setActiveTab, sheetOpen, openSheet, closeSheet, toggleSheet }),
    [activeTab, setActiveTab, sheetOpen, openSheet, closeSheet, toggleSheet],
  );

  return <MobileNavContext.Provider value={value}>{children}</MobileNavContext.Provider>;
}

export function useMobileNav(): MobileNavState {
  const ctx = useContext(MobileNavContext);
  if (!ctx) {
    return {
      activeTab: "home",
      setActiveTab: () => {},
      sheetOpen: false,
      openSheet: () => {},
      closeSheet: () => {},
      toggleSheet: () => {},
    };
  }
  return ctx;
}
