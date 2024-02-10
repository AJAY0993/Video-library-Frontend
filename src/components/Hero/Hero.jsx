import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./Hero.module.css";

function Hero() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 851 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 850, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div className={styles.hero}>
      <Carousel responsive={responsive}>
        <article
          className={styles.carouselCard}
          style={{
            backgroundImage:
              "url(https://i.ibb.co/pfKnyN4/john-wick-poster.jpg)",
          }}
        >
          <div className={styles.carouselCardContent}>
            <img
              src="https://i.ibb.co/vXkL5pK/John-Wick-3-title-preview.png"
              alt=""
              className={styles.titleImg}
            />
            <span className={styles.tag}>Action</span>
            <p className={styles.overview}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas
              aspernatur, fugiat, commodi maxime, distinctio saepe illo
              consectetur.
            </p>
            <button className={styles.btn}>Watch</button>
            <button className={styles.btn} style={{ padding: " .5em 1em" }}>
              +
            </button>
          </div>
        </article>

        <article
          className={styles.carouselCard}
          style={{
            backgroundImage:
              "url(https://i.ibb.co/M8100rZ/avengers-endgame-social.jpg)",
          }}
        >
          <div className={styles.carouselCardContent}>
            <img
              src="https://i.ibb.co/2s5C8jq/Avengers-endgame-logo.png"
              alt=""
              className={styles.titleImg}
            />
            <span className={styles.tag}>Action</span>
            <p className={styles.overview}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas
              aspernatur, fugiat, commodi maxime, distinctio saepe illo
              consectetur.
            </p>
            <button className={styles.btn}>Watch</button>
            <button className={styles.btn} style={{ padding: " .5em 1em" }}>
              +
            </button>
          </div>
        </article>

        <article
          className={styles.carouselCard}
          style={{
            backgroundImage: "url(https://i.ibb.co/319Bvxg/Iron-man-3.jpg)",
          }}
        >
          <div className={styles.carouselCardContent}>
            <img
              src="https://i.ibb.co/YbDJKGC/iron-man-3-title-preview.png"
              alt="iron-man-3-title"
              className={styles.titleImg}
            ></img>
            <span className={styles.tag}>Action</span>
            <p className={styles.overview}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas
              aspernatur, fugiat, commodi maxime, distinctio saepe illo
              consectetur.
            </p>
            <button className={styles.btn}>Watch</button>
            <button className={styles.btn} style={{ padding: " .5em 1em" }}>
              +
            </button>
          </div>
        </article>
      </Carousel>
    </div>
  );
}
export default Hero;
