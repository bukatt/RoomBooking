import { User } from '../Models/User';
import { CompanySerializer } from './CompanySerializer';

export class UserSerializer{
    fromJson(json: any, token: string){
        const companySerializer: CompanySerializer = new CompanySerializer();
        const user: User = {
            user_id: json.user_id,
            company_id: json.company_id,
            first_name: json.first_name,
            last_name: json.last_name,
            email: json.email,
            token: token
        };
        return user;
    }
}