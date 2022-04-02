<template>
  <div>
        <div class="scrollable text-center green flex-grow-1 flex-shrink-0 overflow-auto ">
            <div :style="(sender !== senderId2) ? 'display: flex; flex-direction: row; color: red;' : 'display: flex; flex-direction: row-reverse; color: blue;'">
                <div class = "msg">
                    {{sender}}: {{message}} 
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'sender', 'message', 'senderId2', 'time']
}
</script>

<style scoped>
.scrollable{
    overflow-y : scroll;
}
.msg {
  border-radius: 10px;
  padding: .5em;
  font-size: .9em;
  background: whitesmoke;
}
</style>
