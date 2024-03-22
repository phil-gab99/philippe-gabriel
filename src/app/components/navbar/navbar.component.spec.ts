import { Location } from '@angular/common'
import { provideLocationMocks } from '@angular/common/testing'
import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { provideRouter, withInMemoryScrolling } from '@angular/router'
import { RouterTestingHarness } from '@angular/router/testing'
import { of } from 'rxjs'
import { Bio } from '../../models/bio.model'
import { NavItem } from '../../models/navItem.model'
import { BioService } from '../../services/bio/bio.service'
import { NavbarComponent } from './navbar.component'

describe('NavbarComponent', () => {
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

  describe('Rendering', () => {
    let navbarComponent: NavbarComponent
    let navbarFixture: ComponentFixture<NavbarComponent>

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          NavbarComponent
        ],
        providers: [
          provideRouter([]),
          { provide: BioService, useValue: bioServiceMock }
        ]
      }).compileComponents()

      navbarFixture = TestBed.createComponent(NavbarComponent)
      navbarComponent = navbarFixture.componentInstance
      navbarFixture.detectChanges()
    })

    it('should create', () => {
      expect(navbarComponent).toBeTruthy()
    })

    it('should call bio service', () => {
      expect(bioServiceMock.getBio).toHaveBeenCalled()
    })

    it('should render name', () => {
      const firstName: DebugElement = navbarFixture.debugElement.query(By.css('[data-testid="first-name"]'))
      const lastName: DebugElement = navbarFixture.debugElement.query(By.css('[data-testid="last-name"]'))

      expect((firstName.nativeElement as HTMLSpanElement).textContent?.trim())
        .toBe(bioDataMock.firstName)
      expect((lastName.nativeElement as HTMLSpanElement).textContent?.trim())
        .toBe(bioDataMock.lastName)
    })

    it('should render navigation items', () => {
      const navItems: DebugElement[] = navbarFixture.debugElement.queryAll(By.css('[data-testid="nav-items"]'))

      expect(navItems.length).toBe(navbarComponent.navItems.length)
      expect(navItems.map(
        (e: DebugElement) => (e.nativeElement as HTMLButtonElement).textContent?.trim()))
        .toEqual(navbarComponent.navItems.map(
          (n: NavItem) => n.title))
    })
  })

  describe('Navigation', () => {
    let navbarHarness: RouterTestingHarness
    let navbarComponent: NavbarComponent
    let navbarLocation: Location

    beforeEach(waitForAsync(async () => {
      TestBed.configureTestingModule({
        providers: [
          provideRouter([
            { path: '', pathMatch: 'full', component: NavbarComponent }
          ], withInMemoryScrolling({ anchorScrolling: 'enabled' })),
          provideLocationMocks(),
          { provide: BioService, useValue: bioServiceMock }
        ]
      })

      navbarHarness = await RouterTestingHarness.create()
      navbarComponent = await navbarHarness.navigateByUrl('', NavbarComponent)
      navbarLocation = TestBed.inject(Location)
    }))

    it('should navigate to home component', fakeAsync(() => {
      const homeButton: DebugElement = navbarHarness.routeDebugElement!.query(By.css('[data-testid="home-button"]'))

      homeButton.triggerEventHandler('click', { button: 0 })

      tick()

      expect(navbarLocation.path()).toBe('/#home')
    }))

    it('should navigate to navigation items', fakeAsync(() => {
      const navItems: DebugElement[] = navbarHarness.routeDebugElement!.queryAll(By.css('[data-testid="nav-items"]'))

      navItems.forEach((item: DebugElement, i: number) => {
        item.triggerEventHandler('click', { button: 0 })

        tick()

        expect(navbarLocation.path()).toBe(`${navbarComponent.navItems[i].path}#${navbarComponent.navItems[i].fragment}`)
      })
    }))
  })
})
