"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, User, MessageSquare, CheckCircle, CreditCard, AlertCircle } from "lucide-react"
import { PaymentForm } from "./payment-form"
import { PaymentSuccess } from "./payment-success"
import { MpesaPaymentForm } from "./mpesa-payment-form"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

interface BookingData {
  service: string
  date: Date | undefined
  time: string
  firstName: string
  lastName: string
  email: string
  phone: string
  goals: string
  experience: string
}

const services = [
  { id: "personal", name: "Weight and Fat Loss Expert", duration: "60 min", price: "$150" },
  { id: "group", name: "Online Personal Trainer", duration: "45 min", price: "$75" },
  { id: "nutrition", name: "Nutrition Coaching", duration: "90 min", price: "$200" },
  { id: "consultation", name: "Free Consultation", duration: "30 min", price: "$0" },
]

const timeSlots = [
  "6:00 AM",
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
]

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingData, setBookingData] = useState<BookingData>({
    service: "",
    date: undefined,
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    goals: "",
    experience: "",
  })

  const [paymentData, setPaymentData] = useState<any>(null)
  const [paymentError, setPaymentError] = useState<string>("")
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mpesa">("card")

  const handleSubmit = async () => {
    const selectedService = services.find((s) => s.id === bookingData.service)
    if (selectedService?.price === "$0") {
      // Free consultation - skip payment
      setIsSubmitting(true)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsSubmitting(false)
      setStep(5) // Success step
    } else {
      // Paid service - go to payment
      setStep(4)
    }
  }

  const resetForm = () => {
    setStep(1)
    setPaymentData(null)
    setPaymentError("")
    setIsPaymentProcessing(false)
    setBookingData({
      service: "",
      date: undefined,
      time: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      goals: "",
      experience: "",
    })
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handlePaymentSuccess = (payment: any) => {
    setPaymentData(payment)
    setIsPaymentProcessing(false)
    setStep(5) // Payment success step
  }

  const handlePaymentError = (error: string) => {
    setPaymentError(error)
    setIsPaymentProcessing(false)
  }

  const handlePaymentSubmit = () => {
    setIsPaymentProcessing(true)
    setPaymentError("")
  }

  const selectedService = services.find((s) => s.id === bookingData.service)

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {step === 4 || step === 5 ? "Booking Confirmed!" : "Book Your Session"}
          </DialogTitle>
        </DialogHeader>

        {/* Progress Indicator */}
        {step < 5 && (
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step >= stepNum ? "bg-red-600 text-white" : "bg-gray-700 text-gray-400"
                    }`}
                  >
                    {stepNum}
                  </div>
                  {stepNum < 4 && <div className={`w-12 h-0.5 ${step > stepNum ? "bg-red-600" : "bg-gray-700"}`} />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <User className="mr-2 h-5 w-5 text-red-500" />
                Choose Your Service
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <Card
                    key={service.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      bookingData.service === service.id
                        ? "border-red-600 bg-red-600/10"
                        : "border-gray-700 hover:border-gray-600 bg-gray-800/50"
                    }`}
                    onClick={() => setBookingData({ ...bookingData, service: service.id })}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-white">{service.name}</h4>
                        <Badge
                          variant={service.price === "Free" ? "secondary" : "outline"}
                          className="text-red-400 border-red-400"
                        >
                          {service.price}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">{service.duration}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => setStep(2)}
                disabled={!bookingData.service}
                className="bg-red-600 hover:bg-red-700"
              >
                Next: Select Date & Time
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Date & Time Selection */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <CalendarDays className="mr-2 h-5 w-5 text-red-500" />
                Select Date & Time
              </h3>
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Choose Date</Label>
                  <Calendar
                    mode="single"
                    selected={bookingData.date}
                    onSelect={(date) => setBookingData({ ...bookingData, date })}
                    disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
                    className="rounded-md border border-gray-700 bg-gray-800"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block">Available Times</Label>
                  <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={bookingData.time === time ? "default" : "outline"}
                        size="sm"
                        className={`text-xs ${
                          bookingData.time === time
                            ? "bg-red-600 hover:bg-red-700"
                            : "border-gray-600 text-gray-300 hover:border-gray-500"
                        }`}
                        onClick={() => setBookingData({ ...bookingData, time })}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)} className="border-gray-600">
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!bookingData.date || !bookingData.time}
                className="bg-red-600 hover:bg-red-700"
              >
                Next: Your Information
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Personal Information */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-red-500" />
                Your Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    value={bookingData.firstName}
                    onChange={(e) => setBookingData({ ...bookingData, firstName: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    value={bookingData.lastName}
                    onChange={(e) => setBookingData({ ...bookingData, lastName: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="experience" className="text-sm font-medium">
                  Fitness Experience
                </Label>
                <Select
                  value={bookingData.experience}
                  onValueChange={(value) => setBookingData({ ...bookingData, experience: value })}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                    <SelectItem value="advanced">Advanced (3+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-4">
                <Label htmlFor="goals" className="text-sm font-medium">
                  Fitness Goals
                </Label>
                <Textarea
                  id="goals"
                  value={bookingData.goals}
                  onChange={(e) => setBookingData({ ...bookingData, goals: e.target.value })}
                  placeholder="Tell us about your fitness goals and what you'd like to achieve..."
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={3}
                />
              </div>
            </div>

            {/* Booking Summary */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3 text-white">Booking Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Service:</span>
                    <span className="text-white">{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date:</span>
                    <span className="text-white">{bookingData.date?.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Time:</span>
                    <span className="text-white">{bookingData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-white">{selectedService?.duration}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t border-gray-600">
                    <span className="text-gray-400">Price:</span>
                    <span className="text-red-400">{selectedService?.price}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)} className="border-gray-600">
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={
                  !bookingData.firstName ||
                  !bookingData.lastName ||
                  !bookingData.email ||
                  !bookingData.phone ||
                  isSubmitting
                }
                className="bg-red-600 hover:bg-red-700"
              >
                {isSubmitting ? "Booking..." : "Confirm Booking"}
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Payment */}
        {step === 4 && selectedService && selectedService.price !== "$0" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-red-500" />
                Secure Payment
              </h3>
              {paymentError && (
                <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <p className="text-red-400">{paymentError}</p>
                  </div>
                </div>
              )}
              <PaymentForm
                service={selectedService}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
                onPaymentMethodChange={setPaymentMethod}
                isProcessing={isPaymentProcessing}
              />
              {paymentMethod === "mpesa" && (
                <MpesaPaymentForm
                  service={selectedService}
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                  isProcessing={isPaymentProcessing}
                />
              )}
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(3)} className="border-gray-600">
                Back
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Success */}
        {step === 5 && (
          <>
            {paymentData ? (
              <PaymentSuccess paymentData={paymentData} bookingData={bookingData} onClose={handleClose} />
            ) : (
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-green-500 mb-2">Booking Confirmed!</h3>
                  <p className="text-gray-300 mb-4">
                    Your {selectedService?.name.toLowerCase()} session has been successfully booked.
                  </p>
                  <Card className="bg-gray-800/50 border-gray-700 max-w-md mx-auto">
                    <CardContent className="p-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Service:</span>
                          <span className="text-white">{selectedService?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Date:</span>
                          <span className="text-white">{bookingData.date?.toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Time:</span>
                          <span className="text-white">{bookingData.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Client:</span>
                          <span className="text-white">
                            {bookingData.firstName} {bookingData.lastName}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-gray-400">A confirmation email has been sent to {bookingData.email}</p>
                  <p className="text-sm text-gray-400">
                    We'll call you at {bookingData.phone} to confirm your appointment.
                  </p>
                </div>
                <Button onClick={handleClose} className="bg-red-600 hover:bg-red-700">
                  Close
                </Button>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
