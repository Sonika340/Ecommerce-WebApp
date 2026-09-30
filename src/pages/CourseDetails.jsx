import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useCourse } from "../state-mangement/CourseContextAPI";

import styles from "./CourseDetails.module.css";
const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    currentCourse,
    loading,
    error,
    getCourse,
  } = useCourse();

  useEffect(() => {
    if (id) {
      getCourse(id);
    }
  }, [id]);

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <div className={styles.status}>
        <h2>Loading course...</h2>
      </div>
    );
  }


  // =====================================
  // ERROR
  // =====================================

  if (error) {
    return (
      <div className={styles.status}>
        <h2>{error}</h2>

        <button
          className={styles.backButton}
          onClick={() => navigate("/currentCourse")}
        >
          Back to Courses
        </button>
      </div>
    );
  }


  // =====================================
  // NO COURSE
  // =====================================

  if (!currentCourse) {
    return (
      <div className={styles.status}>
        <h2>Course not found</h2>

        <button
          className={styles.backButton}
          onClick={() => navigate("/courses")}
        >
          Back to Courses
        </button>
      </div>
    );
  }


  // =====================================
  // COURSE DATA
  // =====================================

  const {
    name,
    description,
    price,
    estimatedPrice,
    thumbnail,
    level,
    rating,
    purchased,
    tags,
    benefits = [],
    prerequisites = [],
    demoUrl,
    courseData = [],
  } = currentCourse;


  // =====================================
  // DISCOUNT
  // =====================================

  const discount =
    estimatedPrice && price
      ? Math.round(
        ((estimatedPrice - price) /
          estimatedPrice) *
        100
      )
      : 0;


  return (
    <main className={styles.page}>

      {/* ================================
          BACK
      ================================= */}

      <button
        className={styles.backButton}
        onClick={() => navigate("/courses")}
      >
        ← Back to Courses
      </button>


      {/* ================================
          HERO
      ================================= */}

      <section className={styles.hero}>

        {/* IMAGE */}

        <div className={styles.imageWrapper}>
          <img
            src={
              typeof thumbnail === "string"
                ? thumbnail
                : thumbnail?.url
            }
            alt={name}
            className={styles.image}
          />
        </div>


        {/* COURSE INFORMATION */}

        <div className={styles.info}>

          <span className={styles.level}>
            {level}
          </span>


          <h1 className={styles.title}>
            {name}
          </h1>


          <p className={styles.description}>
            {description}
          </p>


          <div className={styles.rating}>
            ⭐ {rating || 0}

            <span>
              ({purchased || 0} students enrolled)
            </span>
          </div>


          {/* PRICE */}

          <div className={styles.priceSection}>

            <span className={styles.price}>
              ₹{price}
            </span>

            {estimatedPrice && (
              <del
                className={
                  styles.originalPrice
                }
              >
                ₹{estimatedPrice}
              </del>
            )}

            {discount > 0 && (
              <span
                className={styles.discount}
              >
                {discount}% OFF
              </span>
            )}

          </div>


          {/* PURCHASE */}

          <button
            className={styles.purchaseButton}
          >
            Buy This Course
          </button>
          <button
            type="button"
            className={styles.demoButton}
            onClick={() =>
              navigate(`/admin/admin-dashboard/edit-course/${id}`)
            }
          >
            Edit Course
          </button>
          {/* DEMO */}

          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.demoButton}
            >
              Watch Demo
            </a>
          )}

        </div>

      </section>


      {/* ================================
          BENEFITS
      ================================= */}

      {benefits.length > 0 && (
        <section
          className={styles.section}
        >

          <h2>
            What You'll Learn
          </h2>

          <ul className={styles.list}>

            {benefits.map(
              (benefit, index) => (
                <li key={index}>
                  ✓{" "}
                  {typeof benefit ===
                    "string"
                    ? benefit
                    : benefit?.title}
                </li>
              )
            )}

          </ul>

        </section>
      )}


      {/* ================================
          PREREQUISITES
      ================================= */}

      {prerequisites.length > 0 && (
        <section
          className={styles.section}
        >

          <h2>
            Prerequisites
          </h2>

          <ul className={styles.list}>

            {prerequisites.map(
              (item, index) => (
                <li key={index}>
                  •{" "}
                  {typeof item ===
                    "string"
                    ? item
                    : item?.title}
                </li>
              )
            )}

          </ul>

        </section>
      )}


      {/* ================================
          TAGS
      ================================= */}

      {tags && (
        <section
          className={styles.section}
        >

          <h2>
            Course Tags
          </h2>

          <div className={styles.tags}>

            {tags
              .split(",")
              .map((tag) => (
                <span
                  key={tag.trim()}
                  className={styles.tag}
                >
                  {tag.trim()}
                </span>
              ))}

          </div>

        </section>
      )}


      {/* ================================
          COURSE CONTENT
      ================================= */}

      {courseData.length > 0 && (
        <section
          className={styles.section}
        >

          <h2>
            Course Content
          </h2>

          <div>

            {courseData.map(
              (video, index) => (
                <article
                  key={index}
                >

                  <h3>
                    {index + 1}.{" "}
                    {video.title}
                  </h3>

                  <p>
                    {video.description}
                  </p>

                  <span>
                    Section:{" "}
                    {video.videoSection}
                  </span>

                  <span>
                    {" "}
                    | Length:{" "}
                    {video.videoLength} minutes
                  </span>

                </article>
              )
            )}

          </div>

        </section>
      )}

    </main>
  );
};

export default CourseDetails;