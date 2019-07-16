import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import {finalize} from "rxjs/operators";
import {Observable} from "rxjs";
import {BehaviorSubject} from "rxjs";

import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public posts: any;
  public postsCollection: any;
  
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  
  public percentage: any;

  public percentageChanges: BehaviorSubject<any> = new BehaviorSubject<any>(this.percentage);

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage, private router: Router) { 
    this.getData();
  }

  setPercentage(percent: any): void{
      this.percentage = percent;
      this.percentageChanges.next(percent);
  }
  

  public getData(){
   this.posts = this.firestore.collection("posts");
   return this.posts;
  }



  //create the post
  public createPost(postData: Object, file: any[]){
   
    // console.log(file);
    const image = file[0];

    //loop through the files array of objects in case of multiple images

    const filepath = Date.now() + "-" + file[0]["name"];
    
    //get the reference
    const fileRef = this.storage.ref(filepath);
    const task = this.storage.upload(filepath, image)
  
    //get the percentage
    this.uploadPercent = task.percentageChanges();
    //subscribe to the percentage
    
    this.uploadPercent.subscribe(percent => {
      console.log("x", percent);
      this.setPercentage(percent);
    })
    
    task.snapshotChanges().pipe(
      
      finalize(() => {
        console.log("File is being processed, you will be redirected soon...");
        fileRef.getDownloadURL().subscribe(url => {
          this.downloadURL = url;

          let newpost = {
            title : postData["title"],
            content : postData["content"],
            cover: this.downloadURL,
            fileref: filepath
          }

          this.firestore.collection("posts").add(newpost)
          .then(post => {
        
          this.setPercentage(null);
            this.router.navigate(['/'])
          }).catch(err => {
            console.log("error: ", err);
          });
          
          
        })

      })
    ).subscribe()
  }

  //get current post
  public getPost(postId: string){
    return this.posts.doc(postId).valueChanges();
  }

  //update the post
  public updatePost(postObj: Object, postId: string, file: any[]){
    console.log(postObj);
    if(file === null){
      return this.posts.doc(postId).update(postObj);
    }else{
      console.log("code exec")
        const image = file[0];
        const filepath = Date.now() + "-" + file[0]["name"];
        
        //get the reference
        const fileRef = this.storage.ref(filepath);
        const task = this.storage.upload(filepath, image)
      
        //get the percentage
        this.uploadPercent = task.percentageChanges();
        //subscribe to the percentage
        
        this.uploadPercent.subscribe(percent => {
          console.log("x", percent);
          this.setPercentage(percent);
        })
        
        task.snapshotChanges().pipe(
          
          finalize(() => {
            console.log("File is being processed, you will be redirected soon...");
            fileRef.getDownloadURL().subscribe(url => {

              //we got the new file, delete the old one

              const storageRef = this.storage.storage.ref();
              storageRef.child(postObj["fileref"]).delete()
              .then(()=>{
                console.log("image delete")
              }).catch(err => {
                console.log(err)
              });


              this.downloadURL = url;
    
              let newpost = {
                title : postObj["title"],
                content : postObj["content"],
                cover: this.downloadURL,
                fileref: filepath
              }
    
              this.posts.doc(postId).set(newpost)
              .then(post => {
            
              this.setPercentage(null);
                this.router.navigate(['/'])
              }).catch(err => {
                console.log("error: ", err);
              });
              
              
            })
    
          })
        ).subscribe()
    }
  }
    
  //delete the post
  public deletePost(docID: string, image: string){
      
      //get the reference to the image
      //in order to delete it
      const storageRef = this.storage.storage.ref();
      storageRef.child(image).delete()
      .then(()=>{
        console.log("image delete")
      }).catch(err => {
        console.log(err)
      });
      //delete the post here
      this.posts.doc(docID)
      .delete().then(()=>{
      console.log("post deleted");
      this.router.navigate(["/"]);     
      }).catch(err => {
        console.log(err)
      })
  }


}
