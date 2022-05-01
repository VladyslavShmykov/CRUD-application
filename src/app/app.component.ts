import {Component} from '@angular/core';
import {Observable, take} from "rxjs";
import {Owner} from "./shared/interfaces/owner.model";
import {OwnerService} from "./shared/services/owner.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {OwnerComponent} from "./owner/owner.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public owners$: Observable<Owner[]>;

  constructor(
    private ownerService: OwnerService,
    private ngbModal: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.owners$ = this.ownerService.getOwners();
  }

  addOwner() {
    this.ngbModal.open(OwnerComponent, {size: "xl"}).result.then(
      ({firstName, lastName, middleName, cars}) => {
        this.ownerService.createOwner(lastName, firstName, middleName, cars).pipe(take(1))
          .subscribe(() => this.owners$ = this.ownerService.getOwners());
    });
  }
}
