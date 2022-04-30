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
    {manufacturer: 'bmw', model: '325', productionYear: 1995, stateNumber: 'FH1231FH'},
    {manufacturer: 'bmw', model: '325', productionYear: 1995, stateNumber: 'FH1231FH'},
    {manufacturer: 'bmw', model: '325', productionYear: 1995, stateNumber: 'FH1231FH'},
    {manufacturer: 'bmw', model: '325', productionYear: 1995, stateNumber: 'FH1231FH'},
    {manufacturer: 'bmw', model: '325', productionYear: 1995, stateNumber: 'FH1231FH'},
    {manufacturer: 'bmw', model: '325', productionYear: 1995, stateNumber: 'FH1231FH'},
    {manufacturer: 'bmw', model: '325', productionYear: 1995, stateNumber: 'FH1231FH'},
    {manufacturer: 'bmw', model: '325', productionYear: 1995, stateNumber: 'FH1231FH'},
    {manufacturer: 'bmw', model: '325', productionYear: 1995, stateNumber: 'FH1231FH'},
    {manufacturer: 'bmw', model: '325', productionYear: 1995, stateNumber: 'FH1231FH'},
    {manufacturer: 'bmw', model: '325', productionYear: 1995, stateNumber: 'FH1231FH'},
    {manufacturer: 'bmw', model: '325', productionYear: 1995, stateNumber: 'FH1231FH'},
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
    this.activatedRoute.data
      .pipe(take(1))
      .subscribe(({type}) => this.type = type);

    this.initCarsForm()
  }

  private initOwnerForm(): FormGroup {
    return this.ownerForm = this.fb.group({
      lastName: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      middleName: new FormControl('', [Validators.required]),
    })
  }

  private initCarsForm() {
    this.carsForm = this.fb.group({})
    this.cars.forEach((car, index) => {
      this.carsForm.addControl(`carNum${index}`, new FormControl(car.stateNumber, []));
      this.carsForm.addControl(`carManufactured${index}`, new FormControl(car.manufacturer, []));
      this.carsForm.addControl(`carModel${index}`, new FormControl(car.model, []));
      this.carsForm.addControl(`carYear${index}`, new FormControl(car.productionYear, []));
    })
    console.log(this.carsForm)
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
