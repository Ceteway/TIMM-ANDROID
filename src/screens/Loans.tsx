"use client"

import { useState } from "react"
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import Card from "../components/Card"
import Badge from "../components/Badge"
import ProgressBar from "../components/ProgressBar"
import TabView from "../components/TabView"

const Loans = () => {
  const [loanAmount, setLoanAmount] = useState("")
  const [activeTab, setActiveTab] = useState(0)

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

  const handleLoanApplication = () => {
    const amount = Number.parseInt(loanAmount)
    if (!amount || amount > maxLoanAmount) {
      Alert.alert("Error", `Please enter a valid amount up to KES ${maxLoanAmount.toLocaleString()}`)
      return
    }

    Alert.alert(
      "Apply for Loan",
      `Apply for KES ${amount.toLocaleString()} emergency loan?\n\nThis will be automatically deducted from your next payout.`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Apply", onPress: () => Alert.alert("Success", "Loan application submitted!") },
      ],
    )
  }

  const renderLoansTab = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Loan Application */}
      <Card style={styles.loanCard}>
        <View style={styles.cardHeader}>
          <Icon name="account-balance-wallet" size={20} color="#374151" />
          <Text style={styles.cardTitle}>Apply for Emergency Loan</Text>
        </View>

        <View style={styles.benefitContainer}>
          <Icon name="check-circle" size={20} color="#16a34a" />
          <View style={styles.benefitText}>
            <Text style={styles.benefitTitle}>0% Interest Rate</Text>
            <Text style={styles.benefitDescription}>Interest-free loans up to 80% of your next payout</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Loan Amount (KES)</Text>
          <TextInput
            style={styles.textInput}
            placeholder={`Maximum: ${maxLoanAmount.toLocaleString()}`}
            keyboardType="numeric"
            value={loanAmount}
            onChangeText={setLoanAmount}
          />
          <Text style={styles.helperText}>Based on your next payout of KES {nextPayout.toLocaleString()}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Icon name="info" size={16} color="#2563eb" />
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Automatic Repayment</Text>
            <Text style={styles.infoDescription}>Loan will be automatically deducted from your next payout</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.applyButton,
            (!loanAmount || Number.parseInt(loanAmount) > maxLoanAmount) && styles.disabledButton,
          ]}
          onPress={handleLoanApplication}
          disabled={!loanAmount || Number.parseInt(loanAmount) > maxLoanAmount}
        >
          <Text style={styles.applyButtonText}>Apply for Loan</Text>
        </TouchableOpacity>
      </Card>

      {/* Current Loans */}
      <Text style={styles.sectionTitle}>Current Loans</Text>
      {currentLoans.length > 0 ? (
        currentLoans.map((loan) => (
          <Card key={loan.id} style={styles.loanItemCard}>
            <View style={styles.loanHeader}>
              <View>
                <Text style={styles.loanAmount}>KES {loan.amount.toLocaleString()}</Text>
                <Text style={styles.loanBatch}>{loan.batch}</Text>
              </View>
              <Badge text="Active" color="#16a34a" />
            </View>

            <View style={styles.loanDetails}>
              <View style={styles.loanDetailRow}>
                <Text style={styles.detailLabel}>Remaining:</Text>
                <Text style={styles.detailValue}>KES {loan.remaining.toLocaleString()}</Text>
              </View>
              <ProgressBar progress={loan.progress} />
              <View style={styles.loanFooter}>
                <Text style={styles.dueDate}>Due: {loan.dueDate}</Text>
                <Text style={styles.progressText}>{loan.progress}% repaid</Text>
              </View>
            </View>
          </Card>
        ))
      ) : (
        <Card style={styles.emptyCard}>
          <Icon name="account-balance-wallet" size={48} color="#d1d5db" />
          <Text style={styles.emptyText}>No active loans</Text>
        </Card>
      )}
    </ScrollView>
  )

  const renderSavingsTab = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Savings Overview */}
      <Card style={styles.savingsCard}>
        <View style={styles.cardHeader}>
          <Icon name="trending-up" size={20} color="#374151" />
          <Text style={styles.cardTitle}>Savings Overview</Text>
        </View>

        <View style={styles.savingsGrid}>
          <View style={styles.savingsItem}>
            <Text style={styles.savingsAmount}>KES {savingsData.lockedAmount.toLocaleString()}</Text>
            <Text style={styles.savingsLabel}>Locked Savings</Text>
            <Text style={styles.savingsRate}>8% p.a. interest</Text>
          </View>
          <View style={styles.savingsItem}>
            <Text style={[styles.savingsAmount, { color: "#2563eb" }]}>
              KES {savingsData.availableForWithdrawal.toLocaleString()}
            </Text>
            <Text style={styles.savingsLabel}>Available</Text>
            <Text style={styles.savingsRate}>For withdrawal</Text>
          </View>
        </View>

        <View style={styles.lockContainer}>
          <Icon name="schedule" size={20} color="#f59e0b" />
          <View style={styles.lockText}>
            <Text style={styles.lockTitle}>Savings Lock Feature</Text>
            <Text style={styles.lockDescription}>
              Lock your savings for higher interest rates and better financial discipline
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.lockButton}>
          <Text style={styles.lockButtonText}>Lock More Savings</Text>
        </TouchableOpacity>
      </Card>

      {/* Savings Actions */}
      <View style={styles.actionsGrid}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="trending-up" size={24} color="#ffffff" />
          <Text style={styles.actionButtonText}>Add Savings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButtonSecondary}>
          <Icon name="account-balance-wallet" size={24} color="#2563eb" />
          <Text style={styles.actionButtonTextSecondary}>Withdraw</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )

  return (
    <View style={styles.container}>
      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>KES {maxLoanAmount.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Available Credit</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={[styles.statValue, { color: "#2563eb" }]}>KES {savingsData.totalSaved.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Total Savings</Text>
        </Card>
      </View>

      {/* Tab View */}
      <TabView
        tabs={["Loans", "Savings"]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        content={[renderLoansTab(), renderSavingsTab()]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 16,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#16a34a",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#6b7280",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
    marginTop: 8,
  },
  loanCard: {
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
    color: "#374151",
  },
  benefitContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0fdf4",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  benefitText: {
    marginLeft: 8,
  },
  benefitTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#15803d",
  },
  benefitDescription: {
    fontSize: 12,
    color: "#166534",
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
  helperText: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#dbeafe",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoText: {
    marginLeft: 8,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1e40af",
  },
  infoDescription: {
    fontSize: 12,
    color: "#1e40af",
  },
  applyButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#9ca3af",
  },
  applyButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  loanItemCard: {
    marginBottom: 12,
  },
  loanHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  loanAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  loanBatch: {
    fontSize: 14,
    color: "#6b7280",
  },
  loanDetails: {
    marginTop: 8,
  },
  loanDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: "#6b7280",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  loanFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  dueDate: {
    fontSize: 12,
    color: "#6b7280",
  },
  progressText: {
    fontSize: 12,
    color: "#6b7280",
  },
  emptyCard: {
    alignItems: "center",
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: "#9ca3af",
    marginTop: 8,
  },
  savingsCard: {
    marginBottom: 16,
  },
  savingsGrid: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  savingsItem: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0fdf4",
    padding: 12,
    borderRadius: 8,
  },
  savingsAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#16a34a",
    marginBottom: 4,
  },
  savingsLabel: {
    fontSize: 12,
    color: "#166534",
    marginBottom: 2,
  },
  savingsRate: {
    fontSize: 10,
    color: "#16a34a",
  },
  lockContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fef3c7",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  lockText: {
    marginLeft: 8,
    flex: 1,
  },
  lockTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#92400e",
  },
  lockDescription: {
    fontSize: 12,
    color: "#92400e",
    marginTop: 2,
  },
  lockButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#f59e0b",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  lockButtonText: {
    color: "#92400e",
    fontSize: 14,
    fontWeight: "500",
  },
  actionsGrid: {
    flexDirection: "row",
    gap: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#2563eb",
    height: 64,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonSecondary: {
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#d1d5db",
    height: 64,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
  actionButtonTextSecondary: {
    color: "#2563eb",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
})

export default Loans
