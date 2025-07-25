"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Send, Bot, User, HelpCircle, Calculator, CreditCard } from "lucide-react"

interface Message {
  id: number
  type: "user" | "bot"
  content: string
  timestamp: Date
}

export default function ChatBot({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content:
        "Habari! 👋 I'm Gim, your friendly ROSCA assistant. I can help you with batch calculations, M-PESA payments, and answer questions about your savings. Unaweza kuongea Kiswahili pia! How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const quickActions = [
    { icon: Calculator, text: "Calculate Payout", action: "calculate" },
    { icon: CreditCard, text: "M-PESA Help", action: "mpesa" },
    { icon: HelpCircle, text: "ROSCA Basics", action: "basics" },
  ]

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        type: "bot",
        content: getBotResponse(inputMessage),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)

    setInputMessage("")
  }

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("calculate") || lowerMessage.includes("payout")) {
      return "To calculate your payout: Daily Amount × Number of Members = Your Payout. For example, if 10 members contribute KES 500 daily, your payout will be KES 5,000! 💰"
    }

    if (lowerMessage.includes("mpesa") || lowerMessage.includes("payment")) {
      return "M-PESA Payment Steps:\n1. Go to M-PESA menu\n2. Lipa na M-PESA → Pay Bill\n3. Business Number: 400200\n4. Account: TURBO123 (contributions) or LOAN#### (loans)\n5. Enter amount and confirm! 📱"
    }

    if (lowerMessage.includes("rosca") || lowerMessage.includes("basics")) {
      return "ROSCA (Rotating Savings) works like a matatu queue! 🚌 Everyone contributes daily, and members take turns receiving the total pot. It's community savings with guaranteed returns - no banks needed! 🏦"
    }

    if (lowerMessage.includes("loan")) {
      return "Emergency loans are 0% interest! 🎉 You can borrow up to 80% of your next payout. The loan is automatically deducted when you receive your payout - simple and stress-free! 💸"
    }

    return "Asante for your question! I'm here to help with ROSCA calculations, M-PESA payments, batch management, and loans. Feel free to ask anything about your savings journey! 😊"
  }

  const handleQuickAction = (action: string) => {
    let message = ""
    switch (action) {
      case "calculate":
        message = "How do I calculate my payout?"
        break
      case "mpesa":
        message = "Help me with M-PESA payment"
        break
      case "basics":
        message = "Explain ROSCA basics"
        break
    }
    setInputMessage(message)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <Card className="w-full h-[80vh] rounded-t-xl rounded-b-none">
        <CardHeader className="bg-green-600 text-white rounded-t-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              <div>
                <CardTitle className="text-lg">Gim - AI Assistant 🤖</CardTitle>
                <p className="text-green-100 text-sm">Your ROSCA companion</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-green-700">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col h-full p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.type === "bot" && <Bot className="w-4 h-4 mt-0.5 text-green-600" />}
                    {message.type === "user" && <User className="w-4 h-4 mt-0.5" />}
                    <div className="whitespace-pre-line text-sm">{message.content}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t bg-gray-50">
            <p className="text-sm text-gray-600 mb-2">Quick Actions:</p>
            <div className="flex gap-2 overflow-x-auto">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction(action.action)}
                  className="flex items-center gap-1 whitespace-nowrap"
                >
                  <action.icon className="w-4 h-4" />
                  {action.text}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Ask Gim anything... (English or Kiswahili)"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon" className="bg-green-600 hover:bg-green-700">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
