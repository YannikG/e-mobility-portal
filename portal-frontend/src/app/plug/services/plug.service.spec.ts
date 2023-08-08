import { TestBed } from '@angular/core/testing';
import { PlugService } from './plug.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('PlugService', () => {
  let service: PlugService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(PlugService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should call the API on the url /api/plug to get the plug types", () => {
    const injectedHttpClient = TestBed.inject(HttpClient);
    spyOn(injectedHttpClient, "get").and.callThrough();

    service.getPlugs();

    expect(injectedHttpClient.get).toHaveBeenCalledWith("/api/plug");
  });
});
