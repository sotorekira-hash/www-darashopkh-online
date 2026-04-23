'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Gamepad2, 
  DollarSign, 
  TrendingUp,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  Search,
  ChevronDown,
  Settings,
  LogOut,
  BarChart3,
  Users
} from 'lucide-react'
import { StoreProvider, useStore } from '@/lib/store'
import { games, getDashboardStats, type Order } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

function AdminContent() {
  const { t, orders, updateOrderStatus, locale, setLocale } = useStore()
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'games'>('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<Order['status'] | 'all'>('all')
  const [isRefreshing, setIsRefreshing] = useState(false)
  
  const stats = useMemo(() => getDashboardStats(), [])
  
  const filteredOrders = useMemo(() => {
    let result = [...orders]
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(order => 
        order.playerId.toLowerCase().includes(query) ||
        order.playerName.toLowerCase().includes(query) ||
        order.gameName.toLowerCase().includes(query) ||
        order.id.toLowerCase().includes(query)
      )
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(order => order.status === statusFilter)
    }
    
    return result
  }, [orders, searchQuery, statusFilter])
  
  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }
  
  const getStatusBadge = (status: Order['status']) => {
    const styles = {
      pending: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
      paid: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
      processing: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
      completed: 'bg-green-500/10 text-green-500 border-green-500/30',
      failed: 'bg-red-500/10 text-red-500 border-red-500/30',
    }
    
    const icons = {
      pending: <Clock className="w-3 h-3" />,
      paid: <DollarSign className="w-3 h-3" />,
      processing: <Loader2 className="w-3 h-3 animate-spin" />,
      completed: <CheckCircle2 className="w-3 h-3" />,
      failed: <XCircle className="w-3 h-3" />,
    }
    
    return (
      <span className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border",
        styles[status]
      )}>
        {icons[status]}
        {status}
      </span>
    )
  }
  
  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 glass border-r cyber-border hidden lg:flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b cyber-border">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <span className="text-lg font-black text-gradient-gold">KIRASTORE</span>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Admin Panel</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all",
              activeTab === 'dashboard' 
                ? "bg-primary/10 text-primary cyber-glow" 
                : "hover:bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">{t('dashboard')}</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all",
              activeTab === 'orders' 
                ? "bg-primary/10 text-primary cyber-glow" 
                : "hover:bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="font-medium">{t('orders')}</span>
            <span className="ml-auto px-2 py-0.5 text-xs bg-primary/20 text-primary rounded-full">
              {orders.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('games')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all",
              activeTab === 'games' 
                ? "bg-primary/10 text-primary cyber-glow" 
                : "hover:bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            <Gamepad2 className="w-5 h-5" />
            <span className="font-medium">{t('games')}</span>
          </button>
        </nav>
        
        {/* User */}
        <div className="p-4 border-t cyber-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">A</span>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">Admin</p>
                  <p className="text-xs text-muted-foreground">admin@kirastore.com</p>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 glass cyber-border">
              <DropdownMenuItem className="gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setLocale(locale === 'en' ? 'km' : 'en')}
                className="gap-2"
              >
                <span className="w-4 h-4 flex items-center justify-center text-xs">
                  {locale === 'en' ? 'KM' : 'EN'}
                </span>
                {locale === 'en' ? 'ភាសាខ្មែរ' : 'English'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 text-destructive">
                <LogOut className="w-4 h-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-40 glass border-b cyber-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold capitalize">{activeTab}</h1>
              <p className="text-sm text-muted-foreground">
                {activeTab === 'dashboard' && 'Overview of your gaming top-up platform'}
                {activeTab === 'orders' && `${orders.length} total orders`}
                {activeTab === 'games' && `${games.length} games available`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="cyber-border gap-2"
              >
                <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
                {t('refresh')}
              </Button>
            </div>
          </div>
        </header>
        
        <div className="p-6">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass cyber-border rounded-2xl p-6 relative overflow-hidden group hover:cyber-glow transition-all">
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-500" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{t('totalRevenue')}</p>
                  <p className="text-3xl font-bold text-green-500">${stats.totalRevenue.toFixed(2)}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-green-500">
                    <TrendingUp className="w-3 h-3" />
                    <span>+12.5% from last month</span>
                  </div>
                </div>
                
                <div className="glass cyber-border rounded-2xl p-6 relative overflow-hidden group hover:cyber-glow transition-all">
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-blue-500" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{t('totalOrders')}</p>
                  <p className="text-3xl font-bold text-blue-500">{stats.totalOrders}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <span>{stats.completedOrders} completed</span>
                  </div>
                </div>
                
                <div className="glass cyber-border rounded-2xl p-6 relative overflow-hidden group hover:cyber-glow transition-all">
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-amber-500" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{t('todayOrders')}</p>
                  <p className="text-3xl font-bold text-amber-500">{stats.todayOrders}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <span>{stats.pendingOrders} pending</span>
                  </div>
                </div>
                
                <div className="glass cyber-border rounded-2xl p-6 relative overflow-hidden group hover:cyber-glow transition-all">
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <Gamepad2 className="w-6 h-6 text-purple-500" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{t('totalGames')}</p>
                  <p className="text-3xl font-bold text-purple-500">{stats.totalGames}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <span>Active games</span>
                  </div>
                </div>
              </div>
              
              {/* Recent Orders */}
              <div className="glass cyber-border rounded-2xl overflow-hidden">
                <div className="p-6 border-b cyber-border flex items-center justify-between">
                  <h2 className="text-lg font-bold">{t('recentOrders')}</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab('orders')}
                    className="text-primary"
                  >
                    View All
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary/50">
                      <tr className="text-xs text-muted-foreground uppercase tracking-wider">
                        <th className="px-6 py-4 text-left">{t('date')}</th>
                        <th className="px-6 py-4 text-left">{t('customer')}</th>
                        <th className="px-6 py-4 text-left">{t('game')}</th>
                        <th className="px-6 py-4 text-left">{t('price')}</th>
                        <th className="px-6 py-4 text-left">{t('status')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {orders.slice(0, 5).map(order => (
                        <tr key={order.id} className="hover:bg-secondary/30 transition-colors">
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium">{order.playerName}</p>
                              <p className="text-xs text-muted-foreground font-mono">{order.playerId}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-medium">{order.gameName}</p>
                            <p className="text-xs text-muted-foreground">{order.packageName}</p>
                          </td>
                          <td className="px-6 py-4 font-bold text-primary">${order.amount.toFixed(2)}</td>
                          <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 cyber-border"
                  />
                </div>
                <div className="flex gap-2">
                  {(['all', 'pending', 'completed', 'failed'] as const).map(status => (
                    <Button
                      key={status}
                      size="sm"
                      variant={statusFilter === status ? 'default' : 'outline'}
                      onClick={() => setStatusFilter(status)}
                      className={statusFilter === status ? 'btn-gold' : 'cyber-border'}
                    >
                      {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Orders Table */}
              <div className="glass cyber-border rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary/50">
                      <tr className="text-xs text-muted-foreground uppercase tracking-wider">
                        <th className="px-6 py-4 text-left">Order ID</th>
                        <th className="px-6 py-4 text-left">{t('date')}</th>
                        <th className="px-6 py-4 text-left">{t('customer')}</th>
                        <th className="px-6 py-4 text-left">{t('game')}</th>
                        <th className="px-6 py-4 text-left">{t('price')}</th>
                        <th className="px-6 py-4 text-left">{t('status')}</th>
                        <th className="px-6 py-4 text-center">{t('actions')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredOrders.map(order => (
                        <tr key={order.id} className="hover:bg-secondary/30 transition-colors">
                          <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{order.id}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium">{order.playerName}</p>
                              <p className="text-xs text-muted-foreground font-mono">
                                {order.playerId}{order.zoneId && ` (${order.zoneId})`}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-medium">{order.gameName}</p>
                            <p className="text-xs text-muted-foreground">{order.packageName}</p>
                          </td>
                          <td className="px-6 py-4 font-bold text-primary">${order.amount.toFixed(2)}</td>
                          <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              {order.status === 'pending' && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => updateOrderStatus(order.id, 'completed')}
                                    className="h-8 w-8 p-0 text-green-500 hover:text-green-400 hover:bg-green-500/10"
                                  >
                                    <CheckCircle2 className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => updateOrderStatus(order.id, 'failed')}
                                    className="h-8 w-8 p-0 text-red-500 hover:text-red-400 hover:bg-red-500/10"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {filteredOrders.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No orders found</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Games Tab */}
          {activeTab === 'games' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">{t('manageGames')}</h2>
                <Button className="btn-gold gap-2">
                  <Gamepad2 className="w-4 h-4" />
                  {t('addGame')}
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {games.map(game => (
                  <div key={game.id} className="glass cyber-border rounded-2xl p-4 hover:cyber-glow transition-all">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={game.image}
                          alt={game.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold truncate">{game.name}</h3>
                        <p className="text-xs text-muted-foreground capitalize">{game.category}</p>
                        <p className="text-xs text-muted-foreground">{game.packages.length} packages</p>
                      </div>
                      <div className={cn(
                        "w-3 h-3 rounded-full",
                        game.isActive ? "bg-green-500" : "bg-red-500"
                      )} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default function AdminPage() {
  return (
    <StoreProvider>
      <AdminContent />
    </StoreProvider>
  )
}
