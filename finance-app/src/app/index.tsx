import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts, palette } from '../constants/palette';
import { DesktopIcon } from '../components/desktop-icon';
import { Taskbar } from '../components/taskbar';

//when made sprites add sprite={require('../../assets/sprites/wallet.png')}  to the desktop icon component


export default function Desktop() {
  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.desktop} edges={['top']}>
        <View style={styles.iconColumns}>
          <View style={styles.column}>                            
            <DesktopIcon label="Wallet" color={palette.latte} />
            <DesktopIcon label="Ledger" color={palette.sage} />
            <DesktopIcon label="Control Panel" color={palette.latte}/>
          </View>

          <View style={[styles.column, styles.rightColumn]}>
            <DesktopIcon label="Recycle Bin" color={palette.latte} />
          </View>
        </View>
      </SafeAreaView>

      <SafeAreaView style={styles.taskbar} edges={['bottom']}>
        <Taskbar />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.darkRoast,
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
  taskbar: {
    backgroundColor: palette.espresso,
  },
  taskbarInner: {
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  taskbarText: {
    color: palette.foam,
    fontFamily: fonts.pixel,
  },
});