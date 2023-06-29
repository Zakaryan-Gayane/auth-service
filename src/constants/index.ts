import exp from "constants";

export enum LogLevel {
    info = 'info',
    warn = 'warn',
    error = 'error',
    alert = 'alert',
}
export enum LogTypes {
    userCreated = 'New user has created',
    userLogin = 'User login',
    userLogout = 'User logout',
}
export enum SystemTypes {
    user = 'user',
    system = 'system',
    all = 'all'
}
