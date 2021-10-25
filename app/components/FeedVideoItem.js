import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import PlayAnimation from "../animations/PlayAnimation";
//import Video from "react-native-video";
import { colors } from "../config/theme";
import PropTypes from "prop-types";

FeedVideoItem = React.forwardRef(
  ({ postData, windowHeight }, ref) => {
    //Animation Refs
    const animationPlayRef = useRef();
    //Video Reference
    const video = useRef(null);
    //SinglePress vs DoublePress
    const [lastPress, setLastPress] = useState(0);
    const timeout = useRef();

    useEffect(() => {
      return () => {
        if (video.current?.unLoad !== undefined) {
          const unLoad = async () => {
            await video.current.unloadAsync();
          };
          unLoad();
        }
      };
    }, []);

    React.useImperativeHandle(ref, () => ({
      play,
      reset,
      pause,
      fadeInPlayAnimation,
      fadeOutPlayAnimation,
    }));

    const handleSinglePress = async () => {
      if (video) {
        const status = await video.current.getStatusAsync();
        if (!status.isplaying) {
          fadeOutPlayAnimation();
          video.current.playAsync();
        }
        if (status.isPlaying) {
          fadeInPlayAnimation();
          setTimeout(() => {
            video.current.pauseAsync();
          }, 600);
        }
      }
    };

    const fadeInPlayAnimation = () => {
      if (animationPlayRef.current) {
        animationPlayRef.current.fadeInPlay();
      }
    };

    const fadeOutPlayAnimation = () => {
      if (animationPlayRef.current) {
        animationPlayRef.current.fadeOutPlay();
      }
    };

    const onManualPress = async () => {
      const time = new Date().getTime();
      const delta = time - lastPress;
      const DOUBLE_PRESS_DELAY = 300;
      //Double Tap Event
      if (delta < DOUBLE_PRESS_DELAY) {
        console.log("Double Press");
        setLastPress(time);
        clearTimeout(timeout.current);
      }
      //Single Tap Event
      else {
        timeout.current = setTimeout(() => {
          handleSinglePress();
        }, DOUBLE_PRESS_DELAY);
        setLastPress(time);
      }
    };

    const play = async () => {
      if (video) {
        if (animationPlayRef.current) {
          animationPlayRef.current.fadeOutPlay();
        }
        return video.current.playAsync();
      }
    };

    const reset = async () => {
      if (video) {
        video.current.replayAsync();
        video.current.pauseAsync();
        if (animationPlayRef.current) {
          animationPlayRef.current.fadeOutPlay();
        }
      }
    };

    const pause = async () => {
      if (video) {
        const status = await video.current.getStatusAsync();
        if (status.isPlaying) {
          return video.current.pauseAsync();
        }
        if (animationPlayRef.current) {
          animationPlayRef.current.fadeOutPlay();
        }
      }
    };

    return (
      <>
        <TouchableWithoutFeedback
          onPress={onManualPress}
        >
          <View style={{ flex: 1 }}>
            {/* Overlay Video */}
            <View style={{ flex: 1 }}>
              <Video
                ref={video}
                source={postData.media}
                shouldPlay={false}
                resizeMode="cover"
                isLooping={true}
                isMuted={false}
                style={{ height: windowHeight }}
              />
              <PlayAnimation ref={animationPlayRef} />
            </View>
            {/* Overlay Linear Gradient (Position: Absolute) */}
            <View style={[styles.overlay, { height: windowHeight }]}>
              <LinearGradient
                colors={[colors.black, colors.black, "transparent"]}
                style={{ flex: 1, opacity: 0.3 }}
              />
              <LinearGradient
                colors={["transparent", colors.black, colors.black]}
                style={{ flex: 1, opacity: 0.1 }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </>
    );
  }
);

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
  },
});

FeedVideoItem.propTypes = {
  isFocused: PropTypes.bool,
  onSingleTap: PropTypes.func,
  onDoubleTap: PropTypes.func,
  onNavigationProfile: PropTypes.func,
  onNavigationBook: PropTypes.func,
  postData: PropTypes.object,
  windowHeight: PropTypes.number,
};

export default React.memo(FeedVideoItem);
