"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookingModal } from "@/components/booking-modal"
import { ArrowRight, Play, X, ChevronLeft, ChevronRight } from "lucide-react"

const galleryItems = [
  {
    id: 1,
    type: "image",
    src: "/placeholder.svg?height=600&width=400",
    title: "Transformation: John's 6-Month Journey",
    category: "Before & After",
    description: "Lost 45lbs and gained incredible strength",
  },
  {
    id: 2,
    type: "image",
    src: "/placeholder.svg?height=600&width=400",
    title: "Elite Training Session",
    category: "Training",
    description: "High-intensity functional training",
  },
  {
    id: 3,
    type: "video",
    src: "/placeholder.svg?height=600&width=400",
    title: "Nutrition Coaching Session",
    category: "Nutrition",
    description: "Personalized meal planning consultation",
  },
  {
    id: 4,
    type: "image",
    src: "/placeholder.svg?height=600&width=400",
    title: "Sarah's Competition Prep",
    category: "Before & After",
    description: "12-week competition preparation results",
  },
  {
    id: 5,
    type: "image",
    src: "/placeholder.svg?height=600&width=400",
    title: "Group Training Energy",
    category: "Training",
    description: "Community-driven fitness sessions",
  },
  {
    id: 6,
    type: "video",
    src: "/placeholder.svg?height=600&width=400",
    title: "Advanced Training Techniques",
    category: "Training",
    description: "Professional coaching methodology",
  },
  {
    id: 7,
    type: "image",
    src: "/placeholder.svg?height=600&width=400",
    title: "Mike's Strength Gains",
    category: "Before & After",
    description: "Doubled his strength in 8 months",
  },
  {
    id: 8,
    type: "image",
    src: "/placeholder.svg?height=600&width=400",
    title: "State-of-the-Art Facility",
    category: "Facility",
    description: "Professional training environment",
  },
  {
    id: 9,
    type: "video",
    src: "/placeholder.svg?height=600&width=400",
    title: "Client Success Story",
    category: "Testimonials",
    description: "Real results from real people",
  },
]

const categories = ["All", "Before & After", "Training", "Nutrition", "Facility", "Testimonials"]

export default function GalleryPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const filteredItems = galleryItems.filter((item) => selectedCategory === "All" || item.category === selectedCategory)

  const openLightbox = (index: number) => {
    setCurrentImage(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % filteredItems.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
  }

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
            <Link href="/about" className="hover:text-red-400 transition-colors">
              About
            </Link>
            <Link href="/gallery" className="text-red-500 hover:text-red-400 transition-colors">
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
            alt="Gallery showcase"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>

        <div className="relative z-20 container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-red-600/20 text-red-400 border-red-600/30">Gallery</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-red-200 to-red-400 bg-clip-text text-transparent">
            SUCCESS
            <br />
            <span className="text-red-500">STORIES</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Witness the incredible transformations and see the Iron Nation difference in action.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={
                  selectedCategory === category
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400 bg-transparent"
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <Card
                key={item.id}
                className="bg-gray-900/50 border-gray-800 hover:border-red-600/50 transition-all duration-300 group cursor-pointer overflow-hidden"
                onClick={() => openLightbox(index)}
              >
                <div className="relative">
                  <Image
                    src={item.src || "/placeholder.svg"}
                    alt={item.title}
                    width={400}
                    height={600}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                      <div className="w-16 h-16 bg-red-600/80 rounded-full flex items-center justify-center">
                        <Play className="h-8 w-8 text-white ml-1" />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-600/80 text-white">{item.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <Image
                src={filteredItems[currentImage]?.src || ""}
                alt={filteredItems[currentImage]?.title || ""}
                width={800}
                height={600}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              <div className="p-6">
                <Badge className="mb-2 bg-red-600 text-white">{filteredItems[currentImage]?.category}</Badge>
                <h3 className="text-xl font-bold text-white mb-2">{filteredItems[currentImage]?.title}</h3>
                <p className="text-gray-400">{filteredItems[currentImage]?.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-900/20 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Be Our Next <span className="text-red-500">Success Story?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of clients who have transformed their lives with Iron Nation's proven methods.
          </p>
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 text-lg"
            onClick={() => setIsBookingOpen(true)}
          >
            Start Your Transformation
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
