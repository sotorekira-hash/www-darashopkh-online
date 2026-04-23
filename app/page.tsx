'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Sparkles, Zap, Shield, ArrowRight, Clock, Headphones, CreditCard, Star } from 'lucide-react'
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
  
  const popularGames = games.filter(g => g.isActive).slice(0, 6)
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 matrix-bg" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-5xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 glass cyber-border rounded-full mb-8 animate-float">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium">Trusted by 100,000+ Gamers</span>
            <Star className="w-4 h-4 text-primary fill-primary" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight">
            <span className="text-gradient-gold">KIRASTORE</span>
            <br />
            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Instant Game Top-Up
            </span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Fast, secure, and automatic diamond delivery for all your favorite games.
            Top up in seconds with our 24/7 automated system.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative mb-8">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Search games... (Mobile Legends, Free Fire, PUBG...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-4 glass cyber-border rounded-2xl text-base focus:ring-2 focus:ring-primary/50"
            />
          </div>
          
          {/* Quick Search Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {['Mobile Legends', 'Free Fire', 'PUBG', 'Genshin Impact', 'Roblox'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-4 py-2 text-sm glass cyber-border rounded-full hover:border-primary/50 hover:bg-primary/10 transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="flex flex-col items-center gap-2 p-4 glass cyber-border rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <p className="font-bold text-sm">Instant Delivery</p>
              <p className="text-xs text-muted-foreground text-center">Auto top-up in seconds</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 glass cyber-border rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-500" />
              </div>
              <p className="font-bold text-sm">100% Secure</p>
              <p className="text-xs text-muted-foreground text-center">Safe transactions</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 glass cyber-border rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <p className="font-bold text-sm">24/7 Service</p>
              <p className="text-xs text-muted-foreground text-center">Always available</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 glass cyber-border rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-purple-500" />
              </div>
              <p className="font-bold text-sm">Easy Payment</p>
              <p className="text-xs text-muted-foreground text-center">Multiple methods</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popular Games Section */}
      {!searchQuery && (
        <section className="py-12 px-4 sm:px-6 bg-secondary/20">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Popular Games</h2>
                  <p className="text-sm text-muted-foreground">Most purchased this week</p>
                </div>
              </div>
              <Link href="/games">
                <Button variant="ghost" className="gap-2 hover:text-primary">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
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
            <h2 className="text-2xl font-bold">
              {searchQuery ? `Search Results: "${searchQuery}"` : 'All Games'}
            </h2>
            
            {/* Category Filter */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={activeCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setActiveCategory('all')}
                className={activeCategory === 'all' ? 'btn-gold' : 'cyber-border'}
              >
                All Games
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredGames.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 glass cyber-border rounded-2xl">
              <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-lg font-medium mb-2">No games found</p>
              <p className="text-muted-foreground">Try a different search term</p>
            </div>
          )}
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 bg-secondary/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
                1
              </div>
              <h3 className="font-bold mb-2">Select Game</h3>
              <p className="text-sm text-muted-foreground">
                Choose your game and diamond package
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
                2
              </div>
              <h3 className="font-bold mb-2">Enter Player ID</h3>
              <p className="text-sm text-muted-foreground">
                Enter your game ID and verify your account
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
                3
              </div>
              <h3 className="font-bold mb-2">Pay & Receive</h3>
              <p className="text-sm text-muted-foreground">
                Complete payment and receive diamonds instantly
              </p>
            </div>
          </div>
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
