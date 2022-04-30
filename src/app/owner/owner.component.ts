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
  public cars: CarEntity[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initForm().valueChanges.pipe(
      pairwise(),
      filter(([oldRes, newRes]) => oldRes.cars.length !== newRes.cars.length),
      takeUntil(this.destroy$)
    ).subscribe(([oldValue, newValue]) => {
      console.log(oldValue, newValue);
      });
    this.activatedRoute.data
      .pipe(take(1))
      .subscribe(({type}) => this.type = type);
  }

  private initForm(): FormGroup {
    return this.ownerForm = this.fb.group({
      lastName: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      middleName: new FormControl('', [Validators.required]),
      cars: new FormControl([], []),
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
