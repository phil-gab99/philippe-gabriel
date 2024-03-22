import { Injectable } from '@angular/core';

@Injectable()
export class RedirectService {
  redirect(url: string) {
    window.open(url, '_blank', 'noopener')
  }
}
