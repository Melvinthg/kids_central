<template>
  <div>
    <div
      class="">
      <div class = "msgContainer"
        :style="
          senderID !== senderId2
            ? 'display: flex; flex-direction: row; color: black;'
            : 'display: flex; flex-direction: row-reverse; color: white;'
        "
      >
        <div
          class="msg"
          :style="
            senderID !== senderId2
              ? ''
              : 'background: rgba(7, 119, 172, 0.7);box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);backdrop-filter: blur(9.7px);-webkit-backdrop-filter: blur(9.7px);border: 1px solid rgba(7, 119, 172, 0.3);'
          "
        >
          <b> {{ sender }}:</b>
          <hr :style="
            senderID !== senderId2
              ? 'color: grey;'
              : 'color:white;'"/>
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["sender", "message", "senderId2", "time", "senderID"],
};
</script>

<style scoped>
.scrollable {
  overflow-y: scroll;
}
hr {
  margin: 0px;
  
}
.msg {
  margin-bottom: 8px;
  border-radius: 16px;
  padding: 0.5em;
  font-size: 0.9em;
  background: whitesmoke;
  text-align: start;
  inline-size: 28vw;
  overflow-wrap: break-word;
}
.msgContainer{
  
}
</style>
