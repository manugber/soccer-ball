import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SoccerBallDto} from "../../dto/soccer-ball.dto";
import {FileUpload, FirestoreService} from "../../services/firestore.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-ball-details',
  templateUrl: './ball-details.component.html',
  styleUrls: ['./ball-details.component.scss']
})
export class BallDetailsComponent implements OnInit {

  ball: SoccerBallDto;
  ballId: string;
  ballForm = this.fb.group({
    ballName: ['', Validators.required],
    competition: ['', Validators.required],
    brand: ['', Validators.required],
    releaseDate: ['', Validators.required],
    material: ['', Validators.required],
    fifaApproved: [false],
    imageUrl: ['']
  });
  file: File;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, public firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ballId = params['id'];
      this.ball = this.firestoreService.soccerBalls.find(ball => {
        return ball.id === this.ballId
      })!;
      this.ballForm.setValue({
        ballName: this.ball.ballName,
        competition: this.ball.competition,
        brand: this.ball.brand,
        releaseDate: this.ball.releaseDate,
        material: this.ball.material,
        fifaApproved: this.ball.fifaApproved,
        imageUrl: this.ball.imageUrl
      });
    })
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.ballForm.markAsDirty();
  }

  onSubmit() {
    if (this.file) {
      this.firestoreService.updateWithFile(this.ballId, new FileUpload(this.file), this.ballForm.value);
    } else {
      this.firestoreService.update(this.ballId, this.ballForm.value);
    }
  }

  handleDateChange(date: any) {
    this.ballForm.patchValue({releaseDate: date.value.format('DD/MM/YYYY')});
  }
}
