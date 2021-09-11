import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-callapi',
  templateUrl: './callapi.component.html',
  styleUrls: ['./callapi.component.css']
})
export class CallapiComponent implements OnInit {

  response: any;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.httpClient.get('http://localhost:8081/private/hello',
      {responseType: 'text'})
      .subscribe(response => {
        console.log(response);
        this.response = response;
      });
  }
}
