import { Component, inject, Input } from '@angular/core';
import { usuarioService } from '../../services/usuario.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-botonera-usuario',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './botonera-usuario.component.html',
  styleUrl: './botonera-usuario.component.css'
})
export class BotonerausuarioComponent {

  @Input() miId: string = "";
  @Input() parent: string = "";

  usuarioService = inject(usuarioService);
  router = inject(Router);

  async borrarusuario(id: string) :Promise<void> {
    let confirmacion = confirm('Esta usted seguro que quiere borrar la usuario: '+this.miId);
    if(confirmacion){
      let response = await this.usuarioService.delete(id);
      if(response.id){
        alert("Se ha borrado correctamente la usuario "+response.id);
        if(this.parent == 'view'){
          this.router.navigate(['/usuario']);
        }
      }
    }
  }
}
