import { Component, Input, OnInit } from '@angular/core';
import { DesignItemType } from 'src/app/designer/models/design-item-types';
import { DesignItem } from 'src/app/designer/models/design-item.model';
import { RectangleItem } from 'src/app/designer/models/design-items/RectangleItem';
import { TextItem } from 'src/app/designer/models/design-items/TextItem';
import { DesignerService } from 'src/app/designer/services/designer.service';

@Component({
  selector: 'app-design-item',
  templateUrl: './design-item.component.html',
  styleUrls: ['./design-item.component.scss'],
})
export class DesignItemComponent implements OnInit {
  @Input() item!: DesignItem;
  types = DesignItemType;

  constructor(private designerService: DesignerService) {}

  ngOnInit(): void {}

  getTypedObject() {
    return this.designerService.getTypedObject(this.item);
  }
}
