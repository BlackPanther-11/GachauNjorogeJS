"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, User, Phone, Mail, Search, Filter, MoreVertical, CreditCard, Smartphone } from "lucide-react"

interface Booking {
  id: string
  clientName: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  status: "confirmed" | "pending" | "cancelled"
  price: string
  paymentStatus: "paid" | "pending" | "failed" | "refunded"
  paymentId?: string
  paymentMethod?: string
  mpesaPhone?: string
  transactionCode?: string
}

const mockBookings: Booking[] = [
  {
    id: "1",
    clientName: "John Smith",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    service: "Personal Training",
    date: "2024-01-15",
    time: "9:00 AM",
    status: "confirmed",
    price: "$150",
    paymentStatus: "paid",
    paymentId: "pi_1234567890",
    paymentMethod: "Visa •••• 4242",
  },
  {
    id: "2",
    clientName: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 (555) 987-6543",
    service: "Nutrition Coaching",
    date: "2024-01-16",
    time: "2:00 PM",
    status: "pending",
    price: "$200",
    paymentStatus: "pending",
  },
  {
    id: "3",
    clientName: "Mike Wilson",
    email: "mike@example.com",
    phone: "+1 (555) 456-7890",
    service: "Group Training",
    date: "2024-01-17",
    time: "6:00 PM",
    status: "confirmed",
    price: "$75",
    paymentStatus: "paid",
    paymentId: "pi_0987654321",
    paymentMethod: "Mastercard •••• 5555",
  },
  {
    id: "4",
    clientName: "Grace Wanjiku",
    email: "grace@example.com",
    phone: "+254 722 123 456",
    service: "Personal Training",
    date: "2024-01-18",
    time: "10:00 AM",
    status: "confirmed",
    price: "$150",
    paymentStatus: "paid",
    paymentId: "mpesa_abc123def",
    paymentMethod: "M-Pesa +254 722 123 456",
    mpesaPhone: "+254 722 123 456",
    transactionCode: "MP12345678",
  },
  {
    id: "5",
    clientName: "David Kimani",
    email: "david@example.com",
    phone: "+254 733 987 654",
    service: "Group Training",
    date: "2024-01-19",
    time: "7:00 PM",
    status: "pending",
    paymentStatus: "pending",
    price: "$75",
    paymentMethod: "M-Pesa +254 733 987 654",
    mpesaPhone: "+254 733 987 654",
  },
]

export function BookingDashboard() {
  const [bookings] = useState<Booking[]>(mockBookings)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-600/20 text-green-400 border-green-600/30"
      case "pending":
        return "bg-yellow-600/20 text-yellow-400 border-yellow-600/30"
      case "cancelled":
        return "bg-red-600/20 text-red-400 border-red-600/30"
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-600/30"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-600/20 text-green-400 border-green-600/30"
      case "pending":
        return "bg-yellow-600/20 text-yellow-400 border-yellow-600/30"
      case "failed":
        return "bg-red-600/20 text-red-400 border-red-600/30"
      case "refunded":
        return "bg-gray-600/20 text-gray-400 border-gray-600/30"
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-600/30"
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Booking Dashboard</h1>
          <p className="text-gray-400">Manage your client appointments and bookings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Bookings</p>
                  <p className="text-2xl font-bold text-white">24</p>
                </div>
                <Calendar className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">This Week</p>
                  <p className="text-2xl font-bold text-white">8</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Revenue</p>
                  <p className="text-2xl font-bold text-white">$3,200</p>
                </div>
                <User className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Pending</p>
                  <p className="text-2xl font-bold text-white">3</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-gray-900/50 border-gray-800 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Table */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{booking.clientName}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {booking.email}
                        </span>
                        <span className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {booking.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-white">{booking.service}</p>
                      <p className="text-xs text-gray-400">{booking.price}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-white">{new Date(booking.date).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-400">{booking.time}</p>
                    </div>
                    <div className="text-center">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                      <Badge className={`${getPaymentStatusColor(booking.paymentStatus)} mt-1`}>
                        {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                      </Badge>
                    </div>
                    {booking.paymentMethod && (
                      <div className="text-center">
                        <p className="text-xs text-gray-400">Payment</p>
                        <p className="text-xs text-white flex items-center">
                          {booking.paymentMethod.includes("M-Pesa") ? (
                            <Smartphone className="h-3 w-3 mr-1 text-green-500" />
                          ) : (
                            <CreditCard className="h-3 w-3 mr-1" />
                          )}
                          {booking.paymentMethod}
                        </p>
                        {booking.transactionCode && (
                          <p className="text-xs text-gray-400">Code: {booking.transactionCode}</p>
                        )}
                      </div>
                    )}
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
