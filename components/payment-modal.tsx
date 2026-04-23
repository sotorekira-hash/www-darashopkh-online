'use client'

import { useState, useEffect, useCallback } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { X, Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const PAYMENT_TIMEOUT = 300 // 5 minutes in seconds

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
  
  const [timeLeft, setTimeLeft] = useState(PAYMENT_TIMEOUT)
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'checking' | 'success' | 'failed'>('pending')
  
  // Generate mock QR data
  const qrData = JSON.stringify({
    orderId: currentOrderId,
    amount: selectedPackage?.price || 0,
    currency: 'USD',
    merchant: 'KIRASTORE',
    timestamp: Date.now(),
  })
  
  // Countdown timer
  useEffect(() => {
    if (!isPaymentModalOpen || paymentStatus !== 'pending') return
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setPaymentStatus('failed')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [isPaymentModalOpen, paymentStatus])
  
  // Reset state when modal opens
  useEffect(() => {
    if (isPaymentModalOpen) {
      setTimeLeft(PAYMENT_TIMEOUT)
      setPaymentStatus('pending')
    }
  }, [isPaymentModalOpen])
  
  // Simulate payment check (for demo)
  const checkPayment = useCallback(() => {
    setPaymentStatus('checking')
    
    // Simulate API call
    setTimeout(() => {
      // 80% chance of success for demo
      if (Math.random() > 0.2) {
        setPaymentStatus('success')
        if (currentOrderId) {
          updateOrderStatus(currentOrderId, 'completed')
        }
      } else {
        setPaymentStatus('pending')
      }
    }, 2000)
  }, [currentOrderId, updateOrderStatus])
  
  // Auto-check payment every 5 seconds (simulation)
  useEffect(() => {
    if (!isPaymentModalOpen || paymentStatus !== 'pending') return
    
    const checkInterval = setInterval(() => {
      // Random chance to auto-detect payment (for demo)
      if (Math.random() > 0.9) {
        setPaymentStatus('success')
        if (currentOrderId) {
          updateOrderStatus(currentOrderId, 'completed')
        }
      }
    }, 5000)
    
    return () => clearInterval(checkInterval)
  }, [isPaymentModalOpen, paymentStatus, currentOrderId, updateOrderStatus])
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  const handleClose = () => {
    if (paymentStatus === 'success') {
      closePaymentModal()
    } else if (window.confirm('Are you sure you want to cancel this payment?')) {
      if (currentOrderId) {
        updateOrderStatus(currentOrderId, 'failed')
      }
      closePaymentModal()
    }
  }
  
  if (!isPaymentModalOpen) return null
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md glass cyber-border rounded-3xl p-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
        
        {/* Content based on status */}
        {paymentStatus === 'success' ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-green-500 mb-2">
              {t('paymentSuccess')}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t('deliveryInProgress')}
            </p>
            <div className="glass-light cyber-border rounded-xl p-4 mb-6">
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
                <span className="font-medium">{playerName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{selectedPackage?.name}</span>
                <span className="font-bold text-primary">${selectedPackage?.price.toFixed(2)}</span>
              </div>
            </div>
            <Button onClick={closePaymentModal} className="w-full btn-gold">
              Done
            </Button>
          </div>
        ) : paymentStatus === 'failed' ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/20 flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-destructive" />
            </div>
            <h3 className="text-2xl font-bold text-destructive mb-2">
              {t('paymentFailed')}
            </h3>
            <p className="text-muted-foreground mb-6">
              Payment timeout. Please try again.
            </p>
            <Button onClick={closePaymentModal} variant="outline" className="w-full cyber-border">
              {t('cancel')}
            </Button>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-center mb-6">
              {t('scanToPay')}
            </h3>
            
            {/* QR Code */}
            <div className="bg-white p-4 rounded-2xl mx-auto w-fit mb-6">
              <QRCodeSVG
                value={qrData}
                size={200}
                level="H"
                includeMargin={false}
              />
            </div>
            
            {/* Timer */}
            <div className={cn(
              "flex items-center justify-center gap-2 text-lg font-mono mb-4",
              timeLeft <= 60 ? "text-destructive animate-pulse" : "text-primary"
            )}>
              <Clock className="w-5 h-5" />
              <span>{formatTime(timeLeft)}</span>
            </div>
            
            {/* Order details */}
            <div className="glass-light cyber-border rounded-xl p-4 mb-6">
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
                <span className="font-medium">{playerName}</span>
              </div>
              <div className="border-t cyber-border my-2 pt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{selectedPackage?.name}</span>
                  <span className="font-bold text-primary text-lg">${selectedPackage?.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {/* Status */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
              {paymentStatus === 'checking' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t('checking')}</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span>{t('paymentPending')}</span>
                </>
              )}
            </div>
            
            {/* Actions */}
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={handleClose}
                className="flex-1 cyber-border"
              >
                {t('cancel')}
              </Button>
              <Button 
                onClick={checkPayment}
                disabled={paymentStatus === 'checking'}
                className="flex-1 btn-gold"
              >
                {paymentStatus === 'checking' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Check Payment'
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
