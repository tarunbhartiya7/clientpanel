import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    public flashMessagesService: FlashMessagesService,
    public router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.authService.login(this.email, this.password)
      .then(res => {
        this.flashMessagesService.show('You are logged in successfully', {cssClass: 'alert-success', timeout: 3000});    
        this.router.navigate(['/']);  //redirect the user to dashboard if login is successfull      
      })
      .catch(err =>{
        this.flashMessagesService.show('Email/Password is incorrect', {cssClass: 'alert-danger', timeout: 3000});    
        // this.router.navigate(['/login']);
      })
  }

}
