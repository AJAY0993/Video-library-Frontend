import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./Hero.module.css";
import vids from "../../utils/carouselVids";
import { Link } from "react-router-dom";

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
        {vids.map((video, i) => {
          return (
            <article
              className={styles.carouselCard}
              style={{
                backgroundImage: `url(https://i.ibb.co/${video.cover})`,
              }}
              key={i + 1}
            >
              <div className={styles.carouselCardContent}>
                <img
                  src={`https://i.ibb.co/${video.titleImg}`}
                  alt=""
                  className={styles.titleImg}
                />
                <span className={styles.tag}>{video.category}</span>
                <p className={styles.overview}>
                  {video.description.slice(0, 120) + "..."}
                </p>
                <Link to={`/explore/${video._id}`} className={styles.btn}>
                  Watch
                </Link>
                <button className={styles.btn} style={{ padding: " .5em 1em" }}>
                  +
                </button>
              </div>
            </article>
          );
        })}
      </Carousel>
    </div>
  );
}
export default Hero;
