<template>
  
  
  <div class="homepageview">
    <div class="sidebar">
      <header>Joshua Tan</header>
      <router-link to = "/home" className='text-link'>Edit Class Dashboard</router-link><br>
      <router-link to = "/home" className='text-link'>Manage Class Info</router-link><br>
      <router-link to = "/home" className='text-link'>Class Forum</router-link><br>
      <router-link to = "/contactparent" className='text-link'>Contact Parents</router-link><br>
    </div>
    <div class="content">
      <div class ="writepost">
        <WritePost></WritePost>
      </div>
      <div class="feed">
        <!-- feed -->
    
        <h1>feed</h1>
      </div>
    </div>

    
  </div>
  <router-view></router-view>
</template>

<script>


import WritePost from '@/components/WritePost.vue'

// import firebaseApp from "../firebase.js";
// import { getFirestore } from "firebase/firestore";
// import { doc } from "firebase/firestore";
// const db = getFirestore(firebaseApp);

export default {
  name: 'Home',
  components: {
    
    WritePost
  },
  // methods: {
    


  // }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');



.sidebar {
  position: fixed;
  width:fit-content;
  height: 100%;
  background: #2470b7;
  text-align: centre;
  color: white;
  float: left;
  line-height:40px;
  padding-left: 25px;
  padding-right: 25px
 
}
.sidebar header {
  font-size: 24px;
  color: white;
  background: #2470b7;
}

.text-link {
  color: white;
  text-decoration: none;

}

.text-link:hover{
  padding-left: 5px;
}

.content {
  position: fixed;
  margin-left: 30%;
}
.writepost {
  margin-left: 25%;
  width:100%;
  height: 100px;
  background: #eeeeee;
}

.feed {
  margin-left: 25%;
  width: fit-content;
  height:100%;
  background: #eeeeee;
  padding-left: 25px;
  padding-right: 25px;
  text-align: center;
}
</style>
