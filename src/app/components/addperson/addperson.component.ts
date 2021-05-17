import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Person } from 'src/app/model/person';
import { Router } from '@angular/router';
import { CscService } from 'src/app/services/csc/csc.service';


const NAME_REGEX = new RegExp('[A-Z][a-z]{2,}(\s[A-Z][a-z]*)*');
const PHONE_REGEX = new RegExp('^(?:(?:\\+|0{0,2})91(\\s*[\\ -]\\s*)?|[0]?)?[789]\\d{9}|(\\d[ -]?){10}\\d$');
const LOCALITY_REGEX = new RegExp('^[a-zA-Z0-9-/]+');
const ZIP_REGEX = new RegExp('^[1-9][0-9]{5}')


@Component({
  selector: 'app-addperson',
  templateUrl: './addperson.component.html',
  styleUrls: ['./addperson.component.scss']
})
export class AddpersonComponent implements OnInit {

  states: any[] = [];
  cities: any[] = [];

  form: FormGroup;
  country: any;
  errors: { [key: string]: string } = {
    name: '',
    email: '',
    phoneNumber: '',
    locality: '',
    zip: ''
  }

  regex: { [key: string]: RegExp } = {
    name: NAME_REGEX,
    phoneNumber: PHONE_REGEX,
    locality: LOCALITY_REGEX,
    zip: ZIP_REGEX
  }

  person: Person = new Person();

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private csc: CscService) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(NAME_REGEX)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(PHONE_REGEX)]],
      email: ['', [Validators.required, Validators.email]],
      locality: ['', [Validators.required, Validators.pattern(LOCALITY_REGEX)]],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern(ZIP_REGEX)]]
    });
    this.person.address = {
      locality: '',
      state: '',
      city: '',
      zip: ''
    }
    this.assignStateVal();
  }

  assignStateVal() {
    this.csc.get().subscribe((resp: any) => {
      this.states = resp.map[0].map(obj => obj.state).sort();
    })
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      this.createJsonObject(this.form.value);
      console.log(this.person);

      this.router.navigateByUrl('/home');
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

  setCities(event: any) {
    this.csc.get().subscribe((resp: any) => {
      resp.map[0].forEach(element => {
        if (element.state == event.value) {
          this.cities = element.cities.sort();
          return;
        }
      });
    })
  }

  reset() {
    this.form.reset();
  }
}
