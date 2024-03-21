import { HttpClientTestingModule, HttpTestingController, TestRequest, provideHttpClientTesting } from '@angular/common/http/testing'
import { TestBed, fakeAsync, tick } from '@angular/core/testing'
import { Bio } from '../../models/bio.model'
import { BioService } from './bio.service'

describe('BioService', () => {
  let bioService: BioService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    })

    bioService = TestBed.inject(BioService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('should be created', () => {
    expect(bioService).toBeTruthy()
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

      bioService.getBio().subscribe((bioData: Bio) => {
        expect(bioData).toEqual(mockBioData)
      })

      tick()

      const req: TestRequest = httpMock.expectOne(BioService.BIO_PATH)
      expect(req.request.method).toEqual('GET')
      expect(req.request.url).toEqual(BioService.BIO_PATH)

      req.flush(mockBioData)
    }))
  })
})
