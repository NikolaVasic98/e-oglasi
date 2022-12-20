import { DesignItemType } from '../design-item-types';
import { DesignItem } from '../design-item.model';

export class TextItem extends DesignItem {
  private appendable: boolean = true;

  constructor() {
    super('Text', DesignItemType.Text);
  }

  isAppendable(): boolean {
    return this.appendable;
  }
}
