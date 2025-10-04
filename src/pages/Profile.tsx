import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

const Profile = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: "User", label: "Личные данные", path: "/profile/edit" },
    { icon: "Building2", label: "Кабинет собственника", path: "/auth?type=owner" },
    { icon: "CreditCard", label: "Способы оплаты", path: "/profile/payment" },
    { icon: "Bell", label: "Уведомления", path: "/settings" },
    { icon: "Shield", label: "Безопасность", path: "/profile/security" },
    { icon: "HelpCircle", label: "Помощь", path: "/help" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        <div className="p-4 pb-6 bg-gradient-to-br from-primary via-accent to-secondary">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Профиль</h1>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => navigate("/settings")}
            >
              <Icon name="Settings" size={22} />
            </Button>
          </div>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                <AvatarFallback>ИИ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold">Иван Иванов</h2>
                <p className="text-muted-foreground">ivan@example.com</p>
                <Button
                  variant="link"
                  className="p-0 h-auto mt-1 text-primary"
                  onClick={() => navigate("/profile/edit")}
                >
                  Редактировать профиль
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="p-4 space-y-4">
          <Card className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-sm text-muted-foreground">Поездок</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">4.9</div>
                <div className="text-sm text-muted-foreground">Рейтинг</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">3</div>
                <div className="text-sm text-muted-foreground">Отзыва</div>
              </div>
            </div>
          </Card>

          <div>
            <h3 className="font-semibold mb-3">Мои бронирования</h3>
            <Card>
              <button
                className="w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors"
                onClick={() => navigate("/bookings")}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Calendar" size={24} className="text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold">Активные бронирования</div>
                  <div className="text-sm text-muted-foreground">2 предстоящие поездки</div>
                </div>
                <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
              </button>
              <Separator />
              <button
                className="w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors"
                onClick={() => navigate("/favorites")}
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon name="Heart" size={24} className="text-accent" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold">Избранное</div>
                  <div className="text-sm text-muted-foreground">5 сохраненных объектов</div>
                </div>
                <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
              </button>
            </Card>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Настройки</h3>
            <Card>
              {menuItems.map((item, index) => (
                <div key={item.label}>
                  {index > 0 && <Separator />}
                  <button
                    className="w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors"
                    onClick={() => navigate(item.path)}
                  >
                    <Icon name={item.icon as any} size={20} className="text-muted-foreground" />
                    <span className="flex-1 text-left">{item.label}</span>
                    <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                  </button>
                </div>
              ))}
            </Card>
          </div>

          <Card className="p-4">
            <button className="w-full flex items-center justify-center gap-2 text-destructive font-semibold">
              <Icon name="LogOut" size={20} />
              Выйти из аккаунта
            </button>
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;