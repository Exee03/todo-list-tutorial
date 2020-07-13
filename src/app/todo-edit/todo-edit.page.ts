import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Todo, FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.page.html',
  styleUrls: ['./todo-edit.page.scss'],
})
export class TodoEditPage implements OnInit {
  todo: Todo = {
    completed: false,
    title: '',
    description: '',
    date: new Date(),
  };

  constructor(private navParams: NavParams, private modalController: ModalController, private firestoreService: FirebaseService) { }

  ngOnInit() {
    this.todo = this.navParams.get('todo');
  }

  async update() {
    await this.firestoreService.updateTodo(this.todo.id, this.todo);
    this.close();
  }

  close() {
    this.modalController.dismiss();
  }

}
