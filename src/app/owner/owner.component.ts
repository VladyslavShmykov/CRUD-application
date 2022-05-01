import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, take} from "rxjs";
import {CarEntity} from "../shared/interfaces/car.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {OwnerService} from "../shared/services/owner.service";
import {stateNumberValidator} from "../shared/validators/state-number.validator";
import * as moment from 'moment';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit, OnDestroy {

  @Input()
  public cars: CarEntity[] = [];

  private type: 'create' | 'read' | 'update';
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public ownerForm: FormGroup;
  public carsForm: FormGroup;
  public currentYear: number = +moment().format('yyyy');

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private modalRef: NgbActiveModal,
    private ownerService: OwnerService,
  ) {
  }

  ngOnInit(): void {
    this.initOwnerForm();
    this.initCarsForm();
    this.activatedRoute.data
      .pipe(take(1))
      .subscribe(({type}) => this.type = type);
  }

  public deleteCar(car: CarEntity): void {
    const carIndexToDelete = this.cars.findIndex(({id}) => id === car.id);
    this.cars.splice(carIndexToDelete, 1);
    this.removeControlsFromCarsForm(car);
  }

  public addCar(): void {
    const newCar = {
      id: this.createId(),
      model: '',
      manufacturer: '',
      productionYear: null
      , stateNumber: ''
    };
    this.cars.push(newCar);
    this.addControlToCarsForm(newCar);
  }

  public save(): void {
    const {firstName, lastName, middleName} = this.ownerForm.value;
    const cars: CarEntity[] = [];
    this.cars.forEach((car) => {
      cars.push({
        id: car.id,
        stateNumber: this.carsForm.controls[`num${car.id}`].value,
        model: this.carsForm.controls[`model${car.id}`].value,
        manufacturer: this.carsForm.controls[`manufactured${car.id}`].value,
        productionYear: this.carsForm.controls[`year${car.id}`].value,
      })
    });
    const payload = {
      firstName, lastName, middleName, cars
    }
    this.modalRef.close(payload);
  }

  public close(): void {
    console.log(this.carsForm);
    // this.modalRef.close();
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
    this.cars.forEach(car => this.addControlToCarsForm(car));
    return this.carsForm;
  }

  private addControlToCarsForm(car: CarEntity): void {
    this.carsForm.addControl(`num${car.id}`, new FormControl(
      car.stateNumber,
      [Validators.required, Validators.minLength(8), Validators.maxLength(8), stateNumberValidator],
      [this.ownerService.checkNumberUniq('')]
    ));
    this.carsForm.addControl(`manufactured${car.id}`, new FormControl(
      car.manufacturer,
      [Validators.required]
    ));
    this.carsForm.addControl(`model${car.id}`, new FormControl(
      car.model,
      [Validators.required]
    ));
    this.carsForm.addControl(`year${car.id}`, new FormControl(
      car.productionYear,
      [Validators.required, Validators.minLength(4), Validators.maxLength(4)]
    ));
  }

  private removeControlsFromCarsForm(car: CarEntity): void {
    this.carsForm.removeControl(`num${car.id}`,);
    this.carsForm.removeControl(`manufactured${car.id}`);
    this.carsForm.removeControl(`model${car.id}`);
    this.carsForm.removeControl(`year${car.id}`);
  }

  private createId(): number {
    let id: number = this.cars.length;
    for (let index = 0; index < this.cars.length; index++) {
      if (this.cars[index].id !== index) {
        id = index;
        break;
      }
    }
    return id;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
