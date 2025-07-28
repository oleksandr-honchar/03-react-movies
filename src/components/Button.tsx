// src/components/Button.tsx

import clsx from "clsx";
import css from "./Button.module.css";

interface ButtonProps {
  variant?: "primary" | "secondary";
  text: string;
}

export default function Button({ variant, text }: ButtonProps) {
  return (
    <button className={clsx(css.button, variant && css[variant])}>
      {text}
    </button>
  );
}
