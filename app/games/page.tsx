'use client'

import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { StoreProvider, useStore } from '@/lib/store'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GameCard } from '@/components/game-card'
import { PaymentModal } from '@/components/payment-modal'
import { games, searchGames } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function GamesContent() {
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
  
  const mobileCount = games.filter(g => g.category === 'mobile' && g.isActive).length
  const pcCount = games.filter(g => g.category === 'pc' && g.isActive).length
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t('allGames')}</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Browse our collection of {games.filter(g => g.isActive).length}+ games and top up instantly
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-muted-foreground" />
              </div>
              <Input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 glass cyber-border rounded-xl"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex gap-2">
              <Button
                variant={activeCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setActiveCategory('all')}
                className={activeCategory === 'all' ? 'btn-gold' : 'cyber-border'}
              >
                All ({games.filter(g => g.isActive).length})
              </Button>
              <Button
                variant={activeCategory === 'mobile' ? 'default' : 'outline'}
                onClick={() => setActiveCategory('mobile')}
                className={activeCategory === 'mobile' ? 'btn-gold' : 'cyber-border'}
              >
                Mobile ({mobileCount})
              </Button>
              <Button
                variant={activeCategory === 'pc' ? 'default' : 'outline'}
                onClick={() => setActiveCategory('pc')}
                className={activeCategory === 'pc' ? 'btn-gold' : 'cyber-border'}
              >
                PC ({pcCount})
              </Button>
            </div>
          </div>
          
          {/* Games Grid */}
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
              {filteredGames.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No games found matching your search.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('')
                  setActiveCategory('all')
                }}
                className="mt-4 cyber-border"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <PaymentModal />
    </div>
  )
}

export default function GamesPage() {
  return (
    <StoreProvider>
      <GamesContent />
    </StoreProvider>
  )
}
