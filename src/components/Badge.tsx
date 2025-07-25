import type React from "react"
import { View, Text, StyleSheet } from "react-native"

interface BadgeProps {
  text: string
  color: string
}

const Badge: React.FC<BadgeProps> = ({ text, color }) => {
  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={styles.badgeText}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "500",
  },
})

export default Badge
