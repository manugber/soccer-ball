import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {FirestoreService} from "./services/firestore.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  menuItems = [
    { label: 'Home', routerLink: ['/home'] },
    { label: 'Balls List', routerLink: ['/balls-list'] },
    { label: 'Add Ball', routerLink: ['/add-ball'] },
    { label: 'About Us', routerLink: ['/about-us'] },
  ]
  activeItem = this.menuItems[0];

  constructor(private location: Location) {
    const item = this.menuItems.find(function (item) {
      return location.path().includes(item.routerLink[0]);
    });
    const index = this.menuItems.indexOf(item!);
    this.activeItem = this.menuItems[index];
  }

  ngOnInit(): void {
  }
}
