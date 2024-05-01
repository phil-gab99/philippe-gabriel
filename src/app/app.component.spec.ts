import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectsComponent } from './components/projects/projects.component';

describe('AppComponent', () => {
  let appComponent: AppComponent;
  let appFixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.overrideComponent(AppComponent, {
      set: {
        imports: [
          MockComponent(HomeComponent),
          MockComponent(NavbarComponent),
          MockComponent(ProjectsComponent),
        ],
      },
    });

    appFixture = TestBed.createComponent(AppComponent);
    appComponent = appFixture.componentInstance;
    appFixture.detectChanges();
  });

  it('should create the app', () => {
    expect(appComponent).toBeTruthy();
  });

  it('should render navbar', () => {
    const navbar = appFixture.debugElement.query(By.directive(NavbarComponent));
    expect(navbar).toBeTruthy();
  });

  it('should render home', () => {
    const home = appFixture.debugElement.query(By.directive(HomeComponent));
    expect(home).toBeTruthy();
  });

  it('should render projects', () => {
    const projects = appFixture.debugElement.query(
      By.directive(ProjectsComponent)
    );
    expect(projects).toBeTruthy();
  });
});
