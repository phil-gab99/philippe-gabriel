import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Bio } from '../../models/bio.model';
import { BioService } from '../../services/bio/bio.service';
import { RedirectService } from '../../services/redirect/redirect.service';
import { HomeComponent } from './home.component';

describe(HomeComponent.name, () => {
  const bioDataMock: Bio = {
    firstName: 'first',
    lastName: 'last',
    about: ['abt1', 'abt2'],
    profile: 'assets/img/profile',
    contact: [
      { iconSet: 'set1', icon: 'icon1', link: 'http://example1.com/' },
      { iconSet: 'set2', icon: 'icon2', link: 'http://example2.com/' },
    ],
  };
  const bioServiceMock: Pick<BioService, 'getBio'> = {
    getBio: jest.fn(() => of(bioDataMock)),
  };
  const redirectServiceMock: Pick<RedirectService, 'redirect'> = {
    redirect: jest.fn(),
  };

  let homeComponent: HomeComponent;
  let homeFixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.overrideComponent(HomeComponent, {
      add: {
        providers: [
          { provide: BioService, useValue: bioServiceMock },
          { provide: RedirectService, useValue: redirectServiceMock },
        ],
      },
    });

    homeFixture = TestBed.createComponent(HomeComponent);
    homeComponent = homeFixture.componentInstance;
    homeFixture.detectChanges();
  });

  it('should create', () => {
    expect(homeComponent).toBeTruthy();
  });

  it('should call bio service', () => {
    expect(bioServiceMock.getBio).toHaveBeenCalled();
  });

  it('should display profile image', () => {
    const profile: DebugElement = homeFixture.debugElement.query(
      By.css('[data-testid="profile"]')
    );

    expect((profile.nativeElement as HTMLImageElement).src).toEqual(
      `http://localhost/${bioDataMock.profile}`
    );
  });

  it('should render name', () => {
    const name: DebugElement = homeFixture.debugElement.query(
      By.css('[data-testid="name"]')
    );

    expect((name.nativeElement as HTMLSpanElement).textContent?.trim()).toEqual(
      `${bioDataMock.firstName} ${bioDataMock.lastName}`
    );
  });

  it('should render about paragraphs', () => {
    const about: DebugElement[] = homeFixture.debugElement.queryAll(
      By.css('[data-testid="about"]')
    );

    expect(about.length).toBe(bioDataMock.about.length);
    expect(
      about.map((e: DebugElement) =>
        (e.nativeElement as HTMLHeadingElement).textContent?.trim()
      )
    ).toEqual(bioDataMock.about);
  });

  it('should render contact links', () => {
    const contactIcons: DebugElement[] = homeFixture.debugElement.queryAll(
      By.css('[data-testid="contact-icon"]')
    );

    expect(contactIcons.length).toBe(bioDataMock.contact.length);
    expect(
      contactIcons.map((e: DebugElement) =>
        e.nativeElement.getAttribute('fonticon')
      )
    ).toEqual(bioDataMock.contact.map(con => con.icon));
  });

  it('should navigate to contact urls', () => {
    window.open = jest.fn();

    const contactLinks: DebugElement[] = homeFixture.debugElement.queryAll(
      By.css('[data-testid="contact-link"]')
    );

    contactLinks.forEach((item: DebugElement) => {
      item.triggerEventHandler('click', { button: 0 });
      expect(redirectServiceMock.redirect).toHaveBeenCalled();
    });
  });
});
