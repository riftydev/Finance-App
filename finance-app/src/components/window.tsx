import { ReactNode, useRef, useState } from 'react';
import { PanResponder, Pressable, StyleSheet, Text, View } from 'react-native';
import { fonts, palette } from '../constants/palette';

const START_WIDTH = 640;
const START_HEIGHT = 440;
const MIN_WIDTH = 320;
const MIN_HEIGHT = 240;

type WindowProps = {
  title: string;
  startX: number;
  startY: number;
  zIndex: number;
  isHidden: boolean;
  isCompact: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  children?: ReactNode;
};

function useDrag(onDrag: (dx: number, dy: number) => void) {
  const last = useRef({ dx: 0, dy: 0 });

  const [responder] = useState(() =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        last.current = { dx: 0, dy: 0 };
      },
      onPanResponderMove: (_event, gesture) => {
        onDrag(gesture.dx - last.current.dx, gesture.dy - last.current.dy);
        last.current = { dx: gesture.dx, dy: gesture.dy };
      },
    }),
  );

  return responder.panHandlers;
}

type TitleButtonProps = {
  symbol: string;
  name: string;
  onPress: () => void;
};

function TitleButton({ symbol, name, onPress }: TitleButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={name}
      style={({ pressed }) => [styles.titleButton, pressed && styles.titleButtonPressed]}
    >
      <Text style={styles.titleButtonText}>{symbol}</Text>
    </Pressable>
  );
}

export function Window({
  title,
  startX,
  startY,
  zIndex,
  isHidden,
  isCompact,
  onFocus,
  onClose,
  onMinimize,
  children,
}: WindowProps) {
  const [frame, setFrame] = useState({
    x: startX,
    y: startY,
    width: START_WIDTH,
    height: START_HEIGHT,
  });

  const moveHandlers = useDrag((dx, dy) =>
    setFrame((f) => ({ ...f, x: f.x + dx, y: Math.max(0, f.y + dy) })),
  );

  const resizeHandlers = useDrag((dx, dy) =>
    setFrame((f) => ({
      ...f,
      width: Math.max(MIN_WIDTH, f.width + dx),
      height: Math.max(MIN_HEIGHT, f.height + dy),
    })),
  );

  const frameStyle = isCompact
    ? styles.compact
    : { left: frame.x, top: frame.y, width: frame.width, height: frame.height };

  return (
    <View
      style={[styles.wrapper, frameStyle, { zIndex }, isHidden && styles.hidden]}
      onStartShouldSetResponderCapture={() => {
        onFocus();
        return false;
      }}
    >
      <View style={styles.shadow} />
      <View style={styles.window}>
        <View style={styles.titleBar} {...(isCompact ? {} : moveHandlers)}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.titleButtons}>
            <TitleButton symbol="_" name="Minimise" onPress={onMinimize} />
            <TitleButton symbol="x" name="Close" onPress={onClose} />
          </View>
        </View>

        <View style={styles.content}>{children}</View>

        {!isCompact && <View style={styles.resizeHandle} {...resizeHandlers} />}
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
  },
  compact: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  hidden: {
    display: 'none',
  },
  shadow: {
    position: 'absolute',
    top: 5,
    left: 5,
    right: -5,
    bottom: -5,
    backgroundColor: palette.darkRoast,
  },
  window: {
    flex: 1,
    backgroundColor: palette.mocha,
    borderWidth: 3,
    borderColor: palette.darkRoast,
  },
  titleBar: {
    height: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 4,
    backgroundColor: palette.sage,
    borderBottomWidth: 3,
    borderBottomColor: palette.darkRoast,
  },
  title: {
    color: palette.darkRoast,
    fontFamily: fonts.pixelBold,
    fontSize: 15,
  },
  titleButtons: {
    flexDirection: 'row',
    gap: 4,
  },
  titleButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.foam,
    borderWidth: 2,
    borderColor: palette.darkRoast,
  },
  titleButtonPressed: {
    backgroundColor: palette.latte,
    transform: [{ translateY: 1 }],
  },
  titleButtonText: {
    color: palette.darkRoast,
    fontFamily: fonts.pixelBold,
    fontSize: 13,
  },
  content: {
    flex: 1,
    padding: 14,
  },
  resizeHandle: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 18,
    height: 18,
    backgroundColor: palette.sage,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: palette.darkRoast,
  },
});