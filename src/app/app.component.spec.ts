import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'

xdescribe('AppComponent', () => {
  let appComponent: AppComponent
  let fixture: ComponentFixture<AppComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(AppComponent)
    appComponent = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the app', () => {
    expect(appComponent).toBeTruthy()
  })
})
