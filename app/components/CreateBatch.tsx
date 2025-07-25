"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Banknote, Info } from "lucide-react"

export default function CreateBatch() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    maxMembers: "",
    dailyAmount: "",
    duration: "",
    description: "",
  })

  const categories = [
    { value: "savings", label: "Savings Circle 💰", emoji: "💰" },
    { value: "business", label: "Business Fund 💼", emoji: "💼" },
    { value: "emergency", label: "Emergency Fund 🚨", emoji: "🚨" },
    { value: "investment", label: "Investment Group 📈", emoji: "📈" },
  ]

  const calculateFees = () => {
    const amount = Number.parseInt(formData.dailyAmount) || 0
    const adminFee = amount >= 5000 ? 200 : 100
    const roscaDeposit = amount * 2
    return { adminFee, roscaDeposit }
  }

  const { adminFee, roscaDeposit } = calculateFees()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Create New Batch ✨</h2>
        <p className="text-gray-600">Start your ROSCA journey</p>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Batch Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Batch Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Batch Name</Label>
            <Input
              id="name"
              placeholder="e.g., Biashara Fund, Emergency Circle"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select batch category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Max Members */}
          <div className="space-y-2">
            <Label htmlFor="maxMembers">Maximum Members</Label>
            <Select
              value={formData.maxMembers}
              onValueChange={(value) => setFormData({ ...formData, maxMembers: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select member limit" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 25 }, (_, i) => i + 6).map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} members
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Daily Amount */}
          <div className="space-y-2">
            <Label htmlFor="dailyAmount">Daily Contribution (KES)</Label>
            <Input
              id="dailyAmount"
              type="number"
              placeholder="Minimum KES 50"
              min="50"
              value={formData.dailyAmount}
              onChange={(e) => setFormData({ ...formData, dailyAmount: e.target.value })}
            />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="60">60 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe the purpose of this batch..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Fee Calculation */}
      {formData.dailyAmount && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Banknote className="w-5 h-5" />
              Fee Calculation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Admin Fee:</span>
              <Badge variant="secondary">KES {adminFee}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>ROSCA Deposit (refundable):</span>
              <Badge variant="secondary">KES {roscaDeposit.toLocaleString()}</Badge>
            </div>
            <div className="border-t pt-2 flex justify-between items-center font-semibold">
              <span>Total to Pay:</span>
              <Badge className="bg-orange-600">KES {(adminFee + roscaDeposit).toLocaleString()}</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Features Info */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Info className="w-5 h-5" />
            AI-Powered Features 🤖
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-purple-700">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
            <span>Automatic fair rotation based on join order</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
            <span>Smart batch closure when member limit is reached</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
            <span>Real-time contribution tracking and notifications</span>
          </div>
        </CardContent>
      </Card>

      {/* Create Button */}
      <Button
        className="w-full h-12 text-lg"
        disabled={
          !formData.name || !formData.category || !formData.maxMembers || !formData.dailyAmount || !formData.duration
        }
      >
        Create Batch {formData.dailyAmount && `(Pay KES ${(adminFee + roscaDeposit).toLocaleString()})`}
      </Button>

      {/* Payment Info */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">M-PESA Payment Instructions:</p>
              <p>1. Go to M-PESA menu</p>
              <p>2. Select Lipa na M-PESA → Pay Bill</p>
              <p>
                3. Business Number: <strong>400200</strong>
              </p>
              <p>
                4. Account Number: <strong>TURBO123</strong>
              </p>
              <p>5. Enter amount and confirm</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
