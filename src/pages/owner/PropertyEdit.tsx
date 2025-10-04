import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";

const PropertyEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = id === "new";

  const [formData, setFormData] = useState({
    title: isNew ? "" : "Современная студия в центре",
    type: isNew ? "" : "apartment",
    location: isNew ? "" : "Москва, Арбат, 15",
    price: isNew ? "" : "3500",
    guests: isNew ? "" : "2",
    bedrooms: isNew ? "" : "1",
    bathrooms: isNew ? "" : "1",
    area: isNew ? "" : "35",
    description: isNew ? "" : "Уютная студия в самом центре Москвы",
    amenities: isNew ? [] : ["wifi", "kitchen", "tv", "washer"],
    images: isNew ? [] : ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"]
  });

  const amenitiesList = [
    { id: "wifi", label: "Wi-Fi", icon: "Wifi" },
    { id: "kitchen", label: "Кухня", icon: "UtensilsCrossed" },
    { id: "tv", label: "Телевизор", icon: "Tv" },
    { id: "washer", label: "Стиральная машина", icon: "Wind" },
    { id: "parking", label: "Парковка", icon: "Car" },
    { id: "ac", label: "Кондиционер", icon: "AirVent" },
    { id: "heating", label: "Отопление", icon: "Flame" },
    { id: "elevator", label: "Лифт", icon: "ArrowUpDown" },
    { id: "balcony", label: "Балкон", icon: "Home" },
    { id: "pets", label: "Можно с питомцами", icon: "PawPrint" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/owner/dashboard");
  };

  const toggleAmenity = (amenityId: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(a => a !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b p-4">
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => navigate(-1)}
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div>
              <h1 className="text-xl font-bold">
                {isNew ? "Добавить объект" : "Редактировать объект"}
              </h1>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          <Card className="p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Основная информация</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Название объекта</Label>
                  <Input
                    id="title"
                    placeholder="Современная студия в центре"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Тип жилья</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Квартира</SelectItem>
                        <SelectItem value="studio">Студия</SelectItem>
                        <SelectItem value="house">Дом</SelectItem>
                        <SelectItem value="room">Комната</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Цена за ночь (₽)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="3500"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Адрес</Label>
                  <Input
                    id="location"
                    placeholder="Москва, Арбат, 15"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="guests">Гостей</Label>
                    <Input
                      id="guests"
                      type="number"
                      value={formData.guests}
                      onChange={(e) => setFormData({...formData, guests: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Спален</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Ванных</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Площадь (м²)</Label>
                    <Input
                      id="area"
                      type="number"
                      value={formData.area}
                      onChange={(e) => setFormData({...formData, area: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    placeholder="Расскажите о вашем объекте..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Удобства</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {amenitiesList.map((amenity) => (
                <div
                  key={amenity.id}
                  className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent cursor-pointer transition-colors"
                  onClick={() => toggleAmenity(amenity.id)}
                >
                  <Checkbox
                    id={amenity.id}
                    checked={formData.amenities.includes(amenity.id)}
                    onCheckedChange={() => toggleAmenity(amenity.id)}
                  />
                  <label
                    htmlFor={amenity.id}
                    className="flex items-center gap-2 cursor-pointer flex-1"
                  >
                    <Icon name={amenity.icon as any} size={18} className="text-muted-foreground" />
                    <span className="text-sm">{amenity.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Фотографии</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                  <img src={image} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-primary transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary"
              >
                <Icon name="Plus" size={24} />
                <span className="text-sm">Добавить фото</span>
              </button>
            </div>
          </Card>

          <div className="flex gap-3 sticky bottom-0 bg-background p-4 border-t">
            <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1">
              Отмена
            </Button>
            <Button type="submit" className="flex-1">
              <Icon name="Save" size={18} className="mr-2" />
              {isNew ? "Создать объект" : "Сохранить изменения"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyEdit;
