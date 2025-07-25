import type React from "react"
import { View, StyleSheet } from "react-native"

interface ProgressBarProps {
  progress: number // 0-100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={[styles.fill, { width: `${progress}%` }]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  background: {
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: "#2563eb",
    borderRadius: 4,
  },
})

export default ProgressBar
