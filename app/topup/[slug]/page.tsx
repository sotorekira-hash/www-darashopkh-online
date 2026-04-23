'use client'

import { useEffect, useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle2, Loader2, AlertCircle, Diamond, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { StoreProvider, useStore } from '@/lib/store'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PaymentModal } from '@/components/payment-modal'
import { getGameBySlug, verifyPlayerId, type Package } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

function TopUpContent({ slug }: { slug: string }) {
  const router = useRouter()
  const { 
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
    openPaymentModal,
    setCurrentOrderId,
    addOrder,
  } = useStore()
  
  const [isVerifying, setIsVerifying] = useState(false)
  const [verifyError, setVerifyError] = useState<string | null>(null)
  
  // Load game data
  useEffect(() => {
    const game = getGameBySlug(slug)
    if (game) {
      setSelectedGame(game)
    } else {
      router.push('/games')
    }
    
    // Reset form state
    return () => {
      setSelectedPackage(null)
      setPlayerId('')
      setZoneId('')
      setPlayerName(null)
    }
  }, [slug, setSelectedGame, setSelectedPackage, setPlayerId, setZoneId, setPlayerName, router])
  
  const handleVerifyId = async () => {
    if (!playerId) {
      toast.error(t('pleaseEnterPlayerId'))
      return
    }
    
    setIsVerifying(true)
    setVerifyError(null)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const result = verifyPlayerId(playerId)
    
    if (result.success && result.playerName) {
      setPlayerName(result.playerName)
      toast.success(t('idVerified'))
    } else {
      setVerifyError(t('idNotFound'))
      setPlayerName(null)
    }
    
    setIsVerifying(false)
  }
  
  const handleSelectPackage = (pkg: Package) => {
    setSelectedPackage(pkg)
  }
  
  const handleProceedToPayment = () => {
    if (!selectedGame || !selectedPackage || !playerName) {
      toast.error('Please complete all required fields')
      return
    }
    
    // Create order
    const orderId = `ORD${Date.now()}`
    const order = {
      id: orderId,
      playerId,
      zoneId: zoneId || undefined,
      playerName,
      gameId: selectedGame.id,
      gameName: selectedGame.name,
      packageId: selectedPackage.id,
      packageName: selectedPackage.name,
      diamonds: selectedPackage.diamonds,
      amount: selectedPackage.price,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    }
    
    addOrder(order)
    setCurrentOrderId(orderId)
    openPaymentModal()
  }
  
  if (!selectedGame) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>{t('home')}</span>
          </Link>
          
          {/* Game Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden cyber-border">
              <Image
                src={selectedGame.image}
                alt={selectedGame.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{selectedGame.name}</h1>
              <p className="text-muted-foreground capitalize">{selectedGame.category} Game</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Player ID Form */}
            <div className="space-y-6">
              <div className="glass cyber-border rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-4">{t('playerId')}</h2>
                
                {/* Player ID Input */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="playerId">{t('playerId')}</Label>
                    <Input
                      id="playerId"
                      type="text"
                      placeholder={t('playerIdPlaceholder')}
                      value={playerId}
                      onChange={(e) => {
                        setPlayerId(e.target.value)
                        setPlayerName(null)
                        setVerifyError(null)
                      }}
                      className="mt-1 cyber-border"
                    />
                  </div>
                  
                  {/* Zone ID for Mobile Legends */}
                  {selectedGame.hasZoneId && (
                    <div>
                      <Label htmlFor="zoneId">{t('zoneId')}</Label>
                      <Input
                        id="zoneId"
                        type="text"
                        placeholder={t('zoneIdPlaceholder')}
                        value={zoneId}
                        onChange={(e) => setZoneId(e.target.value)}
                        className="mt-1 cyber-border"
                      />
                    </div>
                  )}
                  
                  {/* Verify Button */}
                  <Button
                    onClick={handleVerifyId}
                    disabled={isVerifying || !playerId}
                    className="w-full cyber-border"
                    variant="outline"
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t('checking')}
                      </>
                    ) : (
                      t('checkId')
                    )}
                  </Button>
                  
                  {/* Verification Result */}
                  {playerName && (
                    <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">{t('playerName')}</p>
                        <p className="font-bold text-green-500">{playerName}</p>
                      </div>
                    </div>
                  )}
                  
                  {verifyError && (
                    <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-xl">
                      <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                      <p className="text-sm text-destructive">{verifyError}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Selected Package Summary */}
              {selectedPackage && playerName && (
                <div className="glass cyber-border rounded-2xl p-6">
                  <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('game')}</span>
                      <span>{selectedGame.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('playerId')}</span>
                      <span className="font-mono">{playerId}{zoneId && ` (${zoneId})`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('playerName')}</span>
                      <span>{playerName}</span>
                    </div>
                    <div className="border-t cyber-border my-2" />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{selectedPackage.name}</span>
                      <span className="font-bold text-primary text-xl">${selectedPackage.price.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleProceedToPayment}
                    className="w-full mt-6 btn-gold h-12 text-base"
                  >
                    {t('payNow')}
                  </Button>
                </div>
              )}
            </div>
            
            {/* Right: Package Selection */}
            <div>
              <div className="glass cyber-border rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Diamond className="w-5 h-5 text-primary" />
                  {t('selectPackage')}
                </h2>
                
                <div className="grid grid-cols-2 gap-3">
                  {selectedGame.packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => handleSelectPackage(pkg)}
                      disabled={!playerName}
                      className={cn(
                        "relative p-4 rounded-xl border transition-all text-left",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        selectedPackage?.id === pkg.id
                          ? "border-primary bg-primary/10 cyber-glow"
                          : "cyber-border hover:border-primary/50 hover:bg-secondary/50"
                      )}
                    >
                      {pkg.popular && (
                        <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-bold bg-primary text-primary-foreground rounded-full flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          HOT
                        </span>
                      )}
                      <div className="text-sm font-bold mb-1">{pkg.name}</div>
                      {pkg.bonus && (
                        <div className="text-xs text-green-500 mb-1">+{pkg.bonus} Bonus</div>
                      )}
                      <div className="text-lg font-bold text-primary">${pkg.price.toFixed(2)}</div>
                    </button>
                  ))}
                </div>
                
                {!playerName && (
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Please verify your Player ID first to select a package
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <PaymentModal />
    </div>
  )
}

export default function TopUpPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  
  return (
    <StoreProvider>
      <TopUpContent slug={resolvedParams.slug} />
    </StoreProvider>
  )
}
