import { RootUrl } from "../common/const";

export class UserService {
    static onLogin(username, password) {
        let data = { username, password };
        let url = RootUrl + 'auth/get-login';
        return fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .catch(err => { throw err })
    }

    static onRegister(user){
        let url = RootUrl + 'user/register-user';
        return fetch(url, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(res => res.json())
            .catch(err => { throw err })
    }
}