import { Component, inject } from '@angular/core';
import { usuarioService } from '../../services/usuario.service';
import { iusuario } from '../../interfaces/iusuario';
import { usuarioCardComponent } from "../../components/usuario-card/usuario-card.component";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [usuarioCardComponent, RouterLink],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class usuarioComponent {

  usuarioService = inject(usuarioService);
  arrusuario : iusuario[];

  constructor(){
    this.arrusuario = [];
  }
  async ngOnInit() : Promise<void> {
    try{
      const response = await this.usuarioService.getAllWithPromises();
      this.arrusuario = response.results;
      console.log(this.arrusuario);
    }catch(err) {
    console.log('Error al conectar a la API: '+err);
    }
  }

 
}
