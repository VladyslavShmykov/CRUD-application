import {Component} from '@angular/core';
import {Observable} from "rxjs";
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

  public owners$: Observable<Owner[]> | undefined;

  constructor(
    private ownerService: OwnerService,
    private ngbModal: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.owners$ = this.ownerService.getOwners();
  }

  addOwner() {
    this.ngbModal.open(OwnerComponent, {size: "lg"});
  }
}
