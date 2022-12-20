import { DesignItemType } from './design-item-types';

export abstract class DesignItem {
  constructor(
    public name: string,
    public type: DesignItemType,
    public top: number = 0,
    public left: number = 0,
    public height: number = 0,
    public width: number = 0,
    public z_index?: number,
    public rotate?: number,
    public hovered?: boolean,
    public selected?: boolean
  ) {}

  get css(): string {
    let style: string = '';

    if (!!this.top) {
      style += `top: ${this.top}px;`;
    }

    if (!!this.left) {
      style += `left: ${this.left}px;`;
    }

    if (!!this.width) {
      style += `width: ${this.width}px;`;
    }

    if (!!this.height) {
      style += `height: ${this.height}px;`;
    }

    return style;
  }

  abstract isAppendable(): boolean;
}
