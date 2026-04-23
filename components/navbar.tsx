'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Globe, Shield, Gamepad2 } from 'lucide-react'
import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Navbar() {
  const { t, locale, setLocale } = useStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b cyber-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-black tracking-tight text-gradient-gold">
              KIRASTORE
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {t('home')}
            </Link>
            <Link 
              href="/games" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {t('games')}
            </Link>
            <Link 
              href="/admin" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <Shield className="w-4 h-4" />
              {t('admin')}
            </Link>
          </div>
          
          {/* Language Switcher */}
          <div className="hidden md:flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="cyber-border gap-2">
                  <Globe className="w-4 h-4" />
                  {locale === 'km' ? 'ខ្មែរ' : 'EN'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass cyber-border">
                <DropdownMenuItem 
                  onClick={() => setLocale('en')}
                  className={locale === 'en' ? 'text-primary' : ''}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setLocale('km')}
                  className={locale === 'km' ? 'text-primary' : ''}
                >
                  ភាសាខ្មែរ
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass border-t cyber-border">
          <div className="px-4 py-4 space-y-3">
            <Link 
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-foreground hover:text-primary transition-colors"
            >
              {t('home')}
            </Link>
            <Link 
              href="/games"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-foreground hover:text-primary transition-colors"
            >
              {t('games')}
            </Link>
            <Link 
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              {t('admin')}
            </Link>
            <div className="pt-3 border-t cyber-border">
              <p className="text-xs text-muted-foreground mb-2">{t('language')}</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={locale === 'en' ? 'default' : 'outline'}
                  onClick={() => setLocale('en')}
                  className="flex-1"
                >
                  English
                </Button>
                <Button
                  size="sm"
                  variant={locale === 'km' ? 'default' : 'outline'}
                  onClick={() => setLocale('km')}
                  className="flex-1"
                >
                  ខ្មែរ
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
