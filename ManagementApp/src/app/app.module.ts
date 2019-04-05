import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import {  AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment.prod';
import { ItemsComponent } from './items/items.component';
import { ItemComponent } from './items/item/item.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemService } from './shared/item.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { RouterModule, Routes} from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';


const appRoutes: Routes = [
  {path:'', component:HomeComponent},
  {path: 'items', component:ItemsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemComponent,
    ItemListComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
