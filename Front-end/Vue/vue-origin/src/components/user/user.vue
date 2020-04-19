<template src='./user.html'></template>

<script>
import User from '../../models/user'
import UserService from '../../services/user.service'

export default {
    name: 'User',
    data () {
        return {
            user: new User()
        }
    },
    methods: {
        onRegister() {
            UserService.onRegister(this.user)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>