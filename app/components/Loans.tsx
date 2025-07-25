"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Banknote, TrendingUp, Clock, AlertCircle, CheckCircle } from "lucide-react"

export default function Loans() {
  const [loanAmount, setLoanAmount] = useState("")

  const nextPayout = 7500
  const maxLoanAmount = Math.floor(nextPayout * 0.8)
  const currentLoans = [
    {
      id: 1,
      amount: 5000,
      remaining: 2000,
      batch: "Biashara Fund",
      dueDate: "2024-02-15",
      progress: 60,
    },
  ]

  const savingsData = {
    totalSaved: 25000,
    interestRate: 8,
    lockedAmount: 15000,
    availableForWithdrawal: 10000,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Loans & Savings 🏦</h2>
        <p className="text-gray-600">Manage your financial services</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-xl font-bold text-green-600">KES {maxLoanAmount.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Available Credit</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-xl font-bold text-blue-600">KES {savingsData.totalSaved.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Savings</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="loans" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="loans">Loans</TabsTrigger>
          <TabsTrigger value="savings">Savings</TabsTrigger>
        </TabsList>

        <TabsContent value="loans" className="space-y-4">
          {/* Loan Application */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Banknote className="w-5 h-5" />
                Apply for Emergency Loan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">0% Interest Rate</span>
                </div>
                <p className="text-sm text-green-700">Interest-free loans up to 80% of your next payout</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanAmount">Loan Amount (KES)</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  placeholder={`Maximum: ${maxLoanAmount.toLocaleString()}`}
                  max={maxLoanAmount}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                />
                <p className="text-xs text-gray-600">Based on your next payout of KES {nextPayout.toLocaleString()}</p>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium">Automatic Repayment</p>
                    <p>Loan will be automatically deducted from your next payout</p>
                  </div>
                </div>
              </div>

              <Button className="w-full" disabled={!loanAmount || Number.parseInt(loanAmount) > maxLoanAmount}>
                Apply for Loan
              </Button>
            </CardContent>
          </Card>

          {/* Current Loans */}
          <div className="space-y-4">
            <h3 className="font-semibold">Current Loans</h3>
            {currentLoans.length > 0 ? (
              currentLoans.map((loan) => (
                <Card key={loan.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-semibold">KES {loan.amount.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">{loan.batch}</div>
                      </div>
                      <Badge variant="outline">Active</Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Remaining:</span>
                        <span className="font-semibold">KES {loan.remaining.toLocaleString()}</span>
                      </div>
                      <Progress value={loan.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Due: {loan.dueDate}</span>
                        <span>{loan.progress}% repaid</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  <Banknote className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No active loans</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="savings" className="space-y-4">
          {/* Savings Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Savings Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    KES {savingsData.lockedAmount.toLocaleString()}
                  </div>
                  <div className="text-sm text-green-700">Locked Savings</div>
                  <div className="text-xs text-green-600">8% p.a. interest</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">
                    KES {savingsData.availableForWithdrawal.toLocaleString()}
                  </div>
                  <div className="text-sm text-blue-700">Available</div>
                  <div className="text-xs text-blue-600">For withdrawal</div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Savings Lock Feature</span>
                </div>
                <p className="text-sm text-yellow-700 mb-3">
                  Lock your savings for higher interest rates and better financial discipline
                </p>
                <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-700 bg-transparent">
                  Lock More Savings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Savings Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Button className="h-16 flex flex-col gap-1">
              <TrendingUp className="w-5 h-5" />
              <span className="text-xs">Add Savings</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-1 bg-transparent">
              <Banknote className="w-5 h-5" />
              <span className="text-xs">Withdraw</span>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
