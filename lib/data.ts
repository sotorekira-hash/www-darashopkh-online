// Mock data for KIRASTORE gaming top-up platform

export interface Game {
  id: string
  name: string
  slug: string
  image: string
  category: 'mobile' | 'pc' | 'console'
  hasZoneId: boolean
  isActive: boolean
  packages: Package[]
}

export interface Package {
  id: string
  name: string
  diamonds: number
  price: number
  bonus?: number
  popular?: boolean
}

export interface Order {
  id: string
  playerId: string
  zoneId?: string
  playerName: string
  gameId: string
  gameName: string
  packageId: string
  packageName: string
  diamonds: number
  amount: number
  status: 'pending' | 'paid' | 'processing' | 'completed' | 'failed'
  paymentRef?: string
  createdAt: string
  paidAt?: string
  completedAt?: string
}

// Mock Games Data
export const games: Game[] = [
  {
    id: '1',
    name: 'Mobile Legends',
    slug: 'mobile-legends',
    image: 'https://play-lh.googleusercontent.com/Ha-M61zSNr_LNqMIkuXjWQAjdVzGcSNqcPq_E1EJTH-R_DnILDnFMqdQJoAINBV5yD4=w240-h480-rw',
    category: 'mobile',
    hasZoneId: true,
    isActive: true,
    packages: [
      { id: 'ml-1', name: '86 Diamonds', diamonds: 86, price: 1.99 },
      { id: 'ml-2', name: '172 Diamonds', diamonds: 172, price: 3.99 },
      { id: 'ml-3', name: '257 Diamonds', diamonds: 257, price: 5.99 },
      { id: 'ml-4', name: '344 Diamonds', diamonds: 344, price: 7.99, popular: true },
      { id: 'ml-5', name: '429 Diamonds', diamonds: 429, price: 9.99 },
      { id: 'ml-6', name: '514 Diamonds', diamonds: 514, price: 11.99 },
      { id: 'ml-7', name: '706 Diamonds', diamonds: 706, price: 15.99 },
      { id: 'ml-8', name: '878 Diamonds', diamonds: 878, price: 19.99 },
      { id: 'ml-9', name: '2195 Diamonds', diamonds: 2195, price: 49.99, bonus: 195 },
      { id: 'ml-10', name: '4390 Diamonds', diamonds: 4390, price: 99.99, bonus: 390, popular: true },
    ]
  },
  {
    id: '2',
    name: 'Free Fire',
    slug: 'free-fire',
    image: 'https://play-lh.googleusercontent.com/WWcssdzTZvx7Fc24xhYPk0YwaKpVqLkNeMZjE4vXa6SpHqMBBKR5IJyA_AxBfXPj1hI=w240-h480-rw',
    category: 'mobile',
    hasZoneId: false,
    isActive: true,
    packages: [
      { id: 'ff-1', name: '100 Diamonds', diamonds: 100, price: 0.99 },
      { id: 'ff-2', name: '210 Diamonds', diamonds: 210, price: 1.99 },
      { id: 'ff-3', name: '530 Diamonds', diamonds: 530, price: 4.99, popular: true },
      { id: 'ff-4', name: '1060 Diamonds', diamonds: 1060, price: 9.99 },
      { id: 'ff-5', name: '2180 Diamonds', diamonds: 2180, price: 19.99, bonus: 180 },
      { id: 'ff-6', name: '5600 Diamonds', diamonds: 5600, price: 49.99, bonus: 600, popular: true },
    ]
  },
  {
    id: '3',
    name: 'PUBG Mobile',
    slug: 'pubg-mobile',
    image: 'https://play-lh.googleusercontent.com/JgPpj1MN9n9KhfJgPdJFPj6W3M8z0P2rzhYLqJGNYPmPP_bJFFVmRZxqm-PnRlpxDl8=w240-h480-rw',
    category: 'mobile',
    hasZoneId: false,
    isActive: true,
    packages: [
      { id: 'pubg-1', name: '60 UC', diamonds: 60, price: 0.99 },
      { id: 'pubg-2', name: '325 UC', diamonds: 325, price: 4.99, popular: true },
      { id: 'pubg-3', name: '660 UC', diamonds: 660, price: 9.99 },
      { id: 'pubg-4', name: '1800 UC', diamonds: 1800, price: 24.99 },
      { id: 'pubg-5', name: '3850 UC', diamonds: 3850, price: 49.99, bonus: 350, popular: true },
      { id: 'pubg-6', name: '8100 UC', diamonds: 8100, price: 99.99, bonus: 800 },
    ]
  },
  {
    id: '4',
    name: 'Genshin Impact',
    slug: 'genshin-impact',
    image: 'https://play-lh.googleusercontent.com/Xvz97QYH-XEPxBE4gQDtB9MkFkLLqkqGAU_FWaUXMW5Fg9J8XsV5KlYRe0fPJEd2-jY=w240-h480-rw',
    category: 'mobile',
    hasZoneId: false,
    isActive: true,
    packages: [
      { id: 'gi-1', name: '60 Genesis Crystals', diamonds: 60, price: 0.99 },
      { id: 'gi-2', name: '300 Genesis Crystals', diamonds: 300, price: 4.99 },
      { id: 'gi-3', name: '980 Genesis Crystals', diamonds: 980, price: 14.99, popular: true },
      { id: 'gi-4', name: '1980 Genesis Crystals', diamonds: 1980, price: 29.99 },
      { id: 'gi-5', name: '3280 Genesis Crystals', diamonds: 3280, price: 49.99, popular: true },
      { id: 'gi-6', name: '6480 Genesis Crystals', diamonds: 6480, price: 99.99 },
    ]
  },
  {
    id: '5',
    name: 'Roblox',
    slug: 'roblox',
    image: 'https://play-lh.googleusercontent.com/WNWZaxi9RdJKe2GQM3vqXIAkk69mnIl4Cc8EyZpfLsqjjxOQkShbq1G1I4I5DQ5c2Yk=w240-h480-rw',
    category: 'mobile',
    hasZoneId: false,
    isActive: true,
    packages: [
      { id: 'rb-1', name: '400 Robux', diamonds: 400, price: 4.99 },
      { id: 'rb-2', name: '800 Robux', diamonds: 800, price: 9.99, popular: true },
      { id: 'rb-3', name: '1700 Robux', diamonds: 1700, price: 19.99 },
      { id: 'rb-4', name: '4500 Robux', diamonds: 4500, price: 49.99, popular: true },
      { id: 'rb-5', name: '10000 Robux', diamonds: 10000, price: 99.99 },
    ]
  },
  {
    id: '6',
    name: 'Clash of Clans',
    slug: 'clash-of-clans',
    image: 'https://play-lh.googleusercontent.com/LByrur1mTmPeNr0ljI-uAUcct1rzmTve5Esau1SwoAzjBXQUby6uHIfHbF9TAT51xHza=w240-h480-rw',
    category: 'mobile',
    hasZoneId: false,
    isActive: true,
    packages: [
      { id: 'coc-1', name: '80 Gems', diamonds: 80, price: 0.99 },
      { id: 'coc-2', name: '500 Gems', diamonds: 500, price: 4.99, popular: true },
      { id: 'coc-3', name: '1200 Gems', diamonds: 1200, price: 9.99 },
      { id: 'coc-4', name: '2500 Gems', diamonds: 2500, price: 19.99 },
      { id: 'coc-5', name: '6500 Gems', diamonds: 6500, price: 49.99, popular: true },
      { id: 'coc-6', name: '14000 Gems', diamonds: 14000, price: 99.99 },
    ]
  },
  {
    id: '7',
    name: 'Valorant',
    slug: 'valorant',
    image: 'https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/5ee00192d1077c1e7f9cf45055a7b4e2b4c3e0e0-736x316.png',
    category: 'pc',
    hasZoneId: false,
    isActive: true,
    packages: [
      { id: 'val-1', name: '475 VP', diamonds: 475, price: 4.99 },
      { id: 'val-2', name: '1000 VP', diamonds: 1000, price: 9.99, popular: true },
      { id: 'val-3', name: '2050 VP', diamonds: 2050, price: 19.99 },
      { id: 'val-4', name: '3650 VP', diamonds: 3650, price: 34.99 },
      { id: 'val-5', name: '5350 VP', diamonds: 5350, price: 49.99, popular: true },
      { id: 'val-6', name: '11000 VP', diamonds: 11000, price: 99.99 },
    ]
  },
  {
    id: '8',
    name: 'League of Legends',
    slug: 'league-of-legends',
    image: 'https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/cdb0b47a50e41099ee3ef0c2b2e2c357c863d71f-1920x1080.jpg',
    category: 'pc',
    hasZoneId: false,
    isActive: true,
    packages: [
      { id: 'lol-1', name: '650 RP', diamonds: 650, price: 5.00 },
      { id: 'lol-2', name: '1380 RP', diamonds: 1380, price: 10.00, popular: true },
      { id: 'lol-3', name: '2800 RP', diamonds: 2800, price: 20.00 },
      { id: 'lol-4', name: '5000 RP', diamonds: 5000, price: 35.00, popular: true },
      { id: 'lol-5', name: '7200 RP', diamonds: 7200, price: 50.00 },
    ]
  },
  {
    id: '9',
    name: 'Call of Duty Mobile',
    slug: 'cod-mobile',
    image: 'https://play-lh.googleusercontent.com/i11bJOKQMYi84CbLqJu_bHxRAOJEbK7pDvPJgkmtWoQsHXEFCVGnGaGIc1Lxsx5OHFI=w240-h480-rw',
    category: 'mobile',
    hasZoneId: false,
    isActive: true,
    packages: [
      { id: 'cod-1', name: '80 CP', diamonds: 80, price: 0.99 },
      { id: 'cod-2', name: '400 CP', diamonds: 400, price: 4.99 },
      { id: 'cod-3', name: '800 CP', diamonds: 800, price: 9.99, popular: true },
      { id: 'cod-4', name: '2000 CP', diamonds: 2000, price: 24.99 },
      { id: 'cod-5', name: '5000 CP', diamonds: 5000, price: 49.99, popular: true },
      { id: 'cod-6', name: '10000 CP', diamonds: 10000, price: 99.99 },
    ]
  },
  {
    id: '10',
    name: 'Honkai Star Rail',
    slug: 'honkai-star-rail',
    image: 'https://play-lh.googleusercontent.com/p1_WcxDTklgAK-IbIwQ56aDw1aGWZN4Q_KDvl-W9bzrWpzxXPHPPL1NPCYG09XQKnw=w240-h480-rw',
    category: 'mobile',
    hasZoneId: false,
    isActive: true,
    packages: [
      { id: 'hsr-1', name: '60 Oneiric Shards', diamonds: 60, price: 0.99 },
      { id: 'hsr-2', name: '300 Oneiric Shards', diamonds: 300, price: 4.99 },
      { id: 'hsr-3', name: '980 Oneiric Shards', diamonds: 980, price: 14.99, popular: true },
      { id: 'hsr-4', name: '1980 Oneiric Shards', diamonds: 1980, price: 29.99 },
      { id: 'hsr-5', name: '3280 Oneiric Shards', diamonds: 3280, price: 49.99, popular: true },
      { id: 'hsr-6', name: '6480 Oneiric Shards', diamonds: 6480, price: 99.99 },
    ]
  },
  {
    id: '11',
    name: 'Arena of Valor',
    slug: 'arena-of-valor',
    image: 'https://play-lh.googleusercontent.com/sINm7NR_2aGu9lFPNxPzY-XMBq6-IIQ-qzAzZ4gT_a7F-F6wKl6g9HKF-JkqRQmDcQ=w240-h480-rw',
    category: 'mobile',
    hasZoneId: false,
    isActive: true,
    packages: [
      { id: 'aov-1', name: '90 Vouchers', diamonds: 90, price: 0.99 },
      { id: 'aov-2', name: '230 Vouchers', diamonds: 230, price: 2.49 },
      { id: 'aov-3', name: '470 Vouchers', diamonds: 470, price: 4.99, popular: true },
      { id: 'aov-4', name: '950 Vouchers', diamonds: 950, price: 9.99 },
      { id: 'aov-5', name: '2400 Vouchers', diamonds: 2400, price: 24.99, popular: true },
      { id: 'aov-6', name: '4800 Vouchers', diamonds: 4800, price: 49.99 },
    ]
  },
  {
    id: '12',
    name: 'Stumble Guys',
    slug: 'stumble-guys',
    image: 'https://play-lh.googleusercontent.com/wljfZfh2UaIx8K-SFg_3JnIv1Vfm0EX6d1gQlb1L-tNV6MN5QZZA8r1BqVTklqZwjg=w240-h480-rw',
    category: 'mobile',
    hasZoneId: false,
    isActive: true,
    packages: [
      { id: 'sg-1', name: '250 Gems', diamonds: 250, price: 1.99 },
      { id: 'sg-2', name: '650 Gems', diamonds: 650, price: 4.99, popular: true },
      { id: 'sg-3', name: '1400 Gems', diamonds: 1400, price: 9.99 },
      { id: 'sg-4', name: '3500 Gems', diamonds: 3500, price: 24.99, popular: true },
      { id: 'sg-5', name: '7500 Gems', diamonds: 7500, price: 49.99 },
    ]
  },
]

// Mock Orders Data
export const mockOrders: Order[] = [
  {
    id: 'ORD001',
    playerId: '123456789',
    zoneId: '1234',
    playerName: 'KIRA_PLAYER_01',
    gameId: '1',
    gameName: 'Mobile Legends',
    packageId: 'ml-4',
    packageName: '344 Diamonds',
    diamonds: 344,
    amount: 7.99,
    status: 'completed',
    paymentRef: 'PAY123456',
    createdAt: '2024-01-15T10:30:00Z',
    paidAt: '2024-01-15T10:31:00Z',
    completedAt: '2024-01-15T10:32:00Z',
  },
  {
    id: 'ORD002',
    playerId: '987654321',
    playerName: 'FF_MASTER',
    gameId: '2',
    gameName: 'Free Fire',
    packageId: 'ff-3',
    packageName: '530 Diamonds',
    diamonds: 530,
    amount: 4.99,
    status: 'completed',
    paymentRef: 'PAY123457',
    createdAt: '2024-01-15T11:00:00Z',
    paidAt: '2024-01-15T11:01:00Z',
    completedAt: '2024-01-15T11:02:00Z',
  },
  {
    id: 'ORD003',
    playerId: '555666777',
    playerName: 'PUBG_PRO',
    gameId: '3',
    gameName: 'PUBG Mobile',
    packageId: 'pubg-5',
    packageName: '3850 UC',
    diamonds: 3850,
    amount: 49.99,
    status: 'processing',
    paymentRef: 'PAY123458',
    createdAt: '2024-01-15T12:00:00Z',
    paidAt: '2024-01-15T12:01:00Z',
  },
  {
    id: 'ORD004',
    playerId: '111222333',
    zoneId: '5678',
    playerName: 'ML_LEGEND',
    gameId: '1',
    gameName: 'Mobile Legends',
    packageId: 'ml-10',
    packageName: '4390 Diamonds',
    diamonds: 4390,
    amount: 99.99,
    status: 'pending',
    createdAt: '2024-01-15T13:00:00Z',
  },
  {
    id: 'ORD005',
    playerId: '444555666',
    playerName: 'GENSHIN_FAN',
    gameId: '4',
    gameName: 'Genshin Impact',
    packageId: 'gi-5',
    packageName: '3280 Genesis Crystals',
    diamonds: 3280,
    amount: 49.99,
    status: 'completed',
    paymentRef: 'PAY123459',
    createdAt: '2024-01-15T14:00:00Z',
    paidAt: '2024-01-15T14:01:00Z',
    completedAt: '2024-01-15T14:02:00Z',
  },
]

// Mock player names for ID verification simulation
export const mockPlayerNames: Record<string, string> = {
  '123456789': 'KIRA_PLAYER_01',
  '987654321': 'FF_MASTER',
  '555666777': 'PUBG_PRO',
  '111222333': 'ML_LEGEND',
  '444555666': 'GENSHIN_FAN',
  '777888999': 'ROBLOX_KING',
  '112233445': 'COC_WARRIOR',
}

// Helper functions
export function getGameBySlug(slug: string): Game | undefined {
  return games.find(game => game.slug === slug)
}

export function getGameById(id: string): Game | undefined {
  return games.find(game => game.id === id)
}

export function searchGames(query: string): Game[] {
  const lowerQuery = query.toLowerCase()
  return games.filter(game => 
    game.name.toLowerCase().includes(lowerQuery) ||
    game.category.toLowerCase().includes(lowerQuery)
  )
}

export function getPopularGames(): Game[] {
  return games.filter(game => game.isActive).slice(0, 6)
}

export function getAllActiveGames(): Game[] {
  return games.filter(game => game.isActive)
}

// Simulate player ID verification
export function verifyPlayerId(playerId: string): { success: boolean; playerName?: string } {
  const name = mockPlayerNames[playerId]
  if (name) {
    return { success: true, playerName: name }
  }
  // For demo purposes, generate a random name for any ID
  if (playerId.length >= 6) {
    return { success: true, playerName: `Player_${playerId.slice(-4)}` }
  }
  return { success: false }
}

// Calculate dashboard stats
export function getDashboardStats() {
  const totalRevenue = mockOrders.reduce((sum, order) => {
    if (order.status === 'completed') {
      return sum + order.amount
    }
    return sum
  }, 0)
  
  const today = new Date().toDateString()
  const todayOrders = mockOrders.filter(order => 
    new Date(order.createdAt).toDateString() === today
  ).length
  
  return {
    totalRevenue,
    totalOrders: mockOrders.length,
    todayOrders,
    totalGames: games.length,
    completedOrders: mockOrders.filter(o => o.status === 'completed').length,
    pendingOrders: mockOrders.filter(o => o.status === 'pending').length,
  }
}
