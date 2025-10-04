import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from "date-fns";
import { ru } from "date-fns/locale";

const PropertyCalendar = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [basePrice] = useState(3500);
  const [customPrice, setCustomPrice] = useState("");

  const bookedDates = [
    { start: addDays(new Date(), 5), end: addDays(new Date(), 8), guestName: "Анна Петрова" },
    { start: addDays(new Date(), 15), end: addDays(new Date(), 17), guestName: "Иван Смирнов" }
  ];

  const customPrices = [
    { date: addDays(new Date(), 20), price: 5000 },
    { date: addDays(new Date(), 21), price: 5000 },
    { date: addDays(new Date(), 25), price: 4500 }
  ];

  const blockedDates = [
    addDays(new Date(), 30),
    addDays(new Date(), 31)
  ];

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const isDateBooked = (date: Date) => {
    return bookedDates.some(booking => 
      date >= booking.start && date <= booking.end
    );
  };

  const isDateBlocked = (date: Date) => {
    return blockedDates.some(blocked => isSameDay(blocked, date));
  };

  const getCustomPrice = (date: Date) => {
    return customPrices.find(cp => isSameDay(cp.date, date))?.price;
  };

  const getDayStatus = (date: Date) => {
    if (isDateBooked(date)) return "booked";
    if (isDateBlocked(date)) return "blocked";
    if (getCustomPrice(date)) return "custom-price";
    return "available";
  };

  const handlePriceUpdate = () => {
    if (selectedDate && customPrice) {
      setCustomPrice("");
    }
  };

  const nextMonth = () => {
    setCurrentMonth(addDays(currentMonth, 30));
  };

  const prevMonth = () => {
    setCurrentMonth(addDays(currentMonth, -30));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b p-4">
          <div className="flex items-center gap-3">
            <Button size="icon" variant="ghost" onClick={() => navigate(-1)}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Календарь и цены</h1>
              <p className="text-sm text-muted-foreground">Современная студия в центре</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Базовая цена:</span>
              <span className="font-bold text-lg">{basePrice} ₽</span>
            </div>
          </div>
        </div>

        <div className="p-4 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <Button variant="outline" size="icon" onClick={prevMonth}>
                  <Icon name="ChevronLeft" size={20} />
                </Button>
                <h2 className="text-xl font-semibold">
                  {format(currentMonth, 'LLLL yyyy', { locale: ru })}
                </h2>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <Icon name="ChevronRight" size={20} />
                </Button>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
                  <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: monthStart.getDay() === 0 ? 6 : monthStart.getDay() - 1 }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                
                {daysInMonth.map(date => {
                  const status = getDayStatus(date);
                  const price = getCustomPrice(date);
                  const isSelected = selectedDate && isSameDay(date, selectedDate);
                  
                  return (
                    <button
                      key={date.toISOString()}
                      onClick={() => setSelectedDate(date)}
                      disabled={!isSameMonth(date, currentMonth)}
                      className={`
                        aspect-square p-1 rounded-lg border-2 transition-all relative
                        ${!isSameMonth(date, currentMonth) ? 'opacity-30 cursor-not-allowed' : ''}
                        ${isToday(date) ? 'border-primary' : 'border-transparent'}
                        ${isSelected ? 'ring-2 ring-primary' : ''}
                        ${status === 'booked' ? 'bg-secondary/50' : ''}
                        ${status === 'blocked' ? 'bg-destructive/20' : ''}
                        ${status === 'custom-price' ? 'bg-accent' : ''}
                        ${status === 'available' ? 'hover:bg-accent' : ''}
                      `}
                    >
                      <div className="text-sm font-semibold">
                        {format(date, 'd')}
                      </div>
                      {price && (
                        <div className="text-xs text-primary font-semibold">
                          {price}₽
                        </div>
                      )}
                      {status === 'booked' && (
                        <div className="absolute top-1 right-1">
                          <div className="w-2 h-2 bg-secondary rounded-full" />
                        </div>
                      )}
                      {status === 'blocked' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon name="X" size={16} className="text-destructive" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border-2 border-primary" />
                  <span className="text-sm text-muted-foreground">Сегодня</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-secondary/50" />
                  <span className="text-sm text-muted-foreground">Забронировано</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-accent" />
                  <span className="text-sm text-muted-foreground">Своя цена</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-destructive/20" />
                  <span className="text-sm text-muted-foreground">Заблокировано</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            {selectedDate && (
              <Card className="p-4">
                <h3 className="font-semibold mb-3">
                  {format(selectedDate, 'd MMMM yyyy', { locale: ru })}
                </h3>
                
                {isDateBooked(selectedDate) ? (
                  <div className="space-y-3">
                    <Badge>Забронировано</Badge>
                    <div className="text-sm space-y-1">
                      <p className="text-muted-foreground">Гость:</p>
                      <p className="font-semibold">
                        {bookedDates.find(b => selectedDate >= b.start && selectedDate <= b.end)?.guestName}
                      </p>
                    </div>
                  </div>
                ) : isDateBlocked(selectedDate) ? (
                  <div className="space-y-3">
                    <Badge variant="destructive">Заблокировано</Badge>
                    <Button variant="outline" className="w-full">
                      <Icon name="Unlock" size={16} className="mr-2" />
                      Разблокировать дату
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Установить цену</Label>
                      <Input
                        type="number"
                        placeholder={`${basePrice} ₽`}
                        value={customPrice}
                        onChange={(e) => setCustomPrice(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Базовая цена: {basePrice} ₽
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handlePriceUpdate} className="flex-1">
                        <Icon name="Check" size={16} className="mr-2" />
                        Сохранить
                      </Button>
                      <Button variant="outline">
                        <Icon name="Lock" size={16} className="mr-2" />
                        Заблокировать
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            )}

            <Card className="p-4">
              <h3 className="font-semibold mb-3">Быстрые действия</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="DollarSign" size={16} className="mr-2" />
                  Изменить базовую цену
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Calendar" size={16} className="mr-2" />
                  Массовое изменение цен
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Lock" size={16} className="mr-2" />
                  Заблокировать период
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3">Ближайшие бронирования</h3>
              <div className="space-y-3">
                {bookedDates.map((booking, index) => (
                  <div key={index} className="text-sm space-y-1 pb-3 border-b last:border-0">
                    <p className="font-semibold">{booking.guestName}</p>
                    <p className="text-muted-foreground">
                      {format(booking.start, 'd MMM', { locale: ru })} - {format(booking.end, 'd MMM', { locale: ru })}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCalendar;
