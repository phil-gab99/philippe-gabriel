import { AsyncPipe } from '@angular/common'
import { Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { Observable } from 'rxjs'
import { Bio } from '../../models/bio.model'
import { BioService } from '../../services/bio/bio.service'
import { RedirectService } from '../../services/redirect/redirect.service'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    RedirectService
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  readonly bio$: Observable<Bio> = this.bioService.getBio()

  constructor(private readonly bioService: BioService, public readonly redirectService: RedirectService) {}
}
