"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { Text, StyleSheet, Animated, Easing } from "react-native"

interface AnimatedLogoProps {
  size?: "small" | "medium" | "large"
  color?: string
  onAnimationComplete?: () => void
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ size = "medium", color = "#2563eb", onAnimationComplete }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.5)).current
  const rotateAnim = useRef(new Animated.Value(0)).current

  const sizes = {
    small: { fontSize: 24, letterSpacing: 2 },
    medium: { fontSize: 48, letterSpacing: 4 },
    large: { fontSize: 80, letterSpacing: 8 },
  }

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
    ])

    animation.start(() => {
      onAnimationComplete?.()
    })
  }, [])

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }, { rotate: rotateInterpolate }],
        },
      ]}
    >
      <Text
        style={[
          styles.logoText,
          {
            fontSize: sizes[size].fontSize,
            letterSpacing: sizes[size].letterSpacing,
            color: color,
          },
        ]}
      >
        TiM
      </Text>
      <Animated.View
        style={[
          styles.underline,
          {
            backgroundColor: color,
            transform: [{ scaleX: fadeAnim }],
          },
        ]}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  logoText: {
    fontWeight: "900",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  underline: {
    width: 60,
    height: 3,
    marginTop: 8,
    borderRadius: 2,
  },
})

export default AnimatedLogo
