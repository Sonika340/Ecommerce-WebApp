import { useNavigate } from "react-router-dom";
import styles from "./CourseCard.module.css";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const {
    _id,
    name,
    description,
    price,
    estimatedPrice,
    thumbnail,
    level,
    rating,
    purchased,
  } = course;

  // Calculate discount percentage
  const discount =
    estimatedPrice && price
      ? Math.round(
          ((estimatedPrice - price) / estimatedPrice) * 100
        )
      : 0;

  const handleViewCourse = () => {
    navigate(`/courses/${_id}`);
  };

  return (
    <div className={styles.card}>

      {/* Course Image */}
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={thumbnail?.url}
          alt={name}
        />
      </div>

      {/* Course Content */}
      <div className={styles.content}>

        {/* Course Name */}
        <h2 className={styles.title}>
          {name}
        </h2>

        {/* Description */}
        <p className={styles.description}>
          {description?.length > 100
            ? `${description.substring(0, 100)}...`
            : description}
        </p>

        {/* Course Meta */}
        <div className={styles.meta}>

          {/* Level */}
          <span className={styles.level}>
            {level}
          </span>

          {/* Rating */}
          <span className={styles.rating}>
            ⭐ {rating || 0}
          </span>

        </div>

        {/* Purchased */}
        <p className={styles.students}>
          {purchased || 0} students enrolled
        </p>

        {/* Price */}
        <div className={styles.priceWrapper}>

          <strong className={styles.price}>
            ₹{price}
          </strong>

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

        {/* Button */}
        <button
          className={styles.button}
          onClick={handleViewCourse}
        >
          View Course
        </button>

      </div>
    </div>
  );
};

export default CourseCard;