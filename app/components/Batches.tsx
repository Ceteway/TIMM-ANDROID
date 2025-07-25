"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Clock, TrendingUp, AlertCircle } from "lucide-react"

export default function Batches() {
  const [searchTerm, setSearchTerm] = useState("")

  const myBatches = [
    {
      id: 1,
      name: "Biashara Fund 💼",
      category: "Business Fund",
      status: "Active",
      members: 12,
      maxMembers: 15,
      dailyAmount: 500,
      totalSaved: 45000,
      myPosition: 3,
      daysLeft: 8,
    },
    {
      id: 2,
      name: "Emergency Circle 🚨",
      category: "Emergency Fund",
      status: "Active",
      members: 8,
      maxMembers: 10,
      dailyAmount: 200,
      totalSaved: 12800,
      myPosition: 1,
      daysLeft: 2,
    },
  ]

  const availableBatches = [
    {
      id: 3,
      name: "Investment Group 📈",
      category: "Investment Group",
      status: "Open",
      members: 18,
      maxMembers: 25,
      dailyAmount: 1000,
      adminFee: 200,
      roscaDeposit: 2000,
    },
    {
      id: 4,
      name: "Savings Circle 💰",
      category: "Savings Circle",
      status: "Open",
      members: 6,
      maxMembers: 12,
      dailyAmount: 300,
      adminFee: 100,
      roscaDeposit: 600,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-600"
      case "Open":
        return "bg-blue-600"
      case "Full":
        return "bg-orange-600"
      case "Completed":
        return "bg-gray-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Batch Management 👥</h2>
        <p className="text-gray-600">Manage your ROSCA groups</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search batches..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="my-batches" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-batches">My Batches</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
        </TabsList>

        <TabsContent value="my-batches" className="space-y-4">
          {myBatches.map((batch) => (
            <Card key={batch.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{batch.name}</CardTitle>
                    <p className="text-sm text-gray-600">{batch.category}</p>
                  </div>
                  <Badge className={getStatusColor(batch.status)}>{batch.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Members:</span>
                    <div className="font-semibold">
                      {batch.members}/{batch.maxMembers}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Daily Amount:</span>
                    <div className="font-semibold">KES {batch.dailyAmount.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Saved:</span>
                    <div className="font-semibold text-green-600">KES {batch.totalSaved.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">My Position:</span>
                    <div className="font-semibold">#{batch.myPosition}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">
                    {batch.myPosition === 1
                      ? `🎉 Your turn in ${batch.daysLeft} days!`
                      : `${batch.daysLeft} days until next payout`}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <TrendingUp className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          {availableBatches.map((batch) => (
            <Card key={batch.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{batch.name}</CardTitle>
                    <p className="text-sm text-gray-600">{batch.category}</p>
                  </div>
                  <Badge className={getStatusColor(batch.status)}>{batch.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Members:</span>
                    <div className="font-semibold">
                      {batch.members}/{batch.maxMembers}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Daily Amount:</span>
                    <div className="font-semibold">KES {batch.dailyAmount.toLocaleString()}</div>
                  </div>
                </div>

                <div className="space-y-2 p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                    <span className="font-medium">Joining Costs:</span>
                  </div>
                  <div className="text-sm space-y-1 ml-6">
                    <div>Admin Fee: KES {batch.adminFee}</div>
                    <div>ROSCA Deposit: KES {batch.roscaDeposit} (refundable)</div>
                  </div>
                </div>

                <Button className="w-full">Join Batch (KES {batch.adminFee + batch.roscaDeposit})</Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
