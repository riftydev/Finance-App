import { useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DesktopIcon } from '../components/desktop-icon';
import { Taskbar } from '../components/taskbar';
import { Window } from '../components/window';
import { AppId, apps } from '../constants/apps';
import { fonts, palette } from '../constants/palette';

// When sprites are made, add them in src/constants/apps.ts, e.g. sprite: require('../../assets/sprites/wallet.png')

export default function Desktop() {
  const { width } = useWindowDimensions();
  const isCompact = width < 700;

  const [openApps, setOpenApps] = useState<AppId[]>([]);
  const [minimizedApps, setMinimizedApps] = useState<AppId[]>([]);
  function openApp(id: AppId) {
    setOpenApps((current) => [...current.filter((a) => a !== id), id]);
    setMinimizedApps((current) => current.filter((a) => a !== id));
  }

  function closeApp(id: AppId) {
    setOpenApps((current) => current.filter((a) => a !== id));
    setMinimizedApps((current) => current.filter((a) => a !== id));
  }

  function focusApp(id: AppId) {
    setOpenApps((current) =>
      current[current.length - 1] === id ? current : [...current.filter((a) => a !== id), id],
    );
  }

  function minimizeApp(id: AppId) {
    setMinimizedApps((current) => [...current, id]);
  }

  function toggleFromTaskbar(id: AppId) {
    const isVisible = openApps.includes(id) && !minimizedApps.includes(id);
    if (isVisible) {
      minimizeApp(id);
    } else {
      openApp(id);
    }
  }

  const leftApps = apps.filter((app) => app.id !== 'recycleBin');
  const rightApps = apps.filter((app) => app.id === 'recycleBin');

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.desktop} edges={['top']}>
        <View style={styles.iconColumns}>
          <View style={styles.column}>
            {leftApps.map((app) => (
              <DesktopIcon
                key={app.id}
                label={app.label}
                color={app.color}
                sprite={app.sprite}
                onPress={() => openApp(app.id)}
              />
            ))}
          </View>

          <View style={[styles.column, styles.rightColumn]}>
            {rightApps.map((app) => (
              <DesktopIcon
                key={app.id}
                label={app.label}
                color={app.color}
                sprite={app.sprite}
                onPress={() => openApp(app.id)}
              />
            ))}
          </View>
        </View>

        {apps
          .filter((app) => openApps.includes(app.id))
          .map((app) => {
            const order = openApps.indexOf(app.id);
            return (
              <Window
                key={app.id}
                title={app.label}
                startX={130 + order * 32}
                startY={20 + order * 32}
                zIndex={order + 1}
                isHidden={minimizedApps.includes(app.id)}
                isCompact={isCompact}
                onFocus={() => focusApp(app.id)}
                onClose={() => closeApp(app.id)}
                onMinimize={() => minimizeApp(app.id)}
              >
                <Text style={styles.windowPlaceholder}>{app.label} coming soon</Text>
              </Window>
            );
          })}
      </SafeAreaView>

      <SafeAreaView style={styles.taskbar} edges={['bottom']}>
        <Taskbar openApps={openApps} isCompact={isCompact} onAppPress={toggleFromTaskbar} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.darkRoast,
    userSelect: 'none',
  },
  desktop: {
    flex: 1,
    padding: 16,
  },
  iconColumns: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    alignItems: 'center',
  },
  rightColumn: {
    justifyContent: 'flex-end',
  },
  windowPlaceholder: {
    color: palette.foam,
    fontFamily: fonts.pixel,
  },
  taskbar: {
    backgroundColor: palette.darkRoast,
  },
});