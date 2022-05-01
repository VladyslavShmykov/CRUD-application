import {Component, Inject} from '@angular/core';
import {take} from "rxjs";
import {Owner} from "./shared/interfaces/owner.model";
import {OwnerService} from "./shared/services/owner.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {OwnerComponent} from "./owner/owner.component";
import {SelectionManagerService} from "./shared/services/selection-manager.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {provide: 'ownersSelection', useClass: SelectionManagerService}
  ],
})
export class AppComponent {

  public owners: Owner[] = [];

  constructor(
    private ownerService: OwnerService,
    private ngbModal: NgbModal,
    @Inject('ownersSelection') private ownersSelection: SelectionManagerService,
  ) {
  }

  ngOnInit(): void {
    this.ownerService.getOwners().pipe(take(1)).subscribe(value => this.owners = value);
  }

  public get selectedItems(): Owner[] {
    return this.ownersSelection.selectedItems;
  }

  public onSelectOwner(owner: Owner): void {
    if (!owner.selected) {
      this.ownersSelection.deselectTemplate(this.selectedItems[0]);
      this.ownersSelection.selectTemplate(owner);
    } else {
      this.ownersSelection.deselectTemplate(owner);
    }
  }

  public createOwner(): void {
    const modalRef = this.ngbModal.open(OwnerComponent, {size: "xl"});
    modalRef.componentInstance.type = 'create';
    modalRef.result.then(
      (newOwner) => {
        if (newOwner) {
          this.ownerService.createOwner(newOwner.lastName, newOwner.firstName, newOwner.middleName, newOwner.cars).pipe(take(1))
            .subscribe(value => this.owners.push(value));
        }
        this.onSelectOwner(this.selectedItems[0]);
      });
  }

  public updateOwner(): void {
    const modalRef = this.ngbModal.open(OwnerComponent, {size: "xl"});
    modalRef.componentInstance.type = 'update';
    modalRef.componentInstance.owner = this.selectedItems[0];
    modalRef.result.then(
      (editedOwner) => this.ownerService.editOwner(editedOwner)
        .pipe(take(1))
        .subscribe(() => {
          const idx = this.owners.findIndex(({id}) => id === editedOwner.id);
          this.owners[idx] = editedOwner;
          this.onSelectOwner(this.selectedItems[0]);
        })
    );
  }

  public readOwner(): void {
    const modalRef = this.ngbModal.open(OwnerComponent, {size: "xl"});
    modalRef.componentInstance.type = 'read';
    modalRef.componentInstance.owner = this.selectedItems[0];
  }

  public deleteOwner(): void {
    const ownerIdToDelete = this.selectedItems[0].id;
    this.ownerService.deleteOwner(ownerIdToDelete).pipe(take(1))
      .subscribe(() => this.owners = this.owners.filter(({id}) => id !== ownerIdToDelete));
    this.onSelectOwner(this.selectedItems[0]);
  }
}
