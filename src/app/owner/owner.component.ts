import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {CarEntity} from "../shared/interfaces/car.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {OwnerService} from "../shared/services/owner.service";
import {stateNumberValidator} from "../shared/validators/state-number.validator";
import {Owner, OwnerEntity} from "../shared/interfaces/owner.model";
import * as moment from 'moment';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit, OnDestroy {

  @Input()
  private owner: Owner;
  @Input()
  public type: 'create' | 'read' | 'update';

  private destroy$: Subject<boolean> = new Subject<boolean>();
  public ownerForm: FormGroup;
  public carsForm: FormGroup;
  public currentYear: number = +moment().format('yyyy');
  public cars: CarEntity[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private modalRef: NgbActiveModal,
    private ownerService: OwnerService,
  ) {
  }

  ngOnInit(): void {
    this.cars = this.owner?.cars || [];
    console.log('type', this.type, 'owenr', this.owner)
    this.initOwnerForm();
    this.initCarsForm();
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
    if (this.type === 'update') {
      (payload as OwnerEntity).id = this.owner.id;
    }

    this.modalRef.close(payload);
  }

  public close(): void {
    this.modalRef.close();
  }

  private initOwnerForm(): FormGroup {
    const form = this.fb.group({
      lastName: new FormControl(
        this.owner?.lastName || '',
        [Validators.required]
      ),
      firstName: new FormControl(
        this.owner?.firstName || '',
        [Validators.required]
      ),
      middleName: new FormControl(
        this.owner?.middleName || '',
        [Validators.required]
      ),
    });

    if (this.type === 'read') {
      form.disable();
    }

    return this.ownerForm = form;
  }

  private initCarsForm(): FormGroup {
    this.carsForm = this.fb.group({})
    this.cars.forEach(car => this.addControlToCarsForm(car));
    if (this.type === 'read') {
      this.carsForm.disable();
    }
    return this.carsForm;
  }

  //для того чтоб создать для каждого input свой FormControl используем эту функцию
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

  //функция нужна нам для создания уникального ай ди автомобиля
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
