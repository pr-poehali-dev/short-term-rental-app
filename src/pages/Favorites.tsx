import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { PropertyCard } from "@/components/PropertyCard";
import { mockProperties } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites] = useState(mockProperties.slice(0, 3));

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b p-4">
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => navigate("/")}
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <h1 className="text-xl font-bold">Избранное</h1>
          </div>
        </div>

        <div className="p-4">
          {favorites.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                {favorites.length} {favorites.length === 1 ? 'объект' : 'объекта'}
              </p>
              <div className="grid gap-4">
                {favorites.map((property) => (
                  <PropertyCard
                    key={property.id}
                    {...property}
                    onClick={() => navigate(`/property/${property.id}`)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Icon name="Heart" size={48} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Нет избранных объектов</h3>
              <p className="text-muted-foreground mb-6">
                Добавляйте понравившиеся варианты в избранное
              </p>
              <Button onClick={() => navigate("/")}>
                Найти жилье
              </Button>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Favorites;
