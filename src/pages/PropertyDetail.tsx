import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockProperties, mockReviews } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Icon from "@/components/ui/icon";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const property = mockProperties.find(p => p.id === id);
  const reviews = mockReviews.filter(r => r.propertyId === id);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Объект не найден</h2>
          <Button onClick={() => navigate("/")}>Вернуться к поиску</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              {property.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-80 bg-muted">
                    <img 
                      src={image} 
                      alt={`${property.title} - фото ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>

          <div className="absolute top-4 left-4 right-4 flex justify-between">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
              onClick={() => navigate(-1)}
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Icon 
                name="Heart" 
                size={20} 
                className={isFavorite ? "fill-red-500 text-red-500" : ""} 
              />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <Icon name="MapPin" size={16} />
              <span>{property.location}</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <button 
                onClick={() => navigate(`/reviews/${id}`)}
                className="flex items-center gap-1 hover:opacity-80 transition-opacity"
              >
                <Icon name="Star" size={18} className="text-yellow-500 fill-yellow-500" />
                <span className="font-semibold">{property.rating}</span>
                <span className="text-sm text-muted-foreground">({property.reviews} отзывов)</span>
              </button>
            </div>
          </div>

          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Стоимость</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-primary">
                    {property.price.toLocaleString('ru-RU')} ₽
                  </span>
                  <span className="text-muted-foreground mb-1">/ сутки</span>
                </div>
              </div>
              <Button onClick={() => navigate(`/booking/${property.id}`)}>
                Забронировать
                <Icon name="ArrowRight" size={18} className="ml-2" />
              </Button>
            </div>
          </Card>

          <div>
            <h2 className="text-xl font-bold mb-3">Описание</h2>
            <p className="text-muted-foreground leading-relaxed">{property.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Удобства</h2>
            <div className="grid grid-cols-2 gap-3">
              {property.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Check" size={18} className="text-primary" />
                  </div>
                  <span className="text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Особенности</h2>
            <div className="flex flex-wrap gap-2">
              {property.features.map((feature, index) => (
                <Badge key={index} variant="secondary" className="px-4 py-2">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold">Отзывы</h2>
              <Button variant="ghost" size="sm">
                Все отзывы
                <Icon name="ChevronRight" size={16} className="ml-1" />
              </Button>
            </div>
            <div className="space-y-4">
              {reviews.slice(0, 2).map((review) => (
                <Card key={review.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={review.avatar} />
                      <AvatarFallback>{review.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{review.author}</h4>
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-medium">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{review.text}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(review.date), 'd MMMM yyyy', { locale: ru })}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Card className="p-4">
            <h3 className="font-semibold mb-3">Расположение</h3>
            <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
              <Icon name="Map" size={48} className="text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mt-3">{property.location}</p>
          </Card>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 z-50">
        <div className="max-w-md mx-auto flex gap-3">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={() => window.open(`tel:+79001234567`)}
          >
            <Icon name="Phone" size={20} className="mr-2" />
            Позвонить
          </Button>
          <Button 
            size="lg" 
            className="flex-1"
            onClick={() => navigate(`/booking/${property.id}`)}
          >
            Забронировать
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;