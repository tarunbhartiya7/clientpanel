import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    public flashMessagesService: FlashMessagesService,
    public router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.authService.register(this.email, this.password)
      .then(res => {
        this.flashMessagesService.show('New user registered successfully', {cssClass: 'alert-success', timeout: 3000});    
        this.router.navigate(['/']);  //redirect the user to dashboard if registration is successfull    
      })
      .catch(err =>{
        this.flashMessagesService.show(err.message + ' Please try again.', {cssClass: 'alert-danger', timeout: 3000});    
      })
  }

}
