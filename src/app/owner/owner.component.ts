import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  private type: 'create' | 'read' | 'update';
  public ownerForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
  ) {
    const {type, id} = this.router.getCurrentNavigation()?.extras.state as any;
    this.type = type;
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.ownerForm = this.fb.group({

    })
  }
}
