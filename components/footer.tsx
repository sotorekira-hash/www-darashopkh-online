'use client'

import Link from 'next/link'
import { Gamepad2, Mail, MessageCircle, Shield } from 'lucide-react'
import { useStore } from '@/lib/store'

export function Footer() {
  const { t } = useStore()
  
  return (
    <footer className="glass border-t cyber-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-black tracking-tight text-gradient-gold">
                KIRASTORE
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional gaming top-up platform with automatic diamond delivery. 
              Fast, secure, and reliable service 24/7.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href="/games" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('games')}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('admin')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-bold mb-4 text-foreground">{t('support')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Live Chat
                </a>
              </li>
              <li>
                <a href="mailto:support@kirastore.com" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  support@kirastore.com
                </a>
              </li>
            </ul>
          </div>
          
          {/* Security */}
          <div>
            <h4 className="font-bold mb-4 text-foreground">Security</h4>
            <div className="flex items-start gap-3 p-3 glass-light cyber-border rounded-xl">
              <Shield className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Secure Payments</p>
                <p className="text-xs text-muted-foreground">
                  All transactions are encrypted and secure
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="mt-8 pt-8 border-t cyber-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            2024 KIRASTORE. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              {t('terms')}
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              {t('privacy')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
