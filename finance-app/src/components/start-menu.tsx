import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppId, apps } from '../constants/apps';
import { fonts, palette } from '../constants/palette';

type StartMenuProps = {
  onOpenApp: (id: AppId) => void;
  onShutDown: () => void;
  onClose: () => void;
};


type MenuRowProps = {
  label: string;
  color: string;
  locked?: boolean;
  onPress?: () => void;
};

function MenuRow({ label, color, locked = false, onPress }: MenuRowProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={locked}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed, locked && styles.rowLocked]}
    >
      <View style={[styles.rowTile, { backgroundColor: color }]} />
      <Text style={styles.rowLabel}>{label}</Text>
      {locked && <Text style={styles.lockedTag}>Locked</Text>}
    </Pressable>
  );
}



export function StartMenu({ onOpenApp, onShutDown, onClose }: StartMenuProps) {
  return (
    <>
      <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Close menu" />

      <View style={styles.menuArea}>
        <View style={styles.menuBox}>
          <View style={styles.shadow} />
          <View style={styles.menu}>
            <Text style={styles.heading}>Apps</Text>
            {apps.map((app) => (
              <MenuRow
                key={app.id}
                label={app.label}
                color={app.color}
                onPress={() => onOpenApp(app.id)}
              />
            ))}

            <View style={styles.divider} />
            <MenuRow label="Secrets" color={palette.mocha} locked />
            <View style={styles.divider} />

            <Pressable
              onPress={onShutDown}
              style={({ pressed }) => [styles.shutDown, pressed && styles.shutDownPressed]}
            >
              <Text style={styles.shutDownText}>Shut down</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
}




const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  menuArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 8,
    alignItems: 'center',
    zIndex: 1000,
    pointerEvents: 'box-none',
  },
  menuBox: {
    width: 260,
  },
  shadow: {
    position: 'absolute',
    top: 5,
    left: 5,
    right: -5,
    bottom: -5,
    backgroundColor: palette.grounds,
  },
  menu: {
    gap: 4,
    padding: 10,
    backgroundColor: palette.mocha,
    borderWidth: 3,
    borderColor: palette.grounds,
  },
  heading: {
    marginLeft: 6,
    marginBottom: 4,
    color: palette.latte,
    fontFamily: fonts.pixelBold,
    fontSize: 13,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  rowPressed: {
    backgroundColor: palette.espresso,
  },
  rowLocked: {
    opacity: 0.5,
  },
  rowTile: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: palette.grounds,
  },
  rowLabel: {
    flex: 1,
    color: palette.foam,
    fontFamily: fonts.pixel,
    fontSize: 15,
  },
  lockedTag: {
    color: palette.latte,
    fontFamily: fonts.pixel,
    fontSize: 12,
  },
  divider: {
    height: 3,
    marginVertical: 6,
    backgroundColor: palette.darkRoast,
  },
  shutDown: {
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: palette.berry,
    borderWidth: 3,
    borderColor: palette.grounds,
  },
  shutDownPressed: {
    transform: [{ translateY: 2 }],
  },
  shutDownText: {
    color: palette.darkRoast,
    fontFamily: fonts.pixelBold,
    fontSize: 15,
  },
});