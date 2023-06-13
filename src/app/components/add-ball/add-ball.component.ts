import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {FileUpload, FirestoreService} from "../../services/firestore.service";

@Component({
  selector: 'app-add-ball',
  templateUrl: './add-ball.component.html',
  styleUrls: ['./add-ball.component.scss']
})
export class AddBallComponent implements OnInit {

  ballForm = this.fb.group({
    ballName: ['', Validators.required],
    competition: ['', Validators.required],
    brand: ['', Validators.required],
    releaseDate: ['', Validators.required],
    material: ['', Validators.required],
    fifaApproved: [false],
    image: [false, Validators.required]
  });
  file: File;

  constructor(private fb: FormBuilder, public firestoreService: FirestoreService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.firestoreService.create(new FileUpload(this.file), this.ballForm.value);
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.ballForm.patchValue({image: true})
  }

  handleDateChange(date: any) {
    this.ballForm.patchValue({releaseDate: date.value.format('DD/MM/YYYY')});
  }
}
