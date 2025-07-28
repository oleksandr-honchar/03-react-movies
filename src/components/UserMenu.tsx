// src/components/UserMenu.tsx

import { HiUser } from "react-icons/hi";
import css from "./UserMenu.module.css";

interface UserMenuProps {
  name: string;
}

export default function UserMenu({ name }: UserMenuProps) {
  return (
	  <div>
		<HiUser className={css.icon} size={24} /> {name}
      </div>
  );
}
