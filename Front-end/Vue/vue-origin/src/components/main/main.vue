<template src='./main.html'></template>

<script>
// import SubMain from './SubMain'
// import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Main',
  data () {
    return {
      message: 'Message from Main component'
    }
  },
//   components: {
//     SubMain
//   },
//   computed: {
//     ...mapState({
//       anotherState: state => state.user.anotherState
//     }),
//     ...mapGetters('user', {
//       users: 'getUsers',
//       count: 'getCount'
//     })
//   }
}
</script>

<style scoped>
  h1{
    color: red;
  }
  .message{
    font-style: italic;
    text-decoration: underline;
  }
  a{
    text-decoration: none;
    color: #03adfc;
  }
</style>