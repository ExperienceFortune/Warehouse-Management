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

  getCategories(callBack){
    return this.firestore.collection('categories').snapshotChanges()
    .subscribe(actionArray =>{
      const categories = actionArray.map(Categorie =>{
        return {
          id: Categorie.payload.doc.id,
          ...Categorie.payload.doc.data() 
        } as Categorie;
      })
      callBack(categories);
    });
  }
}
