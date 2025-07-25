"use client"

import { useEffect, useRef } from "react"
import { View, Text, StyleSheet, Animated, Dimensions, Easing } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

const { width, height } = Dimensions.get("window")

const SplashScreen = () => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.3)).current
  const rotateAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  const pulseAnim = useRef(new Animated.Value(1)).current
  const bankIconAnim = useRef(new Animated.Value(0)).current
  const taglineAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Sequence of animations
    const animationSequence = Animated.sequence([
      // 1. Initial fade in and scale up of TiM
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),

      // 2. Rotate and slide effect
      Animated.parallel([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]),

      // 3. Bank icon animation
      Animated.timing(bankIconAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),

      // 4. Tagline animation
      Animated.timing(taglineAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ])

    // Pulse animation (continuous)
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    )

    // Start animations
    animationSequence.start()

    // Start pulse after initial animations
    setTimeout(() => {
      pulseAnimation.start()
    }, 1500)

    return () => {
      pulseAnimation.stop()
    }
  }, [])

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  const bankIconScale = bankIconAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  })

  const taglineOpacity = taglineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  })

  const taglineTranslateY = taglineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  })

  return (
    <View style={styles.container}>
      {/* Background gradient effect */}
      <View style={styles.backgroundGradient} />

      {/* Animated circles in background */}
      <Animated.View
        style={[
          styles.backgroundCircle,
          styles.circle1,
          {
            transform: [{ scale: pulseAnim }, { rotate: rotateInterpolate }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.backgroundCircle,
          styles.circle2,
          {
            transform: [{ scale: pulseAnim }, { rotate: rotateInterpolate }],
          },
        ]}
      />

      {/* Main content */}
      <View style={styles.content}>
        {/* TiM Logo Animation */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }, { translateY: slideAnim }, { rotate: rotateInterpolate }],
            },
          ]}
        >
          <Text style={styles.logoText}>TiM</Text>

          {/* Animated underline */}
          <Animated.View
            style={[
              styles.underline,
              {
                transform: [{ scaleX: fadeAnim }],
              },
            ]}
          />
        </Animated.View>

        {/* Bank Icon */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              opacity: bankIconAnim,
              transform: [{ scale: bankIconScale }, { rotate: rotateInterpolate }],
            },
          ]}
        >
          <MaterialIcons name="account-balance" size={60} color="#ffffff" />
        </Animated.View>

        {/* Tagline */}
        <Animated.View
          style={[
            styles.taglineContainer,
            {
              opacity: taglineOpacity,
              transform: [{ translateY: taglineTranslateY }],
            },
          ]}
        >
          <Text style={styles.tagline}>Turbo ROSCA Manager</Text>
          <Text style={styles.subtitle}>Your Digital Chama Companion 🇰🇪</Text>
        </Animated.View>

        {/* Loading indicator */}
        <Animated.View
          style={[
            styles.loadingContainer,
            {
              opacity: taglineOpacity,
            },
          ]}
        >
          <View style={styles.loadingBar}>
            <Animated.View
              style={[
                styles.loadingProgress,
                {
                  transform: [{ scaleX: pulseAnim }],
                },
              ]}
            />
          </View>
          <Text style={styles.loadingText}>Initializing your savings journey...</Text>
        </Animated.View>
      </View>

      {/* Floating particles effect */}
      <Animated.View
        style={[
          styles.particle,
          styles.particle1,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { rotate: rotateInterpolate }],
          },
        ]}
      >
        <MaterialIcons name="savings" size={20} color="rgba(255, 255, 255, 0.3)" />
      </Animated.View>

      <Animated.View
        style={[
          styles.particle,
          styles.particle2,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { rotate: rotateInterpolate }],
          },
        ]}
      >
        <MaterialIcons name="group" size={16} color="rgba(255, 255, 255, 0.2)" />
      </Animated.View>

      <Animated.View
        style={[
          styles.particle,
          styles.particle3,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { rotate: rotateInterpolate }],
          },
        ]}
      >
        <MaterialIcons name="trending-up" size={18} color="rgba(255, 255, 255, 0.25)" />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e40af", // Deep blue
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    background: "linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)",
  },
  backgroundCircle: {
    position: "absolute",
    borderRadius: 1000,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  circle1: {
    width: 300,
    height: 300,
    top: -100,
    right: -100,
  },
  circle2: {
    width: 200,
    height: 200,
    bottom: -50,
    left: -50,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoText: {
    fontSize: 80,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: 8,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  underline: {
    width: 120,
    height: 4,
    backgroundColor: "#fbbf24", // Golden yellow
    marginTop: 10,
    borderRadius: 2,
  },
  iconContainer: {
    marginBottom: 40,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  taglineContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  tagline: {
    fontSize: 24,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    fontWeight: "400",
  },
  loadingContainer: {
    alignItems: "center",
    width: width * 0.7,
  },
  loadingBar: {
    width: "100%",
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 12,
  },
  loadingProgress: {
    height: "100%",
    backgroundColor: "#fbbf24",
    borderRadius: 2,
    width: "70%",
  },
  loadingText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    fontStyle: "italic",
  },
  particle: {
    position: "absolute",
  },
  particle1: {
    top: height * 0.2,
    left: width * 0.1,
  },
  particle2: {
    top: height * 0.3,
    right: width * 0.15,
  },
  particle3: {
    bottom: height * 0.25,
    left: width * 0.2,
  },
})

export default SplashScreen
