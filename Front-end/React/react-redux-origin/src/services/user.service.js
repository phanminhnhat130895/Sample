export default class UserService {
    static Login(username, password) {
        let data = { username, password };
        return fetch("http://localhost:3000/api/auth/get-login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(data)
        })
        .then(res => res.json())
        .catch((err) => {
            throw err;
        });
    }
}