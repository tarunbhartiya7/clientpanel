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
    // Get Client
    this.clientService.getClient(this.id).subscribe(client => {
      client && client.balance > 0 ? this.hasBalance = true : false;
      this.client = client;
    });
  }

  updateBalance(id: string){
    !this.client.balance ? this.client.balance = 0 : false; 
    this.clientService.updateClient(this.id, this.client);
    this.flashMessagesService.show('Balance has been successfully updated.', {cssClass: 'alert-success', timeout: 3000});  
    // this.flashMessagesService.grayOut(true); // turn on gray out feature
    this.showBalanceUpdateInput = false;      
    this.client.balance > 0 ? this.hasBalance = true : this.hasBalance = false ;    
    // this.router.navigate(['/client/'+this.id ]); 
  }

  onDeleteClick(){
    if(confirm('Are you sure to delete?')){
      this.clientService.deleteClient(this.id);
      this.flashMessagesService.show('The Client has been succesfully deleted.', {cssClass: 'alert-success', timeout: 3000}); 
      // this.flashMessagesService.grayOut(true); // turn on gray out feature 
      this.router.navigate(['/']);  //navigate to the dashboard
    }
  }

}
