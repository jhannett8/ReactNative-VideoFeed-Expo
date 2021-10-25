import React, { useRef } from "react";
import { Animated, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors } from "../config/theme";
import StyleAnimation from "./StyleAnimation";

PlayAnimation = React.forwardRef(({}, ref) => {
  const fadePlay = useRef(new Animated.Value(0)).current;

  React.useImperativeHandle(ref, () => ({
    fadeInPlay,
    fadeOutPlay,
    playAnimation,
  }));
  const playAnimation = () => {
    fadeInPlay();
    setTimeout(() => {
      fadeOutPlay();
    }, 600);
  };
  const fadeInPlay = () => {
    Animated.timing(fadePlay, {
      toValue: 0.35,
      //duration: 600,
      useNativeDriver: true,
    }).start();
  };
  const fadeOutPlay = () => {
    Animated.timing(fadePlay, {
      toValue: 0,
      duration: 1250,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View style={StyleAnimation.AnimationContainer}>
      <Animated.View
        style={[
          StyleAnimation.fadingContainer,
          {
            // Bind opacity to animated value
            opacity: fadePlay,
          },
        ]}
      >
        <MaterialCommunityIcons name="play" size={115} color={colors.white} />
      </Animated.View>
    </View>
  );
});

export default PlayAnimation;
