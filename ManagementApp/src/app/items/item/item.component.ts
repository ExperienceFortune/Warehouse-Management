import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/shared/item.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Categorie } from 'src/app/shared/item.model';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  categories:any[]=[];
  constructor(public service : ItemService,
    private firestore: AngularFirestore,
    private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
    this.service.getCategories((data)=>{
      this.categories = data
    })
    

  }

  resetForm(form?: NgForm){
    if(form != null)
    form.resetForm();
    this.service.formData = {
      id:null,
      date: '',
      description:'',
      quantity:0,
      pilote:'',
      laissezpasser:0,
      status:'',
      comment:'',
      categorie:'',
    }
  }

  onSubmit(form:NgForm){
    let data = Object.assign({}, form.value);
    delete data.id;
    if(form.value.id == null)
    this.firestore.collection('entry').add(data);
    else
    this.firestore.doc('entry/'+form.value.id).update(data);
    this.resetForm(form);
    this.toastr.success('Submitted Successfully','Intem Record');

  }

}
