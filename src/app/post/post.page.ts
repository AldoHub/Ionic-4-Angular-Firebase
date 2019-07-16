import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../firebase.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  constructor(public actionSheetController: ActionSheetController, private firestoreService: FirebaseService, private route: ActivatedRoute, private router: Router ) { }
  
  public currentPost: any;
  public currentId: any = this.route.snapshot.paramMap.get("id");

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
         this.firestoreService.deletePost( this.currentId , this.currentPost["fileref"])
        }
      }, {
        text: 'Edit',
        icon: 'paper',
        handler: () => {
         this.router.navigate(["/edit", this.currentId]);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
      }]
    });
    await actionSheet.present();
  }



  getCurrentPost(){
    this.firestoreService.getPost(this.currentId).subscribe( post => {
      console.log(post);
      this.currentPost = post;
    });
  }

 

  ngOnInit() {
    this.getCurrentPost();
  }

}
