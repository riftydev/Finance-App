import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppId, AppInfo, apps } from '../constants/apps';
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

type TaskbarAppProps = {
  app: AppInfo;
  isOpen: boolean;
  onPress?: () => void;
};

function TaskbarApp({ app, isOpen, onPress }: TaskbarAppProps) {
  return (
    <Pressable onPress={onPress} accessibilityLabel={app.label}>
      {({ pressed }) => (
        <View style={styles.appSlot}>
          <View style={[styles.appButton, { backgroundColor: app.color }, pressed && styles.appPressed]}>
            {app.sprite && <Image source={app.sprite} style={styles.appSprite} />}
          </View>
          <View style={[styles.openBar, isOpen && styles.openBarVisible]} />
        </View>
      )}
    </Pressable>
  );
}

type TaskbarProps = {
  openApps?: AppId[];
  isCompact?: boolean;
  onStartPress?: () => void;
  onAppPress?: (id: AppId) => void;
};

export function Taskbar({ openApps = [], isCompact = false, onStartPress, onAppPress }: TaskbarProps) {
  return (
        <View style={styles.bar}>
      <View style={styles.side} />

      <View style={styles.center}>
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

        {apps
          .filter((app) => app.pinned || openApps.includes(app.id))
          .map((app) => (
            <TaskbarApp
              key={app.id}
              app={app}
              isOpen={openApps.includes(app.id)}
              onPress={() => onAppPress?.(app.id)}
            />
          ))}
      </View>

      <View style={[styles.side, styles.rightSide]}>
        <View style={styles.tray}>
          {!isCompact && <Text style={[styles.trayText, styles.balance]}>£0.00</Text>}
          <Clock />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: palette.darkRoast,
    borderTopWidth: 3,
    borderTopColor: palette.mocha,
  },
  side: {
    flex: 1,
  },
  rightSide: {
    alignItems: 'flex-end',
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  appSlot: {
    alignItems: 'center',
    gap: 3,
  },
  appButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: palette.grounds,
  },
  appPressed: {
    transform: [{ translateY: 2 }],
  },
  appSprite: {
    width: 24,
    height: 24,
  },
  openBar: {
    width: 14,
    height: 3,
    backgroundColor: 'transparent',
  },
  openBarVisible: {
    backgroundColor: palette.pumpkin,
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