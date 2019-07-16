import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'addpost', loadChildren: './addpost/addpost.module#AddpostPageModule' },
  { path: 'post/:id', loadChildren: './post/post.module#PostPageModule' },
  { path: 'edit/:id', loadChildren: './edit/edit.module#EditPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
