import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DesignItemType } from '../../models/design-item-types';
import { DesignItem } from '../../models/design-item.model';
import { DesignerService } from '../../services/designer.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {
  @Input() type!: DesignItemType;
  @ViewChild('canvas') canvasElement!: ElementRef;
  canvasItems: DesignItem[] = [];
  constructor(private designerService: DesignerService) {}

  ngOnInit(): void {}

  isItemAppendable() {
    return this.designerService.isItemAppendable(this.type);
  }

  onClick(event: any) {
    if (this.isItemAppendable()) {
      const element = this.canvasElement.nativeElement.getBoundingClientRect();
      const x = event.clientX - element.left;
      const y = event.clientY - element.top;

      const xCoefficient = element.width / x;
      const yCoefficient = element.height / y;

      let item: DesignItem = this.designerService.getInstance(this.type);
      item.left = x;
      item.top = y;
      this.canvasItems.push(item);
    }
  }
}
