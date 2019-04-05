import { Injectable } from '@angular/core';
import { Item } from './item.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  formData: Item;

  constructor(private firestore: AngularFirestore) { }


  getItems(){
    return this.firestore.collection('entry').snapshotChanges();
  }
}
