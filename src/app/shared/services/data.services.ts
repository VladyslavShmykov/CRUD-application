import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {OwnerEntity} from "../interfaces/owner.model";

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  private localStorageDataBase = localStorage.getItem('dataBase');

  public createDb(): { owners: OwnerEntity[] } {
    let oldDataBase: OwnerEntity[] = [];
    if (this.localStorageDataBase) {
      oldDataBase = JSON.parse(this.localStorageDataBase);
    }
    return {
      owners: oldDataBase,
    };
  }
}
