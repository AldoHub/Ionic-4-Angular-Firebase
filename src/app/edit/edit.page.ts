import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../firebase.service";

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  constructor( private firestoreService: FirebaseService, private route: ActivatedRoute, private router: Router ) { }
  
  public currentPost: any;
  public currentId: any = this.route.snapshot.paramMap.get("id");
  public currentImage : any;
  public image:any = null;


  public postsForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('',  Validators.required),
    cover: new FormControl('',  Validators.required),
    fileref: new FormControl('',  Validators.required),
  });

  
  public handleInput($event: Event){
    //getting the image or files
    this.image = $event.target["files"];
    console.log(this.image);
    
  }

  public updatePost(formData: FormData){
    
    this.firestoreService.updatePost(formData, this.currentId, this.image);
  }

  getCurrentPost(){
    this.firestoreService.getPost(this.currentId).subscribe( post => {
      this.postsForm.setValue({
        title: post["title"],
        content: post["content"],
        cover: post["cover"],
        fileref: post["fileref"],
      });
      this.currentImage = post["cover"];
    });
    
  }

  ngOnInit() {
    this.getCurrentPost();
  }

}
