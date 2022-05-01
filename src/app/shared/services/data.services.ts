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
              id: 1,
              manufacturer: 'BMW',
              model: 'E36 325',
              productionYear: 1995,
              stateNumber: 'АР1234АС'
            }
          ],
          id: 1,
        },
        {
          firstName: 'Иванов',
          lastName: 'Иван',
          middleName: 'Иванович',
          cars: [
            {
              id: 2,
              manufacturer: 'BMW',
              model: 'E36 325',
              productionYear: 1995,
              stateNumber: 'АР1234АС'
            }
          ],
          id: 2,
        },
        {
          firstName: 'Иванов',
          lastName: 'Иван',
          middleName: 'Иванович',
          cars: [
            {
              id: 3,
              manufacturer: 'BMW',
              model: 'E36 325',
              productionYear: 1995,
              stateNumber: 'АР1234АС'
            }
          ],
          id: 3,
        },
        {
          firstName: 'Иванов',
          lastName: 'Иван',
          middleName: 'Иванович',
          cars: [
            {
              id: 4,
              manufacturer: 'BMW',
              model: 'E36 325',
              productionYear: 1995,
              stateNumber: 'АР1234АС'
            }
          ],
          id: 4,
        },
        {
          firstName: 'Иванов',
          lastName: 'Иван',
          middleName: 'Иванович',
          cars: [
            {
              id: 5,
              manufacturer: 'BMW',
              model: 'E36 325',
              productionYear: 1995,
              stateNumber: 'АР1234АС'
            }
          ],
          id: 5,
        },
        {
          firstName: 'Иванов',
          lastName: 'Иван',
          middleName: 'Иванович',
          cars: [
            {
              id: 6,
              manufacturer: 'BMW',
              model: 'E36 325',
              productionYear: 1995,
              stateNumber: 'АР1234АС'
            }
          ],
          id: 6,
        },
        {
          firstName: 'Иванов',
          lastName: 'Иван',
          middleName: 'Иванович',
          cars: [
            {
              id: 7,
              manufacturer: 'BMW',
              model: 'E36 325',
              productionYear: 1995,
              stateNumber: 'АР1234АС'
            }
          ],
          id: 7,
        }
      ]
    };
  }
}
