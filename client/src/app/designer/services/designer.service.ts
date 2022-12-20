import { ElementRef, Injectable } from '@angular/core';
import { DesignerContants } from '../models/constants/designer.constants';
import { DesignItemType } from '../models/design-item-types';
import { DesignItem } from '../models/design-item.model';
import { RectangleItem } from '../models/design-items/RectangleItem';
import { TextItem } from '../models/design-items/TextItem';
import { Position } from '../models/enums/designer-enums';
import { DesignMenuItem, DesignMenuItems } from '../models/menu-items';

@Injectable({
  providedIn: 'root',
})
export class DesignerService {
  menuItems: DesignMenuItem[] = DesignMenuItems;
  constructor() {}

  getInstance(type: DesignItemType): DesignItem {
    switch (type) {
      case DesignItemType.Rectangle:
        return new RectangleItem();
      case DesignItemType.Text:
        return new TextItem();
      default:
        return new RectangleItem();
    }
  }

  getTypedObject(item: DesignItem): any {
    switch (item.type) {
      case DesignItemType.Rectangle:
        return item as RectangleItem;
      case DesignItemType.Text:
        return item as TextItem;
      default:
        return item as RectangleItem;
    }
  }

  isItemAppendable(type: DesignItemType): boolean {
    return !!this.menuItems.find((item) => item.type == type)?.appendable;
  }

  adjustCornerMinimizePoint(
    itemObject: DesignItem,
    item: ElementRef,
    point: ElementRef,
    verticalPosition: Position,
    horizontalPosition: Position
  ) {
    if (verticalPosition == Position.Top) {
      point.nativeElement.style.top = '-3px';
    } else if (verticalPosition == Position.Bottom) {
      point.nativeElement.style.bottom = '-3px';
    }

    if (horizontalPosition == Position.Left) {
      point.nativeElement.style.left = '-3px';
    } else if (horizontalPosition == Position.Right) {
      point.nativeElement.style.right = '-3px';
    }
  }

  adjustMinimizePoint(
    itemObject: DesignItem,
    item: ElementRef,
    point: ElementRef,
    position: Position
  ) {
    if (position == Position.Top) {
      point.nativeElement.style.top = `-${
        DesignerContants.resizePointSize / 2
      }px`;
      point.nativeElement.style.left = `${
        itemObject.width / 2 - DesignerContants.resizePointSize / 2
      }px`;
    } else if (position == Position.Bottom) {
      point.nativeElement.style.bottom = `-${
        DesignerContants.resizePointSize / 2
      }px`;
      point.nativeElement.style.left = `${
        itemObject.width / 2 - DesignerContants.resizePointSize / 2
      }px`;
    } else if (position == Position.Left) {
      point.nativeElement.style.left = `-${
        DesignerContants.resizePointSize / 2
      }px`;
      point.nativeElement.style.top = `${
        itemObject.height / 2 - DesignerContants.resizePointSize / 2
      }px`;
    } else if (position == Position.Right) {
      point.nativeElement.style.right = `-${
        DesignerContants.resizePointSize / 2
      }px`;
      point.nativeElement.style.top = `${
        itemObject.height / 2 - DesignerContants.resizePointSize / 2
      }px`;
    }
  }
}
