import { NavLink } from "react-router-dom";
import {Home, Category, Cart, Info} from "../../assets/icons"
const items = [
    {
      label: "Inicio",
      path: "/",
      icon: Home,
    },
    {
      label: "Categorías",
      path: "/categories",
      icon: Category,
    },
    {
      label: "Carrito",
      path: "/cart",
      icon: Cart,
    },
    {
      label: "Nosotros",
      path: "/about",
      icon: Info,
    },
  ];

export default function Footer() {
  return (
    <footer className="bg-bg h-15 w-full fixed z-20 inset-x-0 bottom-0 border-t border-t-black/70">
        <div className="flex flex-row justify-around items-center h-full">
            {items.map(({ label, path, icon: Icon }) => (
                <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                    `flex flex-col items-center justify-center ${
                        isActive ? "text-alt" : "text-black"
                    }`
                    }
                >
                    <Icon className="size-5" />
                    <span className="text-md font-Outfit">{label}</span>
                </NavLink>
            ))}
        </div>
    </footer>
  )
}
