'use client'

import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { X, CheckCircle2, Loader2, Sparkles, Diamond } from 'lucide-react'
import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'

export function PaymentModal() {
  const { 
    t, 
    isPaymentModalOpen, 
    closePaymentModal, 
    selectedGame,
    selectedPackage,
    playerId,
    zoneId,
    playerName,
    currentOrderId,
    updateOrderStatus,
  } = useStore()
  
  const [paymentStatus, setPaymentStatus] = useState<'processing' | 'delivering' | 'success'>('processing')
  const [progress, setProgress] = useState(0)
  
  // Generate mock QR data for Bakong KHQR
  const qrData = JSON.stringify({
    orderId: currentOrderId,
    amount: selectedPackage?.price || 0,
    currency: 'USD',
    merchant: 'KIRASTORE',
    timestamp: Date.now(),
  })
  
  // Auto payment success - no check needed (automatic system)
  useEffect(() => {
    if (!isPaymentModalOpen) return
    
    setPaymentStatus('processing')
    setProgress(0)
    
    // Simulate processing with progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 50)
    
    // Auto payment detected after 1.5 seconds
    const paymentTimer = setTimeout(() => {
      setPaymentStatus('delivering')
    }, 1500)
    
    // Auto delivery complete after 3 seconds
    const successTimer = setTimeout(() => {
      setPaymentStatus('success')
      if (currentOrderId) {
        updateOrderStatus(currentOrderId, 'completed')
      }
    }, 3000)
    
    return () => {
      clearInterval(progressInterval)
      clearTimeout(paymentTimer)
      clearTimeout(successTimer)
    }
  }, [isPaymentModalOpen, currentOrderId, updateOrderStatus])
  
  const handleClose = () => {
    closePaymentModal()
  }
  
  if (!isPaymentModalOpen) return null
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={paymentStatus === 'success' ? handleClose : undefined}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md glass cyber-border rounded-3xl p-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Close button - only show on success */}
        {paymentStatus === 'success' && (
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
        
        {/* Success State */}
        {paymentStatus === 'success' ? (
          <div className="text-center py-6">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
              <div className="relative w-full h-full rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-green-500 mb-2">
              {t('paymentSuccess')}
            </h3>
            <p className="text-muted-foreground mb-2">
              Diamonds have been delivered to your account!
            </p>
            
            {/* Success Details */}
            <div className="glass-light cyber-border rounded-xl p-4 mb-6 mt-6 text-left">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Diamond className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold">{selectedPackage?.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedGame?.name}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('playerId')}</span>
                  <span className="font-mono">{playerId}{zoneId && ` (${zoneId})`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('playerName')}</span>
                  <span className="font-medium text-green-500">{playerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID</span>
                  <span className="font-mono text-xs">{currentOrderId}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="text-muted-foreground">Total Paid</span>
                  <span className="font-bold text-primary text-lg">${selectedPackage?.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <Button onClick={closePaymentModal} className="w-full btn-gold h-12 text-base">
              <Sparkles className="w-4 h-4 mr-2" />
              Done
            </Button>
          </div>
        ) : (
          /* Processing State */
          <div className="text-center py-6">
            <h3 className="text-xl font-bold mb-6 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              {paymentStatus === 'processing' ? 'Processing Payment...' : 'Delivering Diamonds...'}
            </h3>
            
            {/* QR Code with overlay */}
            <div className="relative mb-6">
              <div className="bg-white p-4 rounded-2xl mx-auto w-fit">
                <QRCodeSVG
                  value={qrData}
                  size={180}
                  level="H"
                  includeMargin={false}
                />
              </div>
              {/* Processing overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl">
                <div className="text-center">
                  <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-2" />
                  <p className="text-sm font-medium text-white">
                    {paymentStatus === 'processing' ? 'Detecting Payment...' : 'Sending Diamonds...'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-amber-400 transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {progress < 50 ? 'Verifying payment...' : progress < 80 ? 'Payment confirmed!' : 'Delivering diamonds...'}
              </p>
            </div>
            
            {/* Order details */}
            <div className="glass-light cyber-border rounded-xl p-4 text-left">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">{t('game')}</span>
                <span className="font-medium">{selectedGame?.name}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">{t('playerId')}</span>
                <span className="font-mono">{playerId}{zoneId && ` (${zoneId})`}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">{t('playerName')}</span>
                <span className="font-medium text-green-500">{playerName}</span>
              </div>
              <div className="border-t cyber-border my-2 pt-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">{selectedPackage?.name}</span>
                  <span className="font-bold text-primary">${selectedPackage?.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {/* Status indicator */}
            <div className="flex items-center justify-center gap-2 text-sm text-primary mt-4">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Auto-processing enabled</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
