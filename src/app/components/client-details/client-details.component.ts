import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from './../../services/client/client.service';
import { Client } from './../../models/client.model';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    public flashMessagesService: FlashMessagesService,
    public router: Router,
    public route: ActivatedRoute,
    public clientService: ClientService
  ) { }

  ngOnInit() {
    // Get ID
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    
    // Get Client
    this.clientService.getClient(this.id);
    
  }

}
