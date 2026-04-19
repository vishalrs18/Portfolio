"use client";
import Image from "next/image";
import Chip from "../components/atoms/chip";

const SKILL_SET: { name: string; icon: string }[] = [
  {
    name: "React.js",
    icon: "https://cdn.worldvectorlogo.com/logos/react-2.svg",
  },
  {
    name: "Next.js",
    icon: "https://cdn.worldvectorlogo.com/logos/next-js.svg",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.worldvectorlogo.com/logos/typescript.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.worldvectorlogo.com/logos/javascript.svg",
  },
  { name: "HTML5", icon: "https://cdn.worldvectorlogo.com/logos/html-1.svg" },
  { name: "CSS3", icon: "https://cdn.worldvectorlogo.com/logos/css-3.svg" },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.worldvectorlogo.com/logos/tailwind-css-2.svg",
  },
  { name: "Redux", icon: "https://cdn.worldvectorlogo.com/logos/redux.svg" },
  {
    name: "Node.js",
    icon: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg",
  },
  {
    name: "AWS",
    icon: "https://cdn.worldvectorlogo.com/logos/amazon-web-services-1.svg",
  },
  { name: "Docker", icon: "https://cdn.worldvectorlogo.com/logos/docker.svg" },
  {
    name: "Kubernetes",
    icon: "https://cdn.worldvectorlogo.com/logos/kubernetes.svg",
  },
];

const SkillSet = () => {
  return (
    <div className="flex flex-wrap col-gap-4 gap-2 my-4 p-2]:">
      {SKILL_SET.map((skill) => {
        return (
          <Chip
            key={skill.name}
            chipText={skill.name}
            icon={
              <Image
                src={skill.icon}
                alt={`${skill.name} logo`}
                width={14}
                height={14}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.className = "fill-white";
                  e.currentTarget.src =
                    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXRhZy1pY29uIGx1Y2lkZS10YWciPjxwYXRoIGQ9Ik0xMi41ODYgMi41ODZBMiAyIDAgMCAwIDExLjE3MiAySDRhMiAyIDAgMCAwLTIgMnY3LjE3MmEyIDIgMCAwIDAgLjU4NiAxLjQxNGw4LjcwNCA4LjcwNGEyLjQyNiAyLjQyNiAwIDAgMCAzLjQyIDBsNi41OC02LjU4YTIuNDI2IDIuNDI2IDAgMCAwIDAtMy40MnoiLz48Y2lyY2xlIGN4PSI3LjUiIGN5PSI3LjUiIHI9Ii41IiBmaWxsPSJjdXJyZW50Q29sb3IiLz48L3N2Zz4=";
                }}
              />
            }
          />
        );
      })}
    </div>
  );
};

export default SkillSet;
