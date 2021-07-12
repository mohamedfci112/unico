import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms' ;
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { Task } from '../task/task';
import { TaskDialogResult } from '../task-dialog/task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

const getObservable = (collection: AngularFirestoreCollection<Task>) => {
  const subject = new BehaviorSubject<Task[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Task[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  todo = getObservable(this.store.collection('todo', x => x.where('user' , '==', localStorage.getItem('email')))) as Observable<Task[]>;
  // tslint:disable-next-line:max-line-length
  inProgress = getObservable(this.store.collection('inProgress', x => x.where('user' , '==', localStorage.getItem('email')))) as Observable<Task[]>;
  done = getObservable(this.store.collection('done', x => x.where('user' , '==', localStorage.getItem('email')))) as Observable<Task[]>;
// function for listening to the event

  // tslint:disable-next-line:typedef
  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    const item = event.previousContainer.data[event.previousIndex];
    this.store.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.store.collection(event.previousContainer.id).doc(item.id).delete(),
        this.store.collection(event.container.id).add(item),
      ]);
      return promise;
    });
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      if (result.delete) {
        this.store.collection(list).doc(task.id).delete();
      } else {
        this.store.collection(list).doc(task.id).update(task);
      }
    });
  }

  constructor(private dialog: MatDialog, private store: AngularFirestore) { }
  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult) => {
        result.task.user = localStorage.getItem('email');
        this.store.collection('todo').add(result.task);
      });
  }

  ngOnInit(): void {
  }

}
