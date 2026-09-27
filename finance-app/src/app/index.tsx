import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { palette } from '../constants/palette';

export default function Desktop() {
  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.desktop} edges={['top']}>
        <Text style={styles.placeholder}>Desktop icons will go here</Text>
      </SafeAreaView>

      <SafeAreaView style={styles.taskbar} edges={['bottom']}>
        <View style={styles.taskbarInner}>
          <Text style={styles.taskbarText}>Taskbar</Text>
        </View>
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
  placeholder: {
    color: palette.latte,
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
  },
});