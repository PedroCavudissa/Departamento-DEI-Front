import { Component } from '@angular/core';
import { BarralateralComponent } from '../../barralateral/barralateral.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ BarralateralComponent,LoginComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {}
