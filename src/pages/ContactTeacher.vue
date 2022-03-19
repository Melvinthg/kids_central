<template>

  <div class="layout">
    <el-container>
      <el-header> 
          <router-link to = "/home" tag = "button" className = "back1"> Back </router-link>
      </el-header>
      <el-container>
        <el-aside width="200px">Chatbox</el-aside>
        <el-container>
          <el-main>messages to be displayed here</el-main>
          <el-footer>
              <h2> send bar here </h2>
            <el-input v-model="input" placeholder="type your message here..." />
            <el-button type="primary" @click="onSubmit">Send</el-button>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>

  <router-view></router-view>
</template>
<script>


</script>
<style>

.back1 {
  float: left;
  font-size: 20px;
  text-align: center;
  color: blue;
}

</style>