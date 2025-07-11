"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookingModal } from "@/components/booking-modal"
import {
  Trophy,
  Users,
  Target,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  ShoppingCart,
  Activity,
  Zap,
  Award,
} from "lucide-react"
import { FeaturedProducts } from "@/components/featured-products"
import { TDEECalculator } from "@/components/tdee-calculator"

export default function HomePage() {
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
            <Link href="/" className="text-red-500 hover:text-red-400 transition-colors">
              Home
            </Link>
            <Link href="/services" className="hover:text-red-400 transition-colors">
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
            Book Your Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Professional gym environment"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>

        <div className="relative z-20 container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-red-600/20 text-red-400 border-red-600/30">Elite Fitness Transformation</Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-red-200 to-red-400 bg-clip-text text-transparent">
            BUILDING DREAM BODIES
            <br />
            <span className="text-red-500">THROUGH SCIENCE</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Specializing in Advanced Training, Nutrition, and Enhancement. No shortcuts, just proven strategies that
            deliver extraordinary results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setIsBookingOpen(true)}>
              Book Your Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg bg-transparent"
              onClick={() => {
                const productsSection = document.getElementById("featured-products")
                productsSection?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Shop Now
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-red-900/10 to-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-red-500 mb-2">500+</div>
              <div className="text-gray-400">Transformations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-red-500 mb-2">10+</div>
              <div className="text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-red-500 mb-2">98%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-red-500 mb-2">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <div id="featured-products">
        <FeaturedProducts />
      </div>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-red-600/20 text-red-400 border-red-600/30">Our Services</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Elite Training <span className="text-red-500">Programs</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Scientifically-backed programs designed to maximize your potential
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-gray-800 hover:border-red-600/50 transition-all duration-300 group bg-black">
              <CardContent className="p-8 border-white border-2 opacity-100 rounded-md text-white bg-black">
                <div className="w-16 h-16 bg-red-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-600/30 transition-colors">
                  <Trophy className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Weight and Fat Loss Expert</h3>
                <p className="text-gray-400 mb-6">
                  Specialized coaching focused on sustainable weight loss and body composition transformation
                </p>
                <Link href="/services">
                  <Button
                    variant="outline"
                    className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white bg-transparent"
                  >
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:border-red-600/50 transition-all duration-300 group bg-black border-black">
              <CardContent className="p-8 border-2 rounded-md bg-black">
                <div className="w-16 h-16 bg-red-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-600/30 transition-colors">
                  <Users className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Online Personal Trainer</h3>
                <p className="text-gray-400 mb-6">
                  Virtual one-on-one coaching with personalized programs delivered remotely
                </p>
                <Link href="/services">
                  <Button
                    variant="outline"
                    className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white bg-transparent"
                  >
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:border-red-600/50 transition-all duration-300 group bg-black border-black">
              <CardContent className="p-8 border-2 rounded-md bg-black">
                <div className="w-16 h-16 bg-red-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-600/30 transition-colors">
                  <Target className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Nutrition Coaching</h3>
                <p className="text-gray-400 mb-6">Science-based nutrition plans tailored to your goals and lifestyle</p>
                <Link href="/services">
                  <Button
                    variant="outline"
                    className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white bg-transparent"
                  >
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:border-red-600/50 transition-all duration-300 group bg-black border-black">
              <CardContent className="p-8 border-2 rounded-md bg-black">
                <div className="w-16 h-16 bg-red-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-600/30 transition-colors">
                  <Activity className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Hormone Optimization Expert</h3>
                <p className="text-gray-400 mb-6">
                  Advanced hormone therapy and optimization protocols for peak performance and recovery
                </p>
                <Link href="/services">
                  <Button
                    variant="outline"
                    className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white bg-transparent"
                  >
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:border-red-600/50 transition-all duration-300 group bg-black border-black">
              <CardContent className="p-8 border-2 rounded-md bg-black">
                <div className="w-16 h-16 bg-red-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-600/30 transition-colors">
                  <Zap className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Enhancement Coach</h3>
                <p className="text-gray-400 mb-6">
                  Specialized coaching for advanced enhancement protocols and performance optimization
                </p>
                <Link href="/services">
                  <Button
                    variant="outline"
                    className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white bg-transparent"
                  >
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:border-red-600/50 transition-all duration-300 group bg-black border-black">
              <CardContent className="p-8 border-2 rounded-md bg-black">
                <div className="w-16 h-16 bg-red-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-600/30 transition-colors">
                  <Award className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Brand Ambassador</h3>
                <p className="text-gray-400 mb-6">
                  Represent Iron Nation and earn exclusive benefits while building your fitness influence
                </p>
                <Link href="/services">
                  <Button
                    variant="outline"
                    className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white bg-transparent"
                  >
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-r from-black to-red-900/10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-red-600/20 text-red-400 border-red-600/30">About Iron Nation</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Your Journey to <span className="text-red-500">Excellence</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                I am a renowned fitness brand and competitive bodybuilder with a strong presence in the fitness
                industry. Having participated in numerous events, I bring visibility, credibility, and engagement to
                brands. Collaborating with me means accessing a dedicated fitness audience, increased brand awareness,
                and powerful marketing leverage within the health and wellness space.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                With over a decade of experience and hundreds of successful transformations, we've refined our methods
                to deliver consistent, sustainable results that last a lifetime.
              </p>
              <Link href="/about">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=500"
                alt="Professional trainer"
                width={500}
                height={600}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-900/20 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your <span className="text-red-500">Body?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of successful clients who have achieved their dream physique with our proven methods.
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

      {/* TDEE Calculator Section */}
      <TDEECalculator />

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

            <div className="flex space-x-6">
              <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2025 Iron Nation. All rights reserved. Building dream bodies through science.</p>
            <p className="mt-2 text-sm text-gray-500">Architect Kevin Okemwa</p>
          </div>
        </div>
      </footer>
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  )
}
