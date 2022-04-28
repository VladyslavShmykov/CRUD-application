import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {OwnerEntity} from "../interfaces/owner.model";

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  public createDb(): { owners: OwnerEntity[] } {
    return {
      owners: [
        {
          firstName: 'Иванов',
          lastName: 'Иван',
          middleName: 'Иванович',
          cars: [
            {
              manufacturer: 'BMW',
              model: 'E36 325',
              productionYear: 1995,
              stateNumber: 'АР1234АС'
            }
          ],
          id: 1,
        }
      ]
    };
  }
}
