import {Injectable} from '@angular/core';

@Injectable()
export class SelectionManagerService {

  private _selectedItems: any[] = [];

  constructor() {
  }

  public get selectedItems() {
    return this._selectedItems;
  }

  public selectItem(item: any): void {
    if (item) {
      item.selected = true;
    }
    this._selectedItems.push(item);
  }

  public deselectItem(item: any): void {
    const matchIndex = this._selectedItems.findIndex(tmpl => tmpl?.id === item?.id);
    if (matchIndex !== -1) {
      this._selectedItems.splice(matchIndex, 1);
      if (item) {
        item.selected = false;
      }
    }
  }
}
