import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnInit {
  ngOnInit(): void {
    this.loading = false;
  }

  loading = true;
  ngAfterViewInit(): void {

  }
  title = 'adminpro';

}
