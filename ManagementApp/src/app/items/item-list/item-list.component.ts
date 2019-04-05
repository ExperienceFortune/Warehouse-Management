import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/shared/item.service';
import { Item } from 'src/app/shared/item.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  list: Item[];
  constructor(private service: ItemService,
    private firestore: AngularFirestore,
    private tostr:ToastrService) { }

  ngOnInit() {
    this.service.getItems().subscribe(actionArray =>{
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Item;
      })
    });
  }

  onEdit(ite: Item){
    this.service.formData = Object.assign({}, ite);
  }

  onDelete(id:string){
    if(confirm("Are you sure to delete this record?")){
      this.firestore.doc('entry/'+id).delete();
      this.tostr.warning('Deleted Successfully', 'Item Record');
    }
  }

}
