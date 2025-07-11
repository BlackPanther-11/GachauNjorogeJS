"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Lock, Shield, Smartphone } from "lucide-react"

interface PaymentFormProps {
  service: {
    id: string
    name: string
    price: string
    duration: string
  }
  onPaymentSuccess: (paymentData: any) => void
  onPaymentError: (error: string) => void
  onPaymentMethodChange?: (method: "card" | "mpesa") => void
  isProcessing: boolean
}

export function PaymentForm({
  service,
  onPaymentSuccess,
  onPaymentError,
  onPaymentMethodChange,
  isProcessing,
}: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardName, setCardName] = useState("")
  const [billingAddress, setBillingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  })
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mpesa">("card")

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    if (formatted.length <= 19) {
      setCardNumber(formatted)
    }
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value)
    if (formatted.length <= 5) {
      setExpiryDate(formatted)
    }
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 4) {
      setCvv(value)
    }
  }

  const getCardType = (number: string) => {
    const num = number.replace(/\s/g, "")
    if (num.startsWith("4")) return "Visa"
    if (num.startsWith("5") || num.startsWith("2")) return "Mastercard"
    if (num.startsWith("3")) return "American Express"
    return "Card"
  }

  const calculateTotal = () => {
    const basePrice = Number.parseFloat(service.price.replace("$", "")) || 0
    const tax = basePrice * 0.08 // 8% tax
    const processingFee = basePrice * 0.029 + 0.3 // Stripe fee simulation
    return {
      subtotal: basePrice,
      tax: tax,
      processingFee: processingFee,
      total: basePrice + tax + processingFee,
    }
  }

  const pricing = calculateTotal()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (paymentMethod === "mpesa") {
      onPaymentMethodChange?.("mpesa")
      return
    }

    // Basic validation
    if (!cardNumber || !expiryDate || !cvv || !cardName) {
      onPaymentError("Please fill in all payment details")
      return
    }

    if (cardNumber.replace(/\s/g, "").length < 13) {
      onPaymentError("Please enter a valid card number")
      return
    }

    if (cvv.length < 3) {
      onPaymentError("Please enter a valid CVV")
      return
    }

    // Simulate payment processing
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Simulate success/failure (90% success rate)
      if (Math.random() > 0.1) {
        onPaymentSuccess({
          paymentId: `pi_${Math.random().toString(36).substr(2, 9)}`,
          amount: pricing.total,
          currency: "usd",
          status: "succeeded",
          cardLast4: cardNumber.slice(-4),
          cardType: getCardType(cardNumber),
        })
      } else {
        onPaymentError("Your card was declined. Please try a different payment method.")
      }
    } catch (error) {
      onPaymentError("Payment processing failed. Please try again.")
    }
  }

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <CreditCard className="mr-2 h-5 w-5 text-red-500" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium text-white">{service.name}</h4>
              <p className="text-sm text-gray-400">{service.duration}</p>
            </div>
            <span className="font-medium text-white">${pricing.subtotal.toFixed(2)}</span>
          </div>
          <Separator className="bg-gray-600" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span>${pricing.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Tax (8%)</span>
              <span>${pricing.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Processing Fee</span>
              <span>${pricing.processingFee.toFixed(2)}</span>
            </div>
            <Separator className="bg-gray-600" />
            <div className="flex justify-between font-semibold text-white text-base">
              <span>Total</span>
              <span>${pricing.total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Lock className="mr-2 h-5 w-5 text-green-500" />
            Secure Payment
          </CardTitle>
          <div className="mb-6">
            <Label className="text-sm font-medium text-white mb-3 block">Select Payment Method</Label>
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant={paymentMethod === "card" ? "default" : "outline"}
                className={`p-4 h-auto flex flex-col items-center space-y-2 ${
                  paymentMethod === "card"
                    ? "bg-red-600 hover:bg-red-700"
                    : "border-gray-600 text-gray-300 hover:border-gray-500 bg-transparent"
                }`}
                onClick={() => setPaymentMethod("card")}
              >
                <CreditCard className="h-6 w-6" />
                <span className="text-sm font-medium">Credit/Debit Card</span>
              </Button>
              <Button
                type="button"
                variant={paymentMethod === "mpesa" ? "default" : "outline"}
                className={`p-4 h-auto flex flex-col items-center space-y-2 ${
                  paymentMethod === "mpesa"
                    ? "bg-green-600 hover:bg-green-700"
                    : "border-gray-600 text-gray-300 hover:border-gray-500 bg-transparent"
                }`}
                onClick={() => setPaymentMethod("mpesa")}
              >
                <Smartphone className="h-6 w-6" />
                <span className="text-sm font-medium">M-Pesa</span>
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Shield className="h-4 w-4" />
            <span>Your payment information is encrypted and secure</span>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {paymentMethod === "card" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardName" className="text-sm font-medium text-white">
                    Cardholder Name
                  </Label>
                  <Input
                    id="cardName"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Smith"
                    className="bg-gray-900 border-gray-600 text-white"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="cardNumber" className="text-sm font-medium text-white">
                    Card Number
                  </Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      className="bg-gray-900 border-gray-600 text-white pr-16"
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Badge variant="outline" className="text-xs border-gray-500 text-gray-400">
                        {getCardType(cardNumber)}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate" className="text-sm font-medium text-white">
                      Expiry Date
                    </Label>
                    <Input
                      id="expiryDate"
                      value={expiryDate}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      className="bg-gray-900 border-gray-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="text-sm font-medium text-white">
                      CVV
                    </Label>
                    <Input
                      id="cvv"
                      value={cvv}
                      onChange={handleCvvChange}
                      placeholder="123"
                      className="bg-gray-900 border-gray-600 text-white"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "mpesa" && (
              <div className="text-center py-8">
                <Smartphone className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-white mb-2">M-Pesa Payment</h4>
                <p className="text-gray-400 text-sm">M-Pesa payment will be processed in the next step</p>
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="space-y-4">
                <h4 className="font-medium text-white">Billing Address</h4>
                <div>
                  <Label htmlFor="street" className="text-sm font-medium text-white">
                    Street Address
                  </Label>
                  <Input
                    id="street"
                    value={billingAddress.street}
                    onChange={(e) => setBillingAddress({ ...billingAddress, street: e.target.value })}
                    placeholder="123 Main Street"
                    className="bg-gray-900 border-gray-600 text-white"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-sm font-medium text-white">
                      City
                    </Label>
                    <Input
                      id="city"
                      value={billingAddress.city}
                      onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                      placeholder="New York"
                      className="bg-gray-900 border-gray-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-sm font-medium text-white">
                      State
                    </Label>
                    <Input
                      id="state"
                      value={billingAddress.state}
                      onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })}
                      placeholder="NY"
                      className="bg-gray-900 border-gray-600 text-white"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="zip" className="text-sm font-medium text-white">
                    ZIP Code
                  </Label>
                  <Input
                    id="zip"
                    value={billingAddress.zip}
                    onChange={(e) => setBillingAddress({ ...billingAddress, zip: e.target.value })}
                    placeholder="10001"
                    className="bg-gray-900 border-gray-600 text-white"
                    required
                  />
                </div>
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-green-500 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-green-400 font-medium">Secure Payment</p>
                    <p className="text-green-300/80">
                      Your payment is processed securely using industry-standard encryption. We never store your card
                      details.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={isProcessing || (paymentMethod === "card" && (!cardNumber || !expiryDate || !cvv || !cardName))}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-medium"
            >
              {isProcessing ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  {paymentMethod === "card" ? (
                    <Lock className="mr-2 h-5 w-5" />
                  ) : (
                    <Smartphone className="mr-2 h-5 w-5" />
                  )}
                  {paymentMethod === "card" ? `Pay $${pricing.total.toFixed(2)}` : "Continue to M-Pesa"}
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
