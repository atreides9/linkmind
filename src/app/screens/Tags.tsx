import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Sidebar } from "../components/Sidebar";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ButtonIcon } from "../components/Button";
import { Tag } from "../components/Tag";
import { Settings, FileText } from "lucide-react";

interface TagData {
  name: string;
  count: number;
}

interface Note {
  id: number;
  title: string;
  preview: string;
  tags: string[];
  date: string;
}

const allTags: TagData[] = [
  { name: "AI", count: 3 },
  { name: "창의성", count: 2 },
  { name: "UX", count: 4 },
  { name: "리서치", count: 3 },
  { name: "아이디어", count: 5 },
  { name: "프로덕트", count: 4 },
  { name: "디자인", count: 6 },
  { name: "시스템", count: 3 },
  { name: "피드백", count: 2 },
  { name: "테스트", count: 3 },
  { name: "데이터", count: 4 },
  { name: "시각화", count: 2 },
  { name: "협업", count: 3 },
  { name: "도구", count: 2 },
  { name: "ML", count: 2 },
  { name: "학습", count: 3 },
];

const allNotes: Note[] = [
  { id: 1, title: "AI와 창의성의 관계", preview: "인공지능은 인간의 창의성을 증폭시키는 도구로 활용될 수 있다...", tags: ["AI", "창의성"], date: "2일 전" },
  { id: 2, title: "UX 리서치 인사이트", preview: "사용자 행동 패턴 분석 결과, 대부분의 사용자는 첫 화면에서...", tags: ["UX", "리서치"], date: "1일 전" },
  { id: 3, title: "프로덕트 아이디어", preview: "새로운 기능에 대한 아이디어: 노트 간 자동 연결 시스템...", tags: ["아이디어", "프로덕트"], date: "3시간 전" },
  { id: 4, title: "디자인 시스템 구축", preview: "일관된 사용자 경험을 위해서는 체계적인 디자인 시스템이 필요하다...", tags: ["디자인", "시스템"], date: "5일 전" },
  { id: 5, title: "사용자 피드백 정리", preview: "베타 테스트 사용자들의 주요 피드백: 1) 검색 기능 개선 필요...", tags: ["피드백", "테스트", "UX"], date: "1주 전" },
  { id: 6, title: "데이터 시각화 방법론", preview: "효과적인 데이터 시각화를 위한 원칙들. 명확성, 정확성, 효율성을...", tags: ["데이터", "시각화"], date: "4일 전" },
  { id: 7, title: "팀 협업 도구 비교", preview: "Notion, Figma, Linear 등 다양한 협업 도구의 장단점 비교...", tags: ["협업", "도구"], date: "6일 전" },
  { id: 8, title: "머신러닝 학습 노트", preview: "지도학습과 비지도학습의 차이점. 지도학습은 레이블이 있는 데이터를...", tags: ["ML", "학습", "AI"], date: "2주 전" },
  { id: 9, title: "디자인 원칙 정리", preview: "좋은 디자인의 기본 원칙: 일관성, 단순성, 피드백, 접근성...", tags: ["디자인", "UX"], date: "3일 전" },
  { id: 10, title: "프로덕트 로드맵 2026", preview: "올해 집중할 핵심 기능들: AI 자동 태깅, 그래프 뷰 개선...", tags: ["프로덕트", "아이디어"], date: "1일 전" },
];

export function Tags() {
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredNotes = selectedTag
    ? allNotes.filter(note => note.tags.includes(selectedTag))
    : [];

  return (
    <div className="h-full flex bg-bg-canvas">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="h-14 flex items-center justify-between px-6 border-b border-border-subtle">
          <h2 className="text-[20px] font-semibold text-text-primary">태그</h2>

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
        <div className="flex-1 overflow-hidden flex">
          {/* Tags List */}
          <div className="w-80 border-r border-border-subtle overflow-y-auto p-6">
            <div className="mb-4">
              <h3 className="text-[14px] font-semibold text-text-primary mb-1">전체 태그</h3>
              <p className="text-[12px] text-text-disabled">{allTags.length}개의 태그</p>
            </div>

            <div className="space-y-2">
              {allTags.map((tag) => (
                <motion.button
                  key={tag.name}
                  onClick={() => setSelectedTag(tag.name)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-[var(--radius-md)] transition-colors
                    ${selectedTag === tag.name ? 'bg-brand-subtle border border-brand-default' : 'bg-bg-surface hover:bg-bg-elevated border border-transparent'}`}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${selectedTag === tag.name ? 'bg-brand-default' : 'bg-text-disabled'}`} />
                    <span className={`text-[14px] font-medium ${selectedTag === tag.name ? 'text-text-primary' : 'text-text-secondary'}`}>
                      {tag.name}
                    </span>
                  </div>
                  <span className={`text-[12px] ${selectedTag === tag.name ? 'text-brand-default' : 'text-text-disabled'}`}>
                    {tag.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Notes List */}
          <div className="flex-1 overflow-y-auto">
            {selectedTag ? (
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag label={selectedTag} />
                    <span className="text-[14px] text-text-secondary">태그가 있는 노트</span>
                  </div>
                  <p className="text-[12px] text-text-disabled">{filteredNotes.length}개의 노트</p>
                </div>

                <div className="space-y-3">
                  {filteredNotes.map((note) => (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => navigate(`/note/${note.id}`)}
                      className="bg-bg-surface border border-border-default rounded-[var(--radius-lg)] p-4 hover:border-border-focus transition-colors cursor-pointer"
                      whileHover={{ x: 2 }}
                    >
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-text-disabled flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[14px] font-semibold text-text-primary mb-1 truncate">
                            {note.title}
                          </h3>
                          <p className="text-[12px] text-text-secondary line-clamp-2 mb-2">
                            {note.preview}
                          </p>
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex flex-wrap gap-1">
                              {note.tags.map((tag, idx) => (
                                <Tag key={idx} label={tag} />
                              ))}
                            </div>
                            <span className="text-[12px] text-text-disabled whitespace-nowrap">
                              {note.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bg-surface flex items-center justify-center">
                    <FileText className="w-8 h-8 text-text-disabled" />
                  </div>
                  <p className="text-[14px] text-text-secondary">태그를 선택하면</p>
                  <p className="text-[14px] text-text-secondary">관련 노트를 확인할 수 있어요</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
