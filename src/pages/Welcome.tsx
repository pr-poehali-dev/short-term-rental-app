import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary via-accent to-secondary p-6">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <div className="mx-auto w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
            <Icon name="Home" size={48} className="text-primary" />
          </div>
          
          <h1 className="text-4xl font-bold text-white">
            Найди свой дом
          </h1>
          
          <p className="text-xl text-white/90">
            Аренда жилья на сутки по всей России
          </p>
        </div>

        <div className="space-y-6 pt-8">
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 space-y-2">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Icon name="MapPin" size={24} className="text-white" />
              </div>
              <h3 className="font-semibold text-white">Удобное расположение</h3>
              <p className="text-sm text-white/80">Тысячи объектов по всей стране</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 space-y-2">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Icon name="Shield" size={24} className="text-white" />
              </div>
              <h3 className="font-semibold text-white">Безопасность</h3>
              <p className="text-sm text-white/80">Проверенные объекты и хозяева</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 space-y-2">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Icon name="Zap" size={24} className="text-white" />
              </div>
              <h3 className="font-semibold text-white">Быстро</h3>
              <p className="text-sm text-white/80">Мгновенное бронирование</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 space-y-2">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Icon name="Wallet" size={24} className="text-white" />
              </div>
              <h3 className="font-semibold text-white">Выгодно</h3>
              <p className="text-sm text-white/80">Без переплат и комиссий</p>
            </div>
          </div>

          <Button 
            size="lg"
            className="w-full h-14 text-lg font-semibold bg-white text-primary hover:bg-white/90 shadow-xl"
            onClick={() => navigate("/")}
          >
            Начать поиск
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
