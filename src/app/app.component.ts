import { Component } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ExperienceComponent } from './components/experience/experience.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ExperienceComponent,
    HomeComponent,
    NavbarComponent,
    ProjectsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly title = 'Philippe Gabriel';
}
