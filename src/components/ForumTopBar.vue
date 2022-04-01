<template>
 <div id="wholegroup">
     <div id="firstgroup">
        <router-link to = "/home" className='text-link' style='color:white'>Back</router-link>
     </div>

     <div id="secondgroup">
         <h1>CLASS {{classname}} FORUM</h1><br>
         <!-- query number of parents in the class -->
         <h4>{{number}} members</h4>
     </div>
     <div id="thirdgroup">
         <router-link to = "/forumcreatepost" className='text-link' style='color:white'>New Post</router-link>
     </div>
 </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {useStore, mapActions, mapState} from "vuex"
export default {
  name: 'ForumTopBar',
  data(){
    return{
      number: 0,
      classname: this.$store.state.userModel.childClass || this.$store.state.userModel.teacherClass,
    }
  },
  methods: {
    ...mapActions({getUsers: "getUsers"}),
      async display(){
          var usersInClass = await this.getUsers(this.$store.state.userModel.childClass || this.$store.state.userModel.teacherClass);
          this.number = usersInClass.length;
      },
  },
  mounted() {
    this.display()
  },
}
</script>

<style scoped>
#wholegroup {
    overflow: hidden;
    background-color: rgb(7, 119, 172);
    display: block;
    margin: 0%;
    padding: 5px;
    width: 100%;
}
#firstgroup {
  float: left;
  width: 25%;
  color: white;
  text-align: center;
  padding: 20px 20px;
  text-decoration: none;
  font-size: 20px;
  line-height: 100px;
}
#secondgroup {
    float: left;
    width: 50%;
    text-align: center;
    color: white;
    padding: 20px;
}
#thirdgroup {
  float: right;
  width: 25%;
  padding: 20px 20px;
  font-size: 20px;
  text-align: center;
  color: white;
  line-height: 100px;
}
#firstgroup:hover {
  background-color: black;
}
#thirdgroup:hover {
  background-color: black; 
}
</style>