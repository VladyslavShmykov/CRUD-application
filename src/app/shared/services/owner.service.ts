import {Injectable} from '@angular/core';
import {debounceTime, filter, map, Observable, of, take, tap} from "rxjs";
import {Owner, OwnerEntity} from "../interfaces/owner.model";
import {HttpClient} from "@angular/common/http";
import {ICarOwnerService} from "../interfaces/car-owner-service.model";
import {CarEntity} from "../interfaces/car.model";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class OwnerService implements ICarOwnerService {
  private ownersUrl: string = 'api/owners/';
  private isDataBaseInitialized: boolean;

  constructor(
    private http: HttpClient
  ) {
  }

  public getOwners(): Observable<Owner[]> {
    return this.http.get<OwnerEntity[]>(this.ownersUrl)
      .pipe(
        tap(res => this.isDataBaseInitialized = !!res.length),
        map((res: OwnerEntity[]) => res.map(item => new Owner(item)))
      );
  }

  public getOwnerById(id: number): Observable<OwnerEntity> {
    return this.http.get<OwnerEntity>(this.ownersUrl + id);
  }

  public createOwner(
    aLastName: string,
    aFirstName: string,
    aMidleName: string,
    aCars: CarEntity[]
  ): Observable<Owner> {
    const newOwner = {
      firstName: aFirstName,
      lastName: aLastName,
      middleName: aMidleName,
      cars: aCars.map(item => {item.stateNumber = item.stateNumber.toUpperCase(); return item})
    }

    if (!this.isDataBaseInitialized) {
      (newOwner as OwnerEntity).id = 1;
    }
    return this.http.post<OwnerEntity>(this.ownersUrl, newOwner)
      .pipe(
        tap(() => this.isDataBaseInitialized = true),
        map((res: OwnerEntity) => new Owner(res))
      );
  }

  public editOwner(owner: OwnerEntity): Observable<any> {
    return this.http.put(this.ownersUrl + owner.id, owner);
  }

  public deleteOwner(id: number): Observable<any> {
    return this.http.delete(this.ownersUrl + id);
  }

  public checkNumberUniq(oldNumber: string): any {
    return (
      control: FormGroup
    ) => {
      if (control.pristine) {
        return of(null);
      }
      if (control.value === oldNumber) {
        return of(null);
      }
      return this.getOwners()
        .pipe(
          debounceTime(500),
          filter(value => !!value),
          map((res) => {
            const carsArr: CarEntity[] = res.map(({cars}) => cars).flat();
            if (carsArr.find(({stateNumber}) => stateNumber === control.value)) {
              return {'exists': true};
            }
            return null;
          }),
          tap(() => {
            control.markAsTouched();
          }),
          take(1),
        );
    };
  }

}
