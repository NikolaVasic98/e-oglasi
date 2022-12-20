import { DesignItemType } from './design-item-types';

export type DesignMenuItem = {
  value: string;
  type: DesignItemType;
  appendable: boolean;
};

export const DesignMenuItems: DesignMenuItem[] = [
  { value: 'Cursor', type: DesignItemType.Cursor, appendable: false },
  { value: 'Text', type: DesignItemType.Text, appendable: true },
  { value: 'Image', type: DesignItemType.Image, appendable: true },
  { value: 'Rectangle', type: DesignItemType.Rectangle, appendable: true },
];
