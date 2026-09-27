import { ImageSourcePropType } from 'react-native';
import { palette } from './palette';

export type AppId = 'wallet' | 'ledger' | 'cafeSetup' | 'recycleBin';

export type AppInfo = {
  id: AppId;
  label: string;
  color: string;
  sprite?: ImageSourcePropType;
  pinned?: boolean;
};

export const apps: AppInfo[] = [
  { id: 'wallet', label: 'Wallet', color: palette.pumpkin, pinned: true },
  { id: 'ledger', label: 'Ledger', color: palette.sage, pinned: true },
  { id: 'cafeSetup', label: 'Café Setup', color: palette.latte },
  { id: 'recycleBin', label: 'Recycle Bin', color: palette.latte },
];