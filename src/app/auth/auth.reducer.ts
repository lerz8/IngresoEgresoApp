
import * as fromAuth from './auth.actions';
import { User } from './user.model';
import { SET_USER } from './auth.actions';

export interface AuthState {
    user: User;
}

const initState: AuthState = {
    user: null
};

export function authReducer(state = initState, action: fromAuth.authAccions): AuthState {
    switch (action.type) {
        case fromAuth.SET_USER:
            return {
                user: {... action.user}
            };
        default: return initState;
    }
}
