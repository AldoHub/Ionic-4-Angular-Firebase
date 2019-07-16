import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../firebase.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.page.html',
  styleUrls: ['./addpost.page.scss'],
})
export class AddpostPage implements OnInit {

  constructor( private firestoreService: FirebaseService ) { }

  
  image:any = null; //list of files
  percentage: any = this.firestoreService.percentage;

  public postsForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('',  Validators.required),
    cover: new FormControl('',  Validators.required),

  });
 

  public handleInput($event: Event){
    //getting the image or files
    this.image = $event.target["files"];
    console.log(this.image);
  }

  //submit
  public addPost(data: FormData){
    this.firestoreService.createPost(data, this.image);
  }



  ngOnInit() {
  }

}
