import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  public currentStep: number = 0;
  public totalSteps: number = 6;

  public get canGoBack(): boolean {
    return this.currentStep > 0 && this.currentStep < this.totalSteps - 1;
  }

  public get canGoForward(): boolean {
    return this.currentStep < this.totalSteps - 1;
  }

  public get canFinish(): boolean {
    return this.currentStep == this.totalSteps - 1;
  }

  ngOnInit() {
  }

  public goBack(stepper: MatStepper): void {
    if (this.canGoBack) {
      stepper.previous();
      this.currentStep--;
    }
  }

  public goForward(stepper: MatStepper): void {
    if (this.canGoForward) {
      stepper.next();
      this.currentStep++;
    }
  }

  public finish(): void {

  }
}
