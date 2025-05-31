import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BarralateralComponent } from "../../../barralateral/barralateral.component";

@Component({
  selector: 'app-gerir-prfil',
  standalone: true,
  imports: [FormsModule, BarralateralComponent],
  templateUrl: './GerirPerfil.component.html',
  styleUrls: ['./GerirPerfil.component.css']
})
export class GestaoAcessosComponent {
redefinirSenha: any;
sidebarVisible: any;

}
