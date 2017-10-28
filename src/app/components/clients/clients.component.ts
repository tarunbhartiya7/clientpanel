import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { Client } from './../../models/client.model';
import { ClientService } from './../../services/client/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients: any[] = [];
  totalOwed: number;
  constructor(public clientService: ClientService) {

  }

  getClients() {
    this.clientService.getClients().subscribe(actions => {
      actions.forEach(action => {
        let tempObject = { key: '', data: {} };
        tempObject.key = action.key;
        tempObject.data = action.payload.toJSON();
        this.clients.push(tempObject);
      });
      this.getTotal();
    });
  }

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.getTotal();
    });

  };

  getTotal() {
    let total = 0;
    this.clients.forEach(client => {
      total += +client.balance;
    });
    this.totalOwed = total;
  }
}
