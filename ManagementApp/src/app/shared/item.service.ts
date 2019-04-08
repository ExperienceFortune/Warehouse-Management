import { Injectable } from '@angular/core';
import { Item, Categorie } from './item.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  formData: Item;
  catData: Categorie;

  constructor(private firestore: AngularFirestore) { }


  getItems(){
    return this.firestore.collection('entry').snapshotChanges();
  }

  getCategories(){
    return this.firestore.collection('categories').snapshotChanges();
  }
}
