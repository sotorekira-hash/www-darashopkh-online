'use client'

import Image from 'next/image'
import Link from 'next/link'
import { type Game } from '@/lib/data'
import { cn } from '@/lib/utils'

interface GameCardProps {
  game: Game
  className?: string
}

export function GameCard({ game, className }: GameCardProps) {
  const categoryColors = {
    mobile: 'from-green-500/20 to-green-500/5 text-green-400',
    pc: 'from-blue-500/20 to-blue-500/5 text-blue-400',
    console: 'from-purple-500/20 to-purple-500/5 text-purple-400',
  }
  
  return (
    <Link href={`/topup/${game.slug}`}>
      <div 
        className={cn(
          "group relative glass cyber-border rounded-2xl p-4 transition-all duration-300",
          "hover:cyber-glow hover:border-primary/50 hover:-translate-y-1",
          "cursor-pointer overflow-hidden",
          className
        )}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-300 rounded-2xl" />
        
        {/* Image Container */}
        <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-secondary/50">
          <Image
            src={game.image}
            alt={game.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          />
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Content */}
        <div className="relative space-y-2">
          <span className={cn(
            "inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-gradient-to-r",
            categoryColors[game.category]
          )}>
            {game.category}
          </span>
          <h3 className="font-bold text-sm text-foreground truncate group-hover:text-primary transition-colors">
            {game.name}
          </h3>
        </div>
        
        {/* Bottom highlight line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </Link>
  )
}
