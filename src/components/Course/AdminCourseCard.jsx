import styles from "./AdminCourseCard.module.css";
import { useCourse } from "../../state-mangement/CourseContextAPI";

const AdminCourseCard = ({ course }) => {
  const { removeCourse } = useCourse();

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

  const discount =
    estimatedPrice && price
      ? Math.round(
          ((estimatedPrice - price) / estimatedPrice) * 100
        )
      : 0;

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );

    if (!confirmDelete) return;

    try {
      await removeCourse(_id);

      alert("Course deleted successfully!");
    } catch (error) {
      console.error("DELETE COURSE ERROR:", error);
      alert("Failed to delete course");
    }
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

        {/* Meta */}
        <div className={styles.meta}>

          <span className={styles.level}>
            {level}
          </span>

          <span className={styles.rating}>
            ⭐ {rating || 0}
          </span>

        </div>

        {/* Students */}
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

        {/* Delete */}
        <button
          className={styles.button}
          onClick={handleDelete}
        >
          Delete Course
        </button>

      </div>
    </div>
  );
};

export default AdminCourseCard;