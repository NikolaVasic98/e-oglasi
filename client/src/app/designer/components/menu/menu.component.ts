import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DesignItemType } from '../../models/design-item-types';
import { DesignMenuItem, DesignMenuItems } from '../../models/menu-items';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menuItems: DesignMenuItem[] = DesignMenuItems;
  @Output() selected: EventEmitter<DesignItemType> =
    new EventEmitter<DesignItemType>();
  constructor() {}

  ngOnInit(): void {}

  onClick(type: DesignItemType) {
    this.selected.emit(type);
  }
}
