"use client"

import { useState } from "react"
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import Card from "../components/Card"
import Badge from "../components/Badge"
import TabView from "../components/TabView"

const Batches = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState(0)

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
        return "#16a34a"
      case "Open":
        return "#2563eb"
      case "Full":
        return "#ea580c"
      case "Completed":
        return "#6b7280"
      default:
        return "#6b7280"
    }
  }

  const renderMyBatches = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {myBatches.map((batch) => (
        <Card key={batch.id} style={styles.batchCard}>
          <View style={styles.batchHeader}>
            <View>
              <Text style={styles.batchName}>{batch.name}</Text>
              <Text style={styles.batchCategory}>{batch.category}</Text>
            </View>
            <Badge text={batch.status} color={getStatusColor(batch.status)} />
          </View>

          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Members:</Text>
              <Text style={styles.detailValue}>
                {batch.members}/{batch.maxMembers}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Daily Amount:</Text>
              <Text style={styles.detailValue}>KES {batch.dailyAmount.toLocaleString()}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Total Saved:</Text>
              <Text style={[styles.detailValue, { color: "#16a34a" }]}>KES {batch.totalSaved.toLocaleString()}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>My Position:</Text>
              <Text style={styles.detailValue}>#{batch.myPosition}</Text>
            </View>
          </View>

          <View style={styles.statusContainer}>
            <Icon name="schedule" size={16} color="#2563eb" />
            <Text style={styles.statusText}>
              {batch.myPosition === 1
                ? `🎉 Your turn in ${batch.daysLeft} days!`
                : `${batch.daysLeft} days until next payout`}
            </Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>View Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="trending-up" size={16} color="#2563eb" />
            </TouchableOpacity>
          </View>
        </Card>
      ))}
    </ScrollView>
  )

  const renderAvailableBatches = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {availableBatches.map((batch) => (
        <Card key={batch.id} style={styles.batchCard}>
          <View style={styles.batchHeader}>
            <View>
              <Text style={styles.batchName}>{batch.name}</Text>
              <Text style={styles.batchCategory}>{batch.category}</Text>
            </View>
            <Badge text={batch.status} color={getStatusColor(batch.status)} />
          </View>

          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Members:</Text>
              <Text style={styles.detailValue}>
                {batch.members}/{batch.maxMembers}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Daily Amount:</Text>
              <Text style={styles.detailValue}>KES {batch.dailyAmount.toLocaleString()}</Text>
            </View>
          </View>

          <View style={styles.costContainer}>
            <View style={styles.costHeader}>
              <Icon name="warning" size={16} color="#ea580c" />
              <Text style={styles.costTitle}>Joining Costs:</Text>
            </View>
            <Text style={styles.costText}>Admin Fee: KES {batch.adminFee}</Text>
            <Text style={styles.costText}>ROSCA Deposit: KES {batch.roscaDeposit} (refundable)</Text>
          </View>

          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Join Batch (KES {batch.adminFee + batch.roscaDeposit})</Text>
          </TouchableOpacity>
        </Card>
      ))}
    </ScrollView>
  )

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#6b7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search batches..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      {/* Tab View */}
      <TabView
        tabs={["My Batches", "Available"]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        content={[renderMyBatches(), renderAvailableBatches()]}
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#374151",
  },
  batchCard: {
    marginBottom: 16,
  },
  batchHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  batchName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  batchCategory: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 2,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  detailItem: {
    width: "50%",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginTop: 2,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dbeafe",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  statusText: {
    fontSize: 14,
    color: "#1e40af",
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  costContainer: {
    backgroundColor: "#fef3c7",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  costHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  costTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
    color: "#92400e",
  },
  costText: {
    fontSize: 14,
    color: "#92400e",
    marginBottom: 4,
  },
  joinButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  joinButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
})

export default Batches
