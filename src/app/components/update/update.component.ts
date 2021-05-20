import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Person } from 'src/app/model/person';
import { AddressBookService } from 'src/app/services/adressBookService/address-book.service';
import { CscService } from 'src/app/services/csc/csc.service';

const NAME_REGEX = new RegExp('[A-Z][a-z]{2,}(\s[A-Z][a-z]*)*');
const PHONE_REGEX = new RegExp('^(?:(?:\\+|0{0,2})91(\\s*[\\ -]\\s*)?|[0]?)?[789]\\d{9}|(\\d[ -]?){10}\\d$');
const LOCALITY_REGEX = new RegExp('^[a-zA-Z0-9-/]{1,}(\s[a-zA-Z0-9-/]*)*');
const ZIP_REGEX = new RegExp('^[1-9][0-9]{5}');

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  states: string[] = [];
  cities: string[] = [];

  person: Person = new Person();

  name: string;
  phoneNumber: string;
  email: string;
  locality: string;
  state: string;
  city: string;
  zip: string;

  errors: { [key: string]: string } = {
    name: '',
    email: '',
    phoneNumber: '',
    locality: '',
    zip: ''
  }

  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private addressBookService: AddressBookService,
    private formBuilder: FormBuilder,
    private csc: CscService) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(NAME_REGEX)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(PHONE_REGEX)]],
      email: ['', [Validators.required, Validators.email]],
      locality: ['', [Validators.required, Validators.pattern(LOCALITY_REGEX)]],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern(ZIP_REGEX)]]
    })
    this.name = data.contact.name;
    this.phoneNumber = data.contact.phoneNumber;
    this.email = data.contact.email;
    this.state = data.contact.address.state;
    this.city = data.contact.address.city;
    this.locality = data.contact.address.locality;
    this.zip = data.contact.address.zip;

    console.log(data.contact);

    this.csc.get().subscribe((resp: any) => {
      this.states = resp.map[0].map(obj => obj.state).sort();
    }, (error) => {
      console.log(error);
    })
    this.setCities(this.state);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      this.createJsonObject(this.form.value);
      this.addressBookService.updateContact(this.data.contact.id, this.person).subscribe((resp: any) => {
        this.dialogRef.close(resp.object);
      })
    }
  }

  createJsonObject(data: any) {
    this.person.name = data.name;
    this.person.email = data.email;
    this.person.phoneNumber = data.phoneNumber;
    this.person.address = {
      locality: data.locality,
      state: data.state,
      city: data.city,
      zip: data.zip
    }
  }

  setCities(state: string) {
    this.csc.get().subscribe((resp: any) => {
      resp.map[0].forEach(element => {
        if (element.state == state) {
          this.cities = element.cities.sort();
          return;
        }
      });
    }, (error) => {
      console.log(error);
    })
  }

  validate(field) {
    if (this.getControl(field).invalid) {
      this.errors[field] = 'Invalid ' + field;
      return true;
    } else {
      this.errors[field] = '';
      return false;
    }
  }

  getControl(field) {
    return this.form.get(field);
  }

  reset() {
    this.form.reset();
  }
}
