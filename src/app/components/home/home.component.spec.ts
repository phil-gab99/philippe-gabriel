import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HomeComponent } from './home.component'
import { BioService } from '../../services/bio/bio.service'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>
  let bioSeviceMock = {
    getBio: jest.fn() // TODO: Define dummy bio
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent
      ],
      providers: [
        { provide: BioService, useValue: bioSeviceMock }
      ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
