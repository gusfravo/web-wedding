import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../service/session.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-admin-guest-update',
  templateUrl: './admin-guest-update.component.html',
  styleUrls: ['./admin-guest-update.component.css']
})
export class AdminGuestUpdateComponent implements OnInit {
  complexForm: FormGroup;

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
  object = JSON.parse(JSON.stringify(this.guestModel));
  metadata = {
    invitation:{
      id:''
    }
  }

  constructor(public fb: FormBuilder, public session: SessionService, public snackBar: MatSnackBar, private router: Router, private activatedRoute: ActivatedRoute) {
    this.complexForm = fb.group({
      // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
      'name': [null, Validators.required],
      'adults': [null, Validators.required],
      'children': [null, Validators.required],
    })
   }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.metadata.invitation.id = params['idInvitation'];
      if(params['id'] == 'new'){

      }else{
         this.object.id = params['id'];
         // cargamos los datos de la BD
         this.session.postRequest('guests:get',this.object).subscribe((data:any)=>{
           this.object = JSON.parse(JSON.stringify(data.object));
         },
         (error)=>{
           console.log('Error:guests:get',error)
         })

      }
    });
  }

  send(){
    console.log(this.object);
    //creamos la URL
    this.object.url = 'http://wedding.keysoft.mx/#/home/'+this.metadata.invitation.id+'/'+this.object.name.replace(/ /g, "_");
    this.object.confirmedDate = moment(this.object.confirmedDate).format('YYYY-MM-DD hh:mm:ss')
    this.object.openedDate = moment(this.object.openedDate).format('YYYY-MM-DD hh:mm:ss')
    this.object.numberInPary = parseFloat(this.object.adults) + parseFloat(this.object.children);
    this.object.invitation.id = this.metadata.invitation.id;
    this.session.postRequest("guests:update",this.object).subscribe((data:any)=>{
      this.router.navigate(['/admin/invitation/guests/'+this.metadata.invitation.id]);
    },error=>{
      console.log("Erro:guest:update",error);
    })
  }

}
