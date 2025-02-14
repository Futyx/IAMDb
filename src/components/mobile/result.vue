<script setup>
import { ref } from "vue";
import { computed } from "vue";
import movieList from "./movieList.vue";
</script>

<template>
  <div class="result">
    <div class="head">
      <button class="btn-back">
        <img src="@/assets/images/angle-left.svg" />
      </button>
      <div class="head-title">
        <h2>Result</h2>
        <div class="head-query">for “Search Query”</div>
      </div>
    </div>
    <div class="search">
      <img src="@/assets/images/search.svg" />
      <input placeholder="Search Query" type="text" id="search" />
      <div class="mic-box">
        <img class="mic-icon" src="@/assets/images/microphone.svg" />
      </div>
    </div>
    <movieList/>
  </div>
</template>

<style scoped>
.result {
  padding: 32px 12px;
}
.head {
  /* background: red; */
  display: flex;
  justify-content: space-between;
}

.btn-back {
  padding: 10px;
  background: #222c4f;
  border: none;
  border-radius: 18px;
  height: 40px;
  width: 40px;
}
.head-title {
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
}
h2 {
  /* font-weight: 700; */
  font-size: 18px;
  line-height: 21.78px;
}
.head-query {
  font-weight: 300;
  font-size: 12px;
  opacity: 40%;
}
.search {
  margin-top: 32px;
  background: #222c4f;
  padding: 12px 16px;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;

}
input {
  background: none;
  border: none;
  outline: none;
  flex-grow: 1;
  margin: 0 16px;


}
input::placeholder{
    color: #ffffff;
    opacity: 80%;

    
}
.mic-box {
  border-left: solid 2px #070d23;
}
.mic-icon {
  padding-left: 16px;
}
</style>
