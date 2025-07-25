import type React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

interface TabViewProps {
  tabs: string[]
  activeTab: number
  onTabChange: (index: number) => void
  content: React.ReactNode[]
}

const TabView: React.FC<TabViewProps> = ({ tabs, activeTab, onTabChange, content }) => {
  return (
    <View style={styles.container}>
      {/* Tab Headers */}
      <View style={styles.tabHeaders}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tabHeader, activeTab === index && styles.activeTabHeader]}
            onPress={() => onTabChange(index)}
          >
            <Text style={[styles.tabHeaderText, activeTab === index && styles.activeTabHeaderText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <View style={styles.tabContent}>{content[activeTab]}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabHeaders: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  tabHeader: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
  },
  activeTabHeader: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabHeaderText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
  },
  activeTabHeaderText: {
    color: "#374151",
  },
  tabContent: {
    flex: 1,
  },
})

export default TabView
