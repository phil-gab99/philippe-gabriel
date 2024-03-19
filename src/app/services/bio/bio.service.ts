import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Bio } from '../../models/bio.model'

@Injectable({
  providedIn: 'root'
})
export class BioService {
  static readonly BIO_PATH: string = 'assets/json/bio.json'

  constructor(private readonly http: HttpClient) {}

  getBio(): Observable<Bio> {
    return this.http.get<Bio>(BioService.BIO_PATH)
  }
}
