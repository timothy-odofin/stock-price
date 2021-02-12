import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  checkinterent: boolean;
status:string
  constructor(private service: AppService) { }

  ngOnInit() {
    this.service.therichpost$().subscribe(isOnline => this.checkinterent = isOnline);
    //checking internet connection
    if(this.checkinterent == true)
    {
      //show success alert if internet is working
     this.status="Online"
    }
    else{
     //show danger alert if net internet not working
     this.status="Offline"
  
  }
  }

}
