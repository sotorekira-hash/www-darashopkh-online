export type Locale = 'km' | 'en'

export const translations = {
  km: {
    // Navigation
    home: 'ទំព័រដើម',
    games: 'ហ្គេម',
    orders: 'ការកុម្ម៉ង់',
    admin: 'គ្រប់គ្រង',
    
    // Hero
    heroTitle: 'បុកហ្គេមរហ័ស និងសុវត្ថិភាព',
    heroSubtitle: 'សេវាកម្មបុកពេជ្រស្វ័យប្រវត្តិ ២៤ ម៉ោង ទំនុកចិត្ត និងសុវត្ថិភាពខ្ពស់បំផុត',
    searchPlaceholder: 'ស្វែងរកហ្គេមដែលអ្នកចង់បុក...',
    
    // Games
    popularGames: 'ហ្គេមពេញនិយម',
    allGames: 'ហ្គេមទាំងអស់',
    viewAll: 'មើលទាំងអស់',
    
    // Top-up form
    selectGame: 'ជ្រើសរើសហ្គេម',
    playerId: 'លេខសម្គាល់អ្នកលេង',
    playerIdPlaceholder: 'បញ្ចូល Player ID',
    zoneId: 'Zone ID',
    zoneIdPlaceholder: 'បញ្ចូល Zone ID',
    checkId: 'ពិនិត្យ ID',
    checking: 'កំពុងពិនិត្យ...',
    playerName: 'ឈ្មោះអ្នកលេង',
    selectPackage: 'ជ្រើសរើសកញ្ចប់',
    diamonds: 'ពេជ្រ',
    
    // Payment
    payNow: 'បង់ប្រាក់ឥឡូវនេះ',
    scanToPay: 'ស្កេនដើម្បីបង់ប្រាក់',
    amount: 'ចំនួនទឹកប្រាក់',
    paymentPending: 'កំពុងរង់ចាំការបង់ប្រាក់...',
    paymentSuccess: 'ការបង់ប្រាក់ជោគជ័យ!',
    paymentFailed: 'ការបង់ប្រាក់បរាជ័យ',
    cancel: 'បោះបង់',
    timeRemaining: 'ពេលវេលានៅសល់',
    minutes: 'នាទី',
    
    // Status
    pending: 'កំពុងរង់ចាំ',
    success: 'ជោគជ័យ',
    failed: 'បរាជ័យ',
    processing: 'កំពុងដំណើរការ',
    
    // Admin
    dashboard: 'ផ្ទាំងគ្រប់គ្រង',
    totalRevenue: 'ចំណូលសរុប',
    totalOrders: 'ការកុម្ម៉ង់សរុប',
    todayOrders: 'ការកុម្ម៉ង់ថ្ងៃនេះ',
    totalGames: 'ហ្គេមសរុប',
    recentOrders: 'ការកុម្ម៉ង់ថ្មីៗ',
    manageGames: 'គ្រប់គ្រងហ្គេម',
    addGame: 'បន្ថែមហ្គេមថ្មី',
    date: 'កាលបរិច្ឆេទ',
    customer: 'អតិថិជន',
    game: 'ហ្គេម',
    price: 'តម្លៃ',
    status: 'ស្ថានភាព',
    actions: 'សកម្មភាព',
    refresh: 'ធ្វើឱ្យស្រស់',
    
    // Footer
    about: 'អំពីយើង',
    contact: 'ទំនាក់ទំនង',
    support: 'ជំនួយ',
    terms: 'លក្ខខណ្ឌប្រើប្រាស់',
    privacy: 'គោលការណ៍ឯកជនភាព',
    
    // Messages
    idVerified: 'ID ត្រូវបានផ្ទៀងផ្ទាត់!',
    idNotFound: 'រកមិនឃើញ ID នេះទេ',
    pleaseEnterPlayerId: 'សូមបញ្ចូល Player ID',
    orderPlaced: 'ការកុម្ម៉ង់បានបញ្ជូនដោយជោគជ័យ!',
    deliveryInProgress: 'ពេជ្រកំពុងបញ្ចូលទៅក្នុងគណនីរបស់អ្នក...',
    
    // Language
    language: 'ភាសា',
    khmer: 'ភាសាខ្មែរ',
    english: 'English',
  },
  en: {
    // Navigation
    home: 'Home',
    games: 'Games',
    orders: 'Orders',
    admin: 'Admin',
    
    // Hero
    heroTitle: 'Fast & Secure Gaming Top-up',
    heroSubtitle: 'Automatic diamond delivery service 24/7. Trusted and highly secure.',
    searchPlaceholder: 'Search for games...',
    
    // Games
    popularGames: 'Popular Games',
    allGames: 'All Games',
    viewAll: 'View All',
    
    // Top-up form
    selectGame: 'Select Game',
    playerId: 'Player ID',
    playerIdPlaceholder: 'Enter Player ID',
    zoneId: 'Zone ID',
    zoneIdPlaceholder: 'Enter Zone ID',
    checkId: 'Check ID',
    checking: 'Checking...',
    playerName: 'Player Name',
    selectPackage: 'Select Package',
    diamonds: 'Diamonds',
    
    // Payment
    payNow: 'Pay Now',
    scanToPay: 'Scan to Pay',
    amount: 'Amount',
    paymentPending: 'Waiting for payment...',
    paymentSuccess: 'Payment Successful!',
    paymentFailed: 'Payment Failed',
    cancel: 'Cancel',
    timeRemaining: 'Time Remaining',
    minutes: 'minutes',
    
    // Status
    pending: 'Pending',
    success: 'Success',
    failed: 'Failed',
    processing: 'Processing',
    
    // Admin
    dashboard: 'Dashboard',
    totalRevenue: 'Total Revenue',
    totalOrders: 'Total Orders',
    todayOrders: "Today's Orders",
    totalGames: 'Total Games',
    recentOrders: 'Recent Orders',
    manageGames: 'Manage Games',
    addGame: 'Add New Game',
    date: 'Date',
    customer: 'Customer',
    game: 'Game',
    price: 'Price',
    status: 'Status',
    actions: 'Actions',
    refresh: 'Refresh',
    
    // Footer
    about: 'About Us',
    contact: 'Contact',
    support: 'Support',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    
    // Messages
    idVerified: 'ID Verified!',
    idNotFound: 'ID not found',
    pleaseEnterPlayerId: 'Please enter Player ID',
    orderPlaced: 'Order placed successfully!',
    deliveryInProgress: 'Diamonds are being delivered to your account...',
    
    // Language
    language: 'Language',
    khmer: 'Khmer',
    english: 'English',
  }
} as const

export type TranslationKey = keyof typeof translations.en

export function getTranslation(locale: Locale, key: TranslationKey): string {
  return translations[locale][key] || translations.en[key] || key
}
