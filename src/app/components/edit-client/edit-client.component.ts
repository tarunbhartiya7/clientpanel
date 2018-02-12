import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClientService } from './../../services/client/client.service';
import { SettingsService } from './../../services/settings.service';
import { Client } from './../../models/client.model';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }
  disableBalanceOnEdit: boolean = false;
  constructor(
    public flashMessagesService: FlashMessagesService,
    public router: Router,
    public route: ActivatedRoute,
    public clientService: ClientService,
    public settingsService: SettingsService
  ) {   }

  ngOnInit() {
    // Get ID
    this.id = this.route.snapshot.params['id'];
    // Get Client
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }

  onSubmit({value}: {value: Client}){
    // Add new client
    this.clientService.updateClient(this.id, value);
    this.flashMessagesService.show('The Client details are successfully updated.', {cssClass: 'alert-success', timeout: 3000}); 
    // this.flashMessagesService.grayOut(true); // turn on gray out feature
    this.router.navigate(['/client/' + this.id]);  //navigate to the client details page
  }

}
