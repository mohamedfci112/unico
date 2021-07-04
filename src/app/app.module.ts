import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { WatertreatmentComponent } from './components/environmental/watertreatment/watertreatment.component';
import { LoginComponent } from './components/login/login.component';
import { InceneratorComponent } from './components/environmental/incenerator/incenerator.component';
import { BioremediationComponent } from './components/environmental/bioremediation/bioremediation.component';
import { EnvironmentalstudiesComponent } from './components/environmental/environmentalstudies/environmentalstudies.component';
import { NormComponent } from './components/norm/norm.component';
import { SupplyComponent } from './components/lifting/supply/supply.component';
import { AboutinspectionComponent } from './components/lifting/aboutinspection/aboutinspection.component';
import { InspectionlistComponent } from './components/lifting/inspectionlist/inspectionlist.component';
import { TrainingComponent } from './components/lifting/training/training.component';
import { DownholeComponent } from './components/drilling/downhole/downhole.component';
import { CompletionComponent } from './components/drilling/completion/completion.component';
import { SolidComponent } from './components/drilling/solid/solid.component';
import { StimulationComponent } from './components/drilling/stimulation/stimulation.component';
import { ProductionComponent } from './components/production/production.component';
import { CertificateComponent } from './components/ghse/certificate/certificate.component';
import { QhsepolicyComponent } from './components/ghse/qhsepolicy/qhsepolicy.component';
import { Covid19policyComponent } from './components/ghse/covid19policy/covid19policy.component';
import { NewsComponent } from './components/news/news.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { FirebaseService } from './services/firebase.service';
import { AuthGuardService } from './services/auth-guard.service';
import { HeaderComponent } from './components/dashboard/header/header.component';
import { SidebarComponent } from './components/dashboard/sidebar/sidebar.component';
import { DashboardhomeComponent } from './components/dashboard/dashboardhome/dashboardhome.component';
import { FormsComponent } from './components/dashboard/forms/forms.component';
import { AnnouncementsComponent } from './components/dashboard/announcements/announcements.component';
import { ManualComponent } from './components/dashboard/manual/manual.component';
import { RegulationComponent } from './components/dashboard/regulation/regulation.component';
import { EventsComponent } from './components/dashboard/events/events.component';
import { AddannouncComponent } from './components/dashboard/addannounc/addannounc.component';
import { AnnouncementService } from './services/announcement.service';
import { ManagerReportComponent } from './components/dashboard/manager-report/manager-report.component';
import { ChartComponent } from './components/dashboard/chart/chart.component';
import { ChangepassComponent } from './components/changepass/changepass.component';
import { ResetpassComponent } from './components/resetpass/resetpass.component';
import { UnicoprofileComponent } from './components/dashboard/unicoprofile/unicoprofile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'wastewatertreatment', component : WatertreatmentComponent },
  { path: 'login', component : LoginComponent },
  { path: 'incenerator', component : InceneratorComponent },
  { path: 'bioRemediation', component : BioremediationComponent },
  { path: 'environmentalstudies', component : EnvironmentalstudiesComponent },
  { path: 'norm', component : NormComponent },
  { path: 'lifting/supply', component : SupplyComponent },
  { path: 'lifting/about_inspection', component : AboutinspectionComponent },
  { path: 'lifting/inspection_list', component : InspectionlistComponent },
  { path: 'lifting/lifting_training', component : TrainingComponent },
  { path: 'drilling/downhole', component : DownholeComponent },
  { path: 'drilling/completion', component : CompletionComponent },
  { path: 'drilling/solid_control', component : SolidComponent },
  { path: 'drilling/well_stimulation', component : StimulationComponent },
  { path: 'production', component : ProductionComponent },
  { path: 'qhse/cerifications', component : CertificateComponent },
  { path: 'qhse/qhse-policy', component : QhsepolicyComponent },
  { path: 'qhse/covid19-policy', component : Covid19policyComponent },
  { path: 'news', component : NewsComponent },
  { path: 'contact', component : ContactComponent },
  { path: 'about', component : AboutComponent },
  { path: 'dashboard', component : DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'dashboardhome', component : DashboardhomeComponent, canActivate: [AuthGuardService] },
  { path: 'manual', component : ManualComponent, canActivate: [AuthGuardService] },
  { path: 'announcement', component : AnnouncementsComponent, canActivate: [AuthGuardService] },
  { path: 'forms', component : FormsComponent, canActivate: [AuthGuardService] },
  { path: 'requlations', component : RegulationComponent, canActivate: [AuthGuardService] },
  { path: 'events', component : EventsComponent, canActivate: [AuthGuardService] },
  { path: 'addannounce', component : AddannouncComponent, canActivate: [AuthGuardService] },
  { path: 'hrReport', component : HeaderComponent, canActivate: [AuthGuardService] },
  { path: 'managerReport', component : ManagerReportComponent, canActivate: [AuthGuardService] },
  { path: 'organizationChart', component : ChartComponent, canActivate: [AuthGuardService] },
  { path: 'changepass', component : ChangepassComponent },
  { path: 'unicoprofile', component : UnicoprofileComponent, canActivate: [AuthGuardService] },

];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    WatertreatmentComponent,
    LoginComponent,
    InceneratorComponent,
    BioremediationComponent,
    EnvironmentalstudiesComponent,
    NormComponent,
    SupplyComponent,
    AboutinspectionComponent,
    InspectionlistComponent,
    TrainingComponent,
    DownholeComponent,
    CompletionComponent,
    SolidComponent,
    StimulationComponent,
    ProductionComponent,
    CertificateComponent,
    QhsepolicyComponent,
    Covid19policyComponent,
    NewsComponent,
    AboutComponent,
    ContactComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardhomeComponent,
    FormsComponent,
    AnnouncementsComponent,
    ManualComponent,
    RegulationComponent,
    EventsComponent,
    AddannouncComponent,
    ManagerReportComponent,
    ChartComponent,
    ChangepassComponent,
    ResetpassComponent,
    UnicoprofileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule,
    IvyCarouselModule,
    // PdfViewerModule,
    FormsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyCphx7ds-VDViVmQTZSQYwsK9vmYAbU8JA',
      authDomain: 'uniconew-e048a.firebaseapp.com',
      projectId: 'uniconew-e048a',
      storageBucket: 'uniconew-e048a.appspot.com',
      messagingSenderId: '160445847490',
      appId: '1:160445847490:web:3a5bf4437a028c712f285b',
      measurementId: 'G-DP4LXGQRRX'
    })
  ],
  providers: [FirebaseService, AnnouncementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
