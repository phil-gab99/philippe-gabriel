import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { of } from 'rxjs'
import { Bio } from '../../models/bio.model'
import { BioService } from '../../services/bio/bio.service'
import { HomeComponent } from './home.component'

describe('HomeComponent', () => {
  let homeComponent: HomeComponent
  let homeFixture: ComponentFixture<HomeComponent>
  const bioDataMock: Bio = {
    firstName: 'first',
    lastName: 'last',
    about: ['abt1', 'abt2'],
    profile: 'assets/img/profile',
    contact: [{ iconSet: 'set', icon: 'icon', link: 'https://link.com/' }]
  }
  const bioServiceMock: Pick<BioService, 'getBio'> = {
    getBio: jest.fn(() => of(bioDataMock))
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent
      ],
      providers: [
        { provide: BioService, useValue: bioServiceMock }
      ]
    }).compileComponents()

    homeFixture = TestBed.createComponent(HomeComponent)
    homeComponent = homeFixture.componentInstance
    homeFixture.detectChanges()
  })

  it('should create', () => {
    expect(homeComponent).toBeTruthy()
  })

  it('should call bio service', () => {
    expect(bioServiceMock.getBio).toHaveBeenCalled()
  })

  it('should display profile image', () => {
    const profile: DebugElement = homeFixture.debugElement.query(By.css('[data-testid="profile"]'))

    expect((profile.nativeElement as HTMLImageElement).src)
      .toBe(`http://localhost/${bioDataMock.profile}`)
  })

  it('should render name', () => {
    expect(
      (homeFixture.debugElement
        .query(By.css('[data-testid="name"]'))
        .nativeElement as HTMLSpanElement)
        .textContent?.trim())
      .toEqual(`${bioDataMock.firstName} ${bioDataMock.lastName}`)
  })

  it('should render about paragraphs', () => {
    const about: DebugElement[] = homeFixture.debugElement.queryAll(By.css('[data-testid="about"]'))

    expect(about.length).toBe(bioDataMock.about.length)
    expect(about.map((e: DebugElement) => (e.nativeElement as HTMLHeadingElement).textContent?.trim())).toEqual(bioDataMock.about)
  })

  it('should render contact links', () => {
    const contactLinks = homeFixture.debugElement.queryAll(By.css('[data-testid="contact-link"]'))
    const contactIcons =  homeFixture.debugElement.queryAll(By.css('[data-testid="contact-icon"]'))

    expect(contactLinks.length).toBe(bioDataMock.contact.length)
    expect(contactIcons.length).toBe(bioDataMock.contact.length)
    expect(contactLinks.map((e: DebugElement) => (e.nativeElement as HTMLAnchorElement).href)).toEqual(bioDataMock.contact.map(con => con.link))
    expect(contactIcons.map((e: DebugElement) => e.nativeElement.getAttribute('fonticon'))).toEqual(bioDataMock.contact.map(con => con.icon))
  })

  it('should navigate to contact urls', () => {
    // TODO
    expect(true).toBe(true)
  })
})
