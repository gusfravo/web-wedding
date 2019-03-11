import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SessionService } from '../service/session.service';
import { Router } from '@angular/router';
 import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  object = {
    username:'',
    password:'',
    remember_me:false
  }

  isLoggin = true;
  complexForm: FormGroup;

  constructor(public fb: FormBuilder, private session: SessionService, private router: Router, public snackBar: MatSnackBar,) {
    this.complexForm = fb.group({
      // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
      'username': [null, Validators.required],
      'password': [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
  }
  // metod para realizar Login
  login(object) {
    // Mandamos a invocar el servicio de login
    this.session.login(object).then((data:any)=> {
      if (data.transaction === 'ok') {
        console.log("login:",data);
        this.router.navigate(['admin']);
      } else {
        this.snackBar.open('Usuario ó Contraseña incorrectos', 'Error', {duration: 5000});
      }
    }).catch((error)=>{
      this.snackBar.open('Usuario ó Contraseña incorrectos', 'Error', {duration: 5000});
      console.log('Error: ', error);
    });
  }
}
