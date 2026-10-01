import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/fetchUser";

import { useCourse } from "../state-mangement/CourseContextAPI";

import styles from "./CourseDetails.module.css";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();

  // =====================================
  // QUESTION STATE
  // =====================================

  const [question, setQuestion] = useState("");
  const [questionLoading, setQuestionLoading] = useState(false);

  const isAdmin = user?.role?.toLowerCase() === "admin";

  // =====================================
  // COURSE CONTEXT
  // =====================================

  const {
    currentCourse,
    loading,
    error,
    getCourse,
    askQuestion,
  } = useCourse();

  // =====================================
  // ASK QUESTION
  // =====================================

  const handleAskQuestion = async (contentId) => {
    if (!question.trim()) {
      alert("Please enter your question");
      return;
    }

    try {
      setQuestionLoading(true);

      await askQuestion({
        question: question.trim(),
        courseId: id,
        contentId: contentId,
      });

      alert("Question sent to admin successfully!");

      setQuestion("");
    } catch (error) {
      console.error("QUESTION ERROR:", error);

      alert(
        error?.response?.data?.message ||
        "Failed to send question"
      );
    } finally {
      setQuestionLoading(false);
    }
  };

  // =====================================
  // GET COURSE
  // =====================================

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
          onClick={() => navigate("/courses")}
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
        ((estimatedPrice - price) / estimatedPrice) * 100
      )
      : 0;

  // =====================================
  // UI
  // =====================================

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
              <del className={styles.originalPrice}>
                ₹{estimatedPrice}
              </del>
            )}

            {discount > 0 && (
              <span className={styles.discount}>
                {discount}% OFF
              </span>
            )}

          </div>

          {/* ================================
              ADMIN / USER ACTIONS
          ================================= */}

          {isAdmin ? (
            <button
              type="button"
              className={styles.purchaseButton}
              onClick={() =>
                navigate(
                  `/admin/admin-dashboard/edit-course/${id}`
                )
              }
            >
              Edit Course
            </button>
          ) : (
            <>
              {/* BUY COURSE */}

              <button
                className={styles.purchaseButton}
              >
                Buy This Course
              </button>

              {/* WATCH DEMO */}

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
            </>
          )}

        </div>
      </section>

      {/* ================================
          BENEFITS
      ================================= */}

      {benefits.length > 0 && (
        <section className={styles.section}>

          <h2>
            What You'll Learn
          </h2>

          <ul className={styles.list}>

            {benefits.map((benefit, index) => (
              <li key={index}>
                ✓{" "}
                {typeof benefit === "string"
                  ? benefit
                  : benefit?.title}
              </li>
            ))}

          </ul>

        </section>
      )}

      {/* ================================
          PREREQUISITES
      ================================= */}

      {prerequisites.length > 0 && (
        <section className={styles.section}>

          <h2>
            Prerequisites
          </h2>

          <ul className={styles.list}>

            {prerequisites.map((item, index) => (
              <li key={index}>
                •{" "}
                {typeof item === "string"
                  ? item
                  : item?.title}
              </li>
            ))}

          </ul>

        </section>
      )}

      {/* ================================
          TAGS
      ================================= */}

      {tags && (
        <section className={styles.section}>

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
        <section className={styles.section}>

          <h2>
            Course Content
          </h2>

          <div>

            {courseData.map((video, index) => (

              <article
                key={video._id || index}
              >

                {/* LESSON TITLE */}

                <h3>
                  {index + 1}. {video.title}
                </h3>

                {/* LESSON DESCRIPTION */}

                <p>
                  {video.description}
                </p>

                {/* SECTION */}

                <span>
                  Section: {video.videoSection}
                </span>

                {/* VIDEO LENGTH */}

                <span>
                  {" "}
                  | Length: {video.videoLength} minutes
                </span>

                {/* ================================
                    ASK QUESTION
                ================================= */}

                {!isAdmin && (
                  <div className={styles.questionBox}>
                    <h4>
                      Have a question about this lesson?
                    </h4>
                    <textarea
                      value={question}
                      onChange={(e) =>
                        setQuestion(e.target.value)
                      }
                      placeholder="Ask your question..."
                      rows="4"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        handleAskQuestion(video._id)
                      }
                      disabled={questionLoading}
                    >
                      {questionLoading
                        ? "Sending..."
                        : "Ask Question"}
                    </button>

                  </div>
                )}

              </article>

            ))}

          </div>

        </section>
      )}

    </main>
  );
};

export default CourseDetails;