import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { of } from 'rxjs'
import { Project } from '../../models/project.model'
import { ProjectService } from '../../services/project/project.service'
import { ProjectsComponent } from './projects.component'
import { Location } from '@angular/common'
import { RouterTestingHarness } from '@angular/router/testing'
import { Router, provideRouter } from '@angular/router'
import { provideLocationMocks } from '@angular/common/testing'

describe('ProjectsComponent', () => {
  const projectsDataMock: Project[] = [
    {
      "name": "p1",
      "description": "d1",
      "sourceUrl": "https://s1/",
      "dateStart": "ds1",
      "dateEnd": "de1",
      "stack": { "name": "sn1", "iconSet": "sis1", "icon": "si1" },
      "featured": true
    },
    {
      "name": "p2",
      "description": "d2",
      "sourceUrl": "https://s2/",
      "dateStart": "ds2",
      "dateEnd": "de2",
      "stack": { "name": "sn2", "iconSet": "sis2", "icon": "si2" },
      "featured": true
    }
  ]
  const projectServiceMock: Pick<ProjectService, 'getProjects'> = {
    getProjects: jest.fn(() => of(projectsDataMock))
  }

  describe('Rendering', () => {
    let projectsComponent: ProjectsComponent
    let projectsFixture: ComponentFixture<ProjectsComponent>

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          ProjectsComponent
        ],
        providers: [
          { provide: ProjectService, useValue: projectServiceMock }
        ]
      }).compileComponents()

      projectsFixture = TestBed.createComponent(ProjectsComponent)
      projectsComponent = projectsFixture.componentInstance
      projectsFixture.detectChanges()
    })

    it('should create', () => {
      expect(projectsComponent).toBeTruthy()
    })

    it('should call project service', () => {
      expect(projectServiceMock.getProjects).toHaveBeenCalled()
    })

    it('should render correct number of projects', () => {
      const projectCards: DebugElement[] = projectsFixture.debugElement.queryAll(By.css('[data-testid="project-cards"]'))

      expect(projectCards.length).toBe(projectsDataMock.length)
    })

    it('should render projects card header', () => {
      const stackIcons: DebugElement[] = projectsFixture.debugElement.queryAll(By.css('[data-testid="stack-icon"]'))
      const names: DebugElement[] = projectsFixture.debugElement.queryAll(By.css('[data-testid="name"]'))
      const stackNames: DebugElement[] = projectsFixture.debugElement.queryAll(By.css('[data-testid="stack-name"]'))
      const dates: DebugElement[] = projectsFixture.debugElement.queryAll(By.css('[data-testid="date"]'))

      expect(stackIcons.map(
        (e: DebugElement) => e.nativeElement.getAttribute('fonticon')))
        .toEqual(projectsDataMock.map(
          (p: Project) => p.stack.icon))
      expect(names.map(
        (e: DebugElement) => e.nativeElement.textContent.trim()))
        .toEqual(projectsDataMock.map(
          (p: Project) => p.name))
      expect(stackNames.map(
        (e: DebugElement) => e.nativeElement.textContent.trim()))
        .toEqual(projectsDataMock.map(
          (p: Project) => p.stack.name))
      expect(dates.map(
        (e: DebugElement) => (e.nativeElement as HTMLSpanElement).textContent?.trim()))
        .toEqual(projectsDataMock.map(
          (p: Project) => `${p.dateStart} - ${p.dateEnd}`))
    })

    it('should render projects card content', () => {
      const descriptions: DebugElement[] = projectsFixture.debugElement.queryAll(By.css('[data-testid="description"]'))

      expect(descriptions.map(
        (e: DebugElement) => e.nativeElement.textContent.trim()))
        .toEqual(projectsDataMock.map(
          (p: Project) => p.description))
    })

    it('should render projects card action link', () => {
      const sourceUrls: DebugElement[] = projectsFixture.debugElement.queryAll(By.css('[data-testid="source-url"]'))

      expect(sourceUrls.map(
        (e: DebugElement) => (e.nativeElement as HTMLAnchorElement).href))
        .toEqual(projectsDataMock.map(
          (p: Project) => p.sourceUrl))
    })

  })

  describe('Navigation', () => {
    let projectsHarness: RouterTestingHarness
    let projectsLocation: Location

    beforeEach(waitForAsync(async () => {
      TestBed.configureTestingModule({
        providers: [
          provideRouter([
            { path: '', pathMatch: 'full', component: ProjectsComponent }
          ]),
          provideLocationMocks(),
          { provide: ProjectService, useValue: projectServiceMock }
        ]
      })

      projectsHarness = await RouterTestingHarness.create('')
      projectsLocation = TestBed.inject(Location)
    }))

    it('should navigate to projects source urls', fakeAsync(() => {
      const sourceUrls: DebugElement[] = projectsHarness.routeDebugElement!.queryAll(By.css('[data-testid="source-url"]'))

      sourceUrls.forEach((item: DebugElement, i: number) => {
        item.triggerEventHandler('click', { button: 0 })

        tick()

        expect(projectsLocation.path()).toBe(projectsDataMock[i].sourceUrl)
      })
    }))
  })
})
