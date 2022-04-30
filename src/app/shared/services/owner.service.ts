import {Injectable} from '@angular/core';
import {debounceTime, filter, map, Observable, of, switchMap, take, tap} from "rxjs";
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

  constructor(
    private http: HttpClient
  ) {
  }

  public getOwners(): Observable<Owner[]> {
    return this.http.get<OwnerEntity[]>(this.ownersUrl)
      .pipe(map((res: OwnerEntity[]) => res.map(item => new Owner(item))));
  }

  public getOwnerById(id: number): Observable<OwnerEntity> {
    return this.http.get<OwnerEntity>(this.ownersUrl + id);
  }

  public createOwner(
    aLastName: string,
    aFirstName: string,
    aMidleName: string,
    aCars: CarEntity[]
  ): Observable<OwnerEntity> {
    const newOwner = {
      firstName: aFirstName,
      lastName: aLastName,
      middleName: aMidleName,
      cars: aCars,
    }

    return this.http.post<OwnerEntity>(this.ownersUrl, newOwner);
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
      console.log(control.value)
      if (control.pristine) {
        return of(null);
      }
      if (control.value === oldNumber) {
        return of(null);
      }
      return control.valueChanges
        .pipe(
          debounceTime(500),
          take(1),
          filter(value => !!value),
          switchMap(() => this.getOwners()),
          map((res) => {
            const carsArr: CarEntity[] = res.map(({cars}) => cars).flat();
            if (carsArr.find(({stateNumber}) => stateNumber === control.value)) {
              return {'exists': true};
            }
            return null;
          }),
          tap(() => {
            control.markAsTouched();
          })
        );
    };
  }

}
