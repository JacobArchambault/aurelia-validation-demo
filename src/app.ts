import { autoinject } from 'aurelia-framework';
import { TextHandler } from 'aurelia-loader-nodejs';
import { ValidationController, ValidationRules } from "aurelia-validation";
import { isNumberObject } from "util/types";

@autoinject
export class App {
  name: string;
  address: string;
  age: number;
  phoneNumber: string;

  message: string;
  constructor(private readonly controller: ValidationController) {
    ValidationRules
      .ensure((m: App) => m.name)
      .displayName("Name")
      .required()
      .on(this);
  }

  private submit(): void {
    this.controller.validate();
  }

}


