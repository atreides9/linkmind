import { ChevronRight, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-generate breadcrumbs from path if not provided
  const breadcrumbs = items || generateBreadcrumbs(location.pathname);

  return (
    <div className="flex items-center gap-2 px-6 py-2 text-[12px]">
      <button
        onClick={() => navigate("/canvas")}
        className="text-text-disabled hover:text-text-primary transition-colors"
      >
        <Home className="w-4 h-4" />
      </button>

      {breadcrumbs.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-3 h-3 text-text-disabled" />
          {item.path ? (
            <button
              onClick={() => navigate(item.path)}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-text-primary font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  const pathMap: Record<string, string> = {
    'canvas': '전체 노트',
    'graph': '그래프 뷰',
    'tags': '태그',
    'recent': '최근 항목',
    'note': '노트',
    'settings': '설정',
    'search': '검색',
    'onboarding': '튜토리얼',
  };

  paths.forEach((path, index) => {
    const label = pathMap[path] || path;
    const isLast = index === paths.length - 1;
    const fullPath = '/' + paths.slice(0, index + 1).join('/');

    breadcrumbs.push({
      label,
      path: isLast ? undefined : fullPath
    });
  });

  return breadcrumbs;
}
