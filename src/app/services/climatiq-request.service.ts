import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchRequestViewModel } from '../models/viewModels/climatiq-search-models/searchRequestViewModel';
import { Observable, tap } from 'rxjs';
import { SearchResponseViewModel } from '../models/viewModels/climatiq-search-models/searchResponseViewModel';
import { SearchRequestUtils } from '../utils/searchRequestUtils';

@Injectable({
  providedIn: 'root',
})
export class ClimatiqRequestService {
  private searchUrl: string;
  private requestEndString: string;

  constructor(private http: HttpClient) {
    this.searchUrl = 'https://beta4.api.climatiq.io/search?';
    this.requestEndString = '&data_version=5.5&results_per_page=100';
  }

  /// save this in a cache or make
  searchAvailableEmissionFactors(
    searchRequest: SearchRequestViewModel
  ): Observable<SearchResponseViewModel> {

    this.saveSearchToCache(searchRequest);

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

  private saveSearchToCache(searchRequest: SearchRequestViewModel) {
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
  clearLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

}
