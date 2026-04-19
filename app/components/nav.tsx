"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Skills", href: "/skills" },
  { name: "Experience", href: "/experience" },
  { name: "Contact", href: "/contact" },
];
export const NavigationMenu = () => {
  const path = usePathname();

  return (
    <nav>
      <ul className="flex space-x-8">
        {MENU_ITEMS.map((item) => {
          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`text-[#ADAAAB] text-base/normal hover:text-app-theme transition-colors duration-300  ${path === item.href ? "text-app-theme underline-offset-4 underline" : ""}`}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
