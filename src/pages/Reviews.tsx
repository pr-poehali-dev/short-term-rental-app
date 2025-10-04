import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import { format, subDays } from "date-fns";
import { ru } from "date-fns/locale";

const Reviews = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const propertyInfo = {
    title: "Современная студия в центре",
    totalReviews: 48,
    averageRating: 4.8,
    ratings: {
      5: 35,
      4: 10,
      3: 2,
      2: 1,
      1: 0
    }
  };

  const reviews = [
    {
      id: "1",
      author: "Анна Петрова",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna",
      rating: 5,
      date: subDays(new Date(), 3),
      text: "Потрясающая квартира! Всё соответствует описанию. Очень чисто, уютно и современно. Хозяин встретил вовремя, всё показал и рассказал. Обязательно вернусь сюда снова!",
      helpful: 12,
      images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400"]
    },
    {
      id: "2",
      author: "Дмитрий Смирнов",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry",
      rating: 5,
      date: subDays(new Date(), 7),
      text: "Отличное расположение в центре города. Рядом метро, магазины и кафе. Квартира очень уютная, есть всё необходимое для комфортного проживания.",
      helpful: 8,
      images: []
    },
    {
      id: "3",
      author: "Елена Иванова",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
      rating: 4,
      date: subDays(new Date(), 14),
      text: "Хорошая квартира, всё понравилось. Единственный момент - немного шумно со стороны улицы, но это центр города, так что это нормально. В целом рекомендую!",
      helpful: 5,
      images: []
    },
    {
      id: "4",
      author: "Александр Козлов",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      rating: 5,
      date: subDays(new Date(), 21),
      text: "Прекрасное место для краткосрочного проживания! Современный ремонт, удобная мебель, быстрый интернет. Хозяин очень отзывчивый и всегда на связи.",
      helpful: 15,
      images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400"]
    }
  ];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setShowReviewForm(false);
    setRating(0);
    setReviewText("");
  };

  const totalRatings = Object.values(propertyInfo.ratings).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b p-4">
          <div className="flex items-center gap-3">
            <Button size="icon" variant="ghost" onClick={() => navigate(-1)}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Отзывы</h1>
              <p className="text-sm text-muted-foreground">{propertyInfo.title}</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <Card className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-3 mb-2">
                  <span className="text-5xl font-bold">{propertyInfo.averageRating}</span>
                  <div>
                    <div className="flex gap-1 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={20}
                          className={i < Math.round(propertyInfo.averageRating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {propertyInfo.totalReviews} отзывов
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = propertyInfo.ratings[stars as keyof typeof propertyInfo.ratings];
                  const percentage = (count / totalRatings) * 100;
                  
                  return (
                    <div key={stars} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 min-w-[80px]">
                        <span className="text-sm">{stars}</span>
                        <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                      </div>
                      <Progress value={percentage} className="flex-1" />
                      <span className="text-sm text-muted-foreground min-w-[30px] text-right">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          {!showReviewForm ? (
            <Button onClick={() => setShowReviewForm(true)} className="w-full" size="lg">
              <Icon name="MessageSquarePlus" size={20} className="mr-2" />
              Написать отзыв
            </Button>
          ) : (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Ваш отзыв</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Оценка</p>
                  <div className="flex gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(i + 1)}
                        className="transition-transform hover:scale-110"
                      >
                        <Icon
                          name="Star"
                          size={32}
                          className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Textarea
                    placeholder="Поделитесь своим опытом проживания..."
                    rows={5}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowReviewForm(false)}
                    className="flex-1"
                  >
                    Отмена
                  </Button>
                  <Button type="submit" className="flex-1" disabled={rating === 0 || !reviewText}>
                    Опубликовать
                  </Button>
                </div>
              </form>
            </Card>
          )}

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Все отзывы ({reviews.length})</h2>
            
            {reviews.map((review) => (
              <Card key={review.id} className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <img src={review.avatar} alt={review.author} />
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold">{review.author}</h3>
                        <p className="text-sm text-muted-foreground">
                          {format(review.date, 'd MMMM yyyy', { locale: ru })}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={16}
                            className={i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-sm mb-3">{review.text}</p>
                    
                    {review.images.length > 0 && (
                      <div className="flex gap-2 mb-3">
                        {review.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Review image ${index + 1}`}
                            className="w-24 h-24 rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                          />
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                        <Icon name="ThumbsUp" size={16} />
                        <span>Полезно ({review.helpful})</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                        <Icon name="MessageCircle" size={16} />
                        <span>Ответить</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
