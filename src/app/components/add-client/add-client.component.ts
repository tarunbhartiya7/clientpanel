import { Router } from '@angular/router';
import { Client } from './../../models/client.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from './../../services/client/client.service';
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
    public clientService: ClientService
  ) { }

  ngOnInit() {
  }

  onSubmit(value: Client){
    this.disableBalanceOnAdd ? value.balance = 0 : false;
    // Add new client
    this.clientService.addClient(value);
    this.flashMessagesService.show('New client added', {cssClass: 'alert-success', timeout: 4000});        
    this.router.navigate(['/']);  //navigate to the dashboard
  }


}
