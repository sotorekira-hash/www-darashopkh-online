'use client'

import { useEffect, useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle2, Loader2, AlertCircle, Diamond, Sparkles, User, Hash, Shield, Zap } from 'lucide-react'
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
  const [isIdVerified, setIsIdVerified] = useState(false)
  
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
  
  // Auto-verify when ID changes
  const handleVerifyId = async () => {
    if (!playerId || playerId.length < 5) {
      toast.error('Please enter a valid Player ID (minimum 5 digits)')
      return
    }
    
    setIsVerifying(true)
    setVerifyError(null)
    setIsIdVerified(false)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const result = verifyPlayerId(playerId, zoneId)
    
    if (result.success && result.playerName) {
      setPlayerName(result.playerName)
      setIsIdVerified(true)
      toast.success(`ID Verified: ${result.playerName}`)
    } else {
      setVerifyError('Invalid Player ID. Please check and try again.')
      setPlayerName(null)
      setIsIdVerified(false)
    }
    
    setIsVerifying(false)
  }
  
  const handleSelectPackage = (pkg: Package) => {
    if (!isIdVerified) {
      toast.error('Please verify your Player ID first')
      return
    }
    setSelectedPackage(pkg)
  }
  
  const handleProceedToPayment = () => {
    if (!selectedGame || !selectedPackage || !playerName || !isIdVerified) {
      toast.error('Please complete all required fields')
      return
    }
    
    // Create order
    const orderId = `KS${Date.now().toString().slice(-8)}`
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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Back button */}
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          
          {/* Game Header Card */}
          <div className="glass cyber-border rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden cyber-border flex-shrink-0">
                <Image
                  src={selectedGame.image}
                  alt={selectedGame.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gradient-gold">{selectedGame.name}</h1>
                <p className="text-muted-foreground capitalize">{selectedGame.category} Game</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1 text-xs text-green-500">
                    <Zap className="w-3 h-3" /> Instant Delivery
                  </span>
                  <span className="flex items-center gap-1 text-xs text-primary">
                    <Shield className="w-3 h-3" /> 100% Secure
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Step 1: Enter ID */}
            <div className="lg:col-span-1 space-y-4">
              <div className="glass cyber-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">1</div>
                  <h2 className="text-lg font-bold">Enter Player ID</h2>
                </div>
                
                <div className="space-y-4">
                  {/* Player ID Input */}
                  <div>
                    <Label htmlFor="playerId" className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      Player ID
                    </Label>
                    <Input
                      id="playerId"
                      type="text"
                      placeholder="Enter your Player ID"
                      value={playerId}
                      onChange={(e) => {
                        setPlayerId(e.target.value.replace(/\D/g, ''))
                        setPlayerName(null)
                        setVerifyError(null)
                        setIsIdVerified(false)
                      }}
                      className="cyber-border h-12 text-lg font-mono"
                    />
                  </div>
                  
                  {/* Zone ID for Mobile Legends */}
                  {selectedGame.hasZoneId && (
                    <div>
                      <Label htmlFor="zoneId" className="flex items-center gap-2 mb-2">
                        <Hash className="w-4 h-4 text-muted-foreground" />
                        Zone ID (Server)
                      </Label>
                      <Input
                        id="zoneId"
                        type="text"
                        placeholder="Enter Zone ID"
                        value={zoneId}
                        onChange={(e) => {
                          setZoneId(e.target.value.replace(/\D/g, ''))
                          setPlayerName(null)
                          setIsIdVerified(false)
                        }}
                        className="cyber-border h-12 font-mono"
                      />
                    </div>
                  )}
                  
                  {/* Verify Button */}
                  <Button
                    onClick={handleVerifyId}
                    disabled={isVerifying || !playerId || playerId.length < 5}
                    className={cn(
                      "w-full h-12 text-base transition-all",
                      isIdVerified ? "bg-green-600 hover:bg-green-700" : "btn-gold"
                    )}
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Checking ID...
                      </>
                    ) : isIdVerified ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        ID Verified
                      </>
                    ) : (
                      <>
                        <Shield className="w-5 h-5 mr-2" />
                        Check ID
                      </>
                    )}
                  </Button>
                  
                  {/* Verification Result */}
                  {isIdVerified && playerName && (
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                      <div className="flex items-center gap-2 text-green-500 mb-1">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-medium">Account Found</span>
                      </div>
                      <p className="text-lg font-bold text-white">{playerName}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        ID: {playerId}{zoneId && ` | Zone: ${zoneId}`}
                      </p>
                    </div>
                  )}
                  
                  {verifyError && (
                    <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/30 rounded-xl">
                      <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                      <p className="text-sm text-destructive">{verifyError}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Step 2: Select Package */}
            <div className="lg:col-span-2">
              <div className="glass cyber-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                    isIdVerified ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                  )}>2</div>
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <Diamond className="w-5 h-5 text-primary" />
                    Select Package
                  </h2>
                </div>
                
                {!isIdVerified && (
                  <div className="text-center py-8 text-muted-foreground">
                    <User className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>Please verify your Player ID first</p>
                  </div>
                )}
                
                {isIdVerified && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedGame.packages.map((pkg) => (
                      <button
                        key={pkg.id}
                        onClick={() => handleSelectPackage(pkg)}
                        className={cn(
                          "relative p-4 rounded-xl border transition-all text-left group",
                          selectedPackage?.id === pkg.id
                            ? "border-primary bg-primary/10 cyber-glow scale-[1.02]"
                            : "cyber-border hover:border-primary/50 hover:bg-secondary/50"
                        )}
                      >
                        {pkg.popular && (
                          <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-primary to-amber-500 text-black rounded-full flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            BEST
                          </span>
                        )}
                        <div className="flex items-center gap-2 mb-2">
                          <Diamond className="w-4 h-4 text-primary" />
                          <span className="font-bold">{pkg.name}</span>
                        </div>
                        {pkg.bonus && (
                          <div className="text-xs text-green-500 mb-1">+{pkg.bonus} Bonus</div>
                        )}
                        <div className="text-xl font-bold text-primary">${pkg.price.toFixed(2)}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Order Summary & Payment */}
              {selectedPackage && isIdVerified && (
                <div className="glass cyber-border rounded-2xl p-6 mt-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">3</div>
                    <h2 className="text-lg font-bold">Complete Payment</h2>
                  </div>
                  
                  <div className="bg-secondary/30 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-muted-foreground">Game</span>
                      <span className="font-medium">{selectedGame.name}</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-muted-foreground">Player</span>
                      <span className="font-medium text-green-500">{playerName}</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-muted-foreground">ID</span>
                      <span className="font-mono">{playerId}{zoneId && ` (${zoneId})`}</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-muted-foreground">Package</span>
                      <span className="font-medium">{selectedPackage.name}</span>
                    </div>
                    <div className="border-t border-border pt-3 mt-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold">Total</span>
                        <span className="text-2xl font-bold text-primary">${selectedPackage.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleProceedToPayment}
                    className="w-full btn-gold h-14 text-lg font-bold"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Pay Now - ${selectedPackage.price.toFixed(2)}
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground mt-3">
                    Diamonds will be delivered instantly after payment
                  </p>
                </div>
              )}
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
