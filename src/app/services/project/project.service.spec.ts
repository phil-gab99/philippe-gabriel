import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  TestRequest,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Project } from '../../models/project.model';
import { ProjectService } from './project.service';

describe(ProjectService.name, () => {
  let projectService: ProjectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    projectService = TestBed.inject(ProjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(projectService).toBeTruthy();
  });

  describe('getProjects', () => {
    it('should retrieve projects', fakeAsync(() => {
      const projectsDataMock: Project[] = [
        {
          name: 'p1',
          description: 'd1',
          dateStart: 'dateS1',
          dateEnd: 'dateE1',
          sourceUrl: 'url1',
          featured: true,
          stack: { name: 's1', icon: 'i1', iconSet: 'iS1' },
        },
        {
          name: 'p2',
          description: 'd2',
          dateStart: 'dateS2',
          dateEnd: 'dateE2',
          sourceUrl: 'url2',
          featured: true,
          stack: { name: 's2', icon: 'i2', iconSet: 'iS2' },
        },
      ];

      projectService.getProjects().subscribe((projectsData: Project[]) => {
        expect(projectsData).toEqual(projectsDataMock);
      });

      tick();

      const req: TestRequest = httpMock.expectOne(ProjectService.PROJECTS_PATH);
      expect(req.request.method).toEqual('GET');
      expect(req.request.url).toEqual(ProjectService.PROJECTS_PATH);

      req.flush(projectsDataMock);
    }));

    it('should exclude non-featured projects', fakeAsync(() => {
      const projectsDataMock: Project[] = [
        {
          name: 'p1',
          description: 'd1',
          dateStart: 'dateS1',
          dateEnd: 'dateE1',
          sourceUrl: 'url1',
          featured: true,
          stack: { name: 's1', icon: 'i1', iconSet: 'iS1' },
        },
        {
          name: 'p2',
          description: 'd2',
          dateStart: 'dateS2',
          dateEnd: 'dateE2',
          sourceUrl: 'url2',
          featured: false,
          stack: { name: 's2', icon: 'i2', iconSet: 'iS2' },
        },
      ];

      const mockFeaturedProjects: Project[] = projectsDataMock.filter(
        (p: Project) => p.featured
      );

      projectService.getProjects().subscribe((projectsData: Project[]) => {
        expect(projectsData).toEqual(mockFeaturedProjects);
      });

      tick();

      const req: TestRequest = httpMock.expectOne(ProjectService.PROJECTS_PATH);
      expect(req.request.method).toEqual('GET');
      expect(req.request.url).toEqual(ProjectService.PROJECTS_PATH);

      req.flush(projectsDataMock);
    }));
  });
});
