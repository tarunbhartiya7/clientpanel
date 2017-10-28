import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Client } from './../../models/client.model';

@Injectable()
export class ClientService {
  clientsRef: AngularFireList<any>;
  clients: Observable<any[]>;
  client: Observable<any>;  

  constructor(
    public af:  AngularFireDatabase
  ) {
    this.clientsRef = this.af.list('clients');  //name of collection
    // this.clients = this.clientsRef.snapshotChanges();
    this.clients = this.clientsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getClients(){
    return this.clients;
  }

  newClient(value: Client){
    this.clientsRef.push(value);
  }

  getClient(id:  string){
   this.client = this.af.object('/clients/'+id).valueChanges();
   return this.client;
  }

  updateClient(id: string, client: Client){
    this.clientsRef.update(id, client);
  }

  deleteClient(id: string){
    this.clientsRef.remove(id);
  }
}
