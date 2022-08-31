import { inject, NewInstance } from 'aurelia-framework';
import { ValidationController, ValidationRules } from "aurelia-validation";

@inject(NewInstance.of(ValidationController))
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
    .ensure((m: App) => m.phoneNumber)
    .required()
    .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
    .on(this);
  }

  private async submit(): Promise<void> {
    await this.controller
    .validate()
    .then(validationResult => 
      this.message = validationResult.valid ? "Form submitted!" : "Errors! Boooo."
      );
  }

}


