"use client";

type Props = {
  open: boolean;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  pending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

/** Prototype-style bottom sheet confirm (TossUI.confirm) */
export function ConfirmSheet({
  open,
  title,
  message,
  confirmText = "확인",
  cancelText = "닫기",
  pending,
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="absolute inset-0 z-50 flex items-end bg-black/40"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget && !pending) onCancel();
      }}
    >
      <div className="w-full translate-y-0 rounded-t-[20px] bg-white px-5 pb-[calc(20px+env(safe-area-inset-bottom))] pt-2 shadow-lg">
        <div className="mx-auto mb-5 mt-1 h-1 w-10 rounded-full bg-toss-line" />
        <p className="mb-2 whitespace-pre-line text-[20px] font-bold leading-snug text-toss-ink">
          {title}
        </p>
        {message ? (
          <p className="mb-6 text-[15px] leading-relaxed text-toss-muted">{message}</p>
        ) : (
          <div className="mb-6" />
        )}
        <button
          type="button"
          disabled={pending}
          onClick={onConfirm}
          className="flex h-14 w-full items-center justify-center rounded-2xl bg-toss-blue text-[17px] font-semibold text-white disabled:opacity-50"
        >
          {pending ? "처리 중…" : confirmText}
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={onCancel}
          className="mt-1 flex h-12 w-full items-center justify-center text-[16px] font-semibold text-toss-muted"
        >
          {cancelText}
        </button>
      </div>
    </div>
  );
}
