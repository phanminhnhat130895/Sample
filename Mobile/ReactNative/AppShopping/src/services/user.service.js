import HttpService from "./http.service";

export class UserService {
    static onLogin(username, password) {
        let data = { username, password }
        return HttpService.AuthenticateHttp.post('user/get-login', data)
                        .then(res => res.data)
                        .catch(err => { throw err })
    }

    static async onRegister(user) {
        let result = await HttpService.RequestHttp().then(res => {
            return res.post('user/register-user', user)
                   .then(res => res.data)
                   .catch(err => { throw err })
        })

        return result;
    }
}