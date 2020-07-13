import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";

export interface Todo {
  id?: String;
  title: String;
  description: String;
  date: any;
  completed: Boolean;
}

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  constructor(private afs: AngularFirestore) {}

  createTodo(todo) {
    return this.afs.collection("todos").add(todo);
  }

  readTodo() {
    return this.afs
      .collection("todos")
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  updateTodo(id, todo) {
    return this.afs.collection("todos").doc(id).update(todo);
  }

  deleteTodo(id) {
    return this.afs.collection("todos").doc(id).delete();
  }
}
