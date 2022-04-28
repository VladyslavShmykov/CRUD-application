import {Component, OnInit} from '@angular/core';
import {OwnerService} from "./shared/services/owner.service";
import {Observable} from "rxjs";
import {Owner} from "./shared/interfaces/owner.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public owners$: Observable<Owner[]> | undefined;

  constructor(
    private ownerService: OwnerService
  ) {
  }

  ngOnInit(): void {
    this.owners$ = this.ownerService.getOwners();
  }
}
