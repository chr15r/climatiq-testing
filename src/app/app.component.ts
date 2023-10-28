import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Constants } from './app.constants';
import { AppSecrets } from './app.secrets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private readonly changeDetector: ChangeDetectorRef) {
  }

  public apiKey: string  = '';

  ngOnInit(): void {
    this.apiKey = AppSecrets.CLIMATIQ_API_KEY;
  }


}
