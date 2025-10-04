import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { PropertyCard } from "@/components/PropertyCard";
import { mockProperties } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const MapView = () => {
  const navigate = useNavigate();
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const selectedPropertyData = mockProperties.find(p => p.id === selectedProperty);

  return (
    <div className="min-h-screen bg-background pb-20 relative">
      <div className="max-w-md mx-auto h-screen relative">
        <div className="absolute top-0 left-0 right-0 z-30 p-4">
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white hover:bg-white/90 shadow-lg"
              onClick={() => navigate("/")}
            >
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Назад
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="bg-white hover:bg-white/90 shadow-lg ml-auto"
            >
              <Icon name="SlidersHorizontal" size={18} />
            </Button>
          </div>
        </div>

        <div className="h-full w-full bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {mockProperties.map((property, index) => {
            const positions = [
              { top: '20%', left: '30%' },
              { top: '35%', left: '60%' },
              { top: '50%', left: '25%' },
              { top: '65%', left: '70%' },
              { top: '30%', left: '50%' },
            ];
            
            const position = positions[index % positions.length];
            const isSelected = selectedProperty === property.id;

            return (
              <button
                key={property.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                  isSelected ? 'scale-110 z-20' : 'z-10 hover:scale-105'
                }`}
                style={{ top: position.top, left: position.left }}
                onClick={() => setSelectedProperty(property.id)}
              >
                <Card className={`px-3 py-2 shadow-lg border-2 ${
                  isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-white bg-white'
                }`}>
                  <div className="flex items-center gap-2">
                    <Icon name="Home" size={16} />
                    <span className="font-semibold text-sm whitespace-nowrap">
                      {property.price.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </Card>
              </button>
            );
          })}

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <Icon name="MapPin" size={32} className="text-primary animate-pulse" />
          </div>
        </div>

        {selectedPropertyData && (
          <div className="absolute bottom-24 left-0 right-0 z-30 p-4 animate-in slide-in-from-bottom-4">
            <PropertyCard
              {...selectedPropertyData}
              onClick={() => navigate(`/property/${selectedPropertyData.id}`)}
            />
          </div>
        )}

        <div className="absolute bottom-24 right-4 z-30 flex flex-col gap-2">
          <Button
            size="icon"
            className="rounded-full shadow-lg h-12 w-12 bg-white text-foreground hover:bg-white/90"
          >
            <Icon name="Plus" size={20} />
          </Button>
          <Button
            size="icon"
            className="rounded-full shadow-lg h-12 w-12 bg-white text-foreground hover:bg-white/90"
          >
            <Icon name="Minus" size={20} />
          </Button>
          <Button
            size="icon"
            className="rounded-full shadow-lg h-12 w-12 bg-white text-foreground hover:bg-white/90"
          >
            <Icon name="Locate" size={20} />
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default MapView;
