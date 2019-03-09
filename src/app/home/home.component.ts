import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  metadata={
    viewInitial:true,
    viewInvitation:false,
    viewPase:false,
  }

  constructor() { }

  ngOnInit() {
  }
  open(){
    this.metadata.viewInitial = false;
    this.metadata.viewInvitation =true;
  }
  viewPase(){
    this.metadata.viewInvitation =false;
    this.metadata.viewPase = true;
  }

}
