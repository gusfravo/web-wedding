import { Component, OnInit } from '@angular/core';
import { SessionService } from '../service/session.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  guestModel = {
    id:'',
    name:'',
    numberInPary:0,
    adults:0,
    children:0,
    confirmed:false,
    confirmedDate:moment(),
    invitationOpen:false,
    openedDate:moment(),
    guestOfBride:false,
    guestOfGroom:false,
    invitation:{
      id:''
    },
    url:''
  }
  metadata={
    viewInitial:true,
    viewInvitation:false,
    viewPase:false,
  }
  object = JSON.parse(JSON.stringify(this.guestModel));

    constructor(public session: SessionService, public snackBar: MatSnackBar, private router: Router, private activatedRoute: ActivatedRoute) {
     }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['invitationId'] != '' && params['name'] != ''){
        this.object.invitation.id = params['invitationId'];
        let name = params['name'];
        this.object.name = name.replace(/_/g, " ");
        this.session.postRequest("guests:findGuestByNameAndInvitation",this.object).subscribe((data:any)=>{
          this.object = data.object;
        },error=>{
          console.log("Error:guests/findGuestByNameAndInvitation",error);
        })
      }else{
        this.snackBar.open('Su url es incorrecta verificala.', 'Error', {duration: 5000});
      }
    });
  }

  viewPase(){
    this.metadata.viewInvitation =false;
    this.metadata.viewPase = true;
  }

  /*
    funcion para confirmar la invitación.
  */
  confirmed(){
    if(!this.object.confirmed){
      this.object.confirmedDate = moment().format('YYYY-MM-DD hh:mm:ss');
      this.object.confirmed = true;
      this.session.postRequest("guests:confirmed",this.object).subscribe((data:any)=>{
        this.object = data.object;
        // this.router.navigate(['/home/congratulations']);
      },error=>{
        console.log("Error:guests:confirmed",error);
      })
    }
  }
  /* fucnion para marcar como abierta una invitacion*/
  open(){
    if(!this.object.invitationOpen){
      this.object.openedDate = moment().format('YYYY-MM-DD hh:mm:ss');
      this.object.invitationOpen = true;
      this.session.postRequest("guests:opened",this.object).subscribe((data:any)=>{
        this.object.id = data.object.id;
        this.metadata.viewInitial = false;
        this.metadata.viewInvitation =true;
      },error=>{
        console.log("Error:guests:opened",error);
      })
    }else{
      this.metadata.viewInitial = false;
      this.metadata.viewInvitation =true;
    }
  }
}
