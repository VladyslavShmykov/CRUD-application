import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {Owner} from "./shared/interfaces/owner.model";
import {OwnerService} from "./shared/services/owner.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public owners$: Observable<Owner[]> | undefined;

  constructor(
    private ownerService: OwnerService,
  ) {
  }

  ngOnInit(): void {
    this.owners$ = this.ownerService.getOwners();
  }

  addOwner() {

  }
}
