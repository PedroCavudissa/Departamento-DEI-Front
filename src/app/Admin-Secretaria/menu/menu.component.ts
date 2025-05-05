import { Component } from '@angular/core';
import { BarralateralComponent } from '../../barralateral/barralateral.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ BarralateralComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {}
