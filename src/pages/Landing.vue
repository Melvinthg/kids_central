<template>
  <div>
    <div
      id="carouselExampleControls"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="welcomemsg">
        <br />
        <span>
          <h1><strong> WELCOME </strong></h1>
        </span>
        <span
          ><h2><strong> to our childcare center </strong></h2>
        </span>
        <span
          ><h4>
            <i>
              <strong>
                Providing personalised care and attention for your little ones
              </strong>
            </i>
          </h4></span>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <span>
          <h2><strong> Announcements </strong></h2>
        </span>
        <span>
          <h6>
            <strong> (31/01) Chinese new year’s eve half day closure </strong>
          </h6>
        </span>
        <span>
          <h6>
            <strong>
              (01/02 & 02/02) Chinese new year public holiday closure
            </strong>
          </h6>
        </span>
        <span>
          <h6>
            <strong> (16/02) Excursion to Science Centre Singapore </strong>
          </h6>
        </span>
        <span>
          <h6><strong> (23/02) Carnival Day 2022 </strong></h6>
        </span>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="https://www.sunshinekids.com.sg/wp-content/uploads/2017/11/DSC_5078-min.jpg"
            class="w-100"
          />
        </div>
        <div class="carousel-item">
          <img
            src="https://www.sunshinekids.com.sg/wp-content/uploads/2017/11/DSC_5115-min.jpg"
            class="w-100"
          />
        </div>
        <div class="carousel-item">
          <img
            src="https://www.sunshinekids.com.sg/wp-content/uploads/2020/06/SSK-index.jpg"
            class="w-100"
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
.carousel {
  position: absolute;
}
.carousel-inner {
  position: relative;
  opacity: 0.65;
  z-index: -99;
}
.welcomemsg {
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  position: absolute;
  text-align: center;
  color: rgb(0, 0, 0);
}
</style>
