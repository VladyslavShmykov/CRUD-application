import {CarEntity} from "./car.model";

export interface OwnerEntity {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  cars: CarEntity[];
}

export class Owner implements OwnerEntity {

  id: number
  cars: CarEntity[];
  firstName: string;
  lastName: string;
  middleName: string;
  selected: boolean;

  constructor(ownerEntity: OwnerEntity) {
    this.id = ownerEntity.id;
    this.cars = ownerEntity.cars;
    this.firstName = ownerEntity.firstName;
    this.lastName = ownerEntity.lastName;
    this.middleName = ownerEntity.middleName;
    this.selected = false;
  }
}
