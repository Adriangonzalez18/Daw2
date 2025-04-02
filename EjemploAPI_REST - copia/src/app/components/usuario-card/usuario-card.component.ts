import { Component, Input } from '@angular/core';
import { iusuario } from '../../interfaces/iusuario';
import { RouterLink } from '@angular/router';
import { BotonerausuarioComponent } from '../botonera-usuario/botonera-usuario.component';


@Component({
  selector: 'app-usuario-card',
  standalone: true,
  imports: [RouterLink, BotonerausuarioComponent],
  templateUrl: './usuario-card.component.html',
  styleUrl: './usuario-card.component.css'
})
export class usuarioCardComponent {
  @Input() miusuario!: iusuario;

}
