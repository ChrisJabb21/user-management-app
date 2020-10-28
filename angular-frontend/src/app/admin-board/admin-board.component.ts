import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css']
})
export class AdminBoardComponent implements OnInit {

  users: any;
  currentUser = null;
  currentIndex = -1;
  username = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.userService.getAll()
    .subscribe(
      data => {
        this.users = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  refreshList(): void {
    this.retrieveUsers();
    this.currentUser = null;
    this.currentIndex = -1;
  }

  //select a user from list.
  setActiveUser(user, index): void {
    this.currentUser = user;
    this.currentIndex = index;
  }

  searchUsername(): void {
    this.userService.findByUsername(this.username)
    .subscribe(
      data => {
        this.users = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }
}
