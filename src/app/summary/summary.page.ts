import { Component, OnInit } from '@angular/core';
import { Todo, FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {
  todoList: Todo[] = [];
  todoUnCompleted = 0;
  todoCompleted = 0;
  listType = "uncompleted";

  constructor(
    private firestoreService: FirebaseService,
  ) {}

  ngOnInit() {
    this.read();
  }

  read() {
    this.firestoreService.readTodo().subscribe((todos) => {
      this.todoList = todos;
      this.todoUnCompleted = todos.filter(
        (todo) => todo.completed == false
      ).length;
      this.todoCompleted = todos.filter((todo) => todo.completed == true).length;
    });
  }

}
