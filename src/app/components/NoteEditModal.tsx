import { useState } from "react";
import { Modal } from "./Modal";
import { Input, Textarea } from "./Input";
import { AITagChip } from "./Tag";
import { ButtonPrimary, ButtonGhost } from "./Button";
import { Sparkles } from "lucide-react";

interface NoteEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: { title: string; content: string }) => void;
  onDelete?: () => void;
  initialTitle?: string;
  initialContent?: string;
  initialTags?: string[];
}

export function NoteEditModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialTitle = "",
  initialContent = "",
  initialTags = []
}: NoteEditModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [tagsLoading, setTagsLoading] = useState(false);
  const [tags, setTags] = useState(initialTags);

  const handleSave = () => {
    onSave?.({ title, content });
    onClose();
  };

  const generateAITags = () => {
    setTagsLoading(true);
    // Simulate AI tag generation
    setTimeout(() => {
      setTags(["생성성", "UX리서치", "인사이트"]);
      setTagsLoading(false);
    }, 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-[600px]">
      <div className="p-8">
        {/* Title Input */}
        <Input
          placeholder="제목 없음"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          borderless
          className="text-[20px] font-semibold mb-0 px-0"
        />

        {/* Divider */}
        <div className="h-px bg-border-subtle my-4" />

        {/* Content Textarea */}
        <Textarea
          placeholder="내용을 입력하세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          borderless
          className="min-h-[240px] mb-0 px-0"
        />

        {/* AI Tagging Section */}
        <div className="border-t border-border-subtle pt-4 mt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-default" />
              <span className="text-[12px] font-semibold text-text-primary">AI 자동 태그</span>
              {tagsLoading && (
                <span className="text-[12px] text-text-disabled">생성 중...</span>
              )}
            </div>
            {!tagsLoading && tags.length === 0 && (
              <button
                onClick={generateAITags}
                className="text-[12px] text-brand-default hover:text-brand-hover transition-colors"
              >
                생성하기
              </button>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tagsLoading ? (
              <>
                <AITagChip label="" loading />
                <AITagChip label="" loading />
                <AITagChip label="" loading />
              </>
            ) : (
              tags.map((tag, index) => (
                <AITagChip key={index} label={tag} delay={index * 0.05} />
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border-subtle">
          <span className="text-[12px] text-text-disabled">마지막 수정 2분 전</span>
          <div className="flex items-center gap-3">
            <ButtonGhost onClick={onDelete} className="text-status-error hover:text-status-error">
              삭제
            </ButtonGhost>
            <ButtonPrimary onClick={handleSave}>저장</ButtonPrimary>
          </div>
        </div>
      </div>
    </Modal>
  );
}
