import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { DesignItem } from '../models/design-item.model';
import { Position } from '../models/enums/designer-enums';

@Directive({
  selector: '[appResizeable]',
})
export class ResizeableDirective {
  @Input() item!: DesignItem;
  constructor(private element: ElementRef) {}
  borderWidth: number = 2;
  dragable: boolean = false;
  draging: boolean = false;

  mousePositionX!: number;
  mousePositionY!: number;

  resizePointSelected: { vertical: Position; horizontal: Position } = {
    vertical: Position.None,
    horizontal: Position.None,
  };

  @HostListener('mousedown') onMouseDown() {
    if (this.dragable) {
      this.draging = true;
    } else {
      this.draging = false;
    }
  }

  @HostListener('mouseup') onMouseUp() {
    this.draging = false;
  }

  @HostListener('mousemove', ['$event']) onMouseEnter(event: MouseEvent) {
    if (event.offsetX < this.borderWidth) {
      // LEFT
      this.resizePointSelected.vertical = Position.None;
      this.resizePointSelected.horizontal = Position.Left;
      this.element.nativeElement.style.cursor = 'col-resize';
      this.dragable = true;
    } else if (event.offsetX > this.item.width - 3 * this.borderWidth) {
      // RIGHT
      this.resizePointSelected.vertical = Position.None;
      this.resizePointSelected.horizontal = Position.Right;
      this.element.nativeElement.style.cursor = 'col-resize';
      this.dragable = true;
    } else if (event.offsetY < this.borderWidth) {
      // TOP
      this.resizePointSelected.vertical = Position.Top;
      this.resizePointSelected.horizontal = Position.None;
      this.element.nativeElement.style.cursor = 'row-resize';
      this.dragable = true;
    } else if (event.offsetY > this.item.height - 3 * this.borderWidth) {
      // BOTTOM
      this.resizePointSelected.vertical = Position.Bottom;
      this.resizePointSelected.horizontal = Position.None;
      this.element.nativeElement.style.cursor = 'row-resize';
      this.dragable = true;
    } else {
      this.element.nativeElement.style.cursor = 'default';
      this.dragable = false;
    }

    if (this.draging) {
      const horizontal = this.resizePointSelected.horizontal;
      const vertical = this.resizePointSelected.vertical;

      if (horizontal != Position.None) {
        this.mousePositionX = event.x;
      }
      if (vertical != Position.None) {
        this.mousePositionY = event.y;
      }
      this.resize(event);
    }
  }

  handleResize(event: MouseEvent) {
    const horizontal = this.resizePointSelected.horizontal;
    const vertical = this.resizePointSelected.vertical;

    if (horizontal != Position.None) {
      this.mousePositionX = event.x;
    }
    if (vertical != Position.None) {
      this.mousePositionY = event.y;
    }

    document.addEventListener('mousemove', this.resize, false);
  }

  resize = (event: MouseEvent) => {
    this.calcMousePosition(event);
  };

  private changeWidth(dx: number): void {
    const newWidth = this.item.width - dx;
    if (newWidth > 6) this.item.width = newWidth;
  }

  private changeLeft(dx: number): void {
    const newLeft = this.item.left - dx;
    if (newLeft > 6) this.item.left = newLeft;
  }

  private changeHeight(dx: number): void {
    const newHeight = this.item.height - dx;
    if (newHeight > 6) this.item.height = newHeight;
  }

  private changeTop(dx: number): void {
    const newTop = this.item.top - dx;
    if (newTop > 6) this.item.top = newTop;
  }

  calcMousePosition(event: MouseEvent): void {
    const horizontal = this.resizePointSelected.horizontal;
    const vertical = this.resizePointSelected.vertical;

    let dx: number = this.mousePositionX - event.x;
    this.mousePositionX = event.x;

    let dy: number = this.mousePositionY - event.y;
    this.mousePositionY = event.y;

    if (horizontal != Position.None && this.isAbleToResize(dx, horizontal)) {
      if (horizontal == Position.Right) {
        this.changeWidth(dx);
      } else if (horizontal == Position.Left) {
        this.changeLeft(dx);
        this.changeWidth(-dx);
      }
    }
    if (vertical != Position.None && this.isAbleToResize(dy, vertical)) {
      if (vertical == Position.Bottom) {
        this.changeHeight(dy);
      } else if (vertical == Position.Top) {
        this.changeTop(dy);
        this.changeHeight(-dy);
      }
    }
  }

  isAbleToResize(d: number, position: Position): boolean {
    const dimension =
      position == Position.Left || position == Position.Right
        ? this.item.width
        : this.item.height;
    const isIncreasing = this.isIncreasing(d, position);
    return isIncreasing || (!isIncreasing && dimension > this.borderWidth);
  }

  isIncreasing(d: number, position: Position): boolean {
    if (position == Position.Left || position == Position.Top) {
      return d > 0;
    } else {
      return d < 0;
    }
  }
}
