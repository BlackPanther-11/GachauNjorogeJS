"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookingModal } from "@/components/booking-modal"
import { Trophy, Users, Target, ArrowRight, Activity, Zap, Award, Clock, DollarSign, CheckCircle } from "lucide-react"

const services = [
  {
    id: "personal",
    name: "Weight and Fat Loss Expert",
    icon: Trophy,
    price: "$150",
    duration: "60 min",
    description: "Specialized coaching focused on sustainable weight loss and body composition transformation",
    features: [
      "Customized fat loss programs",
      "Metabolic optimization strategies",
      "Body composition tracking",
      "Sustainable lifestyle coaching",
      "24/7 support and accountability",
    ],
    popular: true,
  },
  {
    id: "group",
    name: "Online Personal Trainer",
    icon: Users,
    price: "$75",
    duration: "45 min",
    description: "Virtual one-on-one coaching with personalized programs delivered remotely",
    features: [
      "Live virtual training sessions",
      "Personalized workout programs",
      "Form correction via video",
      "Flexible scheduling worldwide",
      "Digital progress tracking",
    ],
  },
  {
    id: "nutrition",
    name: "Nutrition Coaching",
    icon: Target,
    price: "$200",
    duration: "90 min",
    description: "Science-based nutrition plans tailored to your goals and lifestyle",
    features: [
      "Comprehensive meal planning",
      "Macro tracking guidance",
      "Supplement recommendations",
      "Lifestyle integration",
      "Ongoing adjustments",
    ],
  },
  {
    id: "hormone",
    name: "Hormone Optimization Expert",
    icon: Activity,
    price: "$300",
    duration: "120 min",
    description: "Advanced hormone therapy and optimization protocols for peak performance and recovery",
    features: [
      "Comprehensive hormone testing",
      "Personalized optimization protocols",
      "Medical supervision",
      "Performance enhancement",
      "Recovery optimization",
    ],
    premium: true,
  },
  {
    id: "enhancement",
    name: "Enhancement Coach",
    icon: Zap,
    price: "$250",
    duration: "90 min",
    description: "Specialized coaching for advanced enhancement protocols and performance optimization",
    features: [
      "Advanced training protocols",
      "Performance enhancement strategies",
      "Recovery optimization",
      "Supplement guidance",
      "Competition preparation",
    ],
    premium: true,
  },
  {
    id: "ambassador",
    name: "Brand Ambassador",
    icon: Award,
    price: "Contact",
    duration: "Ongoing",
    description: "Represent Iron Nation and earn exclusive benefits while building your fitness influence",
    features: [
      "Exclusive merchandise",
      "Commission opportunities",
      "Social media support",
      "Event invitations",
      "Networking opportunities",
    ],
  },
]

export default function ServicesPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-red-900/20">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-800 rounded-lg flex items-center justify-center font-bold text-white">
              IN
            </div>
            <span className="text-xl font-bold">IRON NATION</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-red-400 transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-red-500 hover:text-red-400 transition-colors">
              Services
            </Link>
            <Link href="/about" className="hover:text-red-400 transition-colors">
              About
            </Link>
            <Link href="/gallery" className="hover:text-red-400 transition-colors">
              Gallery
            </Link>
            <Link href="/contact" className="hover:text-red-400 transition-colors">
              Contact
            </Link>
          </nav>

          <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setIsBookingOpen(true)}>
            Book Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=800&width=1920"
            alt="Professional training services"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>

        <div className="relative z-20 container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-red-600/20 text-red-400 border-red-600/30">Our Services</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-red-200 to-red-400 bg-clip-text text-transparent">
            ELITE TRAINING
            <br />
            <span className="text-red-500">PROGRAMS</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Scientifically-backed programs designed to maximize your potential and deliver extraordinary results.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon
              return (
                <Card
                  key={service.id}
                  className={`bg-gray-900/50 border-gray-800 hover:border-red-600/50 transition-all duration-300 group relative ${
                    service.popular ? "ring-2 ring-red-600/30" : ""
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-red-600 text-white">Most Popular</Badge>
                    </div>
                  )}
                  {service.premium && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-yellow-600 text-black">Premium</Badge>
                    </div>
                  )}
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-red-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-600/30 transition-colors">
                      <IconComponent className="h-8 w-8 text-red-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{service.name}</h3>
                    <p className="text-gray-400 mb-6">{service.description}</p>

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-red-400">
                          <DollarSign className="h-4 w-4 mr-1" />
                          <span className="font-bold text-lg">{service.price}</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className="text-sm">{service.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-300">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={() => setIsBookingOpen(true)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                    >
                      Book This Service
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-900/20 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your <span className="text-red-500">Transformation?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Choose the service that best fits your goals and let's build your dream body together.
          </p>
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 text-lg"
            onClick={() => setIsBookingOpen(true)}
          >
            Book Your Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-800 rounded-lg flex items-center justify-center font-bold text-white text-sm">
                IN
              </div>
              <span className="text-lg font-bold">IRON NATION</span>
            </div>
            <div className="text-center text-gray-400">
              <p>&copy; 2024 Iron Nation. All rights reserved.</p>
              <p className="mt-2 text-sm text-gray-500">Architect Kevin Okemwa</p>
            </div>
          </div>
        </div>
      </footer>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  )
}
