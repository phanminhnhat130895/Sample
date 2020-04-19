import { AUTH_HTTP, HTTP } from "./core.service";

export default class UserService {
    static onLogin(username, password) {
        let data = { username, password }
        return AUTH_HTTP.post('auth/get-login', data)
                        .then(res => res.data)
                        .catch(err => { throw err })
    }

    static onRegister(user) {
        return HTTP.post('user/register-user', user)
                   .then(res => res.data)
                   .catch(err => { throw err })
    }
}