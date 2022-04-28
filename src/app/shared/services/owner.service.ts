import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {Owner, OwnerEntity} from "../interfaces/owner.model";
import {HttpClient} from "@angular/common/http";
import {ICarOwnerService} from "../interfaces/car-owner-service.model";
import {CarEntity} from "../interfaces/car.model";

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
}
