import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../../../services/notes.service';
import { Notes } from '../../../../models/notes';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Notes[];
  item: Notes = {
    text: '',
    user: ''
  };

  constructor(private notesServices: NotesService) { }

  ngOnInit(): void {
    this.notesServices.getNotes().subscribe(note => {
      this.notes = note;
      console.log(this.notes);
      });
    this.item.user = localStorage.getItem('email');

  }
  // tslint:disable-next-line:typedef
  onSubmit(){
    // tslint:disable-next-line:triple-equals
    if (this.item.text != ''){
      this.item.user = localStorage.getItem('email');
      console.log(this.item.user);
      this.notesServices.addNote(this.item);
      this.item.text = '';
    }
  }
  // tslint:disable-next-line:typedef
  deleteNotes(event, dnote: Notes){
    this.notesServices.deleteItem(dnote);
  }
}
