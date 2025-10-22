import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface MenuItem {
  name: string;
  description: string;
  price: number;
}

const menuData = {
  coffee: [
    { name: 'Эспрессо', description: 'Крепкий ароматный эспрессо', price: 0 },
    { name: 'Американо', description: 'Классический американо на основе двойного эспрессо', price: 0 },
    { name: 'Капучино', description: 'Классический итальянский капучино с нежной молочной пенкой', price: 0 },
    { name: 'Латте', description: 'Нежный кофе с молоком и воздушной пенкой', price: 0 },
  ],
  cocktails: [
    { name: 'Банановый коктейль', description: 'Густой молочный коктейль со спелым бананом и сливками', price: 0 },
    { name: 'Шоколадный коктейль', description: 'Насыщенный коктейль с бельгийским шоколадом и мороженым', price: 0 },
  ],
  salads: [
    { name: 'Салат с тёртым сыром', description: 'Свежий салат с тёртым сыром и зеленью', price: 0 },
    { name: 'Салат огурцы и помидоры', description: 'Свежие огурцы и помидоры с ароматным маслом', price: 0 },
  ],
  juices: [
    { name: 'Томатный сок', description: 'Свежевыжатый томатный сок с солью и специями', price: 0 },
    { name: 'Яблочный сок', description: 'Натуральный яблочный сок из спелых яблок', price: 0 },
  ],
};

const Snowflake = ({ delay, duration, left }: { delay: number; duration: number; left: string }) => {
  return (
    <div
      className="snowflake text-2xl"
      style={{
        left,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      ❄
    </div>
  );
};

export default function Index() {
  const [activeTab, setActiveTab] = useState('coffee');
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; delay: number; duration: number; left: string }>>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      left: `${Math.random() * 100}%`,
    }));
    setSnowflakes(flakes);
  }, []);

  const getIcon = (category: string) => {
    switch (category) {
      case 'coffee':
        return 'Coffee';
      case 'cocktails':
        return 'Wine';
      case 'salads':
        return 'Salad';
      case 'juices':
        return 'GlassWater';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {snowflakes.map((flake) => (
        <Snowflake key={flake.id} delay={flake.delay} duration={flake.duration} left={flake.left} />
      ))}

      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary opacity-90"
        style={{ zIndex: -1 }}
      />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center items-center gap-3 mb-4">
            <span className="text-6xl">☕</span>
            <h1 className="text-6xl md:text-7xl font-bold text-white drop-shadow-lg">
              Кофе 55
            </h1>
            <span className="text-6xl">🎄</span>
          </div>
          <p className="text-xl md:text-2xl text-white/90 font-light tracking-wide">
            Праздничное кофейное меню
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/95 backdrop-blur-sm p-2 h-auto">
            <TabsTrigger value="coffee" className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="Coffee" size={24} />
              <span className="text-sm md:text-base font-medium">Кофе</span>
            </TabsTrigger>
            <TabsTrigger value="cocktails" className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="Wine" size={24} />
              <span className="text-sm md:text-base font-medium">Коктейли</span>
            </TabsTrigger>
            <TabsTrigger value="salads" className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="Salad" size={24} />
              <span className="text-sm md:text-base font-medium">Салаты</span>
            </TabsTrigger>
            <TabsTrigger value="juices" className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="GlassWater" size={24} />
              <span className="text-sm md:text-base font-medium">Соки</span>
            </TabsTrigger>
          </TabsList>

          {Object.entries(menuData).map(([category, items]) => (
            <TabsContent key={category} value={category} className="animate-fade-in">
              <div className="grid md:grid-cols-2 gap-6">
                {items.map((item, index) => (
                  <Card 
                    key={index} 
                    className="bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-white/50"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">
                            {category === 'coffee' && '☕'}
                            {category === 'cocktails' && '🍹'}
                            {category === 'salads' && '🥗'}
                            {category === 'juices' && '🧃'}
                          </div>
                          <h3 className="text-xl font-semibold text-foreground">{item.name}</h3>
                        </div>
                        <span className="text-2xl font-bold text-primary whitespace-nowrap ml-2">
                          {item.price === 0 ? 'БЕСПЛАТНО' : `${item.price} ₽`}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold shadow-lg"
                      >
                        Заказать
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <footer className="text-center mt-16 text-white/80">
          <p className="text-lg">🎅 С Новым Годом от команды Кофе 55! 🎁</p>
        </footer>
      </div>
    </div>
  );
}