import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class AddressBookService {

  constructor(private httpservice: HttpService) { }

  addContact(data) {
    return this.httpservice.Post('', data);
  }

  getContactList() {
    return this.httpservice.Get('');
  }

  updateContact(id, data) {
    return this.httpservice.Update(id, data);
  }

  deleteContact(id) {
    return this.httpservice.Delete(id);
  }
}
