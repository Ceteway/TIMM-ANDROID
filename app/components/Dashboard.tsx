"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, Clock, Zap, Info, Plus } from "lucide-react"

export default function Dashboard() {
  const activeBatches = [
    {
      id: 1,
      name: "Biashara Fund 💼",
      category: "Business Fund",
      members: 12,
      maxMembers: 15,
      dailyAmount: 500,
      nextPayout: "KES 7,500",
      daysLeft: 3,
      progress: 80,
      myTurn: false,
    },
    {
      id: 2,
      name: "Emergency Circle 🚨",
      category: "Emergency Fund",
      members: 8,
      maxMembers: 10,
      dailyAmount: 200,
      nextPayout: "KES 1,600",
      daysLeft: 12,
      progress: 60,
      myTurn: true,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Karibu, John! 👋</h2>
        <p className="text-gray-600">Your ROSCA journey continues</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">KES 15,400</div>
            <div className="text-sm text-gray-600">Total Savings</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">3</div>
            <div className="text-sm text-gray-600">Active Batches</div>
          </CardContent>
        </Card>
      </div>

      {/* Service Fees Card */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Info className="w-5 h-5" />
            Service Fees (Transparent Pricing)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>KES 50-5,000 contributions:</span>
            <span className="font-semibold">KES 100</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>KES 5,000+ contributions:</span>
            <span className="font-semibold">KES 200</span>
          </div>
          <div className="text-xs text-orange-700 mt-2">One-time fee per batch + ROSCA deposit (2x daily amount)</div>
        </CardContent>
      </Card>

      {/* AI Rotation Status */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Zap className="w-5 h-5" />
            AI Rotation System 🤖
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Fair rotation active</span>
          </div>
          <p className="text-xs text-purple-700">
            AI ensures everyone gets their turn based on join order. No bias, no favoritism!
          </p>
        </CardContent>
      </Card>

      {/* Active Batches */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Users className="w-5 h-5" />
          Active Batches
        </h3>

        {activeBatches.map((batch) => (
          <Card key={batch.id} className={batch.myTurn ? "border-green-300 bg-green-50" : ""}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base">{batch.name}</CardTitle>
                  <p className="text-sm text-gray-600">{batch.category}</p>
                </div>
                {batch.myTurn && <Badge className="bg-green-600">Your Turn! 🎉</Badge>}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>
                  Members: {batch.members}/{batch.maxMembers}
                </span>
                <span>Daily: KES {batch.dailyAmount.toLocaleString()}</span>
              </div>

              <Progress value={batch.progress} className="h-2" />

              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-semibold text-green-600">Next Payout: {batch.nextPayout}</div>
                  <div className="text-xs text-gray-600 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {batch.daysLeft} days left
                  </div>
                </div>
                <Button size="sm" variant={batch.myTurn ? "default" : "outline"}>
                  {batch.myTurn ? "Claim Payout" : "View Details"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button className="h-16 flex flex-col gap-1">
          <Plus className="w-5 h-5" />
          <span className="text-xs">New Batch</span>
        </Button>
        <Button variant="outline" className="h-16 flex flex-col gap-1 bg-transparent">
          <TrendingUp className="w-5 h-5" />
          <span className="text-xs">View Stats</span>
        </Button>
      </div>
    </div>
  )
}
