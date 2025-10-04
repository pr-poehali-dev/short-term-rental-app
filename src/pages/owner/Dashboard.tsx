import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      label: "Активных объектов",
      value: "3",
      icon: "Building2",
      trend: "+1 за месяц",
      color: "text-primary"
    },
    {
      label: "Бронирований",
      value: "12",
      icon: "Calendar",
      trend: "+3 за неделю",
      color: "text-secondary"
    },
    {
      label: "Доход за месяц",
      value: "156 000 ₽",
      icon: "DollarSign",
      trend: "+12%",
      color: "text-accent"
    },
    {
      label: "Средний рейтинг",
      value: "4.8",
      icon: "Star",
      trend: "Отлично",
      color: "text-yellow-500"
    }
  ];

  const properties = [
    {
      id: "1",
      title: "Современная студия в центре",
      location: "Москва, Арбат",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
      status: "active",
      price: 3500,
      bookings: 5,
      rating: 4.9
    },
    {
      id: "2",
      title: "Апартаменты бизнес-класса",
      location: "Москва, Кутузовский",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
      status: "active",
      price: 6500,
      bookings: 4,
      rating: 4.7
    },
    {
      id: "3",
      title: "Уютная квартира у парка",
      location: "Санкт-Петербург",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
      status: "inactive",
      price: 4200,
      bookings: 3,
      rating: 4.8
    }
  ];

  const upcomingBookings = [
    {
      id: "1",
      guestName: "Анна Петрова",
      propertyTitle: "Современная студия в центре",
      checkIn: "15 окт",
      checkOut: "18 окт",
      status: "confirmed",
      amount: 10500
    },
    {
      id: "2",
      guestName: "Дмитрий Смирнов",
      propertyTitle: "Апартаменты бизнес-класса",
      checkIn: "20 окт",
      checkOut: "22 окт",
      status: "pending",
      amount: 13000
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b">
          <div className="p-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Кабинет собственника</h1>
              <p className="text-sm text-muted-foreground">Управляйте своими объектами</p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="relative"
                onClick={() => navigate("/owner/notifications")}
              >
                <Icon name="Bell" size={20} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button variant="outline" onClick={() => navigate("/profile")}>
                <Icon name="User" size={18} className="mr-2" />
                Профиль
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg bg-primary/10`}>
                    <Icon name={stat.icon as any} size={24} className={stat.color} />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-xs text-primary">{stat.trend}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Мои объекты</h2>
                <Button onClick={() => navigate("/owner/property/new")}>
                  <Icon name="Plus" size={18} className="mr-2" />
                  Добавить объект
                </Button>
              </div>

              <div className="space-y-3">
                {properties.map((property) => (
                  <Card key={property.id} className="overflow-hidden">
                    <div className="flex gap-4 p-4">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-32 h-32 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h3 className="font-semibold line-clamp-1">{property.title}</h3>
                            <p className="text-sm text-muted-foreground">{property.location}</p>
                          </div>
                          <Badge variant={property.status === 'active' ? 'default' : 'secondary'}>
                            {property.status === 'active' ? 'Активен' : 'Неактивен'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                          <div>
                            <p className="text-muted-foreground">Цена/ночь</p>
                            <p className="font-semibold">{property.price} ₽</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Броней</p>
                            <p className="font-semibold">{property.bookings}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Рейтинг</p>
                            <div className="flex items-center gap-1">
                              <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                              <span className="font-semibold">{property.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigate(`/owner/property/${property.id}/edit`)}
                          >
                            <Icon name="Edit" size={16} className="mr-1" />
                            Редактировать
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigate(`/owner/property/${property.id}/calendar`)}
                          >
                            <Icon name="Calendar" size={16} className="mr-1" />
                            Календарь
                          </Button>
                          <Button size="sm" variant="outline">
                            <Icon name="BarChart3" size={16} className="mr-1" />
                            Статистика
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Ближайшие бронирования</h2>
              <div className="space-y-3">
                {upcomingBookings.map((booking) => (
                  <Card key={booking.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{booking.guestName}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {booking.propertyTitle}
                        </p>
                      </div>
                      <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                        {booking.status === 'confirmed' ? 'Подтверждено' : 'Ожидает'}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Calendar" size={14} />
                        <span>{booking.checkIn} - {booking.checkOut}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="DollarSign" size={14} />
                        <span className="font-semibold text-foreground">{booking.amount} ₽</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      <Icon name="MessageCircle" size={16} className="mr-2" />
                      Написать гостю
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;