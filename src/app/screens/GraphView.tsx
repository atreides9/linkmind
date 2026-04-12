import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Sidebar } from "../components/Sidebar";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ButtonIcon } from "../components/Button";
import { Settings, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import * as d3 from "d3-force";
import { zoom as d3Zoom, zoomIdentity } from "d3-zoom";
import { select } from "d3-selection";

interface Node {
  id: string;
  label: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link {
  source: string | Node;
  target: string | Node;
}

// Sample data - same as canvas nodes
const graphData = {
  nodes: [
    { id: "1", label: "AI와 창의성의 관계" },
    { id: "2", label: "UX 리서치 인사이트" },
    { id: "3", label: "프로덕트 아이디어" },
    { id: "4", label: "디자인 시스템 구축" },
    { id: "5", label: "사용자 피드백 정리" },
    { id: "6", label: "데이터 시각화 방법론" },
    { id: "7", label: "팀 협업 도구 비교" },
    { id: "8", label: "머신러닝 학습 노트" },
    { id: "9", label: "프론트엔드 아키텍처" },
    { id: "10", label: "백엔드 최적화" },
    { id: "11", label: "성능 모니터링" },
    { id: "12", label: "보안 체크리스트" },
    { id: "13", label: "API 설계 원칙" },
    { id: "14", label: "데이터베이스 스키마" },
    { id: "15", label: "클라우드 인프라" },
  ],
  links: [
    { source: "1", target: "2" },
    { source: "2", target: "6" },
    { source: "3", target: "5" },
    { source: "5", target: "4" },
    { source: "6", target: "7" },
    { source: "1", target: "8" },
    { source: "8", target: "6" },
    { source: "9", target: "10" },
    { source: "10", target: "11" },
    { source: "11", target: "12" },
    { source: "13", target: "14" },
    { source: "14", target: "15" },
    { source: "9", target: "13" },
    { source: "4", target: "9" },
    { source: "7", target: "13" },
  ]
};

export function GraphView() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([...graphData.nodes]);
  const [links] = useState<Link[]>([...graphData.links]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const simulationRef = useRef<d3.Simulation<Node, Link> | null>(null);
  const transformRef = useRef({ x: 0, y: 0, k: 1 });
  const draggedNodeRef = useRef<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    // Create force simulation
    const simulation = d3.forceSimulation<Node>(nodes)
      .force("link", d3.forceLink<Node, Link>(links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(container.clientWidth / 2, container.clientHeight / 2))
      .force("collision", d3.forceCollide().radius(20));

    simulationRef.current = simulation;

    // Render function
    const render = () => {
      if (!ctx) return;

      const { x, y, k } = transformRef.current;
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Apply transform
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(k, k);

      // Draw links
      ctx.strokeStyle = "#34D399"; // status-success green
      ctx.lineWidth = 1 / k;
      ctx.globalAlpha = 0.4;

      links.forEach(link => {
        const source = link.source as Node;
        const target = link.target as Node;
        if (source.x == null || source.y == null || target.x == null || target.y == null) return;

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach(node => {
        if (node.x == null || node.y == null) return;

        const isSelected = selectedNode === node.id;
        const isHovered = hoveredNode === node.id;
        const radius = isSelected || isHovered ? 6 : 4;

        // Node glow for selected
        if (isSelected) {
          ctx.globalAlpha = 0.3;
          ctx.fillStyle = "#60A5FA"; // brand-default
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius * 2, 0, 2 * Math.PI);
          ctx.fill();
        }

        // Node circle
        ctx.globalAlpha = 1;
        ctx.fillStyle = isSelected ? "#60A5FA" : isHovered ? "#93C5FD" : "#F8F9FA"; // text-primary
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
        ctx.fill();

        // Node label on hover or select
        if (isHovered || isSelected) {
          ctx.globalAlpha = 1;
          ctx.fillStyle = "#F8F9FA"; // text-primary
          ctx.font = `${12 / k}px Pretendard, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText(node.label, node.x, node.y + radius + 8);
        }
      });

      ctx.restore();
    };

    simulation.on("tick", () => {
      setNodes([...nodes]);
      render();
    });

    // Zoom behavior
    const zoomBehavior = d3Zoom<HTMLCanvasElement, unknown>()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        transformRef.current = event.transform;
        render();
      });

    select(canvas).call(zoomBehavior as any);

    // Mouse interactions
    const getMousePos = (e: MouseEvent): { x: number; y: number } => {
      const rect = canvas.getBoundingClientRect();
      const { x, y, k } = transformRef.current;
      return {
        x: (e.clientX - rect.left - x) / k,
        y: (e.clientY - rect.top - y) / k
      };
    };

    const findNodeAtPosition = (x: number, y: number): Node | null => {
      for (const node of nodes) {
        if (node.x == null || node.y == null) continue;
        const dx = node.x - x;
        const dy = node.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 10) return node;
      }
      return null;
    };

    const handleMouseDown = (e: MouseEvent) => {
      const pos = getMousePos(e);
      const node = findNodeAtPosition(pos.x, pos.y);
      if (node) {
        draggedNodeRef.current = node.id;
        node.fx = node.x;
        node.fy = node.y;
        simulation.alphaTarget(0.3).restart();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const pos = getMousePos(e);

      if (draggedNodeRef.current) {
        const node = nodes.find(n => n.id === draggedNodeRef.current);
        if (node) {
          node.fx = pos.x;
          node.fy = pos.y;
        }
      } else {
        const node = findNodeAtPosition(pos.x, pos.y);
        setHoveredNode(node ? node.id : null);
        canvas.style.cursor = node ? "pointer" : "grab";
      }
      render();
    };

    const handleMouseUp = () => {
      if (draggedNodeRef.current) {
        const node = nodes.find(n => n.id === draggedNodeRef.current);
        if (node) {
          node.fx = null;
          node.fy = null;
        }
        draggedNodeRef.current = null;
        simulation.alphaTarget(0);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const pos = getMousePos(e);
      const node = findNodeAtPosition(pos.x, pos.y);
      if (node) {
        navigate(`/note/${node.id}`);
      } else {
        setSelectedNode(null);
        render();
      }
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("click", handleClick);
      simulation.stop();
    };
  }, [nodes, links, selectedNode, hoveredNode, navigate]);

  const handleZoomIn = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    select(canvas).transition().call((d3Zoom() as any).scaleBy, 1.3);
  };

  const handleZoomOut = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    select(canvas).transition().call((d3Zoom() as any).scaleBy, 0.7);
  };

  const handleReset = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    select(canvas).transition().call((d3Zoom() as any).transform, zoomIdentity);
  };

  return (
    <div className="h-screen flex bg-bg-canvas">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="h-14 flex items-center justify-between px-6 border-b border-border-subtle">
          <h2 className="text-[20px] font-semibold text-text-primary">그래프 뷰</h2>

          <div className="flex items-center gap-4">
            <ButtonIcon icon={<Settings />} onClick={() => navigate("/settings")} ariaLabel="설정" />
            <div className="w-8 h-8 rounded-full bg-brand-default flex items-center justify-center text-text-inverse text-[12px] font-semibold">
              U
            </div>
          </div>
        </div>

        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Graph Canvas */}
        <div ref={containerRef} className="flex-1 relative overflow-hidden bg-[#0A0A0A]">
          <canvas ref={canvasRef} className="w-full h-full" />

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-6 right-6 flex flex-col gap-2"
          >
            <ButtonIcon
              icon={<ZoomIn />}
              onClick={handleZoomIn}
              ariaLabel="확대"
              className="bg-bg-elevated border border-border-default"
            />
            <ButtonIcon
              icon={<ZoomOut />}
              onClick={handleZoomOut}
              ariaLabel="축소"
              className="bg-bg-elevated border border-border-default"
            />
            <ButtonIcon
              icon={<Maximize2 />}
              onClick={handleReset}
              ariaLabel="리셋"
              className="bg-bg-elevated border border-border-default"
            />
          </motion.div>

          {/* Info */}
          <div className="absolute bottom-6 left-6 bg-bg-elevated border border-border-default rounded-[var(--radius-md)] px-4 py-3">
            <p className="text-[12px] text-text-secondary mb-1">
              <span className="text-text-primary font-semibold">{nodes.length}</span> 노트
            </p>
            <p className="text-[12px] text-text-secondary">
              <span className="text-text-primary font-semibold">{links.length}</span> 연결
            </p>
          </div>

          {/* Selected Node Info */}
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-6 right-6 bg-bg-elevated border border-border-default rounded-[var(--radius-lg)] px-4 py-3 max-w-xs"
            >
              <h3 className="text-[14px] font-semibold text-text-primary mb-1">
                {nodes.find(n => n.id === selectedNode)?.label}
              </h3>
              <p className="text-[12px] text-text-secondary">
                연결된 노트: {links.filter(l =>
                  (l.source as Node).id === selectedNode ||
                  (l.target as Node).id === selectedNode
                ).length}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
