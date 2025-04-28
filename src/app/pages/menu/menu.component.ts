import { Component } from '@angular/core';
import { BarralateralComponent } from "../../barralateral/barralateral.component";
import { Router } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ BarralateralComponent,HeaderComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']  
})
export class MenuComponent {
  constructor(private router: Router) {}
 entrar()  {
    // Chamada da tela da
    alert("Mudança de Tela")
    this.router.navigate(['/matricula']); // redireciona para a tela...
  }
 

 }
