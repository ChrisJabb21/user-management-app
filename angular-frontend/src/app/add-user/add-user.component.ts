import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

user = {
  username:'',
  email: '',
  password: '', 
  role:''
};
submitted = false;


  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  saveUser(): void {
    const data = {
      username: this.user.username,
      email: this.user.email,
      password: this.user.password,
      role: this.user.role
    };
    this.userService.create(data)
    .subscribe(
      response => {
        console.log(response);
        this.submitted = true;
      },
      error => {
        console.log(error);
      });
  }

  newUser(): void {
    this.submitted = false;
    this.user = {
      username:'',
      email: '',
    password: '',
    role: "user" 
    }
  }


}
