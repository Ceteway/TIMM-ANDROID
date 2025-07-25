import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import Card from "../components/Card"
import Badge from "../components/Badge"

const Profile = () => {
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

  const handleDownloadStatement = (type: string) => {
    Alert.alert("Download Statement", `${type} will be downloaded to your device.`)
  }

  const handleEditProfile = () => {
    Alert.alert("Edit Profile", "Profile editing functionality will be implemented.")
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Card */}
      <Card style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: "/placeholder.svg?height=64&width=64" }} style={styles.avatar} />
            <Text style={styles.avatarFallback}>JK</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Kamau</Text>
            <Text style={styles.profilePhone}>+254 712 345 678</Text>
            <Badge text="Verified Member" color="#16a34a" />
          </View>
        </View>

        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <Icon name="email" size={16} color="#6b7280" />
            <Text style={styles.contactText}>john.kamau@email.com</Text>
          </View>
          <View style={styles.contactItem}>
            <Icon name="event" size={16} color="#6b7280" />
            <Text style={styles.contactText}>Member since {userStats.memberSince}</Text>
          </View>
        </View>
      </Card>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>KES {userStats.totalSavings.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Total Savings</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={[styles.statValue, { color: "#2563eb" }]}>{userStats.contributionStreak}</Text>
          <Text style={styles.statLabel}>Day Streak 🔥</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={[styles.statValue, { color: "#7c3aed" }]}>{userStats.batchesJoined}</Text>
          <Text style={styles.statLabel}>Batches Joined</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={[styles.statValue, { color: "#ea580c" }]}>{userStats.batchesCompleted}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </Card>
      </View>

      {/* Financial Statements */}
      <Card style={styles.statementsCard}>
        <View style={styles.cardHeader}>
          <Icon name="description" size={20} color="#374151" />
          <Text style={styles.cardTitle}>Financial Statements</Text>
        </View>
        <TouchableOpacity style={styles.statementButton} onPress={() => handleDownloadStatement("Monthly Statement")}>
          <Icon name="file-download" size={20} color="#2563eb" />
          <Text style={styles.statementButtonText}>Download Monthly Statement (PDF)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statementButton} onPress={() => handleDownloadStatement("Annual Summary")}>
          <Icon name="file-download" size={20} color="#2563eb" />
          <Text style={styles.statementButtonText}>Download Annual Summary (PDF)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statementButton}>
          <Icon name="trending-up" size={20} color="#2563eb" />
          <Text style={styles.statementButtonText}>View Performance Metrics</Text>
        </TouchableOpacity>
      </Card>

      {/* Recent Transactions */}
      <Card style={styles.transactionsCard}>
        <Text style={styles.cardTitle}>Recent Transactions</Text>
        {recentTransactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionItem}>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionType}>{transaction.type}</Text>
              <Text style={styles.transactionBatch}>{transaction.batch}</Text>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
            </View>
            <Text style={[styles.transactionAmount, { color: transaction.amount > 0 ? "#16a34a" : "#dc2626" }]}>
              {transaction.amount > 0 ? "+" : ""}KES {Math.abs(transaction.amount).toLocaleString()}
            </Text>
          </View>
        ))}
      </Card>

      {/* Settings */}
      <Card style={styles.settingsCard}>
        <View style={styles.cardHeader}>
          <Icon name="settings" size={20} color="#374151" />
          <Text style={styles.cardTitle}>Account Settings</Text>
        </View>
        <TouchableOpacity style={styles.settingButton} onPress={handleEditProfile}>
          <Icon name="person" size={20} color="#2563eb" />
          <Text style={styles.settingButtonText}>Edit Profile Information</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton}>
          <Icon name="phone" size={20} color="#2563eb" />
          <Text style={styles.settingButtonText}>Update M-PESA Number</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton}>
          <Icon name="notifications" size={20} color="#2563eb" />
          <Text style={styles.settingButtonText}>Notification Preferences</Text>
        </TouchableOpacity>
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
  profileCard: {
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  avatarFallback: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    position: "absolute",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 4,
  },
  profilePhone: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 8,
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactText: {
    fontSize: 14,
    color: "#374151",
    marginLeft: 8,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 16,
  },
  statCard: {
    width: "47%",
    alignItems: "center",
    padding: 16,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#16a34a",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  statementsCard: {
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
  statementButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    marginBottom: 8,
  },
  statementButtonText: {
    fontSize: 14,
    color: "#2563eb",
    marginLeft: 8,
  },
  transactionsCard: {
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  transactionBatch: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  transactionDate: {
    fontSize: 10,
    color: "#9ca3af",
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: "bold",
  },
  settingsCard: {
    marginBottom: 32,
  },
  settingButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    marginBottom: 8,
  },
  settingButtonText: {
    fontSize: 14,
    color: "#2563eb",
    marginLeft: 8,
  },
})

export default Profile
