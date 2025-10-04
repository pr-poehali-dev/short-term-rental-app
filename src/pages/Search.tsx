import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { mockProperties } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";

const Search = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const amenities = ["Wi-Fi", "Кухня", "Паркинг", "Кондиционер", "Балкон", "Спортзал"];

  const filteredProperties = mockProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchValue.toLowerCase());
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    const matchesAmenities = selectedAmenities.length === 0 || 
                            selectedAmenities.every(amenity => property.features.includes(amenity));
    return matchesSearch && matchesPrice && matchesAmenities;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-foreground">Поиск жилья</h1>
              <Button variant="ghost" size="icon" onClick={() => navigate("/favorites")}>
                <Icon name="Heart" size={22} />
              </Button>
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <div>
                  <SearchBar 
                    value={searchValue}
                    onChange={setSearchValue}
                    onFilterClick={() => {}}
                  />
                </div>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
                <SheetHeader>
                  <SheetTitle>Фильтры</SheetTitle>
                </SheetHeader>
                <div className="space-y-6 py-6">
                  <div>
                    <Label className="text-base font-semibold mb-4 block">
                      Цена за сутки
                    </Label>
                    <div className="space-y-4">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={10000}
                        step={500}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{priceRange[0].toLocaleString('ru-RU')} ₽</span>
                        <span>{priceRange[1].toLocaleString('ru-RU')} ₽</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-4 block">
                      Удобства
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                      {amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Checkbox
                            id={amenity}
                            checked={selectedAmenities.includes(amenity)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedAmenities([...selectedAmenities, amenity]);
                              } else {
                                setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
                              }
                            }}
                          />
                          <label
                            htmlFor={amenity}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {amenity}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => {
                      const event = new Event('click');
                      document.querySelector('[data-state="open"]')?.dispatchEvent(event);
                    }}
                  >
                    Применить фильтры
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Найдено {filteredProperties.length} {filteredProperties.length === 1 ? 'объект' : 'объектов'}
            </p>
          </div>

          <div className="grid gap-4">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                onClick={() => navigate(`/property/${property.id}`)}
              />
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Ничего не найдено</h3>
              <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Search;
