import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
  redirect(url: string) {
    window.open(url, '_blank', 'noopener')
  }
}
