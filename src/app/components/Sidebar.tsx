import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Layout, Tag, Clock, FileText, Settings, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { useFavorites } from "../context/FavoritesContext";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  collapsed?: boolean;
}

function NavItem({ icon, label, active = false, onClick, collapsed = false }: NavItemProps) {
  return (
    <div className="relative group">
      <motion.button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-2 font-medium text-[14px] leading-[1.5] rounded-[var(--radius-md)] transition-colors relative
          ${active ? 'text-text-primary bg-brand-subtle' : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'}`}
        whileHover={{ x: active ? 0 : 2 }}
      >
        {active && (
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-brand-default rounded-r-sm" />
        )}
        <div className="w-5 h-5 flex-shrink-0">{icon}</div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="truncate overflow-hidden"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Tooltip when collapsed */}
      {collapsed && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
          <div className="bg-bg-elevated border border-border-default rounded-md px-3 py-2 text-[12px] text-text-primary whitespace-nowrap shadow-lg">
            {label}
          </div>
        </div>
      )}
    </div>
  );
}

interface SidebarProps {
  className?: string;
}

// All available notes
const allNotes = [
  { id: "1", title: "AI와 창의성의 관계" },
  { id: "2", title: "UX 리서치 인사이트" },
  { id: "3", title: "프로덕트 아이디어" },
  { id: "4", title: "디자인 시스템 구축" },
  { id: "5", title: "사용자 피드백 정리" },
];

export function Sidebar({ className = "" }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { favorites } = useFavorites();
  const [showAllFavorites, setShowAllFavorites] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isCanvasActive = location.pathname === "/canvas";
  const isGraphActive = location.pathname === "/graph";
  const isTagsActive = location.pathname === "/tags";
  const isRecentActive = location.pathname === "/recent";

  // Filter notes to only show favorites
  const favoriteNotes = allNotes.filter(note => favorites.includes(note.id));
  const displayedNotes = showAllFavorites ? favoriteNotes : favoriteNotes.slice(0, 3);

  return (
    <motion.div
      animate={{ width: isCollapsed ? 64 : 240 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`h-full bg-bg-surface border-r border-border-subtle flex flex-col ${className}`}
    >
      {/* Logo & Toggle */}
      <div className="h-16 flex-shrink-0 flex items-center justify-between px-4 border-b border-border-subtle">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-2 h-2 rounded-full bg-brand-default flex-shrink-0" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.h2
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="font-semibold text-[20px] text-brand-default whitespace-nowrap overflow-hidden"
              >
                Insight Dots
              </motion.h2>
            )}
          </AnimatePresence>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-6 h-6 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors flex-shrink-0"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 min-h-0 overflow-y-auto px-3 py-4">
        {/* Workspace Section */}
        <div className="mb-6">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4 mb-2"
              >
                <p className="text-[12px] font-semibold text-text-disabled uppercase tracking-wide">내 워크스페이스</p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="space-y-1">
            <NavItem icon={<Layout />} label="전체 노트" active={isCanvasActive} onClick={() => navigate("/canvas")} collapsed={isCollapsed} />
            <NavItem icon={<Layout />} label="그래프 뷰" active={isGraphActive} onClick={() => navigate("/graph")} collapsed={isCollapsed} />
            <NavItem icon={<Tag />} label="태그" active={isTagsActive} onClick={() => navigate("/tags")} collapsed={isCollapsed} />
            <NavItem icon={<Clock />} label="최근 항목" active={isRecentActive} onClick={() => navigate("/recent")} collapsed={isCollapsed} />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border-subtle my-4" />

        {/* Favorite Notes */}
        <div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4 mb-2"
              >
                <p className="text-[12px] font-semibold text-text-disabled uppercase tracking-wide">즐겨찾는 노트</p>
              </motion.div>
            )}
          </AnimatePresence>
          {favoriteNotes.length === 0 ? (
            !isCollapsed && (
              <div className="px-4 py-3">
                <p className="text-[12px] text-text-disabled">즐겨찾는 노트가 없습니다</p>
              </div>
            )
          ) : (
            <>
              <div className="space-y-1">
                {displayedNotes.map((note) => (
                  <NavItem
                    key={note.id}
                    icon={<Star className="fill-brand-default text-brand-default" />}
                    label={note.title}
                    onClick={() => navigate(`/note/${note.id}`)}
                    collapsed={isCollapsed}
                  />
                ))}
              </div>
              {favoriteNotes.length > 3 && !isCollapsed && (
                <button
                  onClick={() => setShowAllFavorites(!showAllFavorites)}
                  className="w-full px-4 py-2 text-[12px] text-brand-default hover:text-brand-hover transition-colors text-left"
                >
                  {showAllFavorites ? "접기" : "더보기"}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* User Profile */}
      <div className="h-16 flex-shrink-0 border-t border-border-subtle px-4 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-full bg-brand-default flex items-center justify-center text-text-inverse text-[12px] font-semibold flex-shrink-0">
            U
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="font-medium text-[14px] text-text-primary whitespace-nowrap overflow-hidden"
              >
                사용자
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <button
          onClick={() => navigate("/settings")}
          className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors flex-shrink-0"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
