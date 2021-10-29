import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AnnouncementService } from '../../../services/announcement.service';
import { Announce } from '../../../models/announce';
import { AnnounceNotificationUser } from '../../../models/anouncNotify';
import {NgForm} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RichTextEditorComponent, ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-addannounc',
  templateUrl: './addannounc.component.html',
  styleUrls: ['./addannounc.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class AddannouncComponent implements OnInit {
  @ViewChild('apiRTE')
    public rteObj: RichTextEditorComponent;
    public tools: object = {
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

  files  = [];
  item: Announce = {
    title: '',
    description: '',
    date: ''
  };
  notify: AnnounceNotificationUser = {
    title: '',
    user: '',
    isRead: ''
  };
  manager = false;
  cars = ['abdallah.abdou@unico-egypt.com',
  'ahmed.farouk@unico-egypt.com',
  'a.tarek@unico-egypt.com',
  'ahmedeneaba@unico-egypt.com',
  'a.dewidar@unico-egypt.com',
  'ahmedzidan@unico-egypt.com',
  'a.hamdy@unico-egypt.com',
  'a.serry@unico-egypt.com',
  'a.shehata@unico-egypt.com',
  'Aly.abdelhamed@unico-egypt.com',
  'amal.hajaj@unico-egypt.com',
  'Amira.menshawy@unico-egypt.com',
  'amr@unico-egypt.com',
  'amr.said@unico-egypt.com',
  'amr.serry@unico-egypt.com',
  'b.bahaa@unico-egypt.com',
  'ffarouk@unico-egypt.com',
  'fhamed@unico-egypt.com',
  'hamada.diab@unico-egypt.com',
  'hany.ali@unico-egypt.com',
  'h.khedr@unico-egypt.com',
  'hatem@unico-egypt.com',
  'haytham.mahmoud@unico-egypt.com',
  'hazem.medhat@unico-egypt.com',
  'hesham.hanafy@unico-egypt.com',
  'hossam.gamal@unico-egypt.com',
  'hussein@unico-egypt.com',
  'karam.mohamed@unico-egypt.com',
  'kfarouk@unico-egypt.com',
  'khaled.maher@unico-egypt.com',
  'Fattouh@unico-egypt.com',
  'manal@unico-egypt.com',
  'mariamhosny@unico-egypt.com',
  'mennatallah@unico-egypt.com',
  'mohamedbauomy@unico-egypt.com',
  'm.abdelazim@unico-egypt.com',
  'm.helmy@unico-egypt.com',
  'm.aziz@unico-egypt.com',
  'mohamed.habeb@unico-egypt.com',
  'm.eliwa@unico-egypt.com',
  'mohamed.hanafy@unico-egypt.com',
  'mohsen.albahar@unico-egypt.com',
  'mostafa.farhy@unico-egypt.com',
  'mostafa.hady@unico-egypt.com',
  'nasserzidan@unico-egypt.com',
  'olfat@unico-egypt.com',
  'reda.hady@unico-egypt.com',
  'samar.magdy@unico-egypt.com',
  'sherif.hse@unico-egypt.com',
  'tarek.alkolaly@unico-egypt.com',
  'weldiin@unico-egypt.com',
  'youssef.hanafy@unico-egypt.com',
  'hzaki@unico-egypt.com',
  'acmoustafa26elshamy@gmail.com',
  'mahmoud.samir@unico-egypt.com'];

  /* Variabe to store file data */
  filedata: any;
  /* File onchange event */
  // tslint:disable-next-line:typedef
  fileEvent(e){
      this.filedata = e.target.files[0];
  }
  /* Upload button functioanlity */
  // tslint:disable-next-line:typedef
  onSubmitform(f: NgForm) {

    const myFormData = new FormData();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    myFormData.append('image', this.filedata);
    /* Image Post Request */
    this.http.post('http://localhost:8080/save.php', myFormData, {
    // tslint:disable-next-line:object-literal-shorthand
    headers: headers
    }).subscribe(data => {
     // Check success message
     console.log(data);
    });

}
/* file upload */
  constructor(private announceServices: AnnouncementService, private http: HttpClient) { }


  ngOnInit(): void {
    // tslint:disable-next-line:max-line-length
    if (localStorage.getItem('name') === 'Khaled Farouk' || localStorage.getItem('name') === 'Fatma Farouk' || localStorage.getItem('name') === 'Mohamed Bauomy' || localStorage.getItem('name') === 'Manal'){
      this.manager = true;
    }
  }
  // tslint:disable-next-line:typedef
  rich(){
    alert(this.rteObj.value);
  }
  // tslint:disable-next-line:typedef
  onSubmit(f: NgForm){
    this.item.description = (this.rteObj.value).toString();
    // tslint:disable-next-line:triple-equals
    if (this.item.title != '' && this.item.description != ''){
      const creatDate = new Date().toString();
      this.item.date = creatDate;
      this.announceServices.addAnnounce(this.item);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.cars.length; i++){
        this.notify.title = this.item.title;
        this.notify.user = this.cars[i];
        this.notify.isRead = 'false';
        this.announceServices.addNotifyAnnounceForUser(this.notify);
        this.notify.title = '';
        this.notify.user = '';
        this.notify.isRead = '';
      }
      this.item.title = '';
      this.item.description = '';
      this.rteObj.value = '';
    }
  }

}
