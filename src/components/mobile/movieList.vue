<script setup></script>
<template>
  <div class="movie-box">
    <div>
      <img src="@/assets/images/shawshank.svg" alt="" />
    </div>
    <div class="movie-info">
      <div class="movie-title">
        <h3>The Shawshank Redemption</h3>
        <img class="favorite" src="@/assets/images/favorite.svg" alt="" />
      </div>
      <div class="ctg"> Drama </div>
      <div class="movie-detail">
        <span>1994</span>
        <span>United States</span>
        <div><img class="rate-star" src="@/assets/images/star.svg" alt="" /><span>9.3</span></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.movie-box {
  display: flex;
  margin-top: 32px;
  /* border:solid 2px red; */
}
h3{
    font-size: 24px;
    line-height: 29.05px;
}
.ctg{
    font-weight: 300;
    opacity: 40%;
    font-size: 12px;
    
}

.movie-info{
    margin-left: 20px;

}

.movie-detail{
  /* border:solid 2px pink; */
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  opacity: 80%;
  line-height: 21.78px;

    
}
.movie-title{
    display: flex;
}
.rate-star{
    margin-right: 6px;
}
.favorite{
    width: 24px;
}
</style>
