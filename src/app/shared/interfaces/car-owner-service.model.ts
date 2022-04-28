import {Observable} from "rxjs";
import {OwnerEntity} from "./owner.model";
import {CarEntity} from "./car.model";

export interface ICarOwnerService {
  getOwners(): Observable<OwnerEntity[]>;

  getOwnerById(aId: number): Observable<OwnerEntity>;

  createOwner(
    aLastName: string,
    aFirstName: string,
    aMidleName: string,
    aCars: CarEntity[]
  ): Observable<OwnerEntity>;

  editOwner(aOwner: OwnerEntity): Observable<OwnerEntity>;

  deleteOwner(aOwnerId: number): Observable<any>;
}
