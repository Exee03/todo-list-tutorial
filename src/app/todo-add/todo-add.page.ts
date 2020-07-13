import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Todo, FirebaseService } from "../firebase.service";

@Component({
  selector: "app-todo-add",
  templateUrl: "./todo-add.page.html",
  styleUrls: ["./todo-add.page.scss"],
})
export class TodoAddPage implements OnInit {
  todo: Todo = {
    completed: false,
    title: '',
    description: '',
    date: new Date(),
  };

  constructor(
    private modalController: ModalController,
    private firestoreService: FirebaseService
  ) {}

  ngOnInit() {}

  async save() {
    await this.firestoreService.createTodo(this.todo);
    this.close();
  }

  close() {
    this.modalController.dismiss();
  }
}
