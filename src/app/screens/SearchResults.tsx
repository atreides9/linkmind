import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { Sidebar } from "../components/Sidebar";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Tag } from "../components/Tag";
import { FileText, Search as SearchIcon, Clock } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  preview: string;
  tags: string[];
  date: string;
  matchType: "title" | "content" | "tag";
}

const allNotes: SearchResult[] = [
  { id: "1", title: "AI와 창의성의 관계", preview: "인공지능은 인간의 창의성을 증폭시키는 도구로 활용될 수 있다...", tags: ["AI", "창의성"], date: "2일 전", matchType: "title" },
  { id: "2", title: "UX 리서치 인사이트", preview: "사용자 행동 패턴 분석 결과, 대부분의 사용자는 첫 화면에서...", tags: ["UX", "리서치"], date: "1일 전", matchType: "content" },
  { id: "3", title: "프로덕트 아이디어", preview: "새로운 기능에 대한 아이디어: 노트 간 자동 연결 시스템...", tags: ["아이디어", "프로덕트"], date: "3시간 전", matchType: "tag" },
  { id: "4", title: "디자인 시스템 구축", preview: "일관된 사용자 경험을 위해서는 체계적인 디자인 시스템이 필요하다...", tags: ["디자인", "시스템"], date: "5일 전", matchType: "content" },
  { id: "5", title: "사용자 피드백 정리", preview: "베타 테스트 사용자들의 주요 피드백: 1) 검색 기능 개선 필요...", tags: ["피드백", "테스트"], date: "1주 전", matchType: "content" },
];

export function SearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filterType, setFilterType] = useState<"all" | "title" | "content" | "tag">("all");

  useEffect(() => {
    // Simulate search
    if (query) {
      const filtered = allNotes.filter(note =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.preview.toLowerCase().includes(query.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const filteredResults = filterType === "all"
    ? results
    : results.filter(r => r.matchType === filterType);

  return (
    <div className="h-full flex bg-bg-canvas">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="h-14 flex items-center justify-between px-6 border-b border-border-subtle">
          <h2 className="text-[20px] font-semibold text-text-primary">검색 결과</h2>
        </div>

        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[900px] mx-auto p-8">
            {/* Search Info */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <SearchIcon className="w-5 h-5 text-text-disabled" />
                <h3 className="text-[16px] text-text-secondary">
                  "<span className="text-text-primary font-semibold">{query}</span>" 검색 결과
                </h3>
              </div>
              <p className="text-[14px] text-text-disabled">
                {filteredResults.length}개의 노트를 찾았습니다
              </p>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2 mb-6">
              {[
                { id: "all", label: "전체" },
                { id: "title", label: "제목" },
                { id: "content", label: "내용" },
                { id: "tag", label: "태그" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setFilterType(filter.id as any)}
                  className={`px-4 py-2 rounded-lg text-[12px] font-semibold transition-colors
                    ${filterType === filter.id
                      ? 'bg-brand-subtle text-brand-default border border-brand-default'
                      : 'bg-bg-surface text-text-secondary hover:bg-bg-elevated border border-transparent'
                    }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Results */}
            {filteredResults.length === 0 ? (
              <div className="text-center py-16">
                <SearchIcon className="w-16 h-16 mx-auto mb-4 text-text-disabled" />
                <p className="text-[16px] text-text-secondary mb-2">검색 결과가 없습니다</p>
                <p className="text-[14px] text-text-disabled">다른 검색어를 시도해보세요</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResults.map((result) => (
                  <div
                    key={result.id}
                    onClick={() => navigate(`/note/${result.id}`)}
                    className="bg-bg-surface border border-border-default rounded-lg p-5 hover:border-border-focus transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <FileText className="w-5 h-5 text-text-disabled flex-shrink-0 mt-1" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-[16px] font-semibold text-text-primary">
                            {highlightMatch(result.title, query)}
                          </h3>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full
                            ${result.matchType === "title" ? 'bg-brand-subtle text-brand-default' :
                              result.matchType === "content" ? 'bg-status-success/20 text-status-success' :
                              'bg-status-warning/20 text-status-warning'}`}
                          >
                            {result.matchType === "title" ? "제목" :
                             result.matchType === "content" ? "내용" : "태그"}
                          </span>
                        </div>
                        <p className="text-[14px] text-text-secondary line-clamp-2 mb-3">
                          {highlightMatch(result.preview, query)}
                        </p>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex flex-wrap gap-1">
                            {result.tags.map((tag, idx) => (
                              <Tag key={idx} label={tag} />
                            ))}
                          </div>
                          <div className="flex items-center gap-1 text-[12px] text-text-disabled">
                            <Clock className="w-3 h-3" />
                            {result.date}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-brand-subtle text-brand-default font-semibold">
        {part}
      </mark>
    ) : (
      part
    )
  );
}
