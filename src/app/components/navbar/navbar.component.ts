import { AsyncPipe } from '@angular/common'
import { Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterLink } from '@angular/router'
import { Observable } from 'rxjs'
import { Bio } from '../../models/bio.model'
import { NavItem } from '../../models/navItem.model'
import { BioService } from '../../services/bio/bio.service'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  readonly bio$: Observable<Bio> = this.bioService.getBio()

  readonly navItems: NavItem[] = [
    { title: 'My Projects', path: '/', fragment: 'projects' },
    { title: 'My Experience', path: '/', fragment: 'experience' }
  ]

  constructor(private readonly bioService: BioService) {}
}
