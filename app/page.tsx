'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react'
import { StoreProvider, useStore } from '@/lib/store'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GameCard } from '@/components/game-card'
import { PaymentModal } from '@/components/payment-modal'
import { games, searchGames } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function HomeContent() {
  const { t, searchQuery, setSearchQuery } = useStore()
  const [activeCategory, setActiveCategory] = useState<'all' | 'mobile' | 'pc'>('all')
  
  const filteredGames = useMemo(() => {
    let result = games.filter(g => g.isActive)
    
    if (searchQuery) {
      result = searchGames(searchQuery)
    }
    
    if (activeCategory !== 'all') {
      result = result.filter(g => g.category === activeCategory)
    }
    
    return result
  }, [searchQuery, activeCategory])
  
  const popularGames = games.filter(g => g.isActive).slice(0, 4)
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 matrix-bg overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 glass cyber-border rounded-full mb-6 animate-float">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Auto Diamond Delivery 24/7</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="text-gradient-gold">{t('heroTitle')}</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('heroSubtitle')}
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative mb-8">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-4 glass cyber-border rounded-2xl text-base focus:ring-2 focus:ring-primary/50"
            />
          </div>
          
          {/* Quick tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setSearchQuery('Mobile Legends')}
              className="px-3 py-1 text-xs glass cyber-border rounded-full hover:border-primary/50 transition-colors"
            >
              #MLBB
            </button>
            <button
              onClick={() => setSearchQuery('Free Fire')}
              className="px-3 py-1 text-xs glass cyber-border rounded-full hover:border-primary/50 transition-colors"
            >
              #FreeFire
            </button>
            <button
              onClick={() => setSearchQuery('PUBG')}
              className="px-3 py-1 text-xs glass cyber-border rounded-full hover:border-primary/50 transition-colors"
            >
              #PUBG
            </button>
            <button
              onClick={() => setSearchQuery('Genshin')}
              className="px-3 py-1 text-xs glass cyber-border rounded-full hover:border-primary/50 transition-colors"
            >
              #Genshin
            </button>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 p-4 glass cyber-border rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm">Instant Delivery</p>
                <p className="text-xs text-muted-foreground">Auto top-up in seconds</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 glass cyber-border rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm">100% Secure</p>
                <p className="text-xs text-muted-foreground">Encrypted payments</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 glass cyber-border rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm">Best Prices</p>
                <p className="text-xs text-muted-foreground">Competitive rates</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popular Games Section */}
      {!searchQuery && (
        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">{t('popularGames')}</h2>
              <Link href="/games">
                <Button variant="ghost" className="gap-2 hover:text-primary">
                  {t('viewAll')}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {popularGames.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* All Games Section */}
      <section className="py-12 px-4 sm:px-6 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold">{t('allGames')}</h2>
            
            {/* Category Filter */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={activeCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setActiveCategory('all')}
                className={activeCategory === 'all' ? 'btn-gold' : 'cyber-border'}
              >
                All
              </Button>
              <Button
                size="sm"
                variant={activeCategory === 'mobile' ? 'default' : 'outline'}
                onClick={() => setActiveCategory('mobile')}
                className={activeCategory === 'mobile' ? 'btn-gold' : 'cyber-border'}
              >
                Mobile
              </Button>
              <Button
                size="sm"
                variant={activeCategory === 'pc' ? 'default' : 'outline'}
                onClick={() => setActiveCategory('pc')}
                className={activeCategory === 'pc' ? 'btn-gold' : 'cyber-border'}
              >
                PC
              </Button>
            </div>
          </div>
          
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
              {filteredGames.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No games found matching your search.</p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
      <PaymentModal />
    </div>
  )
}

export default function HomePage() {
  return (
    <StoreProvider>
      <HomeContent />
    </StoreProvider>
  )
}
