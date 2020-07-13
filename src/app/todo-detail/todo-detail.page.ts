import { Component, OnInit } from '@angular/core';
import { Todo, FirebaseService } from '../firebase.service';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.page.html',
  styleUrls: ['./todo-detail.page.scss'],
})
export class TodoDetailPage implements OnInit {
  todo: Todo;

  constructor(private navParams: NavParams, private modalController: ModalController, private firestoreService: FirebaseService) { }

  ngOnInit() {
    this.todo = this.navParams.get('todo');
  }

  close() {
    this.modalController.dismiss();
  }

}
