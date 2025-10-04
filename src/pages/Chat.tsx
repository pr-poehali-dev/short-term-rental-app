import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { moderateMessage, canAccessContacts } from "@/lib/chatUtils";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const Chat = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get("propertyId");
  const ownerId = searchParams.get("ownerId");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [message, setMessage] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  
  // Проверяем наличие активного бронирования
  const hasActiveBooking = false; // В реальном приложении это будет проверяться через API
  
  const property = {
    title: "Современная студия в центре",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400"
  };

  const owner = {
    name: "Иван Петров",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Owner",
    responseTime: "Обычно отвечает в течение часа",
    phone: hasActiveBooking ? "+7 (900) 123-45-67" : null
  };

  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "owner",
      text: "Здравствуйте! Чем могу помочь?",
      time: new Date(Date.now() - 3600000),
      blocked: false
    },
    {
      id: "2",
      sender: "guest",
      text: "Добрый день! Подскажите, есть ли парковка рядом с квартирой?",
      time: new Date(Date.now() - 3000000),
      blocked: false
    },
    {
      id: "3",
      sender: "owner",
      text: "Да, есть бесплатная парковка во дворе дома. Также рядом платная парковка.",
      time: new Date(Date.now() - 2400000),
      blocked: false
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;

    // Модерация сообщения
    const moderation = moderateMessage(message);
    
    if (moderation.isBlocked) {
      setWarningMessage(
        `Сообщение заблокировано: ${moderation.reason}. Контактные данные можно обмениваться только после подтверждения бронирования.`
      );
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 5000);
      return;
    }

    // Отправляем сообщение
    const newMessage = {
      id: Date.now().toString(),
      sender: "guest",
      text: message,
      time: new Date(),
      blocked: false
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      <div className="sticky top-0 z-40 bg-background border-b">
        <div className="p-4 flex items-center gap-3">
          <Button size="icon" variant="ghost" onClick={() => navigate(-1)}>
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <Avatar className="w-10 h-10">
            <img src={owner.avatar} alt={owner.name} />
          </Avatar>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold truncate">{owner.name}</h2>
            <p className="text-xs text-muted-foreground">{owner.responseTime}</p>
          </div>
          {!hasActiveBooking && (
            <Badge variant="secondary" className="text-xs">
              <Icon name="Lock" size={12} className="mr-1" />
              До бронирования
            </Badge>
          )}
        </div>

        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 text-sm">
            <img src={property.image} alt={property.title} className="w-12 h-12 rounded object-cover" />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{property.title}</p>
              <Button 
                variant="link" 
                className="h-auto p-0 text-xs text-primary"
                onClick={() => navigate(`/property/${propertyId}`)}
              >
                Посмотреть объект
              </Button>
            </div>
          </div>
        </div>

        {!hasActiveBooking && (
          <div className="mx-4 mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex gap-2">
              <Icon name="Info" size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-900">
                <p className="font-semibold mb-1">Защита личных данных</p>
                <p className="text-xs">
                  Обмен контактными данными (телефон, email, мессенджеры) доступен только после подтверждения бронирования. 
                  Сообщения с контактами будут автоматически заблокированы.
                </p>
              </div>
            </div>
          </div>
        )}

        {hasActiveBooking && owner.phone && (
          <div className="mx-4 mb-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="Phone" size={18} className="text-green-600" />
                <div className="text-sm">
                  <p className="font-semibold text-green-900">Контакт собственника</p>
                  <p className="text-green-700">{owner.phone}</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="border-green-300">
                <Icon name="Phone" size={16} className="mr-1" />
                Позвонить
              </Button>
            </div>
          </div>
        )}
      </div>

      {showWarning && (
        <div className="mx-4 mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg animate-in slide-in-from-top">
          <div className="flex gap-2">
            <Icon name="AlertTriangle" size={18} className="text-destructive flex-shrink-0 mt-0.5" />
            <div className="flex-1 text-sm text-destructive">
              {warningMessage}
            </div>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-6 w-6"
              onClick={() => setShowWarning(false)}
            >
              <Icon name="X" size={14} />
            </Button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'guest' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${msg.sender === 'guest' ? 'order-2' : 'order-1'}`}>
              <div
                className={`rounded-2xl px-4 py-2 ${
                  msg.sender === 'guest'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1 px-2">
                {format(msg.time, 'HH:mm', { locale: ru })}
              </p>
            </div>
            {msg.sender === 'owner' && (
              <Avatar className="w-8 h-8 ml-2 order-1">
                <img src={owner.avatar} alt={owner.name} />
              </Avatar>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t bg-background p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Напишите сообщение..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!message.trim()}>
            <Icon name="Send" size={20} />
          </Button>
        </form>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Сообщения проходят автоматическую модерацию
        </p>
      </div>
    </div>
  );
};

export default Chat;
