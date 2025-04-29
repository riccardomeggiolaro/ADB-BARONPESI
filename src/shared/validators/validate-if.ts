import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'CompanyDataValidator', async: false })
export class CompanyDataValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as any;
    const hasCompanyId = !!object.companyId;
    const hasCompanyData = !!(object.description || object.cell || object.cfpiva);

    // Ensure only one of the two is provided
    return !(hasCompanyId && hasCompanyData);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Either companyId or company data (description, cell, cfpiva) must be provided, but not both.';
  }
}