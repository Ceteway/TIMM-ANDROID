import type React from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

interface FloatingChatButtonProps {
  onPress: () => void
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name="chat" size={24} color="#ffffff" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 100,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#16a34a",
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
})

export default FloatingChatButton
