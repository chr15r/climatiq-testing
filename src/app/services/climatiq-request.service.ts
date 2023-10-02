import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchRequestViewModel } from '../models/viewModels/climatiq-search-models/search/searchRequestViewModel';
import { Observable, tap } from 'rxjs';
import { SearchRequestUtils } from '../utils/searchRequestUtils';
import { SearchResponseViewModel } from '../models/viewModels/climatiq-search-models/search/searchResponseViewModel';
import { Constants } from '../app.constants';
import { EmissionFactorEstimateViewModel } from '../models/viewModels/climatiq-search-models/estimate/emissionFactorEstimateViewModel';
import { EmissionFactorEstimateRequestViewModel } from '../models/viewModels/climatiq-search-models/estimate/emissionFactorEstimateRequestViewModel';

@Injectable({
  providedIn: 'root',
})
export class ClimatiqRequestService {
  private searchUrl: string;
  private estimateUrl: string;
  private requestEndString: string;

  constructor(private http: HttpClient) {
    this.searchUrl = 'https://beta4.api.climatiq.io/search?';
    this.estimateUrl = 'https://beta4.api.climatiq.io/estimate';
    this.requestEndString = `&data_version=${Constants.CLIMATIQ_DATA_VERSION}&results_per_page=100`;
  }


  searchAvailableEmissionFactors(
    searchRequest: SearchRequestViewModel
  ): Observable<SearchResponseViewModel> {

    const cachedData = localStorage.getItem(searchRequest.id);

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      return new Observable((observer) => {
        observer.next(parsedData);
        observer.complete();
      });
    } else {
      return this.http
        .get<SearchResponseViewModel>(`${this.searchUrl}${SearchRequestUtils.getQueryString(searchRequest)}${this.requestEndString}`)
        .pipe(
          tap((response) => {
            // Update the local storage with the new data
            this.saveResponseToCache(searchRequest.id, response);
          })
        );
    }
  }

  public getEmissionFactorEstimate(request: EmissionFactorEstimateRequestViewModel): Observable<EmissionFactorEstimateViewModel> {
    return this.http.post<EmissionFactorEstimateViewModel>(`${this.estimateUrl}`, request);
  }

  public saveSearchToCache(searchRequest: SearchRequestViewModel) {
    var localStorageValue = localStorage.getItem('savedSearches');
    if (localStorageValue === null) {
      localStorage.setItem('savedSearches', JSON.stringify([searchRequest]));
    }
    else {
      let savedSearchRequests: SearchRequestViewModel[] = JSON.parse(localStorage.getItem('savedSearches')!);
      let foundSearch = savedSearchRequests.find(f => f.id === searchRequest.id);

      if (!foundSearch) {
        savedSearchRequests.push(searchRequest);
        localStorage.setItem('savedSearches', JSON.stringify(savedSearchRequests));
      }
    }
  }

  // Function to update the local storage with new data
  private saveResponseToCache(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Function to clear data from local storage (if needed)
  private clearLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

}
