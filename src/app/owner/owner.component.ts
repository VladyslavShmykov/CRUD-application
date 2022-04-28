import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {take} from "rxjs";

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  private type: 'create' | 'read' | 'update';
  public ownerForm: FormGroup;
  errorMessage: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.data
      .pipe(take(1))
      .subscribe(({type}) => this.type = type);
  }

  private initForm(): void {
    this.ownerForm = this.fb.group({
      lastName: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      middleName: new FormControl('', [Validators.required]),
    })
  }
}
