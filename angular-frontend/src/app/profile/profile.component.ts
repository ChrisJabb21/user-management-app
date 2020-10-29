import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  
  users: any;
  currentUser = null;
  currentIndex = -1;
  message = '';

  constructor(private token: TokenStorageService,private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.currentUser = this.token.getUser();
    
  }

  refreshList(): void {
    this.currentUser = null;
    this.currentIndex = -1;
  }

  saveUser(): void {
    const data = {
      username: this.currentUser.username,
      email: this.currentUser.email,
      role: this.currentUser.role
    };
  }

    updateUser(): void {
      this.userService.update(this.currentUser.id, this.currentUser)
        .subscribe(
          response => {
            console.log(response);
            this.message = 'The user was updated successfully!';
          },
          error => {
            console.log(error);
          });
        }
          deleteUser(): void {
            this.userService.delete(this.currentUser.id)
              .subscribe(
                response => {
                  console.log(response);
                  this.router.navigate(['/home']);
                },
                error => {
                  console.log(error);
                });
          }
}