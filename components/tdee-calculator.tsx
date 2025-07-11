"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calculator, Target, TrendingUp, TrendingDown, Minus, Info } from "lucide-react"

interface CalculatorData {
  age: string
  gender: string
  weight: string
  height: string
  activityLevel: string
  goal: string
  unit: string
}

interface Results {
  bmr: number
  tdee: number
  goalCalories: number
  protein: number
  carbs: number
  fats: number
}

const activityLevels = [
  { value: "1.2", label: "Sedentary", description: "Little or no exercise" },
  { value: "1.375", label: "Lightly Active", description: "Light exercise 1-3 days/week" },
  { value: "1.55", label: "Moderately Active", description: "Moderate exercise 3-5 days/week" },
  { value: "1.725", label: "Very Active", description: "Hard exercise 6-7 days/week" },
  { value: "1.9", label: "Extremely Active", description: "Very hard exercise, physical job" },
]

const getGoals = (unit: string) => [
  {
    value: "lose2",
    label: unit === "metric" ? "Lose 1 kg/week" : "Lose 2 lbs/week",
    modifier: -1000,
    description: "Aggressive fat loss",
  },
  {
    value: "lose1",
    label: unit === "metric" ? "Lose 0.5 kg/week" : "Lose 1 lb/week",
    modifier: -500,
    description: "Moderate fat loss",
  },
  {
    value: "lose0.5",
    label: unit === "metric" ? "Lose 0.25 kg/week" : "Lose 0.5 lb/week",
    modifier: -250,
    description: "Slow fat loss",
  },
  {
    value: "maintain",
    label: "Maintain Weight",
    modifier: 0,
    description: "Body recomposition",
  },
  {
    value: "gain0.5",
    label: unit === "metric" ? "Gain 0.25 kg/week" : "Gain 0.5 lb/week",
    modifier: 250,
    description: "Lean muscle gain",
  },
  {
    value: "gain1",
    label: unit === "metric" ? "Gain 0.5 kg/week" : "Gain 1 lb/week",
    modifier: 500,
    description: "Muscle building",
  },
]

export function TDEECalculator() {
  const [data, setData] = useState<CalculatorData>({
    age: "",
    gender: "",
    weight: "",
    height: "",
    activityLevel: "",
    goal: "",
    unit: "metric",
  })

  const [results, setResults] = useState<Results | null>(null)
  const [showResults, setShowResults] = useState(false)

  const calculateTDEE = () => {
    const age = Number.parseInt(data.age)
    const weight = Number.parseFloat(data.weight)
    const height = Number.parseFloat(data.height)
    const activityMultiplier = Number.parseFloat(data.activityLevel)
    const goalModifier = getGoals(data.unit).find((g) => g.value === data.goal)?.modifier || 0

    if (!age || !weight || !height || !activityMultiplier) return

    // Convert to metric if needed
    const weightKg = data.unit === "imperial" ? weight * 0.453592 : weight
    const heightCm = data.unit === "imperial" ? height * 2.54 : height

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number
    if (data.gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161
    }

    // Calculate TDEE
    const tdee = bmr * activityMultiplier

    // Calculate goal calories
    const goalCalories = tdee + goalModifier

    // Calculate macronutrients (using common bodybuilding ratios)
    const protein = Math.round((goalCalories * 0.3) / 4) // 30% protein
    const fats = Math.round((goalCalories * 0.25) / 9) // 25% fats
    const carbs = Math.round((goalCalories * 0.45) / 4) // 45% carbs

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      goalCalories: Math.round(goalCalories),
      protein,
      carbs,
      fats,
    })

    setShowResults(true)
  }

  const handleInputChange = (field: keyof CalculatorData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }))
    setShowResults(false)
  }

  const isFormValid = data.age && data.gender && data.weight && data.height && data.activityLevel && data.goal

  const getGoalIcon = (goalValue: string) => {
    if (goalValue.includes("lose")) return <TrendingDown className="h-4 w-4 text-red-500" />
    if (goalValue.includes("gain")) return <TrendingUp className="h-4 w-4 text-green-500" />
    return <Minus className="h-4 w-4 text-blue-500" />
  }

  return (
    <section className="py-20 bg-gradient-to-r from-black to-red-900/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-red-600/20 text-red-400 border-red-600/30">Fitness Tool</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            TDEE <span className="text-red-500">Calculator</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Calculate your Total Daily Energy Expenditure and get personalized nutrition recommendations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Calculator Form */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calculator className="mr-2 h-5 w-5 text-red-500" />
                Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Unit Selection */}
              <div>
                <Label className="text-sm font-medium text-white mb-2 block">Units</Label>
                <Select value={data.unit} onValueChange={(value) => handleInputChange("unit", value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                    <SelectItem value="imperial">Imperial (lbs, inches)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age" className="text-sm font-medium text-white">
                    Age *
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={data.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    placeholder="25"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-white">Gender *</Label>
                  <Select value={data.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight" className="text-sm font-medium text-white">
                    Weight * ({data.unit === "imperial" ? "lbs" : "kg"})
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    value={data.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    placeholder={data.unit === "imperial" ? "180" : "75"}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="height" className="text-sm font-medium text-white">
                    Height * ({data.unit === "imperial" ? "inches" : "cm"})
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    value={data.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                    placeholder={data.unit === "imperial" ? "70" : "175"}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              {/* Activity Level */}
              <div>
                <Label className="text-sm font-medium text-white mb-2 block">Activity Level *</Label>
                <Select value={data.activityLevel} onValueChange={(value) => handleInputChange("activityLevel", value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {activityLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        <div>
                          <div className="font-medium">{level.label}</div>
                          <div className="text-xs text-gray-400">{level.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Goal */}
              <div>
                <Label className="text-sm font-medium text-white mb-2 block">Goal *</Label>
                <Select value={data.goal} onValueChange={(value) => handleInputChange("goal", value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {getGoals(data.unit).map((goal) => (
                      <SelectItem key={goal.value} value={goal.value}>
                        <div className="flex items-center space-x-2">
                          {getGoalIcon(goal.value)}
                          <div>
                            <div className="font-medium">{goal.label}</div>
                            <div className="text-xs text-gray-400">{goal.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={calculateTDEE}
                disabled={!isFormValid}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-medium"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calculate TDEE
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="mr-2 h-5 w-5 text-red-500" />
                Your Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!showResults ? (
                <div className="text-center py-12">
                  <Calculator className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Fill out the form to see your personalized results</p>
                </div>
              ) : (
                results && (
                  <div className="space-y-6">
                    {/* Main Results */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <p className="text-sm text-gray-400 mb-1">BMR</p>
                        <p className="text-2xl font-bold text-white">{results.bmr}</p>
                        <p className="text-xs text-gray-500">calories/day</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <p className="text-sm text-gray-400 mb-1">TDEE</p>
                        <p className="text-2xl font-bold text-white">{results.tdee}</p>
                        <p className="text-xs text-gray-500">calories/day</p>
                      </div>
                    </div>

                    {/* Goal Calories */}
                    <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-4 text-center">
                      <div className="flex items-center justify-center mb-2">
                        {getGoalIcon(data.goal)}
                        <p className="text-sm text-red-400 ml-2">Target Calories</p>
                      </div>
                      <p className="text-3xl font-bold text-red-500">{results.goalCalories}</p>
                      <p className="text-xs text-gray-400">calories/day for your goal</p>
                    </div>

                    <Separator className="bg-gray-700" />

                    {/* Macronutrients */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Info className="mr-2 h-4 w-4 text-red-500" />
                        Recommended Macros
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                          <div>
                            <p className="font-medium text-white">Protein</p>
                            <p className="text-xs text-gray-400">30% of calories</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-blue-400">{results.protein}g</p>
                            <p className="text-xs text-gray-500">{results.protein * 4} cal</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                          <div>
                            <p className="font-medium text-white">Carbohydrates</p>
                            <p className="text-xs text-gray-400">45% of calories</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-400">{results.carbs}g</p>
                            <p className="text-xs text-gray-500">{results.carbs * 4} cal</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                          <div>
                            <p className="font-medium text-white">Fats</p>
                            <p className="text-xs text-gray-400">25% of calories</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-yellow-400">{results.fats}g</p>
                            <p className="text-xs text-gray-500">{results.fats * 9} cal</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
                      <p className="text-yellow-400 text-sm font-medium mb-2">Important Note</p>
                      <p className="text-yellow-300/80 text-xs leading-relaxed">
                        These calculations are estimates based on general formulas. Individual results may vary based on
                        genetics, medical conditions, and other factors. Consult with a healthcare professional or
                        certified nutritionist for personalized advice.
                      </p>
                    </div>
                  </div>
                )
              )}
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        {showResults && (
          <div className="text-center mt-12">
            <Card className="bg-red-600/10 border-red-600/30 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Put This Into Action?</h3>
                <p className="text-gray-300 mb-6">
                  Get personalized coaching to reach your goals faster with our expert nutrition and training programs.
                </p>
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                  Book Your Consultation
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}
