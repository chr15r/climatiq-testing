import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-climatiq-api-key',
  templateUrl: './climatiq-api-key.component.html',
  styleUrls: ['./climatiq-api-key.component.scss'],
})
export class ClimatiqApiKeyComponent implements OnInit {

  @Output() onApiKeyChange = new EventEmitter<string>();

  public apiKeyInput: FormControl;

  ngOnInit(): void {
    this.apiKeyInput = new FormControl(
      Constants.CLIMATIQ_API_KEY,
      [Validators.required,
      Validators.minLength(28)]
    );
  }

  onSubmit() {
    if (this.apiKeyInput.valid) {
      this.onApiKeyChange.emit(this.apiKeyInput.value);
    }
  }

  onRemoveApiKey() {
    this.apiKeyInput.setValue(null);
    this.onApiKeyChange.next('');
  }

  get editMode(): boolean {
    return Constants.CLIMATIQ_API_KEY === null;
  }
}
