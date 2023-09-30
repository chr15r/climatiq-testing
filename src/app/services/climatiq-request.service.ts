import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchRequestViewModel } from '../models/viewModels/climatiq-search-models/searchRequestViewModel';
import { Observable } from 'rxjs';
import { SearchResponseViewModel } from '../models/viewModels/climatiq-search-models/searchResponseViewModel';

@Injectable({
  providedIn: 'root',
})
export class ClimatiqRequestService {
  private apiUrl: string;
  private requestEndString: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'https://beta4.api.climatiq.io';
    this.requestEndString = '&data_version=5.5&results_per_page=100';
  }

  searchAvailableEmissionFactors(searchRequest: SearchRequestViewModel): Observable<SearchResponseViewModel> {
    const queryString = `search?region=${searchRequest.region}&year=${searchRequest.year}&sector=${searchRequest.sector}&category=${searchRequest.category}&${this.requestEndString}`;
    return this.http.get<SearchResponseViewModel>(`${this.apiUrl}/${queryString}`);
  }
}
