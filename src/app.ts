import { autoinject } from 'aurelia-framework';
import { TextHandler } from 'aurelia-loader-nodejs';
import { ValidationController, ValidationRules } from "aurelia-validation";
import { isNumberObject } from "util/types";

@autoinject
export class App {
  private name: string;
  private address: string;
  private age: number;
  private phoneNumber: string;

  private message: string;
  constructor(private readonly controller: ValidationController) {
    ValidationRules
    .ensure((m: App) => m.name)
    .displayName("Name")
    .required()
    .ensure((m: App) => m.address)
    .displayName("Address")
    .required()
    .ensure((m: App) => m.age)
    .required()
    .range(0, 120)
    .on(this);
  }

  private submit(): void {
    this.controller.validate();
  }

}


