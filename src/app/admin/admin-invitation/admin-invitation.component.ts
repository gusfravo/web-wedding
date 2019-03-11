import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../service/session.service';

@Component({
  selector: 'app-admin-invitation',
  templateUrl: './admin-invitation.component.html',
  styleUrls: ['./admin-invitation.component.css']
})
export class AdminInvitationComponent implements OnInit {
  invitationMin = {
    max:10,
    offset:0,
    filter:{
      name:"",
      value:""
    }
  }
  invitations = [];

  constructor( private session: SessionService) { }

  ngOnInit() {
    this.findAllInvitations();
  }

  // funcion para obtener las invitaciones
  findAllInvitations(){
    this.session.postRequest("invitation:list",this.invitationMin).subscribe((data:any)=>{
      this.invitations = data.object.instanceList;
      // console.log(this.invitations);
    },error=>{
      console.log("Error:invitation:list",error);
    })
  }


}
