import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {

  constructor(public firebaseservice: FirebaseService, private router: Router) { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  resetPassword(email: string) {
    if (!email) {
      alert('Type in your email first');
    }
    this.firebaseservice.resetPasswordInit(email)
    .then(
      () => {alert('A password reset link has been sent to your email address'); this.firebaseservice.logout(); },
      (rejectionReason) => alert(rejectionReason))
    .catch(e => alert('An error occurred while attempting to reset your password'));
  }

}
