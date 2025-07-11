"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Heart, Eye } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  colors: string[]
  sizes: string[]
  isNew?: boolean
  isBestseller?: boolean
}

const products: Product[] = [
  {
    id: "1",
    name: "Iron Nation Performance Tank",
    price: 4499, // Changed from 29.99
    originalPrice: 5999, // Changed from 39.99
    image: "/placeholder.svg?height=400&width=300",
    category: "Tank Tops",
    rating: 4.8,
    reviews: 124,
    colors: ["Black", "Red", "Gray", "White", "Navy", "Charcoal", "Forest Green", "Yellow", "Mustard"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    isBestseller: true,
  },
  {
    id: "2",
    name: "Elite Training Hoodie",
    price: 11999, // Changed from 79.99
    image: "/placeholder.svg?height=400&width=300",
    category: "Hoodies",
    rating: 4.9,
    reviews: 89,
    colors: ["Black", "Charcoal", "Navy", "Burgundy", "Olive", "Steel Gray", "Maroon", "Mustard"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    isNew: true,
  },
  {
    id: "3",
    name: "Iron Nation Compression Tee",
    price: 5249, // Changed from 34.99
    image: "/placeholder.svg?height=400&width=300",
    category: "T-Shirts",
    rating: 4.7,
    reviews: 156,
    colors: ["Black", "White", "Red", "Navy", "Gray", "Royal Blue", "Maroon", "Forest Green", "Yellow", "Mustard"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "4",
    name: "Beast Mode Joggers",
    price: 8999, // Changed from 59.99
    originalPrice: 10499, // Changed from 69.99
    image: "/placeholder.svg?height=400&width=300",
    category: "Bottoms",
    rating: 4.6,
    reviews: 203,
    colors: ["Black", "Gray", "Navy", "Charcoal", "Olive", "Steel Blue", "Maroon"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    isBestseller: true,
  },
  {
    id: "5",
    name: "Iron Nation Snapback",
    price: 3749, // Changed from 24.99
    image: "/placeholder.svg?height=400&width=300",
    category: "Accessories",
    rating: 4.5,
    reviews: 78,
    colors: [
      "Black/Red",
      "All Black",
      "Gray/Black",
      "Navy/White",
      "Red/Black",
      "White/Black",
      "Camo/Black",
      "Yellow/Black",
      "Mustard/Black",
    ],
    sizes: ["One Size"],
  },
  {
    id: "6",
    name: "Performance Shorts",
    price: 5999, // Changed from 39.99
    image: "/placeholder.svg?height=400&width=300",
    category: "Shorts",
    rating: 4.8,
    reviews: 167,
    colors: ["Black", "Navy", "Gray", "Red", "Royal Blue", "Charcoal", "Olive", "Yellow", "Mustard", "Maroon"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    isNew: true,
  },
]

export function FeaturedProducts() {
  const [cart, setCart] = useState<{ [key: string]: number }>({})
  const [wishlist, setWishlist] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<{ [key: string]: string }>({})

  const addToCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }))
  }

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const selectColor = (productId: string, color: string) => {
    setSelectedColors((prev) => ({
      ...prev,
      [productId]: color,
    }))
  }

  const getColorStyle = (color: string) => {
    const colorMap: { [key: string]: string } = {
      Black: "bg-black",
      White: "bg-white border-gray-400",
      Red: "bg-red-600",
      Navy: "bg-blue-900",
      "Royal Blue": "bg-blue-600",
      Gray: "bg-gray-500",
      Charcoal: "bg-gray-700",
      "Steel Gray": "bg-gray-600",
      "Steel Blue": "bg-blue-700",
      Burgundy: "bg-red-900",
      Maroon: "bg-red-800",
      Yellow: "bg-yellow-500",
      Mustard: "bg-yellow-600",
      Olive: "bg-green-700",
      "Forest Green": "bg-green-800",
      "Black/Red": "bg-gradient-to-r from-black to-red-600",
      "All Black": "bg-black",
      "Gray/Black": "bg-gradient-to-r from-gray-500 to-black",
      "Navy/White": "bg-gradient-to-r from-blue-900 to-white",
      "Red/Black": "bg-gradient-to-r from-red-600 to-black",
      "White/Black": "bg-gradient-to-r from-white to-black",
      "Yellow/Black": "bg-gradient-to-r from-yellow-500 to-black",
      "Mustard/Black": "bg-gradient-to-r from-yellow-600 to-black",
      "Camo/Black": "bg-gradient-to-r from-green-700 via-green-800 to-black",
    }
    return colorMap[color] || "bg-gray-400"
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-400"}`}
      />
    ))
  }

  return (
    <section className="py-20 bg-gradient-to-r from-black to-red-900/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-red-600/20 text-red-400 border-red-600/30">Featured Products</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Iron Nation <span className="text-red-500">Apparel</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Premium fitness apparel designed for champions. Gear that performs as hard as you do.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="hover:border-red-600/50 transition-all duration-300 group overflow-hidden border-black bg-black"
            >
              <div className="relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && <Badge className="bg-green-600 text-white">NEW</Badge>}
                  {product.isBestseller && <Badge className="bg-yellow-600 text-black">BESTSELLER</Badge>}
                  {product.originalPrice && (
                    <Badge className="bg-red-600 text-white">
                      SAVE KES {(product.originalPrice - product.price).toLocaleString()}
                    </Badge>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-10 h-10 p-0 bg-black/80 border-gray-600 hover:bg-red-600 hover:border-red-600"
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        wishlist.includes(product.id) ? "text-red-500 fill-current" : "text-white"
                      }`}
                    />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-10 h-10 p-0 bg-black/80 border-gray-600 hover:bg-red-600 hover:border-red-600"
                  >
                    <Eye className="h-4 w-4 text-white" />
                  </Button>
                </div>

                {/* Quick Add to Cart */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    onClick={() => addToCart(product.id)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Quick Add
                  </Button>
                </div>
              </div>

              <CardContent className="p-6 bg-black">
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                    {product.category}
                  </Badge>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-sm text-gray-400">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Colors */}
                <div className="mb-3">
                  <p className="text-xs text-gray-400 mb-2">
                    Colors ({product.colors.length} available):{" "}
                    {selectedColors[product.id] && <span className="text-white">({selectedColors[product.id]})</span>}
                  </p>
                  <div className="flex gap-1 flex-wrap">
                    {product.colors.slice(0, 8).map((color, index) => (
                      <button
                        key={index}
                        onClick={() => selectColor(product.id, color)}
                        className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                          selectedColors[product.id] === color
                            ? "border-red-500 ring-2 ring-red-500/30 scale-110"
                            : "border-gray-600 hover:border-gray-400"
                        } ${getColorStyle(color)}`}
                        title={color}
                      />
                    ))}
                    {product.colors.length > 8 && (
                      <div className="w-6 h-6 rounded-full border-2 border-gray-600 bg-gray-800 flex items-center justify-center">
                        <span className="text-xs text-gray-400">+{product.colors.length - 8}</span>
                      </div>
                    )}
                  </div>
                  {product.colors.length > 8 && (
                    <p className="text-xs text-gray-500 mt-1">{product.colors.slice(8).join(", ")} also available</p>
                  )}
                </div>

                {/* Sizes */}
                <div className="mb-4">
                  <p className="text-xs text-gray-400 mb-2">Sizes:</p>
                  <div className="flex gap-1 flex-wrap">
                    {product.sizes.map((size) => (
                      <Badge
                        key={size}
                        variant="outline"
                        className="text-xs border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400 cursor-pointer transition-colors"
                      >
                        {size}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-red-500">KES {product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        KES {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {cart[product.id] && (
                    <Badge className="bg-green-600/20 text-green-400 border-green-600/30">
                      In Cart ({cart[product.id]})
                    </Badge>
                  )}
                </div>

                {/* Selected Color Display */}
                {selectedColors[product.id] && (
                  <div className="mt-3 p-2 bg-gray-800/50 rounded-lg">
                    <p className="text-xs text-gray-400">
                      Selected: <span className="text-white">{selectedColors[product.id]}</span>
                    </p>
                  </div>
                )}

                {/* Add to Cart Button */}
                <Button
                  onClick={() => addToCart(product.id)}
                  className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Products */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white bg-transparent px-8"
          >
            View All Products
          </Button>
        </div>

        {/* Cart Summary */}
        {Object.keys(cart).length > 0 && (
          <div className="fixed bottom-6 right-6 z-50">
            <Card className="bg-red-600 border-red-500 text-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="h-5 w-5" />
                  <div>
                    <p className="font-semibold">
                      {Object.values(cart).reduce((sum, count) => sum + count, 0)} items in cart
                    </p>
                    <p className="text-sm opacity-90">
                      Total: KES
                      {Object.entries(cart)
                        .reduce((total, [productId, count]) => {
                          const product = products.find((p) => p.id === productId)
                          return total + (product?.price || 0) * count
                        }, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-red-600 bg-transparent"
                  >
                    View Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}
