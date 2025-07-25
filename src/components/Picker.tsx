"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

interface PickerOption {
  value: string
  label: string
}

interface PickerProps {
  options: PickerOption[]
  selectedValue: string
  onValueChange: (value: string) => void
  placeholder: string
}

const Picker: React.FC<PickerProps> = ({ options, selectedValue, onValueChange, placeholder }) => {
  const [isVisible, setIsVisible] = useState(false)

  const selectedOption = options.find((option) => option.value === selectedValue)

  const handleSelect = (value: string) => {
    onValueChange(value)
    setIsVisible(false)
  }

  return (
    <>
      <TouchableOpacity style={styles.picker} onPress={() => setIsVisible(true)}>
        <Text style={[styles.pickerText, !selectedOption && styles.placeholder]}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Icon name="keyboard-arrow-down" size={24} color="#6b7280" />
      </TouchableOpacity>

      <Modal visible={isVisible} transparent animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={() => setIsVisible(false)}>
          <View style={styles.modal}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.option} onPress={() => handleSelect(item.value)}>
                  <Text style={styles.optionText}>{item.label}</Text>
                  {selectedValue === item.value && <Icon name="check" size={20} color="#2563eb" />}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  picker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
  },
  pickerText: {
    fontSize: 16,
    color: "#374151",
  },
  placeholder: {
    color: "#9ca3af",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    maxHeight: 300,
    width: "80%",
    maxWidth: 400,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  optionText: {
    fontSize: 16,
    color: "#374151",
  },
})

export default Picker
