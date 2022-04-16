import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
  oglasi: string =`Oglasi`;

  ngOnInit(): void {
    for(let i=0; i<100; i++){
      this.oglasi += `
      Oglasi`;
    }
  }
}
