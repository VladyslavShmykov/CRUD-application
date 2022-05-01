import {Injectable} from '@angular/core';

@Injectable()
export class SelectionManagerService {

  /**
   * general array for store selected items
   */
  private _selectedItems: any[] = [];

  constructor() {
  }

  public get selectedItems() {
    return this._selectedItems;
  }

  public selectTemplate(item: any) {
    item.selected = true;
    this._selectedItems.push(item);
  }

  public deselectTemplate(item: any) {
    const matchIndex = this._selectedItems.findIndex(tmpl => tmpl.id === item.id);
    if (matchIndex !== -1) {
      this._selectedItems.splice(matchIndex, 1);
      item.selected = false;
    }
  }
}
