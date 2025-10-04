import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";

const Payment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const amount = searchParams.get("amount") || "10500";
  
  const [paymentMethod, setPaymentMethod] = useState("mir");
  const [saveCard, setSaveCard] = useState(false);
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });

  const bookingDetails = {
    propertyTitle: "Современная студия в центре",
    checkIn: "15 окт 2024",
    checkOut: "18 окт 2024",
    nights: 3,
    pricePerNight: 3500,
    serviceFee: 1050,
    total: parseInt(amount)
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Redirect to Mir Payment Gateway
    const mirPaymentUrl = `https://pay.mironline.ru/pay`;
    const params = new URLSearchParams({
      merchant_id: "demo_merchant",
      amount: amount,
      order_id: bookingId || `order_${Date.now()}`,
      description: `Оплата бронирования: ${bookingDetails.propertyTitle}`,
      success_url: `${window.location.origin}/payment/success`,
      fail_url: `${window.location.origin}/payment/fail`,
      return_url: `${window.location.origin}/bookings`
    });

    // Simulate payment redirect
    console.log("Redirecting to Mir Payment:", `${mirPaymentUrl}?${params.toString()}`);
    
    // For demo: show success after delay
    setTimeout(() => {
      navigate("/payment/success");
    }, 1500);
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b p-4">
          <div className="flex items-center gap-3">
            <Button size="icon" variant="ghost" onClick={() => navigate(-1)}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Оплата бронирования</h1>
              <p className="text-sm text-muted-foreground">Защищённый платёж</p>
            </div>
            <Icon name="Lock" size={20} className="text-green-500" />
          </div>
        </div>

        <div className="p-4 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Способ оплаты</h2>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-3">
                  <label 
                    htmlFor="mir"
                    className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      paymentMethod === 'mir' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <RadioGroupItem value="mir" id="mir" />
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-sm">МИР</span>
                      </div>
                      <div>
                        <div className="font-semibold">Карта МИР</div>
                        <div className="text-sm text-muted-foreground">Российская платёжная система</div>
                      </div>
                    </div>
                  </label>

                  <label 
                    htmlFor="card"
                    className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <RadioGroupItem value="card" id="card" />
                    <div className="flex items-center gap-3 flex-1">
                      <Icon name="CreditCard" size={32} className="text-muted-foreground" />
                      <div>
                        <div className="font-semibold">Банковская карта</div>
                        <div className="text-sm text-muted-foreground">Visa, Mastercard</div>
                      </div>
                    </div>
                  </label>

                  <label 
                    htmlFor="sbp"
                    className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      paymentMethod === 'sbp' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <RadioGroupItem value="sbp" id="sbp" />
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <Icon name="Smartphone" size={20} className="text-purple-600" />
                      </div>
                      <div>
                        <div className="font-semibold">Система Быстрых Платежей</div>
                        <div className="text-sm text-muted-foreground">Оплата через банк по QR-коду</div>
                      </div>
                    </div>
                  </label>
                </div>
              </RadioGroup>
            </Card>

            {(paymentMethod === 'mir' || paymentMethod === 'card') && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Данные карты</h2>
                <form onSubmit={handlePayment} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Номер карты</Label>
                    <Input
                      id="cardNumber"
                      placeholder="0000 0000 0000 0000"
                      value={cardData.number}
                      onChange={(e) => setCardData({
                        ...cardData, 
                        number: formatCardNumber(e.target.value.replace(/\s/g, ''))
                      })}
                      maxLength={19}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardName">Имя владельца</Label>
                    <Input
                      id="cardName"
                      placeholder="IVAN IVANOV"
                      value={cardData.name}
                      onChange={(e) => setCardData({...cardData, name: e.target.value.toUpperCase()})}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Срок действия</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({
                          ...cardData, 
                          expiry: formatExpiry(e.target.value)
                        })}
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        type="password"
                        placeholder="•••"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({...cardData, cvv: e.target.value.replace(/\D/g, '')})}
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <Checkbox 
                      id="saveCard" 
                      checked={saveCard}
                      onCheckedChange={(checked) => setSaveCard(checked as boolean)}
                    />
                    <Label htmlFor="saveCard" className="text-sm cursor-pointer">
                      Сохранить карту для будущих платежей
                    </Label>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Icon name="Lock" size={18} className="mr-2" />
                    Оплатить {bookingDetails.total.toLocaleString('ru-RU')} ₽
                  </Button>
                </form>
              </Card>
            )}

            {paymentMethod === 'sbp' && (
              <Card className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-48 h-48 mx-auto bg-white p-4 rounded-lg border-2">
                    <div className="w-full h-full bg-black" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Отсканируйте QR-код в приложении вашего банка
                  </p>
                  <Button className="w-full" size="lg">
                    Я оплатил
                  </Button>
                </div>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Детали бронирования</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold">{bookingDetails.propertyTitle}</p>
                  <p className="text-sm text-muted-foreground">
                    {bookingDetails.checkIn} - {bookingDetails.checkOut}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t">
                  <div className="flex justify-between text-sm">
                    <span>{bookingDetails.pricePerNight} ₽ × {bookingDetails.nights} ночей</span>
                    <span>{(bookingDetails.pricePerNight * bookingDetails.nights).toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Сервисный сбор</span>
                    <span>{bookingDetails.serviceFee.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>

                <div className="flex justify-between font-bold text-lg pt-3 border-t">
                  <span>Итого</span>
                  <span>{bookingDetails.total.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-green-50 border-green-200">
              <div className="flex gap-3">
                <Icon name="Shield" size={20} className="text-green-600 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold text-green-900 mb-1">Безопасная оплата</p>
                  <p className="text-green-700">
                    Ваши данные защищены по стандарту PCI DSS. Платёж пройдёт через защищённое соединение.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
