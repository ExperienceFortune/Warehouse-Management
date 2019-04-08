import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/shared/item.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(public service: ItemService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
    
  }

  resetForm(catForm?: NgForm){
    if(catForm != null)
    catForm.resetForm();
    this.service.catData ={
      id: null,
      catName: '',
      catDescription:'',
    }
  }

  onSubmit(catForm:NgForm){
    let catData =Object.assign({}, catForm.value);
    delete catData.id;
    if(catForm.value.id == null)
    this.firestore.collection('categories').add(catData);
    else
    this.firestore.doc('categories/'+catForm.value.id).update(catData);
    this.resetForm(catForm);
    this.toastr.success('Submitted Successfully', 'Categorie Saved');
  }
  

}
