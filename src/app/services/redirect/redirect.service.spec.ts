import { TestBed } from '@angular/core/testing'

import { RedirectService } from './redirect.service'

describe('RedirectService', () => {
  let redirectService: RedirectService
  let windowOpenSpy: jest.SpyInstance<Window | null, [url?: string | URL | undefined, target?: string | undefined, features?: string | undefined], any>

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RedirectService
      ]
    })
    redirectService = TestBed.inject(RedirectService)

    window.open = jest.fn()
    windowOpenSpy = jest.spyOn(window, 'open')
  })

  it('should be created', () => {
    expect(redirectService).toBeTruthy()
  })

  describe('redirect', () => {
    it('should redirect to external link', () => {
      const url: string = 'http://example.com'

      redirectService.redirect(url)
      expect(windowOpenSpy).toHaveBeenCalledWith(url, '_blank', 'noopener')
    })
  })
})
