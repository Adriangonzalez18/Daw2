import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { iusuario } from '../interfaces/iusuario';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class usuarioService {
 

  httpClient = inject(HttpClient);
  private baseUrl :string = 'https://peticiones.online/api/users';

  constructor() {  }


  getAllWithPromises() : Promise<any> {
    return lastValueFrom(this.httpClient.get<iusuario[]>(this.baseUrl));
  }

  getById(id: string): Promise<iusuario> {
    return lastValueFrom(this.httpClient.get<iusuario>(`${this.baseUrl}/${id}`));
  }

  insert(usuario: iusuario): Promise<iusuario>{
    return lastValueFrom(this.httpClient.post<iusuario>(this.baseUrl, usuario));
  }

  update(usuario: iusuario): Promise<iusuario>{
    return lastValueFrom(this.httpClient.put<iusuario>(`${this.baseUrl}/${usuario._id}`, usuario));
  }

  delete(idusuario: string) : Promise<iusuario>{
    return lastValueFrom(this.httpClient.delete<iusuario>(`${this.baseUrl}/${idusuario}`));
  }


}
