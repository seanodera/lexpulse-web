"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  const path = usePathname();

  return (
    <Link
      href={to}
      className={`font-medium group ${
        (to !== "/" && path.includes(to)) || path === to
          ? "text-primary active"
          : "text-gray-500"
      }`}
    >
      {children}
      <div
        className={`hidden md:block h-0.5 bg-dark ${
          (to !== "/" && path.includes(to)) || path === to
            ? "scale-100 bg-current"
            : "scale-x-0"
        } group-hover:scale-100 bg-primary transition-transform origin-left rounded-full duration-300 ease-out `}
      />
    </Link>
  );
}
