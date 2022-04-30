import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {filter, pairwise, Subject, take, takeUntil} from "rxjs";
import {CarEntity} from "../shared/interfaces/car.model";

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit, OnDestroy {

  private type: 'create' | 'read' | 'update';
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public ownerForm: FormGroup;
  public carsForm: FormGroup;
  public cars: CarEntity[] = [
    {id:1, manufacturer: 'bmw', model: '325', productionYear: 1995, stateNumber: 'FH1231FH'},
    {id:2, manufacturer: 'bmw', model: '325', productionYear: 1995, stateNumber: 'FH1231FH'},
    {id:3, manufacturer: 'bmw', model: '325', productionYear: 1995, stateNumber: 'FH1231FH'},
    {id:4, manufacturer: 'bmw', model: '325', productionYear: 1995, stateNumber: 'FH1231FH'},
    {id:5, manufacturer: 'bmw', model: '325', productionYear: 1995, stateNumber: 'FH1231FH'},
    {id:6, manufacturer: 'bmw', model: '325', productionYear: 1995, stateNumber: 'FH1231FH'},
    {id:7, manufacturer: 'bmw', model: '325', productionYear: 1995, stateNumber: 'FH1231FH'},
    {id:8, manufacturer: 'bmw', model: '325', productionYear: 1995, stateNumber: 'FH1231FH'},
    {id:9, manufacturer: 'bmw', model: '325', productionYear: 1995, stateNumber: 'FH1231FH'},
    {id:10, manufacturer: 'bmw', model: '325', productionYear: 1995, stateNumber: 'FH1231FH'},
    {id:11, manufacturer: 'bmw', model: '325', productionYear: 1995, stateNumber: 'FH1231FH'},
    {id:12, manufacturer: 'bmw', model: '325', productionYear: 1995, stateNumber: 'FH1231FH'},
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initOwnerForm().valueChanges.pipe(
      pairwise(),
      filter(([oldRes, newRes]) => oldRes.cars.length !== newRes.cars.length),
      takeUntil(this.destroy$)
    ).subscribe(([oldValue, newValue]) => {
      console.log(oldValue, newValue);
      });

    this.initCarsForm()

    this.activatedRoute.data
      .pipe(take(1))
      .subscribe(({type}) => this.type = type);


  }

  public deleteCar(cId: number): void {
    const carIndexToDelete = this.cars.findIndex(({id}) => id === cId);
    this.cars.splice(carIndexToDelete, 1);
    this.carsForm.removeControl(`carNum${cId}`,);
    this.carsForm.removeControl(`carManufactured${cId}`);
    this.carsForm.removeControl(`carModel${cId}`);
    this.carsForm.removeControl(`carYear${cId}`);
    console.log(this.cars)
    console.log(this.carsForm)
  }

  public addCar(): void {
  }

  private initOwnerForm(): FormGroup {
    return this.ownerForm = this.fb.group({
      lastName: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      middleName: new FormControl('', [Validators.required]),
    })
  }

  private initCarsForm(): FormGroup {
    this.carsForm = this.fb.group({})
    this.cars.forEach((car) => {
      this.carsForm.addControl(`carNum${car.id}`, new FormControl(car.stateNumber, []));
      this.carsForm.addControl(`carManufactured${car.id}`, new FormControl(car.manufacturer, []));
      this.carsForm.addControl(`carModel${car.id}`, new FormControl(car.model, []));
      this.carsForm.addControl(`carYear${car.id}`, new FormControl(car.productionYear, []));
    })
    return this.carsForm;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
