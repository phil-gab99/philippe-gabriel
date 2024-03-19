import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing'
import { TestBed, fakeAsync, tick } from '@angular/core/testing'
import { Bio } from '../../models/bio.model'
import { BioService } from './bio.service'

describe('BioService', () => {
  let service: BioService
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    })

    service = TestBed.inject(BioService)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpTestingController.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('getBio', () => {
    it('should retrieve bio info', fakeAsync(() => {
      const mockBioData: Bio = {
        firstName: 'first',
        lastName: 'last',
        about: ['abt1', 'abt2'],
        profile: 'profile',
        contact: [{ iconSet: 'set', icon: 'icon', link: 'link' }]
      }

      service.getBio().subscribe((bioData: Bio) => {
        expect(bioData).toEqual(mockBioData)
      })

      tick()

      const req: TestRequest = httpTestingController.expectOne(BioService.BIO_PATH)
      expect(req.request.method).toEqual('GET')
      expect(req.request.url).toEqual(BioService.BIO_PATH)

      req.flush(mockBioData)
    }))
  })
})
