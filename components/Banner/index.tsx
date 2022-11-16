import styles from "./styles.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";

export const Banner = () => {
  return (
    <div className={styles.container}>
      <Swiper
        slidesPerView={1}
        loop={true}
        className={styles.swiper}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        modules={[Autoplay]}
      >
        <SwiperSlide className={styles.slide}>
          <div className={styles.slideImg}>
            <img src="/tmp/banner1.png" alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <div className={styles.slideImg}>
            <img src="/tmp/banner2.png" alt="" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

//<img src="/tmp/banner2.png" alt="" />
