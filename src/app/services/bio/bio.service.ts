import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Bio } from '../../models/bio.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BioService {
  private static readonly BIO_PATH: string = 'assets/json/bio.json'

  constructor(private readonly http: HttpClient) {}

  getBio(): Observable<Bio> {
    return this.http.get<Bio>(BioService.BIO_PATH)
  }
}
