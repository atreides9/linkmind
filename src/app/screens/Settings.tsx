import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ButtonPrimary } from "../components/Button";
import { User, Bell, Shield, Palette, Keyboard } from "lucide-react";

const settingsSections = [
  {
    id: "account",
    icon: <User className="w-5 h-5" />,
    label: "계정",
    description: "프로필 및 계정 정보"
  },
  {
    id: "notifications",
    icon: <Bell className="w-5 h-5" />,
    label: "알림",
    description: "알림 설정 관리"
  },
  {
    id: "privacy",
    icon: <Shield className="w-5 h-5" />,
    label: "개인정보",
    description: "보안 및 개인정보 설정"
  },
  {
    id: "appearance",
    icon: <Palette className="w-5 h-5" />,
    label: "테마",
    description: "디자인 및 테마 설정"
  },
  {
    id: "shortcuts",
    icon: <Keyboard className="w-5 h-5" />,
    label: "단축키",
    description: "키보드 단축키 설정"
  }
];

export function Settings() {
  const [activeSection, setActiveSection] = useState("account");

  return (
    <div className="h-full flex bg-bg-canvas">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="h-14 flex items-center justify-between px-6 border-b border-border-subtle">
          <h2 className="text-[20px] font-semibold text-text-primary">설정</h2>
        </div>

        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Sidebar Menu */}
          <div className="w-64 border-r border-border-subtle overflow-y-auto p-4">
            <div className="space-y-1">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-start gap-3 px-4 py-3 rounded-lg transition-colors text-left
                    ${activeSection === section.id ? 'bg-brand-subtle text-text-primary' : 'text-text-secondary hover:bg-bg-elevated'}`}
                >
                  <div className={activeSection === section.id ? 'text-brand-default' : ''}>
                    {section.icon}
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold">{section.label}</div>
                    <div className="text-[12px] text-text-disabled">{section.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Settings Panel */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-[600px]">
              {activeSection === "account" && <AccountSettings />}
              {activeSection === "notifications" && <NotificationSettings />}
              {activeSection === "privacy" && <PrivacySettings />}
              {activeSection === "appearance" && <AppearanceSettings />}
              {activeSection === "shortcuts" && <ShortcutsSettings />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-[20px] font-semibold text-text-primary mb-1">계정 정보</h3>
        <p className="text-[14px] text-text-secondary">프로필 및 계정 설정을 관리합니다</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-[12px] font-semibold text-text-primary mb-2">이름</label>
          <input
            type="text"
            defaultValue="사용자"
            className="w-full px-4 py-3 bg-bg-elevated border border-border-default rounded-lg text-[14px] text-text-primary focus:outline-none focus:border-border-focus"
          />
        </div>

        <div>
          <label className="block text-[12px] font-semibold text-text-primary mb-2">이메일</label>
          <input
            type="email"
            defaultValue="user@example.com"
            className="w-full px-4 py-3 bg-bg-elevated border border-border-default rounded-lg text-[14px] text-text-primary focus:outline-none focus:border-border-focus"
          />
        </div>

        <div className="pt-4">
          <ButtonPrimary>변경사항 저장</ButtonPrimary>
        </div>
      </div>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-[20px] font-semibold text-text-primary mb-1">알림 설정</h3>
        <p className="text-[14px] text-text-secondary">알림을 받을 이벤트를 선택하세요</p>
      </div>

      <div className="space-y-4">
        {["새 노트 생성", "AI 태그 생성 완료", "노트 연결 발견"].map((item) => (
          <label key={item} className="flex items-center justify-between p-4 bg-bg-elevated rounded-lg cursor-pointer hover:bg-bg-surface transition-colors">
            <span className="text-[14px] text-text-primary">{item}</span>
            <input type="checkbox" defaultChecked className="w-5 h-5 accent-brand-default" />
          </label>
        ))}
      </div>
    </div>
  );
}

function PrivacySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-[20px] font-semibold text-text-primary mb-1">개인정보 보호</h3>
        <p className="text-[14px] text-text-secondary">데이터 보안 및 개인정보 설정</p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-bg-elevated rounded-lg border border-border-default">
          <h4 className="text-[14px] font-semibold text-text-primary mb-2">데이터 암호화</h4>
          <p className="text-[12px] text-text-secondary mb-3">모든 노트는 암호화되어 저장됩니다</p>
          <div className="flex items-center gap-2 text-[12px] text-status-success">
            <div className="w-2 h-2 rounded-full bg-status-success" />
            활성화됨
          </div>
        </div>

        <div className="p-4 bg-bg-elevated rounded-lg border border-border-default">
          <h4 className="text-[14px] font-semibold text-text-primary mb-2">2단계 인증</h4>
          <p className="text-[12px] text-text-secondary mb-3">추가 보안 계층으로 계정을 보호합니다</p>
          <ButtonPrimary className="text-[12px] px-4 py-2">설정하기</ButtonPrimary>
        </div>
      </div>
    </div>
  );
}

function AppearanceSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-[20px] font-semibold text-text-primary mb-1">테마 설정</h3>
        <p className="text-[14px] text-text-secondary">디자인 및 외형을 사용자 정의하세요</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-[12px] font-semibold text-text-primary mb-3">테마 모드</label>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-bg-elevated border-2 border-brand-default rounded-lg cursor-pointer">
              <div className="text-[14px] font-semibold text-text-primary mb-1">다크 모드</div>
              <div className="text-[12px] text-text-secondary">현재 선택됨</div>
            </div>
            <div className="p-4 bg-bg-elevated border border-border-default rounded-lg cursor-pointer opacity-50">
              <div className="text-[14px] font-semibold text-text-primary mb-1">라이트 모드</div>
              <div className="text-[12px] text-text-disabled">준비 중</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShortcutsSettings() {
  const shortcuts = [
    { key: "Cmd/Ctrl + N", description: "새 노트 생성" },
    { key: "Cmd/Ctrl + K", description: "검색" },
    { key: "Cmd/Ctrl + S", description: "저장" },
    { key: "Cmd/Ctrl + /", description: "단축키 보기" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-[20px] font-semibold text-text-primary mb-1">키보드 단축키</h3>
        <p className="text-[14px] text-text-secondary">빠른 작업을 위한 단축키 목록</p>
      </div>

      <div className="space-y-2">
        {shortcuts.map((shortcut) => (
          <div
            key={shortcut.key}
            className="flex items-center justify-between p-4 bg-bg-elevated rounded-lg"
          >
            <span className="text-[14px] text-text-primary">{shortcut.description}</span>
            <kbd className="px-3 py-1 bg-bg-surface border border-border-default rounded text-[12px] text-text-secondary font-mono">
              {shortcut.key}
            </kbd>
          </div>
        ))}
      </div>
    </div>
  );
}
