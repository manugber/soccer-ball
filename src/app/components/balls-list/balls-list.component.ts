import { Component, OnInit } from '@angular/core';
import {FirestoreService} from "../../services/firestore.service";
import {SoccerBallDto} from "../../dto/soccer-ball.dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-balls-list',
  templateUrl: './balls-list.component.html',
  styleUrls: ['./balls-list.component.scss']
})
export class BallsListComponent implements OnInit {

  constructor(public firestoreService: FirestoreService, private router: Router) { }

  ngOnInit(): void {
    this.updateBallsList()
  }

  updateBallsList() {
    this.firestoreService.soccerBalls = [];
    this.firestoreService.getAll();
  }

  editBall(ball: SoccerBallDto) {
    this.router.navigate(['/balls-list', ball.id]);
  }

  deleteBall(ball: SoccerBallDto) {
    this.firestoreService.delete(ball.id!).then(() => {
      this.updateBallsList();
    });
  }

}
