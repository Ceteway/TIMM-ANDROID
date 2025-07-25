import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import Card from "../components/Card"
import ProgressBar from "../components/ProgressBar"
import Badge from "../components/Badge"

const { width } = Dimensions.get("window")

const Dashboard = ({ navigation }: any) => {
  const activeBatches = [
    {
      id: 1,
      name: "Biashara Fund 💼",
      category: "Business Fund",
      members: 12,
      maxMembers: 15,
      dailyAmount: 500,
      nextPayout: "KES 7,500",
      daysLeft: 3,
      progress: 80,
      myTurn: false,
    },
    {
      id: 2,
      name: "Emergency Circle 🚨",
      category: "Emergency Fund",
      members: 8,
      maxMembers: 10,
      dailyAmount: 200,
      nextPayout: "KES 1,600",
      daysLeft: 12,
      progress: 60,
      myTurn: true,
    },
  ]

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Karibu, John! 👋</Text>
        <Text style={styles.welcomeSubtitle}>Your ROSCA journey continues</Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>KES 15,400</Text>
          <Text style={styles.statLabel}>Total Savings</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={[styles.statValue, { color: "#2563eb" }]}>3</Text>
          <Text style={styles.statLabel}>Active Batches</Text>
        </Card>
      </View>

      {/* Service Fees Card */}
      <Card style={styles.serviceFeesCard}>
        <View style={styles.cardHeader}>
          <Icon name="info" size={20} color="#ea580c" />
          <Text style={styles.cardTitle}>Service Fees (Transparent Pricing)</Text>
        </View>
        <View style={styles.feeRow}>
          <Text style={styles.feeText}>KES 50-5,000 contributions:</Text>
          <Text style={styles.feeAmount}>KES 100</Text>
        </View>
        <View style={styles.feeRow}>
          <Text style={styles.feeText}>KES 5,000+ contributions:</Text>
          <Text style={styles.feeAmount}>KES 200</Text>
        </View>
        <Text style={styles.feeNote}>One-time fee per batch + ROSCA deposit (2x daily amount)</Text>
      </Card>

      {/* AI Rotation Status */}
      <Card style={styles.aiCard}>
        <View style={styles.cardHeader}>
          <Icon name="flash-on" size={20} color="#7c3aed" />
          <Text style={styles.cardTitle}>AI Rotation System 🤖</Text>
        </View>
        <View style={styles.aiStatus}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Fair rotation active</Text>
        </View>
        <Text style={styles.aiDescription}>
          AI ensures everyone gets their turn based on join order. No bias, no favoritism!
        </Text>
      </Card>

      {/* Active Batches */}
      <View style={styles.sectionHeader}>
        <Icon name="group" size={20} color="#374151" />
        <Text style={styles.sectionTitle}>Active Batches</Text>
      </View>

      {activeBatches.map((batch) => (
        <Card key={batch.id} style={batch.myTurn ? styles.myTurnCard : styles.batchCard}>
          <View style={styles.batchHeader}>
            <View>
              <Text style={styles.batchName}>{batch.name}</Text>
              <Text style={styles.batchCategory}>{batch.category}</Text>
            </View>
            {batch.myTurn && <Badge text="Your Turn! 🎉" color="#16a34a" />}
          </View>

          <View style={styles.batchDetails}>
            <Text style={styles.detailText}>
              Members: {batch.members}/{batch.maxMembers}
            </Text>
            <Text style={styles.detailText}>Daily: KES {batch.dailyAmount.toLocaleString()}</Text>
          </View>

          <ProgressBar progress={batch.progress} />

          <View style={styles.batchFooter}>
            <View>
              <Text style={styles.payoutText}>Next Payout: {batch.nextPayout}</Text>
              <View style={styles.daysLeft}>
                <Icon name="schedule" size={12} color="#6b7280" />
                <Text style={styles.daysText}>{batch.daysLeft} days left</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.actionButton, batch.myTurn ? styles.primaryButton : styles.secondaryButton]}
            >
              <Text style={[styles.buttonText, batch.myTurn ? styles.primaryButtonText : styles.secondaryButtonText]}>
                {batch.myTurn ? "Claim Payout" : "View Details"}
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      ))}

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickActionButton} onPress={() => navigation.navigate("Create")}>
          <Icon name="add" size={24} color="#ffffff" />
          <Text style={styles.quickActionText}>New Batch</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionButtonSecondary}>
          <Icon name="trending-up" size={24} color="#2563eb" />
          <Text style={styles.quickActionTextSecondary}>View Stats</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 16,
  },
  welcomeSection: {
    alignItems: "center",
    paddingVertical: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#6b7280",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
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
  },
  serviceFeesCard: {
    backgroundColor: "#fef3c7",
    borderColor: "#f59e0b",
    borderWidth: 1,
    marginBottom: 16,
  },
  aiCard: {
    backgroundColor: "#f3e8ff",
    borderColor: "#a855f7",
    borderWidth: 1,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
    color: "#374151",
  },
  feeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  feeText: {
    fontSize: 14,
    color: "#374151",
  },
  feeAmount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  feeNote: {
    fontSize: 12,
    color: "#92400e",
    marginTop: 8,
  },
  aiStatus: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#16a34a",
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  aiDescription: {
    fontSize: 12,
    color: "#6b46c1",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
    color: "#374151",
  },
  batchCard: {
    marginBottom: 16,
  },
  myTurnCard: {
    marginBottom: 16,
    backgroundColor: "#f0fdf4",
    borderColor: "#16a34a",
    borderWidth: 1,
  },
  batchHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  batchName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  batchCategory: {
    fontSize: 14,
    color: "#6b7280",
  },
  batchDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    color: "#374151",
  },
  batchFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  payoutText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#16a34a",
  },
  daysLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  daysText: {
    fontSize: 12,
    color: "#6b7280",
    marginLeft: 4,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  primaryButton: {
    backgroundColor: "#2563eb",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  primaryButtonText: {
    color: "#ffffff",
  },
  secondaryButtonText: {
    color: "#374151",
  },
  quickActions: {
    flexDirection: "row",
    gap: 16,
    marginTop: 16,
    marginBottom: 32,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: "#2563eb",
    height: 64,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  quickActionButtonSecondary: {
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#d1d5db",
    height: 64,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  quickActionText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
  quickActionTextSecondary: {
    color: "#2563eb",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
})

export default Dashboard
