import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing'
import { TestBed, fakeAsync, tick } from '@angular/core/testing'
import { Project } from '../../models/project.model'
import { ProjectService } from './project.service'

describe('ProjectService', () => {
  let service: ProjectService
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    })

    service = TestBed.inject(ProjectService)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpTestingController.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('getProjects', () => {
    it('should retrieve projects', fakeAsync(() => {
      const mockProjectsData: Project[] = [
        {
          name: 'p1',
          description: 'd1',
          dateStart: 'dateS1',
          dateEnd: 'dateE1',
          sourceUrl: 'url1',
          featured: true,
          stack: { name: 's1', icon: 'i1', iconSet: 'iS1' }
        },
        {
          name: 'p2',
          description: 'd2',
          dateStart: 'dateS2',
          dateEnd: 'dateE2',
          sourceUrl: 'url2',
          featured: true,
          stack: { name: 's2', icon: 'i2', iconSet: 'iS2' }
        }
      ]

      service.getProjects().subscribe((projectsData: Project[]) => {
        expect(projectsData).toEqual(mockProjectsData)
      })

      tick()

      const req: TestRequest = httpTestingController.expectOne(ProjectService.PROJECTS_PATH)
      expect(req.request.method).toEqual('GET')
      expect(req.request.url).toEqual(ProjectService.PROJECTS_PATH)

      req.flush(mockProjectsData)
    }))

    it('should exclude non-featured projects', fakeAsync(() => {
      const mockProjectsData: Project[] = [
        {
          name: 'p1',
          description: 'd1',
          dateStart: 'dateS1',
          dateEnd: 'dateE1',
          sourceUrl: 'url1',
          featured: true,
          stack: { name: 's1', icon: 'i1', iconSet: 'iS1' }
        },
        {
          name: 'p2',
          description: 'd2',
          dateStart: 'dateS2',
          dateEnd: 'dateE2',
          sourceUrl: 'url2',
          featured: false,
          stack: { name: 's2', icon: 'i2', iconSet: 'iS2' }
        }
      ]

      const mockFeaturedProjects: Project[] = mockProjectsData.filter((p: Project) => p.featured)

      service.getProjects().subscribe((projectsData: Project[]) => {
        expect(projectsData).toEqual(mockFeaturedProjects)
      })

      tick()


      const req: TestRequest = httpTestingController.expectOne(ProjectService.PROJECTS_PATH)
      expect(req.request.method).toEqual('GET')
      expect(req.request.url).toEqual(ProjectService.PROJECTS_PATH)

      req.flush(mockProjectsData)
    }))
  })
})
