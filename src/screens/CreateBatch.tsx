"use client"

import { useState } from "react"
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import Card from "../components/Card"
import Badge from "../components/Badge"
import Picker from "../components/Picker"

const CreateBatch = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    maxMembers: "",
    dailyAmount: "",
    duration: "",
    description: "",
  })

  const categories = [
    { value: "savings", label: "Savings Circle 💰" },
    { value: "business", label: "Business Fund 💼" },
    { value: "emergency", label: "Emergency Fund 🚨" },
    { value: "investment", label: "Investment Group 📈" },
  ]

  const memberOptions = Array.from({ length: 25 }, (_, i) => ({
    value: (i + 6).toString(),
    label: `${i + 6} members`,
  }))

  const durationOptions = [
    { value: "15", label: "15 days" },
    { value: "30", label: "30 days" },
    { value: "60", label: "60 days" },
    { value: "90", label: "90 days" },
  ]

  const calculateFees = () => {
    const amount = Number.parseInt(formData.dailyAmount) || 0
    const adminFee = amount >= 5000 ? 200 : 100
    const roscaDeposit = amount * 2
    return { adminFee, roscaDeposit }
  }

  const { adminFee, roscaDeposit } = calculateFees()

  const handleCreateBatch = () => {
    if (!formData.name || !formData.category || !formData.maxMembers || !formData.dailyAmount || !formData.duration) {
      Alert.alert("Error", "Please fill in all required fields")
      return
    }

    Alert.alert(
      "Create Batch",
      `Total cost: KES ${(adminFee + roscaDeposit).toLocaleString()}\n\nProceed to M-PESA payment?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Pay Now", onPress: () => showMpesaInstructions() },
      ],
    )
  }

  const showMpesaInstructions = () => {
    Alert.alert(
      "M-PESA Payment Instructions",
      "1. Go to M-PESA menu\n2. Select Lipa na M-PESA → Pay Bill\n3. Business Number: 400200\n4. Account Number: TURBO123\n5. Enter amount and confirm",
      [{ text: "OK" }],
    )
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Create New Batch ✨</Text>
        <Text style={styles.subtitle}>Start your ROSCA journey</Text>
      </View>

      <Card style={styles.formCard}>
        <Text style={styles.cardTitle}>Batch Details</Text>

        {/* Batch Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Batch Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., Biashara Fund, Emergency Circle"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
        </View>

        {/* Category */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <Picker
            options={categories}
            selectedValue={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
            placeholder="Select batch category"
          />
        </View>

        {/* Max Members */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Maximum Members</Text>
          <Picker
            options={memberOptions}
            selectedValue={formData.maxMembers}
            onValueChange={(value) => setFormData({ ...formData, maxMembers: value })}
            placeholder="Select member limit"
          />
        </View>

        {/* Daily Amount */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Daily Contribution (KES)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Minimum KES 50"
            keyboardType="numeric"
            value={formData.dailyAmount}
            onChangeText={(text) => setFormData({ ...formData, dailyAmount: text })}
          />
        </View>

        {/* Duration */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Duration</Text>
          <Picker
            options={durationOptions}
            selectedValue={formData.duration}
            onValueChange={(value) => setFormData({ ...formData, duration: value })}
            placeholder="Select duration"
          />
        </View>

        {/* Description */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description (Optional)</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholder="Describe the purpose of this batch..."
            multiline
            numberOfLines={3}
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
          />
        </View>
      </Card>

      {/* Fee Calculation */}
      {formData.dailyAmount && (
        <Card style={styles.feeCard}>
          <View style={styles.cardHeader}>
            <Icon name="account-balance-wallet" size={20} color="#ea580c" />
            <Text style={styles.cardTitle}>Fee Calculation</Text>
          </View>
          <View style={styles.feeRow}>
            <Text style={styles.feeText}>Admin Fee:</Text>
            <Badge text={`KES ${adminFee}`} color="#6b7280" />
          </View>
          <View style={styles.feeRow}>
            <Text style={styles.feeText}>ROSCA Deposit (refundable):</Text>
            <Badge text={`KES ${roscaDeposit.toLocaleString()}`} color="#6b7280" />
          </View>
          <View style={[styles.feeRow, styles.totalRow]}>
            <Text style={styles.totalText}>Total to Pay:</Text>
            <Badge text={`KES ${(adminFee + roscaDeposit).toLocaleString()}`} color="#ea580c" />
          </View>
        </Card>
      )}

      {/* AI Features Info */}
      <Card style={styles.aiCard}>
        <View style={styles.cardHeader}>
          <Icon name="smart-toy" size={20} color="#7c3aed" />
          <Text style={styles.cardTitle}>AI-Powered Features 🤖</Text>
        </View>
        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <View style={styles.bullet} />
            <Text style={styles.featureText}>Automatic fair rotation based on join order</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.bullet} />
            <Text style={styles.featureText}>Smart batch closure when member limit is reached</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.bullet} />
            <Text style={styles.featureText}>Real-time contribution tracking and notifications</Text>
          </View>
        </View>
      </Card>

      {/* Create Button */}
      <TouchableOpacity
        style={[
          styles.createButton,
          (!formData.name ||
            !formData.category ||
            !formData.maxMembers ||
            !formData.dailyAmount ||
            !formData.duration) &&
            styles.disabledButton,
        ]}
        onPress={handleCreateBatch}
        disabled={
          !formData.name || !formData.category || !formData.maxMembers || !formData.dailyAmount || !formData.duration
        }
      >
        <Text style={styles.createButtonText}>
          Create Batch {formData.dailyAmount && `(Pay KES ${(adminFee + roscaDeposit).toLocaleString()})`}
        </Text>
      </TouchableOpacity>

      {/* Payment Info */}
      <Card style={styles.paymentCard}>
        <View style={styles.paymentHeader}>
          <Icon name="info" size={20} color="#2563eb" />
          <Text style={styles.paymentTitle}>M-PESA Payment Instructions:</Text>
        </View>
        <Text style={styles.paymentStep}>1. Go to M-PESA menu</Text>
        <Text style={styles.paymentStep}>2. Select Lipa na M-PESA → Pay Bill</Text>
        <Text style={styles.paymentStep}>
          3. Business Number: <Text style={styles.bold}>400200</Text>
        </Text>
        <Text style={styles.paymentStep}>
          4. Account Number: <Text style={styles.bold}>TURBO123</Text>
        </Text>
        <Text style={styles.paymentStep}>5. Enter amount and confirm</Text>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
  },
  formCard: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#ffffff",
    color: "#374151",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  feeCard: {
    backgroundColor: "#fef3c7",
    borderColor: "#f59e0b",
    borderWidth: 1,
    marginBottom: 16,
  },
  feeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  feeText: {
    fontSize: 14,
    color: "#374151",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#f59e0b",
    paddingTop: 8,
    marginTop: 8,
  },
  totalText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  aiCard: {
    backgroundColor: "#f3e8ff",
    borderColor: "#a855f7",
    borderWidth: 1,
    marginBottom: 16,
  },
  featureList: {
    marginTop: 8,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#7c3aed",
    marginTop: 6,
    marginRight: 8,
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    color: "#6b46c1",
  },
  createButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: "#9ca3af",
  },
  createButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  paymentCard: {
    backgroundColor: "#dbeafe",
    borderColor: "#3b82f6",
    borderWidth: 1,
    marginBottom: 32,
  },
  paymentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  paymentTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
    color: "#1e40af",
  },
  paymentStep: {
    fontSize: 14,
    color: "#1e40af",
    marginBottom: 4,
  },
  bold: {
    fontWeight: "bold",
  },
})

export default CreateBatch
