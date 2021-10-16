import { TestBed } from '@angular/core/testing';
import { DatabaseBarService } from './database-bar.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('DatabaseBarService', () => {
  let httpTestingController: HttpTestingController;
  let service: DatabaseBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(DatabaseBarService);
  });

  afterEach(() => httpTestingController.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should parse initDropdown() response', () => {
    const mockGetResponse = {
      'status': 'OK',
      'databases' : [
        'app',
        'prf'
      ]
    };
    service.getDatabases().subscribe(result => expect(result).toEqual({
      'status': 'OK',
      'databases' : [
        'app',
        'prf'
      ]
    }));
    const requestUrl = service['baseUrl'] + DatabaseBarService.GET_DATABASES_URL;
    const req = httpTestingController.expectOne(requestUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockGetResponse);
  });


  it('should parse getTableCols response', () => {
    const mockGetResponse = {
      'status': 'OK',
      'tableName': 'party',
      'table': {
        'name': 'string',
        'columns': {
          'partyName': 'string',
          'partyType': 'string',
          'partyKey': 'string',
        }
      }
    };
    service.getTableCols('foo').subscribe(
      result => expect(result).toEqual({
        'status': 'OK',
        'tableName': 'party',
        'table': {
          'name': 'string',
          'columns': {
            'partyName': 'string',
            'partyType': 'string',
            'partyKey': 'string',
          }
        }
      })
    );
    const requestUrl = service['baseUrl'] + DatabaseBarService.GET_DATABASES_URL + "/" + service.selectedDatabase + "/tables/" + "foo";
    const req = httpTestingController.expectOne(requestUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockGetResponse);
  });

});
