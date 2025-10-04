import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("type") || "guest";
  
  const [guestData, setGuestData] = useState({
    email: "",
    password: "",
    name: ""
  });
  
  const [ownerData, setOwnerData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    agreeTerms: false
  });

  const [isLogin, setIsLogin] = useState(true);

  const handleGuestAuth = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  const handleOwnerAuth = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/owner/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-3xl font-bold mb-2">
            <Icon name="Home" size={32} className="text-primary" />
            <span>HomeStay</span>
          </div>
          <p className="text-muted-foreground">
            {isLogin ? "Войдите в свой аккаунт" : "Создайте новый аккаунт"}
          </p>
        </div>

        <Card className="p-6">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="guest">Я гость</TabsTrigger>
              <TabsTrigger value="owner">Я собственник</TabsTrigger>
            </TabsList>

            <TabsContent value="guest">
              <form onSubmit={handleGuestAuth} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="guest-name">Имя</Label>
                    <Input
                      id="guest-name"
                      placeholder="Введите ваше имя"
                      value={guestData.name}
                      onChange={(e) => setGuestData({...guestData, name: e.target.value})}
                      required
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="guest-email">Email</Label>
                  <Input
                    id="guest-email"
                    type="email"
                    placeholder="your@email.com"
                    value={guestData.email}
                    onChange={(e) => setGuestData({...guestData, email: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guest-password">Пароль</Label>
                  <Input
                    id="guest-password"
                    type="password"
                    placeholder="••••••••"
                    value={guestData.password}
                    onChange={(e) => setGuestData({...guestData, password: e.target.value})}
                    required
                  />
                </div>

                {isLogin && (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox id="remember" />
                      <span className="text-muted-foreground">Запомнить меня</span>
                    </label>
                    <Button variant="link" className="p-0 h-auto text-primary">
                      Забыли пароль?
                    </Button>
                  </div>
                )}

                <Button type="submit" className="w-full" size="lg">
                  {isLogin ? "Войти" : "Зарегистрироваться"}
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">или</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" type="button">
                    <Icon name="Chrome" size={18} className="mr-2" />
                    Google
                  </Button>
                  <Button variant="outline" type="button">
                    <Icon name="Facebook" size={18} className="mr-2" />
                    Facebook
                  </Button>
                </div>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">
                    {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}
                  </span>{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto font-semibold"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? "Зарегистрироваться" : "Войти"}
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="owner">
              <form onSubmit={handleOwnerAuth} className="space-y-4">
                {!isLogin && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="owner-name">Полное имя</Label>
                      <Input
                        id="owner-name"
                        placeholder="Иван Иванов"
                        value={ownerData.name}
                        onChange={(e) => setOwnerData({...ownerData, name: e.target.value})}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="owner-phone">Телефон</Label>
                      <Input
                        id="owner-phone"
                        type="tel"
                        placeholder="+7 (999) 123-45-67"
                        value={ownerData.phone}
                        onChange={(e) => setOwnerData({...ownerData, phone: e.target.value})}
                        required
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="owner-email">Email</Label>
                  <Input
                    id="owner-email"
                    type="email"
                    placeholder="owner@email.com"
                    value={ownerData.email}
                    onChange={(e) => setOwnerData({...ownerData, email: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="owner-password">Пароль</Label>
                  <Input
                    id="owner-password"
                    type="password"
                    placeholder="••••••••"
                    value={ownerData.password}
                    onChange={(e) => setOwnerData({...ownerData, password: e.target.value})}
                    required
                  />
                </div>

                {!isLogin && (
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="terms"
                      checked={ownerData.agreeTerms}
                      onCheckedChange={(checked) => 
                        setOwnerData({...ownerData, agreeTerms: checked as boolean})
                      }
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground leading-none cursor-pointer">
                      Я согласен с{" "}
                      <Button variant="link" className="p-0 h-auto text-primary">
                        условиями использования
                      </Button>{" "}
                      и{" "}
                      <Button variant="link" className="p-0 h-auto text-primary">
                        политикой конфиденциальности
                      </Button>
                    </label>
                  </div>
                )}

                <Button type="submit" className="w-full" size="lg">
                  <Icon name="Building2" size={18} className="mr-2" />
                  {isLogin ? "Войти как собственник" : "Зарегистрироваться"}
                </Button>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">
                    {isLogin ? "Нет аккаунта собственника?" : "Уже есть аккаунт?"}
                  </span>{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto font-semibold"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? "Зарегистрироваться" : "Войти"}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-muted-foreground"
          >
            <Icon name="ArrowLeft" size={18} className="mr-2" />
            Вернуться назад
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
