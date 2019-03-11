import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../service/session.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-admin-guests',
  templateUrl: './admin-guests.component.html',
  styleUrls: ['./admin-guests.component.css']
})
export class AdminGuestsComponent implements OnInit {
  guestMin = {
    invitation:{
      id:''
    },
    max:10,
    offset:0,
    filter:{
      name:"",
      value:""
    }
  }
  invitationModel = {
    id:'',
    name:''
  }
  object = JSON.parse(JSON.stringify(this.invitationModel));
  guestList = [];
  constructor(protected session: SessionService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id'] == 'new'){
        // no hacemos nada por el momento
      }else{
        this.object.id = params['id'];
        // cargamos los datos de la BD
        this.session.postRequest('invitation:get',this.object).subscribe((data:any)=>{
          this.object = JSON.parse(JSON.stringify(data.object));
          this.guestMin.invitation.id = this.object.id;
          this.findAllGuestsByInvitation();
        },
        (error)=>{
          console.log('Error:hotels:get',error)
        })
      }
    });
  }

  // funcion para obtener todos los invitados de una invitacion
  findAllGuestsByInvitation(){
    this.session.postRequest("guests:findAllByInvitation",this.guestMin).subscribe((data:any)=>{
      this.guestList = data.object.instanceList;
      console.log(this.guestList);
    },error=>{
      console.log("Error:guests:findAllByInvitation",error);
    })
  }

}
