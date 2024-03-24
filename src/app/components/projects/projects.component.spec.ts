import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { of } from 'rxjs'
import { Project } from '../../models/project.model'
import { ProjectService } from '../../services/project/project.service'
import { RedirectService } from '../../services/redirect/redirect.service'
import { ProjectsComponent } from './projects.component'

describe(ProjectsComponent.name, () => {
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
  const redirectServiceMock: Pick<RedirectService, 'redirect'> = {
    redirect: jest.fn()
  }

  let projectsComponent: ProjectsComponent
  let projectsFixture: ComponentFixture<ProjectsComponent>

  beforeEach(() => {
    TestBed.overrideComponent(ProjectsComponent, {
      add: {
        providers: [
          { provide: ProjectService, useValue: projectServiceMock },
          { provide: RedirectService, useValue: redirectServiceMock }
        ]
      }
    })

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

  it('should navigate to contact urls', () => {
    window.open = jest.fn()

    const sourceUrls: DebugElement[] = projectsFixture.debugElement.queryAll(By.css('[data-testid="source-url"]'))

    sourceUrls.forEach((item: DebugElement) => {
      item.triggerEventHandler('click', { button: 0 })
      expect(redirectServiceMock.redirect).toHaveBeenCalled()
    })
  })
})
