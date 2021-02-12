import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
public display:boolean=false;
timeInfo: any[];
checkinterent: boolean;
status:string
  constructor(private service: AppService) { }
  

  ngOnInit() {
    this.timeInfo = [
      {status: 'Api  study', date: '0:40', color: '#9C27B0'},
      {status: 'System Study', date: '0:35',  color: '#673AB7'},
      {status: 'Set up environment', date: '0:20',  color: '#FF9800'},
      {status: 'User Interface', date: '1:30',  color: '#607D8B'},
      {status: 'Business logic', date: '2:45',  color: '#607D8B'},
      {status: 'Testing and debuging', date: '2:00',  color: '#607D8B'},
      {status: 'Total Time', date: '7:45',  color: '#607D8B'}
  ];
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
