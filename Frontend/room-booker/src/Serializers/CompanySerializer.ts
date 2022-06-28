import {Company} from '../Models/Company';

export class CompanySerializer{
    fromJson(json: any){
        const company: Company = {
            company_id: json.company_id,
            name: json.name
        };
        return company;
    }
}