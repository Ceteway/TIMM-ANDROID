"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Download, FileText, Settings, Phone, Mail, Calendar, TrendingUp } from "lucide-react"

export default function Profile() {
  const userStats = {
    totalSavings: 45000,
    batchesJoined: 8,
    batchesCompleted: 3,
    contributionStreak: 45,
    memberSince: "January 2024",
  }

  const recentTransactions = [
    { id: 1, type: "Contribution", amount: 500, batch: "Biashara Fund", date: "2024-01-20" },
    { id: 2, type: "Payout", amount: 7500, batch: "Emergency Circle", date: "2024-01-18" },
    { id: 3, type: "Loan", amount: -2000, batch: "Investment Group", date: "2024-01-15" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Profile & Statements 👤</h2>
        <p className="text-gray-600">Manage your account and view history</p>
      </div>

      {/* Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="/placeholder.svg?height=64&width=64" />
              <AvatarFallback className="bg-blue-600 text-white text-xl">JK</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold">John Kamau</h3>
              <p className="text-gray-600">+254 712 345 678</p>
              <Badge className="bg-green-600 mt-1">Verified Member</Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <span>john.kamau@email.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>Member since {userStats.memberSince}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">KES {userStats.totalSavings.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Savings</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{userStats.contributionStreak}</div>
            <div className="text-sm text-gray-600">Day Streak 🔥</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{userStats.batchesJoined}</div>
            <div className="text-sm text-gray-600">Batches Joined</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{userStats.batchesCompleted}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Statements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Financial Statements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Download Monthly Statement (PDF)
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Download Annual Summary (PDF)
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <TrendingUp className="w-4 h-4 mr-2" />
            View Performance Metrics
          </Button>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">{transaction.type}</div>
                <div className="text-sm text-gray-600">{transaction.batch}</div>
                <div className="text-xs text-gray-500">{transaction.date}</div>
              </div>
              <div className={`font-bold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                {transaction.amount > 0 ? "+" : ""}KES {Math.abs(transaction.amount).toLocaleString()}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <User className="w-4 h-4 mr-2" />
            Edit Profile Information
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Phone className="w-4 h-4 mr-2" />
            Update M-PESA Number
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Settings className="w-4 h-4 mr-2" />
            Notification Preferences
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
