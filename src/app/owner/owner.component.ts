import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, take} from "rxjs";
import {CarEntity} from "../shared/interfaces/car.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {OwnerService} from "../shared/services/owner.service";

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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private modalRef: NgbActiveModal,
    private ownerService: OwnerService,
  ) {
  }

  ngOnInit(): void {
    this.initOwnerForm()
    this.initCarsForm();

    this.activatedRoute.data
      .pipe(take(1))
      .subscribe(({type}) => this.type = type);
  }

  public deleteCar(car: CarEntity): void {
    const carIndexToDelete = this.cars.findIndex(({stateNumber}) => stateNumber === car.stateNumber);
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
    this.modalRef.close();
  }

  public close(): void {
    this.modalRef.close();
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
      this.carsForm.addControl(`num${car.id}`,new FormControl(
          car.stateNumber,
          [],
          [this.ownerService.checkNumberUniq('')]
        ));
      this.carsForm.addControl(`manufactured${car.id}`, new FormControl(
        car.manufacturer,
        []
      ));
      this.carsForm.addControl(`model${car.id}`, new FormControl(car.model, []));
      this.carsForm.addControl(`year${car.id}`, new FormControl(car.productionYear, []));
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
