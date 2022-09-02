import { inject, NewInstance } from 'aurelia-framework';
import { ValidationController, ValidationRules } from "aurelia-validation";
export interface IProduct {
  id: number;
  name: string;
}
@inject(NewInstance.of(ValidationController))
export class App {
  private name: string;
  private address: string;
  private age: number;
  private phoneNumber: string;
  products: IProduct[] = [
    { id: 0, name: 'Motherboard' },
    { id: 1, name: 'CPU' },
    { id: 2, name: 'Memory' },
  ];

  selectedProductId: number = null;
  private message: string;
  constructor(private readonly controller: ValidationController) {
    ValidationRules
    .ensure((m: App) => m.name)
    .required()
    .ensure((m: App) => m.address)
    .required()
    .ensure((m: App) => m.age)
    .required()
    .range(0, 120)
    .ensure((m: App) => m.phoneNumber)
    .displayName("Phone number")
    .required()
    .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
    .ensure((m: App) => m.selectedProductId)
    .required()
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


