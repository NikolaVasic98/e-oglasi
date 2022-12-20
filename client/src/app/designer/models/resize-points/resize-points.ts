import { DesignerContants } from '../constants/designer.constants';
import { DesignItemType } from '../design-item-types';
import { DesignItem } from '../design-item.model';
import { Position } from '../enums/designer-enums';

export class ResizePointItem extends DesignItem {
  appendable = false;
  parentItem: DesignItem;
  position: Position;
  pointHalfSize = DesignerContants.resizePointSize / 2;

  constructor(name: string, parentItem: DesignItem, position: Position) {
    super(name, DesignItemType.ResizePoint);
    this.parentItem = parentItem;
    this.position = position;

    this.height = DesignerContants.resizePointSize;
    this.width = DesignerContants.resizePointSize;
  }

  override get css(): string {
    let style = '';

    switch (this.position) {
      case Position.Top:
        this.top =
          this.parentItem.top - this.parentItem.height / 2 - this.pointHalfSize;
        break;
      case Position.Bottom:
        this.top =
          this.parentItem.top + this.parentItem.height / 2 + this.pointHalfSize;
        break;
      case Position.Left:
        this.left =
          this.parentItem.left - this.parentItem.width / 2 - this.pointHalfSize;
        break;
      case Position.Right:
        this.left =
          this.parentItem.left +
          this.parentItem.height / 2 +
          this.pointHalfSize;
        break;
    }

    style += `top: ${this.top}px;`;
    style += `left: ${this.left}px;`;

    style += `height: ${this.height}px`;
    style += `width: ${this.width}px`;
    return style;
  }

  isAppendable(): boolean {
    return this.appendable;
  }
}
