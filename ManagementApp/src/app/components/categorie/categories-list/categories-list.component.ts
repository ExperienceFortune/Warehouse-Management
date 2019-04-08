import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/shared/item.service';
import { Categorie } from 'src/app/shared/item.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  listCat: Categorie[];
  constructor(private service: ItemService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getCategories().subscribe(actionArray =>{
      this.listCat = actionArray.map(Categorie =>{
        return {
          id: Categorie.payload.doc.id,
          ...Categorie.payload.doc.data() } as Categorie;
      })
    });
  }

  onEdit(cat: Categorie){
    this.service.catData = Object.assign({}, cat);
  }

  onDelete(id:string){
    if(confirm("Are you sure to delete this categorie?")){
      this.firestore.doc('categories/'+id).delete();
      this.toastr.warning('Deleted Successfully','Categorie Deleted');
    }
  }

}
