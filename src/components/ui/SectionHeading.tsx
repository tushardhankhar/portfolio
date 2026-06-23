import { type ReactNode } from "react";
import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** small uppercase label above the title */
  eyebrow?: string;
  /** large display title */
  title: ReactNode;
  /** optional supporting line under the title */
  intro?: ReactNode;
  /** index marker e.g. "02" shown faintly to the side */
  index?: string;
  align?: "left" | "center";
  className?: string;
}

/** Editorial section header: eyebrow · big display title · optional intro. */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  index,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <Reveal className="flex items-center gap-4">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        {index && (
          <span
            className="text-faint text-xs font-medium tracking-widest"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {index}
          </span>
        )}
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="display display-lg gradient-text max-w-3xl">{title}</h2>
      </Reveal>

      {intro && (
        <Reveal delay={0.16}>
          <p
            className="text-muted-luxe max-w-xl text-[1.02rem] leading-relaxed"
            style={{ fontFamily: "var(--font-raleway)" }}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
