import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'todo-edit',
    loadChildren: () => import('./todo-edit/todo-edit.module').then( m => m.TodoEditPageModule)
  },
  {
    path: 'todo-add',
    loadChildren: () => import('./todo-add/todo-add.module').then( m => m.TodoAddPageModule)
  },
  {
    path: 'todo-detail',
    loadChildren: () => import('./todo-detail/todo-detail.module').then( m => m.TodoDetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
