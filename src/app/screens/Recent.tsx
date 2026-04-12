import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Sidebar } from "../components/Sidebar";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ButtonIcon } from "../components/Button";
import { Tag } from "../components/Tag";
import { Settings, FileText, Clock, Calendar } from "lucide-react";

interface RecentNote {
  id: string;
  title: string;
  preview: string;
  tags: string[];
  lastViewed: string;
  viewedAt: Date;
}

// Sample recent notes data (most recent first)
const recentNotes: RecentNote[] = [
  {
    id: "3",
    title: "프로덕트 아이디어",
    preview: "새로운 기능에 대한 아이디어: 노트 간 자동 연결 시스템...",
    tags: ["아이디어", "프로덕트"],
    lastViewed: "방금 전",
    viewedAt: new Date(Date.now() - 1000 * 60 * 2) // 2 minutes ago
  },
  {
    id: "2",
    title: "UX 리서치 인사이트",
    preview: "사용자 행동 패턴 분석 결과, 대부분의 사용자는 첫 화면에서...",
    tags: ["UX", "리서치"],
    lastViewed: "10분 전",
    viewedAt: new Date(Date.now() - 1000 * 60 * 10)
  },
  {
    id: "1",
    title: "AI와 창의성의 관계",
    preview: "인공지능은 인간의 창의성을 증폭시키는 도구로 활용될 수 있다...",
    tags: ["AI", "창의성"],
    lastViewed: "1시간 전",
    viewedAt: new Date(Date.now() - 1000 * 60 * 60)
  },
  {
    id: "5",
    title: "사용자 피드백 정리",
    preview: "베타 테스트 사용자들의 주요 피드백: 1) 검색 기능 개선 필요...",
    tags: ["피드백", "테스트"],
    lastViewed: "어제",
    viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24)
  },
  {
    id: "6",
    title: "데이터 시각화 방법론",
    preview: "효과적인 데이터 시각화를 위한 원칙들. 명확성, 정확성, 효율성을...",
    tags: ["데이터", "시각화"],
    lastViewed: "2일 전",
    viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 48)
  },
  {
    id: "4",
    title: "디자인 시스템 구축",
    preview: "일관된 사용자 경험을 위해서는 체계적인 디자인 시스템이 필요하다...",
    tags: ["디자인", "시스템"],
    lastViewed: "5일 전",
    viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)
  },
  {
    id: "7",
    title: "팀 협업 도구 비교",
    preview: "Notion, Figma, Linear 등 다양한 협업 도구의 장단점 비교...",
    tags: ["협업", "도구"],
    lastViewed: "1주 전",
    viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
  },
];

export function Recent() {
  const navigate = useNavigate();
  const [filterPeriod, setFilterPeriod] = useState<"all" | "today" | "week" | "month">("all");

  const now = new Date();
  const filteredNotes = recentNotes.filter(note => {
    const diffMs = now.getTime() - note.viewedAt.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    switch (filterPeriod) {
      case "today":
        return diffDays < 1;
      case "week":
        return diffDays < 7;
      case "month":
        return diffDays < 30;
      default:
        return true;
    }
  });

  return (
    <div className="h-full flex bg-bg-canvas">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="h-14 flex items-center justify-between px-6 border-b border-border-subtle">
          <h2 className="text-[20px] font-semibold text-text-primary">최근 항목</h2>

          <div className="flex items-center gap-4">
            <ButtonIcon icon={<Settings />} onClick={() => navigate("/settings")} ariaLabel="설정" />
            <div className="w-8 h-8 rounded-full bg-brand-default flex items-center justify-center text-text-inverse text-[12px] font-semibold">
              U
            </div>
          </div>
        </div>

        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[900px] mx-auto p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-brand-default" />
                <h3 className="text-[16px] font-semibold text-text-primary">최근 본 노트</h3>
              </div>
              <p className="text-[14px] text-text-disabled">
                {filteredNotes.length}개의 노트를 최근에 확인했습니다
              </p>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2 mb-6">
              {[
                { id: "all", label: "전체" },
                { id: "today", label: "오늘" },
                { id: "week", label: "이번 주" },
                { id: "month", label: "이번 달" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setFilterPeriod(filter.id as any)}
                  className={`px-4 py-2 rounded-lg text-[12px] font-semibold transition-colors
                    ${filterPeriod === filter.id
                      ? 'bg-brand-subtle text-brand-default border border-brand-default'
                      : 'bg-bg-surface text-text-secondary hover:bg-bg-elevated border border-transparent'
                    }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Notes List */}
            {filteredNotes.length === 0 ? (
              <div className="text-center py-16">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-text-disabled" />
                <p className="text-[16px] text-text-secondary mb-2">선택한 기간에 본 노트가 없습니다</p>
                <p className="text-[14px] text-text-disabled">다른 기간을 선택해보세요</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotes.map((note, index) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => navigate(`/note/${note.id}`)}
                    className="bg-bg-surface border border-border-default rounded-lg p-5 hover:border-border-focus transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <FileText className="w-5 h-5 text-text-disabled flex-shrink-0 mt-1" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-[16px] font-semibold text-text-primary">
                            {note.title}
                          </h3>
                        </div>
                        <p className="text-[14px] text-text-secondary line-clamp-2 mb-3">
                          {note.preview}
                        </p>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex flex-wrap gap-1">
                            {note.tags.map((tag, idx) => (
                              <Tag key={idx} label={tag} />
                            ))}
                          </div>
                          <div className="flex items-center gap-1 text-[12px] text-text-disabled">
                            <Clock className="w-3 h-3" />
                            {note.lastViewed}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
