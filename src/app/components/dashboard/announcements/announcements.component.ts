import { Component, OnInit, ViewChild } from '@angular/core';
import { AnnouncementService } from '../../../services/announcement.service';
import { Announce } from '../../../models/announce';
declare var $;
import { RichTextEditorComponent, ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class AnnouncementsComponent implements OnInit {
  @ViewChild('apiRTE1')
    public rteObj: RichTextEditorComponent;
    public tools1: object = {
      items: ['Undo', 'Redo', '|',
          'Bold', '|',
          'SubScript', 'SuperScript', '|',
          'LowerCase', 'UpperCase', '|',
          'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
          'Indent', 'Outdent', '|', 'CreateLink',
          'Image']
  };
  public quickTools: object = {
      image: [
          'Replace', 'Align', 'Caption', 'Remove', 'InsertLink', '-', 'Display', 'AltText', 'Dimension']
  };
  public iframe: object = { enable: true };
  // tslint:disable-next-line:no-inferrable-types
  public height: number = 300;


  announces: Announce[];
  newCalendarNotify: Announce[] = [];
  compiledesc;

  // tslint:disable-next-line:no-inferrable-types
  editState: boolean = false;
  itemToEdit: Announce;


  constructor(private announcServices: AnnouncementService) { }

  ngOnInit(): void {
    this.announcServices.getAnnounce().subscribe(announce => {
      this.announces = announce;
    });
    //
  }
  // tslint:disable-next-line:typedef
  deleteAnnounce(event, announce: Announce){
    this.clearState();
    this.announcServices.deleteItem(announce);
  }

  // tslint:disable-next-line:typedef
  editItem(event, announce: Announce){
    this.editState = true;
    this.itemToEdit = announce;
  }

  // tslint:disable-next-line:typedef
  updateItem(announce: Announce){
    announce.description = (this.rteObj.value).toString();
    // tslint:disable-next-line:triple-equals
    if (announce.title != '' && announce.description != ''){
      this.announcServices.updateItem(announce);
      this.clearState();
    }
    else{
      alert('The title or description is empty!');
    }
  }

  // tslint:disable-next-line:typedef
  clearState(){
    this.editState = false;
    this.itemToEdit = null;
  }

}
