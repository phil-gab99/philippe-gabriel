import { AsyncPipe } from '@angular/common'
import { Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { Observable } from 'rxjs'
import { Project } from '../../models/project.model'
import { ProjectService } from '../../services/project/project.service'

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  project$: Observable<Project[]> = this.projectService.getProjects()

  constructor(private readonly projectService: ProjectService) {}
}
