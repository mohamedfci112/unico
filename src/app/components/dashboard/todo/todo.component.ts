import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../../services/todo.service';
import { Todo } from '../../../models/todo';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  toDoListArray: Todo[];
  item: Todo = {
    title: '',
    isChecked: '',
    user: '',
    date: ''
  };

  constructor(private toDoService: TodoService) { }

  ngOnInit(): void {
    this.toDoService.getAnnounce()
    .subscribe(item => {
      this.toDoListArray = [];
      this.toDoListArray = item;

      // sort array isChecked false  -> true
      /*this.toDoListArray.sort((a, b) => {
          return a.isChecked - b.isChecked;
        });*/
    });
  }
  // tslint:disable-next-line:typedef
  onAdd(itemTitle) {
    // tslint:disable-next-line:triple-equals
    if (itemTitle.value != ''){
      this.item.title = itemTitle.value;
      this.item.user = localStorage.getItem('email');
      this.item.date = (new Date()).toString();
      this.item.isChecked = false;
      this.toDoService.addTitle(this.item);
      this.item.title = '';
      itemTitle.value = null;
    }
    else{
      alert('Please Write Any Thing !!');
    }
  }

  // tslint:disable-next-line:typedef
  alterCheck(event, announce: Todo) {
    announce.isChecked = !announce.isChecked;
    this.toDoService.checkOrUnCheckTitle(announce);
  }

  // tslint:disable-next-line:typedef
  onDelete(event, announce: Todo){
    this.toDoService.removeTitle(announce);
  }

}
