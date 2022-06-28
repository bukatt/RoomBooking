import { LoginState } from "../../Enums/LoginState";
import { User } from "../User";

export interface AuthState{
    user: User,
    loginState: LoginState
}