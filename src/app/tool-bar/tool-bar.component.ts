import { Component, OnInit } from '@angular/core';
import { SessionService } from '../service/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  constructor(public session: SessionService, private router: Router) { }

  ngOnInit() {
  }
  logout(){
    this.session.logout().then((data:any)=>{
      console.log(data);
      this.router.navigate(['/login']);
    });
  }
}
