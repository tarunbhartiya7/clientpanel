import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from './../../models/client.model';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from './../../services/client/client.service';
import { SettingsService } from './../../services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  @ViewChild('clientEmail') clientEmail;
  client: Client = {};
  disableBalanceOnAdd:boolean = true;
  constructor(
    public flashMessagesService: FlashMessagesService,
    public router: Router,
    public clientService: ClientService,
    public settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({value}: {value: Client}){
    //This is shorthand, you can also pass client from html instead of the form
    this.disableBalanceOnAdd ? value.balance = 0 : false;
    // Add new client
    this.clientService.newClient(value);
    this.flashMessagesService.show('New client has been successfully added.', {cssClass: 'alert-success', timeout: 3000});   
    // this.flashMessagesService.grayOut(true); // turn on gray out feature     
    this.router.navigate(['/']);  //navigate to the dashboard
  }


}
