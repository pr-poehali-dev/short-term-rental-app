import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

const Settings = () => {
  const navigate = useNavigate();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [dealsNotifications, setDealsNotifications] = useState(true);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b p-4">
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => navigate(-1)}
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <h1 className="text-xl font-bold">Настройки</h1>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">Уведомления</h2>
            <Card className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push">Push-уведомления</Label>
                  <p className="text-sm text-muted-foreground">
                    Важные обновления о бронированиях
                  </p>
                </div>
                <Switch
                  id="push"
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email">Email уведомления</Label>
                  <p className="text-sm text-muted-foreground">
                    Письма о подтверждении брони
                  </p>
                </div>
                <Switch
                  id="email"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms">SMS уведомления</Label>
                  <p className="text-sm text-muted-foreground">
                    СМС о важных событиях
                  </p>
                </div>
                <Switch
                  id="sms"
                  checked={smsNotifications}
                  onCheckedChange={setSmsNotifications}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="deals">Специальные предложения</Label>
                  <p className="text-sm text-muted-foreground">
                    Скидки и акции на жилье
                  </p>
                </div>
                <Switch
                  id="deals"
                  checked={dealsNotifications}
                  onCheckedChange={setDealsNotifications}
                />
              </div>
            </Card>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Приложение</h2>
            <Card>
              <button
                className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon name="Globe" size={20} className="text-muted-foreground" />
                  <div className="text-left">
                    <div className="font-medium">Язык</div>
                    <div className="text-sm text-muted-foreground">Русский</div>
                  </div>
                </div>
                <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
              </button>
              <Separator />
              <button
                className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon name="DollarSign" size={20} className="text-muted-foreground" />
                  <div className="text-left">
                    <div className="font-medium">Валюта</div>
                    <div className="text-sm text-muted-foreground">₽ Рубль</div>
                  </div>
                </div>
                <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
              </button>
            </Card>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">О приложении</h2>
            <Card>
              <button
                className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon name="FileText" size={20} className="text-muted-foreground" />
                  <span>Условия использования</span>
                </div>
                <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
              </button>
              <Separator />
              <button
                className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon name="Shield" size={20} className="text-muted-foreground" />
                  <span>Политика конфиденциальности</span>
                </div>
                <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
              </button>
              <Separator />
              <button
                className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon name="Info" size={20} className="text-muted-foreground" />
                  <div className="text-left">
                    <div className="font-medium">Версия приложения</div>
                    <div className="text-sm text-muted-foreground">1.0.0</div>
                  </div>
                </div>
              </button>
            </Card>
          </div>

          <Card className="p-4">
            <button className="w-full flex items-center justify-center gap-2 text-destructive font-semibold">
              <Icon name="Trash2" size={20} />
              Удалить аккаунт
            </button>
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Settings;
