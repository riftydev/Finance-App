import { useState } from 'react';
import { Animated, Image, ImageSourcePropType, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { fonts, palette } from '../constants/palette';

type DesktopIconProps = {
  label: string;
  color: string;
  sprite?: ImageSourcePropType;
  onPress?: () => void;
};

export function DesktopIcon({ label, color, sprite, onPress }: DesktopIconProps) {

  const [wiggle] = useState(() => new Animated.Value(0));

  function playWiggle() {
    wiggle.setValue(0);
    Animated.timing(wiggle, {
      toValue: 1,
      duration: 650,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  }

  const rotate = wiggle.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
    outputRange: ['0deg', '-4deg', '5deg', '-3deg', '2deg', '0deg'],
  });

  const translateY = wiggle.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [0, -5, 0],
  });

  return (
        <Pressable
            onPress={onPress}
            onHoverIn={playWiggle}
            onPressIn={playWiggle}
            style={styles.container}
        >
      {({ pressed }) => (
        <>
          <Animated.View style={[styles.tileArea, { transform: [{ translateY }, { rotate }] }]}>
            <View style={styles.shadow} />
            <View style={[styles.tile, { backgroundColor: color }, pressed && styles.tilePressed]}>
              {sprite && <Image source={sprite} style={styles.sprite} />}
            </View>
          </Animated.View>
          <Text style={styles.label}>{label}</Text>
        </>
      )}
    </Pressable>
  );
}

const TILE = 52;

const styles = StyleSheet.create({
  container: {
    width: 84,
    alignItems: 'center',
    marginBottom: 18,
  },
  tileArea: {
    width: TILE + 4,
    height: TILE + 4,
  },
  shadow: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: TILE,
    height: TILE,
    backgroundColor: palette.darkRoast,
  },
  tile: {
    width: TILE,
    height: TILE,
    borderWidth: 3,
    borderColor: palette.darkRoast,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tilePressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
  },
  sprite: {
    width: 40,
    height: 40,
  },
  label: {
    marginTop: 6,
    color: palette.foam,
    fontFamily: fonts.pixel,
    fontSize: 13,
    textAlign: 'center',
  },
});