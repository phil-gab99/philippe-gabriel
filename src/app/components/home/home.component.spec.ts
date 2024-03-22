import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { of } from 'rxjs'
import { Bio } from '../../models/bio.model'
import { BioService } from '../../services/bio/bio.service'
import { HomeComponent } from './home.component'
import { RedirectService } from '../../services/redirect/redirect.service'

describe('HomeComponent', () => {
  const bioDataMock: Bio = {
    firstName: 'first',
    lastName: 'last',
    about: ['abt1', 'abt2'],
    profile: 'assets/img/profile',
    contact: [{ iconSet: 'set', icon: 'icon', link: 'http://example.com/' }]
  }
  const bioServiceMock: Pick<BioService, 'getBio'> = {
    getBio: jest.fn(() => of(bioDataMock))
  }
  const redirectServiceMock: Pick<RedirectService, 'redirect'> = {
    redirect: jest.fn()
  }
  window.open = jest.fn()

  let homeComponent: HomeComponent
  let homeFixture: ComponentFixture<HomeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent
      ],
      providers: [
        { provide: BioService, useValue: bioServiceMock },
        { provide: RedirectService, useValue: redirectServiceMock }
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
    const contactIcons: DebugElement[] = homeFixture.debugElement.queryAll(By.css('[data-testid="contact-icon"]'))

    expect(contactIcons.length).toBe(bioDataMock.contact.length)
    expect(contactIcons.map((e: DebugElement) => e.nativeElement.getAttribute('fonticon'))).toEqual(bioDataMock.contact.map(con => con.icon))
  })

  // TODO: FIX THIS
  it('should navigate to contact urls', () => {
    const contactLinks: DebugElement[] = homeFixture.debugElement.queryAll(By.css('[data-testid="contact-link"]'))

    contactLinks[0].triggerEventHandler('click', { button: 0 })
    expect(redirectServiceMock.redirect).toHaveBeenCalled()

    // contactLinks.forEach((item: DebugElement) => {
    //   item.triggerEventHandler('click', { button: 0 })
    //   expect(redirectServiceMock.redirect).toHaveBeenCalled()
    // })
  })
})

  // describe('Navigation', () => {
  //   let homeHarness: RouterTestingHarness
  //   let homeComponent: HomeComponent
  //   let homeLocation: Location

  //   beforeEach(waitForAsync(async () => {
  //     TestBed.configureTestingModule({
  //       providers: [
  //         provideRouter([
  //           { path: '', pathMatch: 'full', component: HomeComponent }
  //         ]),
  //         provideLocationMocks(),
  //         { provide: BioService, useValue: bioServiceMock }
  //       ]
  //     })

  //     homeHarness = await RouterTestingHarness.create()
  //     homeComponent = await homeHarness.navigateByUrl('', HomeComponent)
  //     homeLocation = TestBed.inject(Location)
  //   }))

  //   it('should navigate to contact urls', () => {
  //     // TODO
  //     expect(true).toBe(true)
  //   })
  // })
