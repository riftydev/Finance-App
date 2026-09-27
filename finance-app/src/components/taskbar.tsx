import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { fonts, palette } from '../constants/palette';

function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 10_000);
    return () => clearInterval(timer);
  }, []);

  const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return <Text style={styles.trayText}>{time}</Text>;
}

type TaskbarProps = {
  onStartPress?: () => void;
};

export function Taskbar({ onStartPress }: TaskbarProps) {
  return (
    <View style={styles.bar}>
      <Pressable onPress={onStartPress}>
        {({ pressed }) => (
          <View>
            <View style={styles.startShadow} />
            <View style={[styles.startButton, pressed && styles.startPressed]}>
              <Text style={styles.startText}>Start</Text>
            </View>
          </View>
        )}
      </Pressable>

      <View style={styles.tabs} />

      <View style={styles.tray}>
        <Text style={[styles.trayText, styles.balance]}>£0.00</Text>
        <Clock />
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  bar: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 10,
    backgroundColor: palette.darkRoast2,
    borderTopWidth: 3,
    borderTopColor: palette.mocha,
  },
  startShadow: {
    position: 'absolute',
    top: 3,
    left: 3,
    right: -3,
    bottom: -3,
    backgroundColor: palette.grounds,
  },
  startButton: {
    height: 34,
    paddingHorizontal: 14,
    justifyContent: 'center',
    backgroundColor: palette.pumpkin,
    borderWidth: 3,
    borderColor: palette.grounds,
  },
  startPressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
  },
  startText: {
    color: palette.darkRoast,
    fontFamily: fonts.pixelBold,
    fontSize: 15,
  },
  tabs: {
    flex: 1,
  },
  tray: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    height: 34,
    paddingHorizontal: 12,
    backgroundColor: palette.espresso,
    borderWidth: 3,
    borderColor: palette.grounds,
  },
  trayText: {
    color: palette.foam,
    fontFamily: fonts.pixel,
    fontSize: 14,
  },
  balance: {
    color: palette.pumpkin,
  },
});