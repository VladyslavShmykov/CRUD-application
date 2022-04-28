import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Owner} from "../shared/interfaces/owner.model";
import {OwnerService} from "../shared/services/owner.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public owners$: Observable<Owner[]> | undefined;

  constructor(
    private ownerService: OwnerService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.owners$ = this.ownerService.getOwners();
  }

  public addOwner() {
    this.router.navigate(['create-owner'], {state: {type: 'create'}});
  }
}
