import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <Icon name="CheckCircle" size={48} className="text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Оплата прошла успешно!</h1>
        <p className="text-muted-foreground mb-6">
          Ваше бронирование подтверждено. Информация отправлена на вашу электронную почту.
        </p>

        <div className="space-y-4">
          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Номер бронирования</span>
              <span className="font-mono font-semibold">#BR-2024-1015</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Сумма</span>
              <span className="font-bold text-lg">10 500 ₽</span>
            </div>
          </Card>

          <div className="space-y-2">
            <Button onClick={() => navigate("/bookings")} className="w-full" size="lg">
              <Icon name="Calendar" size={18} className="mr-2" />
              Мои бронирования
            </Button>
            <Button onClick={() => navigate("/")} variant="outline" className="w-full" size="lg">
              <Icon name="Home" size={18} className="mr-2" />
              На главную
            </Button>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-3">Вам также может понравиться:</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Icon name="Download" size={14} className="mr-1" />
                Скачать чек
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Icon name="Share2" size={14} className="mr-1" />
                Поделиться
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
