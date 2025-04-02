import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { usuarioService } from '../../services/usuario.service';
import { iusuario } from '../../interfaces/iusuario';
import { BotonerausuarioComponent } from "../../components/botonera-usuario/botonera-usuario.component";

@Component({
  selector: 'app-usuario-view',
  standalone: true,
  imports: [RouterLink, BotonerausuarioComponent],
  templateUrl: './usuario-view.component.html',
  styleUrl: './usuario-view.component.css'
})
export class usuarioViewComponent {

  activatedRoute = inject(ActivatedRoute);
  usuarioService = inject(usuarioService);

  miusuario!: iusuario;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( async (params: any) => {
      let id : string = params.idusuario as string;

      try{
          this.miusuario = await this.usuarioService.getById(id);
      }catch(err){
        console.log("Error al llamar a la API: "+err);
      }
    });
  }

}
