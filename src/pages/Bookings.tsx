import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { format, addDays } from "date-fns";
import { ru } from "date-fns/locale";

const Bookings = () => {
  const navigate = useNavigate();

  const upcomingBookings = [
    {
      id: "1",
      propertyTitle: "Современная студия в центре",
      location: "Москва, Арбат",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
      checkIn: addDays(new Date(), 5),
      checkOut: addDays(new Date(), 8),
      guests: 2,
      totalPrice: 10500,
      status: "confirmed"
    },
    {
      id: "2",
      propertyTitle: "Апартаменты бизнес-класса",
      location: "Москва, Кутузовский проспект",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
      checkIn: addDays(new Date(), 15),
      checkOut: addDays(new Date(), 17),
      guests: 1,
      totalPrice: 13000,
      status: "confirmed"
    }
  ];

  const pastBookings = [
    {
      id: "3",
      propertyTitle: "Квартира у парка",
      location: "Санкт-Петербург",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
      checkIn: addDays(new Date(), -20),
      checkOut: addDays(new Date(), -17),
      guests: 2,
      totalPrice: 12600,
      status: "completed"
    }
  ];

  const BookingCard = ({ booking, showActions = true }: any) => (
    <Card className="overflow-hidden">
      <div className="flex gap-3 p-4">
        <img 
          src={booking.image} 
          alt={booking.propertyTitle}
          className="w-24 h-24 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold line-clamp-2">{booking.propertyTitle}</h3>
            <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
              {booking.status === 'confirmed' ? 'Подтверждено' : 'Завершено'}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
            <Icon name="MapPin" size={14} />
            <span className="truncate">{booking.location}</span>
          </div>
          <div className="text-sm space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Icon name="Calendar" size={14} />
              <span>
                {format(booking.checkIn, 'd MMM', { locale: ru })} - {format(booking.checkOut, 'd MMM yyyy', { locale: ru })}
              </span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Icon name="Users" size={14} />
              <span>{booking.guests} {booking.guests === 1 ? 'гость' : 'гостя'}</span>
            </div>
          </div>
        </div>
      </div>
      {showActions && (
        <div className="border-t p-4 flex gap-2">
          <Button variant="outline" className="flex-1" size="sm">
            <Icon name="MessageCircle" size={16} className="mr-2" />
            Написать
          </Button>
          <Button className="flex-1" size="sm">
            <Icon name="Info" size={16} className="mr-2" />
            Детали
          </Button>
        </div>
      )}
    </Card>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b">
          <div className="p-4">
            <h1 className="text-2xl font-bold">Мои бронирования</h1>
          </div>

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="w-full grid grid-cols-2 rounded-none">
              <TabsTrigger value="upcoming">Предстоящие</TabsTrigger>
              <TabsTrigger value="past">Прошедшие</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="p-4 space-y-4 mt-0">
              {upcomingBookings.length > 0 ? (
                upcomingBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Icon name="Calendar" size={48} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Нет предстоящих бронирований</h3>
                  <p className="text-muted-foreground mb-6">
                    Найдите идеальное место для отдыха
                  </p>
                  <Button onClick={() => navigate("/")}>
                    Начать поиск
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="p-4 space-y-4 mt-0">
              {pastBookings.length > 0 ? (
                pastBookings.map((booking) => (
                  <div key={booking.id} className="space-y-3">
                    <BookingCard booking={booking} showActions={false} />
                    <Button variant="outline" className="w-full" size="sm">
                      <Icon name="Star" size={16} className="mr-2" />
                      Оставить отзыв
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Icon name="Clock" size={48} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">История пуста</h3>
                  <p className="text-muted-foreground">
                    Здесь появятся завершенные бронирования
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Bookings;
