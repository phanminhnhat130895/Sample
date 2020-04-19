import Vue from 'vue'
import Router from 'vue-router'
import * as jwt from 'jsonwebtoken'
import ShareService from '../services/share.service'

// import HelloComponent from '@/components/HelloWorld'
import LoginComponent from '../components/login/login'
import MainComponent from '../components/main/main'
import UserComponent from '../components/user/user'

Vue.use(Router);

export default new Router ({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: LoginComponent
        },
        {
            path: '/main',
            name: 'main',
            component: MainComponent,
            beforeEnter: (to, from, next) => { isAuthenticate() ? next() : next('/') },
            children: [
                { 
                    path: 'user', component: UserComponent, meta: { authorization: ['Super Admin', 'Admin'] },
                    beforeEnter: (to, from, next) => { isAuthorization(to.meta.authorization) ? next() : next('/') }
                }
            ]
        }
    ]
})

function isAuthenticate() {
    let token = ShareService.getJwtToken()
    if(token && jwt.decode(token).USERID) return true
    return false
}

function isAuthorization(roles) {
    let token = ShareService.getJwtToken()
    if(token){
        let loginRole = jwt.decode(token).ROLE
        if(roles.includes(loginRole)) return true
    }
    return false
}