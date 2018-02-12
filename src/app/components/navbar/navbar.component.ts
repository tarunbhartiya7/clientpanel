import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from './../../services/settings.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;

  constructor(
    public flashMessagesService: FlashMessagesService,
    public router: Router,
    public authService: AuthService,
    public settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }else
        this.isLoggedIn = false;
    });
    this.showRegister = this.settingsService.getSettings().allowRegistration;
  }

  onLogout(){
    this.authService.logout();
    this.flashMessagesService.show('You are successfully logged out.', {cssClass: 'alert-success', timeout: 3000});    
    this.router.navigate(['/login']);
    this.showRegister = this.settingsService.getSettings().allowRegistration;
  }

}
