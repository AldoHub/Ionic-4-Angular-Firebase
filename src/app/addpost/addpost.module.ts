import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';;
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddpostPage } from './addpost.page';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: AddpostPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddpostPage]
})
export class AddpostPageModule {}
