"use client"

import { useState } from "react"
import { Home, Users, Plus, Banknote, User, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Dashboard from "./components/Dashboard"
import Batches from "./components/Batches"
import CreateBatch from "./components/CreateBatch"
import Loans from "./components/Loans"
import Profile from "./components/Profile"
import ChatBot from "./components/ChatBot"

type TabType = "home" | "batches" | "create" | "loans" | "profile"

export default function TiMApp() {
  const [activeTab, setActiveTab] = useState<TabType>("home")
  const [showChat, setShowChat] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Dashboard />
      case "batches":
        return <Batches />
      case "create":
        return <CreateBatch />
      case "loans":
        return <Loans />
      case "profile":
        return <Profile />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">TiM App 🏦</h1>
            <p className="text-blue-100 text-sm">Turbo ROSCA Manager</p>
          </div>
          <Badge variant="secondary" className="bg-blue-500 text-white">
            KES Balance
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">{renderContent()}</main>

      {/* Floating Chat Button */}
      <Button
        onClick={() => setShowChat(true)}
        className="fixed bottom-24 right-4 rounded-full w-14 h-14 bg-green-600 hover:bg-green-700 shadow-lg z-30"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex justify-around py-2">
          {[
            { id: "home", icon: Home, label: "Home" },
            { id: "batches", icon: Users, label: "Batches" },
            { id: "create", icon: Plus, label: "Create" },
            { id: "loans", icon: Banknote, label: "Loans" },
            { id: "profile", icon: User, label: "Profile" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                activeTab === tab.id ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <tab.icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Chat Bot Modal */}
      {showChat && <ChatBot onClose={() => setShowChat(false)} />}
    </div>
  )
}
