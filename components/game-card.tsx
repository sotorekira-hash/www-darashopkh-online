'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Zap } from 'lucide-react'
import { type Game } from '@/lib/data'
import { cn } from '@/lib/utils'

interface GameCardProps {
  game: Game
  className?: string
}

export function GameCard({ game, className }: GameCardProps) {
  return (
    <Link href={`/topup/${game.slug}`}>
      <div 
        className={cn(
          "group relative glass cyber-border rounded-xl overflow-hidden transition-all duration-300",
          "hover:cyber-glow hover:border-primary/50 hover:-translate-y-1 hover:scale-[1.02]",
          "cursor-pointer",
          className
        )}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-secondary/50">
          <Image
            src={game.image}
            alt={game.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Quick action badge */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-center gap-1 px-2 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <Zap className="w-3 h-3" />
            Top Up Now
          </div>
        </div>
        
        {/* Content */}
        <div className="p-3">
          <h3 className="font-bold text-sm text-foreground truncate group-hover:text-primary transition-colors">
            {game.name}
          </h3>
          <p className="text-xs text-muted-foreground capitalize mt-0.5">
            {game.category} Game
          </p>
        </div>
      </div>
    </Link>
  )
}
