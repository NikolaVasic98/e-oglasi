import { Component, OnInit } from '@angular/core';
import { DesignItemType } from '../models/design-item-types';
import { DesignItem } from '../models/design-item.model';
import { RectangleItem } from '../models/design-items/RectangleItem';
import { DesignerService } from '../services/designer.service';

@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss'],
})
export class DesignerComponent implements OnInit {
  itemToAppend!: DesignItem;
  selectedType!: DesignItemType;
  constructor(private designerService: DesignerService) {}

  ngOnInit(): void {}

  onSelected(type: DesignItemType): void {
    this.selectedType = type;
    // this.itemToAppend = this.designerService.getInstance(type);
  }
}
