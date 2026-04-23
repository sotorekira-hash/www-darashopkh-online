'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { type Locale, getTranslation, type TranslationKey } from './i18n'
import { type Game, type Package, type Order, mockOrders as initialOrders } from './data'

interface StoreState {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
  
  // Cart/Order state
  selectedGame: Game | null
  setSelectedGame: (game: Game | null) => void
  selectedPackage: Package | null
  setSelectedPackage: (pkg: Package | null) => void
  playerId: string
  setPlayerId: (id: string) => void
  zoneId: string
  setZoneId: (id: string) => void
  playerName: string | null
  setPlayerName: (name: string | null) => void
  
  // Payment state
  isPaymentModalOpen: boolean
  openPaymentModal: () => void
  closePaymentModal: () => void
  currentOrderId: string | null
  setCurrentOrderId: (id: string | null) => void
  
  // Orders state (for demo)
  orders: Order[]
  addOrder: (order: Order) => void
  updateOrderStatus: (id: string, status: Order['status']) => void
  
  // UI state
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const StoreContext = createContext<StoreState | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en')
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const [playerId, setPlayerId] = useState('')
  const [zoneId, setZoneId] = useState('')
  const [playerName, setPlayerName] = useState<string | null>(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null)
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [searchQuery, setSearchQuery] = useState('')
  
  const t = useCallback((key: TranslationKey) => getTranslation(locale, key), [locale])
  
  const openPaymentModal = useCallback(() => setIsPaymentModalOpen(true), [])
  const closePaymentModal = useCallback(() => {
    setIsPaymentModalOpen(false)
    setCurrentOrderId(null)
  }, [])
  
  const addOrder = useCallback((order: Order) => {
    setOrders(prev => [order, ...prev])
  }, [])
  
  const updateOrderStatus = useCallback((id: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === id ? { ...order, status } : order
    ))
  }, [])
  
  return (
    <StoreContext.Provider value={{
      locale,
      setLocale,
      t,
      selectedGame,
      setSelectedGame,
      selectedPackage,
      setSelectedPackage,
      playerId,
      setPlayerId,
      zoneId,
      setZoneId,
      playerName,
      setPlayerName,
      isPaymentModalOpen,
      openPaymentModal,
      closePaymentModal,
      currentOrderId,
      setCurrentOrderId,
      orders,
      addOrder,
      updateOrderStatus,
      searchQuery,
      setSearchQuery,
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
