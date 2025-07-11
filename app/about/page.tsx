"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookingModal } from "@/components/booking-modal"
import { ArrowRight, Award, Users, Target, TrendingUp, Heart, Zap, Shield, Star } from "lucide-react"

const achievements = [
  { icon: Users, number: "500+", label: "Clients Transformed" },
  { icon: Award, number: "10+", label: "Years Experience" },
  { icon: Target, number: "98%", label: "Success Rate" },
  { icon: TrendingUp, number: "24/7", label: "Support Available" },
]

const values = [
  {
    icon: Heart,
    title: "Passion for Excellence",
    description: "We're driven by an unwavering commitment to helping you achieve extraordinary results.",
  },
  {
    icon: Shield,
    title: "Science-Based Approach",
    description: "Every program is backed by the latest research in exercise science and nutrition.",
  },
  {
    icon: Zap,
    title: "Personalized Solutions",
    description: "No cookie-cutter programs. Every plan is tailored specifically to your unique goals.",
  },
  {
    icon: Star,
    title: "Proven Results",
    description: "Our track record speaks for itself with hundreds of successful transformations.",
  },
]

const team = [
  {
    name: "Jorge Gachaun",
    role: "Founder & Head Coach",
    image: "/placeholder.svg?height=400&width=300",
    bio: "With over 10 years of experience in elite fitness training, Jorge has transformed hundreds of lives through his science-based approach to fitness and nutrition.",
    certifications: ["NASM-CPT", "Precision Nutrition", "Hormone Optimization Specialist"],
  },
  {
    name: "Sarah Mitchell",
    role: "Nutrition Specialist",
    image: "/placeholder.svg?height=400&width=300",
    bio: "Sarah brings a wealth of knowledge in sports nutrition and metabolic optimization, helping clients achieve their physique goals through strategic nutrition planning.",
    certifications: ["RD", "CISSN", "Metabolic Conditioning Specialist"],
  },
  {
    name: "Mike Rodriguez",
    role: "Performance Coach",
    image: "/placeholder.svg?height=400&width=300",
    bio: "Former competitive athlete turned coach, Mike specializes in advanced training protocols and performance enhancement for serious athletes.",
    certifications: ["CSCS", "USAW", "Movement Specialist"],
  },
]

export default function AboutPage() {
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
            <Link href="/services" className="hover:text-red-400 transition-colors">
              Services
            </Link>
            <Link href="/about" className="text-red-500 hover:text-red-400 transition-colors">
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
            alt="About Iron Nation"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>

        <div className="relative z-20 container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-red-600/20 text-red-400 border-red-600/30">About Iron Nation</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-red-200 to-red-400 bg-clip-text text-transparent">
            BUILDING DREAM BODIES
            <br />
            <span className="text-red-500">THROUGH SCIENCE</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Specializing in Advanced training, Nutrition, and Enhancement. No shortcuts, just strategies.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-red-900/10 to-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-red-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-red-500" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-red-500 mb-2">{achievement.number}</div>
                  <div className="text-gray-400">{achievement.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-red-600/20 text-red-400 border-red-600/30">Our Story</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Your Journey to <span className="text-red-500">Excellence</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Iron Nation was born from a simple belief: every individual has the potential to achieve extraordinary
                results. Founded by Jorge Gachaun, our mission is to bridge the gap between science and practical
                application in fitness and nutrition.
              </p>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                We don't believe in quick fixes or magic pills. Instead, we focus on proven methodologies, personalized
                approaches, and sustainable lifestyle changes that deliver lasting results.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                With over a decade of experience and hundreds of successful transformations, we've refined our methods
                to deliver consistent, sustainable results that last a lifetime.
              </p>
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => setIsBookingOpen(true)}
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=500"
                alt="Jorge Gachaun - Founder"
                width={500}
                height={600}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-r from-black to-red-900/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-red-600/20 text-red-400 border-red-600/30">Our Values</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Drives <span className="text-red-500">Us</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our core values guide everything we do and shape the experience we provide to every client.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card
                  key={index}
                  className="bg-gray-900/50 border-gray-800 hover:border-red-600/50 transition-all duration-300"
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-red-600/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="h-8 w-8 text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-white">{value.title}</h3>
                    <p className="text-gray-400">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-red-600/20 text-red-400 border-red-600/30">Our Team</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet the <span className="text-red-500">Experts</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our team of certified professionals brings decades of combined experience in fitness, nutrition, and
              performance optimization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-gray-800 hover:border-red-600/50 transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={300}
                      height={400}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{member.name}</h3>
                  <p className="text-red-400 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">{member.bio}</p>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium">Certifications:</p>
                    <div className="flex flex-wrap gap-1">
                      {member.certifications.map((cert, certIndex) => (
                        <Badge key={certIndex} variant="outline" className="text-xs border-gray-600 text-gray-400">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-900/20 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your <span className="text-red-500">Life?</span>
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
