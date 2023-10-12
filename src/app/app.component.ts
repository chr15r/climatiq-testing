import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Constants } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private readonly changeDetector: ChangeDetectorRef,) {

  }

  public apiKey: string | null  = '';

  ngOnInit(): void {
    this.loadClimatiqAPIKey();
  }

  loadClimatiqAPIKey() {
    Constants.CLIMATIQ_API_KEY = localStorage.getItem(Constants.CLIMATIQ_API_LOCALSTORAGE_KEY);
    this.apiKey = Constants.CLIMATIQ_API_KEY;
  }

  onApiKeyChange(apiKey: string) {
    if (apiKey === '') {
      localStorage.removeItem(Constants.CLIMATIQ_API_LOCALSTORAGE_KEY);
    }
    else {
      localStorage.setItem(Constants.CLIMATIQ_API_LOCALSTORAGE_KEY, apiKey);
    }
    this.loadClimatiqAPIKey();
    this.changeDetector.detectChanges();
  }

}
