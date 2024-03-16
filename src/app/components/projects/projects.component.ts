import { AsyncPipe } from '@angular/common'
import { Component } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { Observable } from 'rxjs'
import { Project } from '../../models/project.model'
import { ProjectService } from '../../services/project/project.service'
import { MatButtonModule } from '@angular/material/button'
import { RouterLink } from '@angular/router'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  project$: Observable<Project[]> = this.projectService.getProjects()

  constructor(private readonly projectService: ProjectService) {}
}
