import HttpService from "./http.service"

export class UserService {
    static onLogin(username, password) {
        let data = { username, password }
        return HttpService.AuthenticateHttp.post('auth/get-login', data)
                        .then(res => res.data)
                        .catch(err => { throw err })
    }

    static onRegister(user) {
        return HttpService.RequestHttp.post('user/register-user', user)
                   .then(res => res.data)
                   .catch(err => { throw err })
    }
}