import { DesignerService } from '../../services/designer.service';
import { DesignItemType } from '../design-item-types';
import { DesignItem } from '../design-item.model';

export class RectangleItem extends DesignItem {
  appendable: boolean = true;

  constructor() {
    super('Rectangle', DesignItemType.Rectangle);
    this.width = 200;
    this.height = 100;
  }

  isAppendable(): boolean {
    return this.appendable;
  }

  override toString(): string {
    return `${this.left} ${this.top}: ${this.width} ${this.height}`;
  }
}
