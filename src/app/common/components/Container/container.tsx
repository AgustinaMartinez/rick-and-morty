export const Container = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none lg:bg-desktop md:bg-desktop bg-mobile" />
      <div className="absolute inset-0 bg-[var(--black)]/70 z-10" />
      <div className="relative z-10 flex flex-col">{children}</div>
    </div>
  );
};
