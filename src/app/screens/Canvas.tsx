import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Sidebar } from "../components/Sidebar";
import { NodeCard } from "../components/NodeCard";
import { ConnectionLine } from "../components/ConnectionLine";
import { NoteEditModal } from "../components/NoteEditModal";
import { ButtonIcon } from "../components/Button";
import { Search, Settings, MousePointer, Plus, GitBranch, ZoomOut, ZoomIn } from "lucide-react";

// Sample node data
const sampleNodes = [
  { id: 1, title: "AI와 창의성의 관계", preview: "인공지능은 인간의 창의성을 증폭시키는 도구로 활용될 수 있다. 자동화를 통해 반복 작업을 줄이고...", tags: ["AI", "창의성"], date: "2일 전", x: 100, y: 100 },
  { id: 2, title: "UX 리서치 인사이트", preview: "사용자 행동 패턴 분석 결과, 대부분의 사용자는 첫 화면에서 3초 이내에 행동을 결정한다는 것을...", tags: ["UX", "리서치"], date: "1일 전", x: 450, y: 80, selected: true },
  { id: 3, title: "프로덕트 아이디어", preview: "새로운 기능에 대한 아이디어: 노트 간 자동 연결 시스템. AI가 의미적으로 유사한 노트를 찾아...", tags: ["아이디어", "프로덕트"], date: "3시간 전", x: 120, y: 350 },
  { id: 4, title: "디자인 시스템 구축", preview: "일관된 사용자 경험을 위해서는 체계적인 디자인 시스템이 필요하다. 컴포넌트 라이브러리와...", tags: ["디자인", "시스템"], date: "5일 전", x: 480, y: 320 },
  { id: 5, title: "사용자 피드백 정리", preview: "베타 테스트 사용자들의 주요 피드백: 1) 검색 기능 개선 필요 2) 모바일 반응형 이슈 3) 로딩 속도...", tags: ["피드백", "테스트"], date: "1주 전", x: 280, y: 220 },
  { id: 6, title: "데이터 시각화 방법론", preview: "효과적인 데이터 시각화를 위한 원칙들. 명확성, 정확성, 효율성을 고려하여 적절한 차트 타입을...", tags: ["데이터", "시각화"], date: "4일 전", x: 750, y: 150, selected: true },
  { id: 7, title: "팀 협업 도구 비교", preview: "Notion, Figma, Linear 등 다양한 협업 도구의 장단점 비교. 우리 팀에 가장 적합한 도구는...", tags: ["협업", "도구"], date: "6일 전", x: 700, y: 380 },
  { id: 8, title: "머신러닝 학습 노트", preview: "지도학습과 비지도학습의 차이점. 지도학습은 레이블이 있는 데이터를 사용하며...", tags: ["ML", "학습"], date: "2주 전", x: 350, y: 500, editing: true },
];

// Sample connections
const sampleConnections = [
  { id: 1, from: 1, to: 2, fromX: 320, fromY: 140, toX: 450, toY: 120 },
  { id: 2, from: 2, to: 6, fromX: 670, fromY: 120, toX: 750, toY: 190, active: true },
  { id: 3, from: 3, to: 5, fromX: 340, fromY: 390, toX: 400, toY: 260 },
  { id: 4, from: 5, to: 4, fromX: 500, fromY: 260, toX: 590, toY: 360 },
  { id: 5, from: 6, to: 7, fromX: 900, fromY: 230, toX: 810, toY: 420 },
];

export function Canvas() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleNodeClick = (id: number) => {
    navigate(`/note/${id}`);
  };

  const handleFABClick = () => {
    setSelectedNode(null);
    setIsModalOpen(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="h-full flex bg-bg-canvas">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="h-14 flex items-center justify-between px-6 border-b border-border-subtle">
          <h2 className="text-[20px] font-semibold text-text-primary">내 워크스페이스</h2>

          <div className="flex items-center gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-disabled" />
              <input
                type="text"
                placeholder="노트 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 bg-bg-elevated border border-border-default rounded-[var(--radius-md)] text-[14px] text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-border-focus"
              />
            </form>

            {/* Actions */}
            <ButtonIcon icon={<Settings />} onClick={() => navigate("/settings")} ariaLabel="설정" />
            <div className="w-8 h-8 rounded-full bg-brand-default flex items-center justify-center text-text-inverse text-[12px] font-semibold">
              U
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 relative overflow-hidden">
          {/* Dot Grid Background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, var(--gray-800) 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}
          />

          {/* SVG Layer for Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {sampleConnections.map((conn) => (
              <ConnectionLine
                key={conn.id}
                x1={conn.fromX}
                y1={conn.fromY}
                x2={conn.toX}
                y2={conn.toY}
                active={conn.active}
              />
            ))}
          </svg>

          {/* Nodes Layer */}
          <div className="absolute inset-0">
            {sampleNodes.map((node) => (
              <NodeCard
                key={node.id}
                title={node.title}
                preview={node.preview}
                tags={node.tags}
                date={node.date}
                x={node.x}
                y={node.y}
                selected={node.selected}
                editing={node.editing}
                onSelect={() => handleNodeClick(node.id)}
              />
            ))}
          </div>

          {/* Floating Toolbar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 h-12 bg-bg-elevated border border-border-default rounded-[var(--radius-xl)] shadow-[var(--shadow-md)] flex items-center px-2 gap-1"
          >
            <ButtonIcon icon={<MousePointer />} ariaLabel="커서" className="w-10 h-10" />
            <ButtonIcon icon={<Plus />} ariaLabel="노드 추가" className="w-10 h-10" />
            <ButtonIcon icon={<GitBranch />} ariaLabel="연결 도구" className="w-10 h-10" />
            <div className="w-px h-6 bg-border-default mx-1" />
            <ButtonIcon icon={<ZoomOut />} ariaLabel="축소" className="w-10 h-10" />
            <span className="text-[14px] text-text-secondary px-2 min-w-[48px] text-center">100%</span>
            <ButtonIcon icon={<ZoomIn />} ariaLabel="확대" className="w-10 h-10" />
          </motion.div>

          {/* FAB */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFABClick}
            className="absolute bottom-6 right-6 w-14 h-14 bg-brand-default rounded-full shadow-[var(--shadow-glow-primary)] flex items-center justify-center text-white hover:bg-brand-hover transition-colors group"
          >
            <Plus className="w-6 h-6" />

            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-bg-elevated border border-border-default rounded-[var(--radius-md)] px-3 py-1 text-[12px] text-text-primary whitespace-nowrap shadow-[var(--shadow-sm)]">
                새 노트 추가
              </div>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Note Edit Modal */}
      <NoteEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTitle={selectedNode ? sampleNodes.find(n => n.id === selectedNode)?.title : ""}
        initialContent={selectedNode ? sampleNodes.find(n => n.id === selectedNode)?.preview : ""}
      />
    </div>
  );
}
