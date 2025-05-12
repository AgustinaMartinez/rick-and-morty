import Image from "next/image";

export const Header = () => (
  <header className="flex justify-center">
    <Image
      src="/images/rick-and-morty-logo.webp"
      alt="Rick and Morty logo"
      width={600}
      height={40}
      priority
    />
  </header>
);
