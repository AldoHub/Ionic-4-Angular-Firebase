import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../firebase.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  posts: any;
  constructor(private firebase: FirebaseService){}

  ngOnInit(): void {
    this.posts = this.firebase.posts.snapshotChanges();
   //console.log(this.posts);
  }


}
