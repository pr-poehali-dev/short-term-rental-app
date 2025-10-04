import { useNavigate, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/", icon: "Search", label: "Поиск" },
    { path: "/map", icon: "Map", label: "Карта" },
    { path: "/favorites", icon: "Heart", label: "Избранное" },
    { path: "/bookings", icon: "Calendar", label: "Бронь" },
    { path: "/profile", icon: "User", label: "Профиль" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon 
                name={item.icon as any} 
                size={22}
                className={isActive ? "fill-primary" : ""}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
