import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddpersonComponent } from '../addperson/addperson.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  name: any;
  constructor(public dialogRef: MatDialogRef<AddpersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router) {
    this.dialogRef.disableClose = true;
    this.name = data.name;
  }

  ngOnInit(): void {
  }

  goBack(): void {
    this.dialogRef.close();
  }

  toHome() {
    this.dialogRef.close('home');
  }

}
