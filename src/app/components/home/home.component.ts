import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddressBookService } from 'src/app/services/adressBookService/address-book.service';
import { UpdateComponent } from '../update/update.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contactList: any[] = [];
  displayedColumns: string[] = ['Name', 'Phone', 'Email', 'Locality', 'State', 'City', 'Zip', 'Action']

  constructor(private addressBookService: AddressBookService,
    private dialog: MatDialog) { this.getContactList(); }
  ngOnInit(): void {

  }

  getContactList() {
    this.addressBookService.getContactList().subscribe((resp: any) => {
      this.contactList = resp.object;
      console.log(resp.object);
    })
  }

  deleteContact(id) {
    this.addressBookService.deleteContact(id).subscribe((resp: any) => {
      console.log(resp);
      this.getContactList();
    })
  }

  updateContact(contact) {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '500px',
      data: { contact }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log("Updation done : ", result);
      this.getContactList();
    })
  }

}
