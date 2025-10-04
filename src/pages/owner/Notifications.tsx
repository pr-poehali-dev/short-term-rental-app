import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { format, subHours, subDays } from "date-fns";
import { ru } from "date-fns/locale";

const Notifications = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const notifications = [
    {
      id: "1",
      type: "booking",
      title: "Новое бронирование",
      message: "Анна Петрова забронировала 'Современная студия в центре' на 15-18 октября",
      propertyId: "1",
      time: subHours(new Date(), 2),
      read: false,
      icon: "Calendar",
      color: "text-primary bg-primary/10"
    },
    {
      id: "2",
      type: "message",
      title: "Новое сообщение",
      message: "Дмитрий Смирнов: 'Подскажите, есть ли парковка рядом с квартирой?'",
      propertyId: "2",
      time: subHours(new Date(), 5),
      read: false,
      icon: "MessageCircle",
      color: "text-accent bg-accent/10"
    },
    {
      id: "3",
      type: "review",
      title: "Новый отзыв",
      message: "Елена Иванова оставила отзыв (5 звёзд) на 'Апартаменты бизнес-класса'",
      propertyId: "2",
      time: subHours(new Date(), 8),
      read: true,
      icon: "Star",
      color: "text-yellow-500 bg-yellow-500/10"
    },
    {
      id: "4",
      type: "booking",
      title: "Подтверждение бронирования",
      message: "Иван Козлов подтвердил бронирование на 20-22 октября",
      propertyId: "3",
      time: subDays(new Date(), 1),
      read: true,
      icon: "CheckCircle",
      color: "text-green-500 bg-green-500/10"
    },
    {
      id: "5",
      type: "payment",
      title: "Получен платёж",
      message: "Поступила оплата 10 500 ₽ за бронирование от Анны Петровой",
      propertyId: "1",
      time: subDays(new Date(), 1),
      read: true,
      icon: "DollarSign",
      color: "text-secondary bg-secondary/10"
    },
    {
      id: "6",
      type: "message",
      title: "Новое сообщение",
      message: "Мария Сидорова: 'Добрый день! Можно ли заселиться раньше 14:00?'",
      propertyId: "1",
      time: subDays(new Date(), 2),
      read: true,
      icon: "MessageCircle",
      color: "text-accent bg-accent/10"
    },
    {
      id: "7",
      type: "booking",
      title: "Отмена бронирования",
      message: "Петр Васильев отменил бронирование на 25-27 октября. Возврат: 8 000 ₽",
      propertyId: "2",
      time: subDays(new Date(), 3),
      read: true,
      icon: "XCircle",
      color: "text-destructive bg-destructive/10"
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = filter === "all" 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  const markAllAsRead = () => {
    // Logic to mark all as read
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button size="icon" variant="ghost" onClick={() => navigate(-1)}>
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div>
                <h1 className="text-xl font-bold">Уведомления</h1>
                {unreadCount > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {unreadCount} непрочитанных
                  </p>
                )}
              </div>
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <Icon name="CheckCheck" size={16} className="mr-2" />
                Прочитать все
              </Button>
            )}
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full grid grid-cols-5 rounded-none">
              <TabsTrigger value="all" onClick={() => setFilter("all")}>
                Все
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2 px-1.5 py-0 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="booking" onClick={() => setFilter("booking")}>
                <Icon name="Calendar" size={16} />
              </TabsTrigger>
              <TabsTrigger value="message" onClick={() => setFilter("message")}>
                <Icon name="MessageCircle" size={16} />
              </TabsTrigger>
              <TabsTrigger value="review" onClick={() => setFilter("review")}>
                <Icon name="Star" size={16} />
              </TabsTrigger>
              <TabsTrigger value="payment" onClick={() => setFilter("payment")}>
                <Icon name="DollarSign" size={16} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="p-4 space-y-2">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <Card 
                key={notification.id}
                className={`p-4 cursor-pointer transition-colors hover:bg-accent/50 ${
                  !notification.read ? 'border-l-4 border-l-primary bg-primary/5' : ''
                }`}
              >
                <div className="flex gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notification.color}`}>
                    <Icon name={notification.icon as any} size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={`font-semibold ${!notification.read ? 'text-primary' : ''}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {format(notification.time, 'HH:mm', { locale: ru })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-2">
                      {notification.type === "message" && (
                        <Button size="sm" variant="outline">
                          <Icon name="Reply" size={14} className="mr-1" />
                          Ответить
                        </Button>
                      )}
                      {notification.type === "booking" && (
                        <Button size="sm" variant="outline">
                          <Icon name="Eye" size={14} className="mr-1" />
                          Посмотреть
                        </Button>
                      )}
                      {notification.type === "review" && (
                        <Button size="sm" variant="outline">
                          <Icon name="MessageSquare" size={14} className="mr-1" />
                          Ответить на отзыв
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Icon name="Bell" size={48} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Нет уведомлений</h3>
              <p className="text-muted-foreground">
                Здесь появятся уведомления о бронированиях и сообщениях
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
