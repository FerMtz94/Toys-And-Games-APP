import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'toys-and-games-store-app';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['/catalog']);
  }
}
