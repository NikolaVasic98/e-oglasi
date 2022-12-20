import { CdkDragDrop, CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DesignerContants } from 'src/app/designer/models/constants/designer.constants';
import { RectangleItem } from 'src/app/designer/models/design-items/RectangleItem';
import { Position } from 'src/app/designer/models/enums/designer-enums';
import { ResizePointItem } from 'src/app/designer/models/resize-points/resize-points';
import { DesignerService } from 'src/app/designer/services/designer.service';

@Component({
  selector: 'app-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.scss'],
})
export class RectangleComponent implements OnInit, AfterViewInit {
  @Input() item!: RectangleItem;
  @ViewChild('rectangle') rectangle!: ElementRef;
  @ViewChild('topPoint') topPoint!: ElementRef;
  @ViewChild('bottomPoint') bottomPoint!: ElementRef;
  @ViewChild('leftPoint') leftPoint!: ElementRef;
  @ViewChild('rightPoint') rightPoint!: ElementRef;

  topPointObject!: ResizePointItem;
  bottomPointObject!: ResizePointItem;
  leftPointObject!: ResizePointItem;
  rightPointObject!: ResizePointItem;

  mousePositionX!: number;
  mousePositionY!: number;

  resizePointSelected: { vertical: Position; horizontal: Position } = {
    vertical: Position.None,
    horizontal: Position.None,
  };

  constructor(private designerService: DesignerService) {}

  ngAfterViewInit(): void {
    document.addEventListener(
      'mouseup',
      (event) => {
        document.removeEventListener('mousemove', this.resize, false);
      },
      false
    );

    // this.topPoint.nativeElement.style.width = `${DesignerContants.resizePointSize}px`;
    // this.topPoint.nativeElement.style.height = `${DesignerContants.resizePointSize}px`;
    // this.bottomPoint.nativeElement.style.width = `${DesignerContants.resizePointSize}px`;
    // this.bottomPoint.nativeElement.style.height = `${DesignerContants.resizePointSize}px`;
    // this.leftPoint.nativeElement.style.width = `${DesignerContants.resizePointSize}px`;
    // this.leftPoint.nativeElement.style.height = `${DesignerContants.resizePointSize}px`;
    // this.rightPoint.nativeElement.style.width = `${DesignerContants.resizePointSize}px`;
    // this.rightPoint.nativeElement.style.height = `${DesignerContants.resizePointSize}px`;

    (this.topPoint.nativeElement as HTMLElement).addEventListener(
      'mousedown',
      (event) => {
        this.resizePointSelected.vertical = Position.Top;
        this.resizePointSelected.horizontal = Position.None;
        this.handleResize(event);
      }
    );

    (this.bottomPoint.nativeElement as HTMLElement).addEventListener(
      'mousedown',
      (event) => {
        this.resizePointSelected.vertical = Position.Bottom;
        this.resizePointSelected.horizontal = Position.None;
        this.handleResize(event);
      }
    );

    (this.leftPoint.nativeElement as HTMLElement).addEventListener(
      'mousedown',
      (event) => {
        this.resizePointSelected.vertical = Position.None;
        this.resizePointSelected.horizontal = Position.Left;
        this.handleResize(event);
      }
    );

    (this.rightPoint.nativeElement as HTMLElement).addEventListener(
      'mousedown',
      (event) => {
        this.resizePointSelected.vertical = Position.None;
        this.resizePointSelected.horizontal = Position.Right;
        this.handleResize(event);
      }
    );
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
    // this.adjustMinimizePoints();
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
    return (
      isIncreasing ||
      (!isIncreasing && dimension > DesignerContants.resizePointSize)
    );
  }

  isIncreasing(d: number, position: Position): boolean {
    if (position == Position.Left || position == Position.Top) {
      return d > 0;
    } else {
      return d < 0;
    }
  }

  ngOnInit(): void {
    this.topPointObject = new ResizePointItem(
      'topPoint',
      this.item,
      Position.Top
    );
    this.bottomPointObject = new ResizePointItem(
      'bottomPoint',
      this.item,
      Position.Bottom
    );
    this.leftPointObject = new ResizePointItem(
      'leftPoint',
      this.item,
      Position.Left
    );
    this.rightPointObject = new ResizePointItem(
      'rightPoint',
      this.item,
      Position.Right
    );
  }

  onClick() {
    this.item.selected = true;
    // this.adjustMinimizePoints();
  }

  drag(event: CdkDragStart<string[]>): void {
    this.hideResizePoints();
  }

  drop(event: CdkDragEnd): void {
    this.showResizePoints();
    this.setNewPosition(event);
    // this.adjustMinimizePoints();
  }

  setNewPosition(event: CdkDragEnd): void {
    this.item.left = this.item.left + event.distance.x;
    this.item.top = this.item.top + event.distance.y;
  }

  hideResizePoints(): void {
    this.topPoint.nativeElement.style.display = 'none';
    this.bottomPoint.nativeElement.style.display = 'none';
    this.leftPoint.nativeElement.style.display = 'none';
    this.rightPoint.nativeElement.style.display = 'none';
  }

  showResizePoints(): void {
    this.topPoint.nativeElement.style.display = 'block';
    this.bottomPoint.nativeElement.style.display = 'block';
    this.leftPoint.nativeElement.style.display = 'block';
    this.rightPoint.nativeElement.style.display = 'block';
  }

  adjustMinimizePoints() {
    this.designerService.adjustMinimizePoint(
      this.item,
      this.rectangle,
      this.topPoint,
      Position.Top
    );
    this.designerService.adjustMinimizePoint(
      this.item,
      this.rectangle,
      this.bottomPoint,
      Position.Bottom
    );
    this.designerService.adjustMinimizePoint(
      this.item,
      this.rectangle,
      this.leftPoint,
      Position.Left
    );
    this.designerService.adjustMinimizePoint(
      this.item,
      this.rectangle,
      this.rightPoint,
      Position.Right
    );
  }
}
