import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

interface Order {
  id: number;
  customerName: string;
  items: string[];
  status: 'новый' | 'готовится' | 'готов' | 'выдан';
  time: string;
  total: number;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      customerName: 'Иван Петров',
      items: ['Капучино', 'Банановый коктейль'],
      status: 'новый',
      time: '14:30',
      total: 0,
    },
    {
      id: 2,
      customerName: 'Мария Сидорова',
      items: ['Эспрессо', 'Салат огурцы и помидоры'],
      status: 'готовится',
      time: '14:25',
      total: 0,
    },
    {
      id: 3,
      customerName: 'Алексей Волков',
      items: ['Латте', 'Шоколадный коктейль', 'Томатный сок'],
      status: 'готов',
      time: '14:15',
      total: 0,
    },
  ]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'новый':
        return 'bg-blue-500';
      case 'готовится':
        return 'bg-yellow-500';
      case 'готов':
        return 'bg-green-500';
      case 'выдан':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const updateOrderStatus = (orderId: number, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getNextStatus = (currentStatus: Order['status']): Order['status'] | null => {
    switch (currentStatus) {
      case 'новый':
        return 'готовится';
      case 'готовится':
        return 'готов';
      case 'готов':
        return 'выдан';
      default:
        return null;
    }
  };

  const activeOrders = orders.filter(o => o.status !== 'выдан');
  const completedOrders = orders.filter(o => o.status === 'выдан');

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Управление заказами
            </h1>
            <p className="text-muted-foreground text-lg">Кофе 55 - Панель администратора</p>
          </div>
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <Icon name="ArrowLeft" size={20} />
              К меню
            </Button>
          </Link>
        </header>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Новые</p>
                  <p className="text-3xl font-bold">{orders.filter(o => o.status === 'новый').length}</p>
                </div>
                <Icon name="FileText" size={40} className="opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Готовятся</p>
                  <p className="text-3xl font-bold">{orders.filter(o => o.status === 'готовится').length}</p>
                </div>
                <Icon name="Clock" size={40} className="opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Готовы</p>
                  <p className="text-3xl font-bold">{orders.filter(o => o.status === 'готов').length}</p>
                </div>
                <Icon name="CheckCircle" size={40} className="opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-500 to-gray-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Выданы</p>
                  <p className="text-3xl font-bold">{orders.filter(o => o.status === 'выдан').length}</p>
                </div>
                <Icon name="Package" size={40} className="opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Активные заказы</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeOrders.map(order => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">Заказ #{order.id}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{order.customerName}</p>
                    </div>
                    <Badge className={`${getStatusColor(order.status)} text-white`}>
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <Icon name="Clock" size={16} />
                      {order.time}
                    </p>
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Icon name="Circle" size={8} className="text-primary" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t">
                    <span className="font-bold text-lg text-primary">БЕСПЛАТНО</span>
                    {getNextStatus(order.status) && (
                      <Button 
                        size="sm"
                        onClick={() => updateOrderStatus(order.id, getNextStatus(order.status)!)}
                        className="bg-gradient-to-r from-primary to-secondary"
                      >
                        {order.status === 'новый' && 'Начать готовить'}
                        {order.status === 'готовится' && 'Заказ готов'}
                        {order.status === 'готов' && 'Выдать'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {activeOrders.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Icon name="Package" size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">Активных заказов нет</p>
            </div>
          )}
        </div>

        {completedOrders.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Выданные заказы</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedOrders.map(order => (
                <Card key={order.id} className="opacity-75">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">Заказ #{order.id}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{order.customerName}</p>
                      </div>
                      <Badge className="bg-gray-500 text-white">выдан</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                        <Icon name="Clock" size={16} />
                        {order.time}
                      </p>
                      <div className="space-y-1">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <Icon name="Circle" size={8} className="text-primary" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
