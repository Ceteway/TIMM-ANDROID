"use client"

import type React from "react"
import { useState } from "react"
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

interface Message {
  id: number
  type: "user" | "bot"
  content: string
  timestamp: Date
}

interface ChatBotProps {
  onClose: () => void
}

const ChatBot: React.FC<ChatBotProps> = ({ onClose }) => {
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
    { icon: "calculate", text: "Calculate Payout", action: "calculate" },
    { icon: "payment", text: "M-PESA Help", action: "mpesa" },
    { icon: "help", text: "ROSCA Basics", action: "basics" },
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
    <Modal visible={true} animationType="slide" presentationStyle="pageSheet">
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerInfo}>
            <Icon name="smart-toy" size={24} color="#ffffff" />
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Gim - AI Assistant 🤖</Text>
              <Text style={styles.headerSubtitle}>Your ROSCA companion</Text>
            </View>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
          {messages.map((message) => (
            <View
              key={message.id}
              style={[styles.messageContainer, message.type === "user" ? styles.userMessage : styles.botMessage]}
            >
              <View style={[styles.messageBubble, message.type === "user" ? styles.userBubble : styles.botBubble]}>
                {message.type === "bot" && <Icon name="smart-toy" size={16} color="#16a34a" style={styles.botIcon} />}
                {message.type === "user" && <Icon name="person" size={16} color="#ffffff" style={styles.userIcon} />}
                <Text
                  style={[styles.messageText, message.type === "user" ? styles.userMessageText : styles.botMessageText]}
                >
                  {message.content}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.quickActionsTitle}>Quick Actions:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.quickActions}>
              {quickActions.map((action, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.quickActionButton}
                  onPress={() => handleQuickAction(action.action)}
                >
                  <Icon name={action.icon} size={16} color="#2563eb" />
                  <Text style={styles.quickActionText}>{action.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask Gim anything... (English or Kiswahili)"
            value={inputMessage}
            onChangeText={setInputMessage}
            onSubmitEditing={handleSendMessage}
            multiline
          />
          <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
            <Icon name="send" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#16a34a",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 48,
  },
  headerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#dcfce7",
  },
  closeButton: {
    padding: 4,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: "flex-end",
  },
  botMessage: {
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  userBubble: {
    backgroundColor: "#2563eb",
  },
  botBubble: {
    backgroundColor: "#f3f4f6",
  },
  botIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  userIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  userMessageText: {
    color: "#ffffff",
  },
  botMessageText: {
    color: "#374151",
  },
  quickActionsContainer: {
    backgroundColor: "#f9fafb",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  quickActionsTitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },
  quickActions: {
    flexDirection: "row",
    gap: 8,
  },
  quickActionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  quickActionText: {
    fontSize: 12,
    color: "#2563eb",
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#16a34a",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default ChatBot
