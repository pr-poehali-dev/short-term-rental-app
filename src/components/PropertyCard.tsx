import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface PropertyCardProps {
  id: string;
  image: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  features: string[];
  onClick?: () => void;
}

export const PropertyCard = ({
  image,
  title,
  location,
  price,
  rating,
  reviews,
  features,
  onClick,
}: PropertyCardProps) => {
  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 border-0 bg-card"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
            <Icon name="Heart" size={20} className="text-gray-700" />
          </button>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-foreground line-clamp-1">{title}</h3>
          <div className="flex items-center gap-1 text-muted-foreground mt-1">
            <Icon name="MapPin" size={14} />
            <span className="text-sm line-clamp-1">{location}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="font-medium text-sm">{rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">({reviews} отзывов)</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {features.slice(0, 3).map((feature, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>
        
        <div className="pt-2 border-t">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-2xl font-bold text-primary">{price.toLocaleString('ru-RU')} ₽</span>
              <span className="text-sm text-muted-foreground ml-1">/ сутки</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
