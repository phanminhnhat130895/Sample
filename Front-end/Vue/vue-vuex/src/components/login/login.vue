<template src='./login.html'></template>

<script>
import UserService from '../../services/user.service'
import ShareService from '../../services/share.service'

export default {
    name: 'Login',
    data () {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        onLogin(){
            UserService.onLogin(this.username, this.password)
                .then(res => {
                    if(res){
                        ShareService.setJwtToken(res)
                        this.$store.dispatch('demoModule/setToken', res)
                        this.$router.push({ name: 'Main' })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>