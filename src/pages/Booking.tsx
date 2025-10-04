import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockProperties } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { addDays, differenceInDays, format } from "date-fns";
import { ru } from "date-fns/locale";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = mockProperties.find(p => p.id === id);
  
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(1);

  if (!property) {
    return null;
  }

  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const totalPrice = nights * property.price;
  const serviceFee = Math.round(totalPrice * 0.1);
  const finalTotal = totalPrice + serviceFee;

  const handleBooking = () => {
    alert('Бронирование успешно оформлено!');
    navigate('/bookings');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
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
            <h1 className="text-xl font-bold">Бронирование</h1>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <Card className="p-4">
            <div className="flex gap-3">
              <img 
                src={property.image} 
                alt={property.title}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold line-clamp-2">{property.title}</h3>
                <p className="text-sm text-muted-foreground">{property.location}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium">{property.rating}</span>
                </div>
              </div>
            </div>
          </Card>

          <div>
            <Label className="text-base font-semibold mb-3 block">Даты заезда и выезда</Label>
            <Card className="p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Заезд</Label>
                  <div className="text-sm font-medium mt-1">
                    {checkIn ? format(checkIn, 'd MMM', { locale: ru }) : 'Выберите дату'}
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Выезд</Label>
                  <div className="text-sm font-medium mt-1">
                    {checkOut ? format(checkOut, 'd MMM', { locale: ru }) : 'Выберите дату'}
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <Calendar
                mode="range"
                selected={{
                  from: checkIn,
                  to: checkOut
                }}
                onSelect={(range) => {
                  setCheckIn(range?.from);
                  setCheckOut(range?.to);
                }}
                disabled={(date) => date < new Date()}
                className="rounded-md"
              />
            </Card>
          </div>

          <div>
            <Label className="text-base font-semibold mb-3 block">Количество гостей</Label>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <span>Гостей</span>
                <div className="flex items-center gap-3">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    disabled={guests <= 1}
                  >
                    <Icon name="Minus" size={16} />
                  </Button>
                  <span className="w-8 text-center font-semibold">{guests}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setGuests(guests + 1)}
                  >
                    <Icon name="Plus" size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Label className="text-base font-semibold mb-3 block">Контактная информация</Label>
            <Card className="p-4 space-y-4">
              <div>
                <Label htmlFor="name">Имя и фамилия</Label>
                <Input id="name" placeholder="Иван Иванов" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" type="tel" placeholder="+7 (900) 123-45-67" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="example@mail.ru" className="mt-2" />
              </div>
            </Card>
          </div>

          {nights > 0 && (
            <Card className="p-4 space-y-3">
              <h3 className="font-semibold text-lg">Детали оплаты</h3>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{property.price.toLocaleString('ru-RU')} ₽ × {nights} ночей</span>
                  <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Сервисный сбор</span>
                  <span>{serviceFee.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Итого</span>
                <span className="text-primary">{finalTotal.toLocaleString('ru-RU')} ₽</span>
              </div>
            </Card>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 z-50">
        <div className="max-w-md mx-auto">
          <Button 
            size="lg" 
            className="w-full"
            disabled={!checkIn || !checkOut || nights <= 0}
            onClick={handleBooking}
          >
            Забронировать за {finalTotal.toLocaleString('ru-RU')} ₽
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-2">
            С вас пока ничего не будет списано
          </p>
        </div>
      </div>
    </div>
  );
};

export default Booking;
