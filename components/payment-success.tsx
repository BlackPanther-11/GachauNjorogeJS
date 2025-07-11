"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, Calendar, CreditCard, Smartphone } from "lucide-react"

interface PaymentSuccessProps {
  paymentData: {
    paymentId: string
    amount: number
    amountKsh?: number
    currency: string
    status: string
    cardLast4?: string
    cardType?: string
    phoneNumber?: string
    transactionCode?: string
    paymentMethod: string
  }
  bookingData: {
    service: string
    date: Date | undefined
    time: string
    firstName: string
    lastName: string
    email: string
  }
  onClose: () => void
}

export function PaymentSuccess({ paymentData, bookingData, onClose }: PaymentSuccessProps) {
  const handleDownloadReceipt = () => {
    // Simulate receipt download
    const receiptData = {
      paymentId: paymentData.paymentId,
      amount: paymentData.amount,
      service: bookingData.service,
      date: bookingData.date?.toLocaleDateString(),
      time: bookingData.time,
      client: `${bookingData.firstName} ${bookingData.lastName}`,
      email: bookingData.email,
    }

    const dataStr = JSON.stringify(receiptData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `iron-nation-receipt-${paymentData.paymentId}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
      </div>

      <div>
        <h3 className="text-3xl font-bold text-green-500 mb-2">Payment Successful!</h3>
        <p className="text-gray-300 mb-4">Your booking has been confirmed and payment processed successfully.</p>
      </div>

      {/* Payment Details */}
      <Card className="bg-gray-800/50 border-gray-700 max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Payment ID</span>
              <span className="text-white font-mono text-sm">{paymentData.paymentId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Amount Paid</span>
              <span className="text-white font-semibold">${paymentData.amount.toFixed(2)}</span>
            </div>
            {paymentData.amountKsh && (
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Amount (KSH)</span>
                <span className="text-white">KSH {paymentData.amountKsh.toLocaleString()}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Payment Method</span>
              <div className="flex items-center space-x-2">
                {paymentData.paymentMethod === "M-Pesa" ? (
                  <>
                    <Smartphone className="h-4 w-4 text-gray-400" />
                    <span className="text-white">M-Pesa {paymentData.phoneNumber}</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 text-gray-400" />
                    <span className="text-white">
                      {paymentData.cardType} •••• {paymentData.cardLast4}
                    </span>
                  </>
                )}
              </div>
            </div>
            {paymentData.transactionCode && (
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Transaction Code</span>
                <span className="text-white font-mono text-sm">{paymentData.transactionCode}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Status</span>
              <Badge className="bg-green-600/20 text-green-400 border-green-600/30">
                {paymentData.status.charAt(0).toUpperCase() + paymentData.status.slice(1)}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Summary */}
      <Card className="bg-gray-800/50 border-gray-700 max-w-md mx-auto">
        <CardContent className="p-6">
          <h4 className="font-semibold mb-4 text-white flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-red-500" />
            Booking Details
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Service</span>
              <span className="text-white">{bookingData.service}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Date</span>
              <span className="text-white">{bookingData.date?.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Time</span>
              <span className="text-white">{bookingData.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Client</span>
              <span className="text-white">
                {bookingData.firstName} {bookingData.lastName}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-blue-900/20 border-blue-700/30 max-w-md mx-auto">
        <CardContent className="p-6">
          <h4 className="font-semibold mb-3 text-blue-400">What's Next?</h4>
          <div className="space-y-2 text-sm text-blue-300">
            <p>• Confirmation email sent to {bookingData.email}</p>
            <p>• Calendar invite will be sent within 24 hours</p>
            <p>• Our team will call you to prepare for your session</p>
            <p>• Arrive 15 minutes early for your appointment</p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={handleDownloadReceipt}
          variant="outline"
          className="border-gray-600 text-gray-300 hover:border-gray-500 bg-transparent"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Receipt
        </Button>
        <Button onClick={onClose} className="bg-red-600 hover:bg-red-700 text-white">
          Close
        </Button>
      </div>
    </div>
  )
}
