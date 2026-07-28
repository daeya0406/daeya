import { signOut } from "@/app/auth-actions";

export function PhoneShell({
  title,
  backHref,
  children,
  footer,
  userLabel,
}: {
  title: string;
  backHref?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** e.g. logged-in host email/name */
  userLabel?: string | null;
}) {
  return (
    <div className="relative mx-auto flex min-h-screen max-w-[390px] flex-col bg-toss-bg shadow-xl sm:my-6 sm:min-h-[844px] sm:rounded-[40px] sm:overflow-hidden">
      {userLabel ? (
        <div className="flex items-center justify-between gap-2 border-b border-toss-line/50 bg-white px-5 py-2 text-[12px]">
          <span className="truncate text-toss-muted">
            <span className="font-semibold text-toss-blue">로그인됨</span>
            {" · "}
            {userLabel}
          </span>
          <form action={signOut}>
            <button type="submit" className="shrink-0 font-semibold text-toss-faint">
              로그아웃
            </button>
          </form>
        </div>
      ) : null}
      <header className="relative flex h-14 shrink-0 items-center justify-center px-5">
        {backHref ? (
          <a
            href={backHref}
            className="absolute left-5 text-lg text-toss-ink"
            aria-label="뒤로"
          >
            ←
          </a>
        ) : null}
        <h1 className="text-[17px] font-semibold text-toss-ink">{title}</h1>
      </header>
      <main className="flex-1 overflow-y-auto px-6 pb-4">{children}</main>
      {footer ? (
        <div className="shrink-0 border-t border-toss-line/40 bg-toss-bg px-6 py-4">
          {footer}
        </div>
      ) : null}
    </div>
  );
}

export function CtaButton({
  children,
  disabled,
  type = "button",
  variant = "primary",
  onClick,
  formAction,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  onClick?: () => void;
  formAction?: (formData: FormData) => void | Promise<void>;
}) {
  const base =
    "flex h-14 w-full items-center justify-center rounded-2xl text-[17px] font-semibold transition disabled:cursor-not-allowed disabled:opacity-40";
  const styles =
    variant === "primary"
      ? "bg-toss-blue text-white"
      : "bg-white text-toss-ink ring-1 ring-toss-line";
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      formAction={formAction}
      className={`${base} ${styles}`}
    >
      {children}
    </button>
  );
}
