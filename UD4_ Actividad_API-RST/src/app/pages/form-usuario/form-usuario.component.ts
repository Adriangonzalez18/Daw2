import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { iusuario } from '../../interfaces/iusuario';
import { usuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-form-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './form-usuario.component.html',
  styleUrl: './form-usuario.component.css'
})
export class FormusuarioComponent {

  usuarioForm: FormGroup;
  tipo: string = "Añadir";

  activatedRoute = inject(ActivatedRoute);
  usuarioService = inject(usuarioService);
  router = inject(Router);


  constructor(){
    this.usuarioForm = new FormGroup({
      first_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      last_name: new FormControl('', [Validators.required,Validators.minLength(3)]),
      username: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z0-9._-]+[.][a-zA-Z0-9]*$")]),
      email: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")]),
      image: new FormControl('',[Validators.required]),
      pasword: new FormControl('',[Validators.required,Validators.minLength(6)])
    }, []);
  }
  
  ngOnInit(): void{
    this.activatedRoute.params.subscribe(async (params: any) =>{
      if(params.idusuario){
        //pedir usuario por id
        this.tipo = "Actualizar";
        const response = await this.usuarioService.getById(params.idusuario);

        this.usuarioForm = new FormGroup({
          _id: new FormControl(response._id,[]),
          first_name: new FormControl(response.first_name, [Validators.required, Validators.minLength(3)]),
          last_name: new FormControl(response.last_name, [Validators.required,Validators.minLength(3)]),
          username: new FormControl(response.username, [Validators.required,Validators.pattern("^[a-zA-Z0-9._-]+[.][a-zA-Z0-9]*$")]),
          email: new FormControl(response.email, [Validators.required,Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")]),
          image: new FormControl(response.image, [Validators.required]),
          pasword: new FormControl(response.pasword, [Validators.required,Validators.minLength(6)])
        }, []);
      }
    });
  }

  async getDataForm() {
    
    let usuario: iusuario = this.usuarioForm.value;

    if(usuario.first_name != ''){
          
      if(usuario.id){
        //Actualizar
        const response = await this.usuarioService.update(usuario);

        if (response.id) {
          alert(`La usuario ${response.first_name} se ha actualizado correctamente`);
        this.router.navigate(['/usuario']);
        } else {
          alert(`Ha ocurrido un problema en la actualizacion`);
        }
      }
      else{
        //Insertar
        const response = await this.usuarioService.insert(usuario);
        if(response.id){
          alert(`La usuario ${response.first_name} se ha añadido correctamente`);
          this.router.navigate(['/usuario']);
        }
        else {
          alert(`Ha ocurrido un problema en la insercion`);
        }
      }
    }else{
      alert(`Debe de rellenar todos los campos`);
    }
  }

}
