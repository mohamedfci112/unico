import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../../../services/notes.service';
import { Notes } from '../../../../models/notes';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Notes[];
  item: Notes = {
    title: '',
    text: '',
    user: '',
    date: ''
  };
  item1: Notes = {
    id: '',
    title: '',
    text: ''
  };
  form1: FormGroup;

  constructor(private notesServices: NotesService, private fb: FormBuilder) {
    this.form1 = this.fb.group({
      id: [''],
      title: [''],
      text: ['']
    });
  }

  ngOnInit(): void {
    this.notesServices.getNotes().subscribe(note => {
      this.notes = note;
      });
    this.item.user = localStorage.getItem('email');

  }
  // tslint:disable-next-line:typedef
  openNotes(event, note: Notes){
    this.form1.setValue({
      id: note.id,
      title: note.title,
      text: note.text
    });
  }
  // tslint:disable-next-line:typedef
  update(id: string, ntitle: string, ntext: string){
    if (ntitle !== '' || ntext !== '') {
      this.item1.id = id;
      this.item1.title = ntitle;
      this.item1.text = ntext;
      this.notesServices.updateNote(this.item1);
      document.querySelector<HTMLElement>('.modal').style.display = 'none';
    }
    else{
      alert('Event name is empty!!');
    }
  }
  // tslint:disable-next-line:typedef
  onSubmit(){
    // tslint:disable-next-line:triple-equals
    if (this.item.text != '' && this.item.title != ''){
      this.item.user = localStorage.getItem('email');
      this.item.date = (new Date()).toString();
      document.querySelector<HTMLElement>('.modal').style.display = 'none';
      this.notesServices.addNote(this.item);

      this.item.title = '';
      this.item.text = '';
    }
  }
  // tslint:disable-next-line:typedef
  deleteNotes(event, dnote: Notes){
    this.notesServices.deleteItem(dnote);
  }
}
