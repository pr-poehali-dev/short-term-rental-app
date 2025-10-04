export interface Property {
  id: string;
  image: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  features: string[];
  description: string;
  amenities: string[];
  coordinates: { lat: number; lng: number };
  images: string[];
}

export const mockProperties: Property[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    title: "Современная студия в центре",
    location: "Москва, Арбат",
    price: 3500,
    rating: 4.8,
    reviews: 124,
    features: ["Wi-Fi", "Кухня", "Паркинг"],
    description: "Уютная студия с современным ремонтом в самом центре города. Отличная транспортная доступность.",
    amenities: ["Wi-Fi", "Кухня", "Кондиционер", "Телевизор", "Стиральная машина", "Холодильник"],
    coordinates: { lat: 55.7522, lng: 37.6156 },
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    ]
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    title: "Квартира у парка",
    location: "Санкт-Петербург, Петроградский р-н",
    price: 4200,
    rating: 4.9,
    reviews: 89,
    features: ["Wi-Fi", "Балкон", "Вид на парк"],
    description: "Просторная квартира с видом на парк. Идеальное место для семейного отдыха.",
    amenities: ["Wi-Fi", "Кухня", "Кондиционер", "Телевизор", "Балкон", "Утюг"],
    coordinates: { lat: 59.9665, lng: 30.3114 },
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    ]
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    title: "Апартаменты бизнес-класса",
    location: "Москва, Кутузовский проспект",
    price: 6500,
    rating: 5.0,
    reviews: 156,
    features: ["Wi-Fi", "Консьерж", "Спортзал"],
    description: "Роскошные апартаменты с панорамными окнами и премиальной отделкой.",
    amenities: ["Wi-Fi", "Кухня", "Кондиционер", "Телевизор", "Джакузи", "Сейф", "Консьерж"],
    coordinates: { lat: 55.7423, lng: 37.5655 },
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    ]
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
    title: "Уютная однушка",
    location: "Казань, Вахитовский район",
    price: 2800,
    rating: 4.7,
    reviews: 67,
    features: ["Wi-Fi", "Кухня", "Рядом метро"],
    description: "Компактная квартира для командировок и короткого отдыха.",
    amenities: ["Wi-Fi", "Кухня", "Телевизор", "Фен", "Утюг"],
    coordinates: { lat: 55.7887, lng: 49.1221 },
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    ]
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
    title: "Лофт в историческом здании",
    location: "Санкт-Петербург, Лиговский проспект",
    price: 5500,
    rating: 4.9,
    reviews: 203,
    features: ["Wi-Fi", "Дизайнерский", "Высокие потолки"],
    description: "Стильный лофт с уникальным дизайном в историческом центре.",
    amenities: ["Wi-Fi", "Кухня", "Кондиционер", "Проектор", "Звуковая система", "Винный шкаф"],
    coordinates: { lat: 59.9311, lng: 30.3609 },
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    ]
  },
];

export interface Review {
  id: string;
  propertyId: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
}

export const mockReviews: Review[] = [
  {
    id: "1",
    propertyId: "1",
    author: "Анна К.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna",
    rating: 5,
    date: "2024-09-15",
    text: "Отличная квартира! Все как на фотографиях. Хозяин очень отзывчивый.",
  },
  {
    id: "2",
    propertyId: "1",
    author: "Михаил С.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mikhail",
    rating: 4,
    date: "2024-09-10",
    text: "Хорошее расположение, чисто и уютно. Рекомендую!",
  },
];
