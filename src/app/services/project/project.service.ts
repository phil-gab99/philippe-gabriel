import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable, filter, mergeAll, toArray } from 'rxjs';
import { Project } from '../../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private static readonly PROJECTS_PATH: string = 'assets/projects.json'

  constructor(private readonly http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(ProjectService.PROJECTS_PATH).pipe(
      mergeAll(),
      filter((p: Project) => p.featured),
      toArray()
    )
  }
}
