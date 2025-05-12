import "./style.css";

export const Loading = () => {
  return (
    <div
      className="flex items-center justify-center h-screen bg-transparent"
      data-testid="loader"
    >
      <div className="flex gap-4">
        <span className="w-10 h-10 bg-[var(--green)] rounded-full animate-[scalePulse_1s_ease-in-out_infinite] [animation-delay:0ms]" />
        <span className="w-10 h-10 bg-[var(--dark-blue)] rounded-full animate-[scalePulse_1s_ease-in-out_infinite] [animation-delay:100ms]" />
        <span className="w-10 h-10 bg-[var(--light-blue)] rounded-full animate-[scalePulse_1s_ease-in-out_infinite] [animation-delay:200ms]" />
        <span className="w-10 h-10 bg-[var(--gray)] rounded-full animate-[scalePulse_1s_ease-in-out_infinite] [animation-delay:300ms]" />
      </div>
    </div>
  );
};
