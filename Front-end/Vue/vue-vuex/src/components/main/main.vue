<template src='./main.html'></template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    name: 'Main',
    data () {
        return {
            message: 'Data from main'
        }
    },
    computed: {
        ...mapState({
            count: state => state.demoModule.count
        }),
        ...mapGetters('demoModule', {
            token: 'getToken'
        })
    },
}
</script>