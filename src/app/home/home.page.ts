import { Component } from "@angular/core";
import { FirebaseService, Todo } from "../firebase.service";
import { ModalController } from "@ionic/angular";
import { TodoEditPage } from "../todo-edit/todo-edit.page";
import { TodoAddPage } from "../todo-add/todo-add.page";
import { TodoDetailPage } from "../todo-detail/todo-detail.page";
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  todoList: Todo[] = [];
  todoListUnCompleted: Todo[] = [];
  todoListCompleted: Todo[] = [];
  listType = "uncompleted";

  constructor(
    private firestoreService: FirebaseService,
    private modalController: ModalController,
    private barcodeScanner: BarcodeScanner,
    private router: Router,
  ) {}

  ionViewWillEnter() {
    this.read();
  }

  read() {
    this.firestoreService.readTodo().subscribe((todos) => {
      this.todoList = todos;
      this.todoListUnCompleted = todos.filter(
        (todo) => todo.completed == false
      );
      this.todoListCompleted = todos.filter((todo) => todo.completed == true);
    });
  }

  update(id: string, todo: Todo) {
    todo.completed = !todo.completed;
    this.firestoreService.updateTodo(id, todo);
  }

  delete(id) {
    this.firestoreService.deleteTodo(id);
  }

  async openTodo(todo: Todo) {
    const modal = await this.modalController.create({
      cssClass: "modalStyle",
      component: TodoDetailPage,
      componentProps: { todo: todo },
    });

    await modal.present();
  }

  async addTodo() {
    const modal = await this.modalController.create({
      cssClass: "modalStyle",
      component: TodoAddPage,
    });

    await modal.present();
  }

  async todoEdit(todo) {
    const modal = await this.modalController.create({
      cssClass: "modalStyle",
      component: TodoEditPage,
      componentProps: { todo: todo },
    });

    await modal.present();
  }

  segmentChanged(event) {
    this.listType = event.detail.value;
  }

  scan() {
    this.barcodeScanner.scan().then(async barcodeData => {
      console.log('Barcode data', barcodeData);      
      
      const todo: Todo = {
        completed: false,
        title: barcodeData.text,
        description: barcodeData.text,
        date: new Date(),
      };
      
      await this.firestoreService.createTodo(todo);
     }).catch(err => {
         console.log('Error', err);
     });
  }

  summary() {
    this.router.navigateByUrl('summary');
  }
}
