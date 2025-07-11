"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Smartphone, Shield, CheckCircle, Clock } from "lucide-react"

interface MpesaPaymentFormProps {
  service: {
    id: string
    name: string
    price: string
    duration: string
  }
  onPaymentSuccess: (paymentData: any) => void
  onPaymentError: (error: string) => void
  isProcessing: boolean
}

export function MpesaPaymentForm({ service, onPaymentSuccess, onPaymentError, isProcessing }: MpesaPaymentFormProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [paymentStep, setPaymentStep] = useState<"input" | "pending" | "confirm">("input")
  const [transactionCode, setTransactionCode] = useState("")

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "")

    // Format as Kenyan phone number
    if (digits.startsWith("254")) {
      // Already has country code
      return digits.slice(0, 12)
    } else if (digits.startsWith("0")) {
      // Remove leading 0 and add country code
      return "254" + digits.slice(1, 10)
    } else if (digits.startsWith("7") || digits.startsWith("1")) {
      // Add country code
      return "254" + digits.slice(0, 9)
    }
    return digits.slice(0, 12)
  }

  const displayPhoneNumber = (phone: string) => {
    if (phone.length >= 12) {
      return `+${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6, 9)} ${phone.slice(9)}`
    }
    return phone
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhoneNumber(formatted)
  }

  const calculateTotal = () => {
    const basePrice = Number.parseFloat(service.price.replace("$", "")) || 0
    const kshRate = 150 // 1 USD = 150 KSH (approximate)
    const baseKsh = basePrice * kshRate
    const mpesaFee = baseKsh * 0.01 // 1% M-Pesa fee
    return {
      usdAmount: basePrice,
      kshAmount: baseKsh,
      mpesaFee: mpesaFee,
      totalKsh: baseKsh + mpesaFee,
    }
  }

  const pricing = calculateTotal()

  const handleInitiatePayment = async () => {
    if (!phoneNumber || phoneNumber.length < 12) {
      onPaymentError("Please enter a valid M-Pesa phone number")
      return
    }

    setPaymentStep("pending")

    // Simulate STK push
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setPaymentStep("confirm")

      // Generate mock transaction code
      const mockCode = `MP${Math.random().toString(36).substr(2, 8).toUpperCase()}`
      setTransactionCode(mockCode)
    } catch (error) {
      onPaymentError("Failed to initiate M-Pesa payment. Please try again.")
      setPaymentStep("input")
    }
  }

  const handleConfirmPayment = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Simulate success/failure (85% success rate for M-Pesa)
      if (Math.random() > 0.15) {
        onPaymentSuccess({
          paymentId: `mpesa_${Math.random().toString(36).substr(2, 9)}`,
          amount: pricing.usdAmount,
          amountKsh: pricing.totalKsh,
          currency: "KSH",
          status: "succeeded",
          phoneNumber: displayPhoneNumber(phoneNumber),
          transactionCode: transactionCode,
          paymentMethod: "M-Pesa",
        })
      } else {
        onPaymentError("M-Pesa payment was cancelled or failed. Please try again.")
        setPaymentStep("input")
      }
    } catch (error) {
      onPaymentError("Payment confirmation failed. Please try again.")
      setPaymentStep("input")
    }
  }

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Smartphone className="mr-2 h-5 w-5 text-green-500" />
            M-Pesa Payment Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium text-white">{service.name}</h4>
              <p className="text-sm text-gray-400">{service.duration}</p>
            </div>
            <div className="text-right">
              <span className="font-medium text-white">KSH {pricing.kshAmount.toLocaleString()}</span>
              <p className="text-xs text-gray-400">(${pricing.usdAmount})</p>
            </div>
          </div>
          <Separator className="bg-gray-600" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Service Amount</span>
              <span>KSH {pricing.kshAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>M-Pesa Transaction Fee</span>
              <span>KSH {pricing.mpesaFee.toFixed(2)}</span>
            </div>
            <Separator className="bg-gray-600" />
            <div className="flex justify-between font-semibold text-white text-base">
              <span>Total Amount</span>
              <span>KSH {pricing.totalKsh.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* M-Pesa Payment Form */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Smartphone className="mr-2 h-5 w-5 text-green-500" />
            Pay with M-Pesa
          </CardTitle>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Shield className="h-4 w-4" />
            <span>Secure mobile money payment</span>
          </div>
        </CardHeader>
        <CardContent>
          {paymentStep === "input" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="mpesaPhone" className="text-sm font-medium text-white">
                  M-Pesa Phone Number
                </Label>
                <Input
                  id="mpesaPhone"
                  value={displayPhoneNumber(phoneNumber)}
                  onChange={handlePhoneChange}
                  placeholder="+254 7XX XXX XXX"
                  className="bg-gray-900 border-gray-600 text-white"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">Enter your M-Pesa registered phone number</p>
              </div>

              {/* M-Pesa Instructions */}
              <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                <h4 className="font-medium text-green-400 mb-2">How M-Pesa Payment Works:</h4>
                <ol className="text-sm text-green-300/80 space-y-1 list-decimal list-inside">
                  <li>Enter your M-Pesa phone number above</li>
                  <li>Click "Send Payment Request" below</li>
                  <li>Check your phone for M-Pesa payment prompt</li>
                  <li>Enter your M-Pesa PIN to complete payment</li>
                  <li>You'll receive an SMS confirmation</li>
                </ol>
              </div>

              <Button
                onClick={handleInitiatePayment}
                disabled={!phoneNumber || phoneNumber.length < 12}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-medium"
              >
                <Smartphone className="mr-2 h-5 w-5" />
                Send Payment Request
              </Button>
            </div>
          )}

          {paymentStep === "pending" && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center">
                  <Clock className="h-8 w-8 text-green-500 animate-pulse" />
                </div>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Payment Request Sent</h4>
                <p className="text-gray-300 text-sm">
                  We've sent a payment request to <strong>{displayPhoneNumber(phoneNumber)}</strong>
                </p>
              </div>
              <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                <p className="text-green-400 text-sm font-medium mb-2">Check Your Phone</p>
                <p className="text-green-300/80 text-sm">
                  You should receive an M-Pesa payment prompt on your phone. Enter your M-Pesa PIN to complete the
                  payment of <strong>KSH {pricing.totalKsh.toLocaleString()}</strong>
                </p>
              </div>
              <div className="animate-pulse">
                <div className="h-2 bg-green-600/30 rounded-full">
                  <div className="h-2 bg-green-600 rounded-full w-1/2"></div>
                </div>
                <p className="text-xs text-gray-400 mt-2">Waiting for payment confirmation...</p>
              </div>
            </div>
          )}

          {paymentStep === "confirm" && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Payment Initiated</h4>
                <p className="text-gray-300 text-sm">
                  Transaction Code: <strong className="text-green-400">{transactionCode}</strong>
                </p>
              </div>
              <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                <p className="text-green-400 text-sm font-medium mb-2">Complete Your Payment</p>
                <p className="text-green-300/80 text-sm">
                  Please confirm the payment on your phone to complete the transaction. This may take a few moments.
                </p>
              </div>
              <Button
                onClick={handleConfirmPayment}
                disabled={isProcessing}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-medium"
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Confirming Payment...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Confirm Payment
                  </div>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
