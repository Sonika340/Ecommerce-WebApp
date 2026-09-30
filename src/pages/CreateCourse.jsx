import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createCourse } from "../services/api/courseService";

import styles from "./CreateCourse.module.css";

const CreateCourse = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    thumbnail: "",
    tags: "",
    level: "Beginner",
    demoUrl: "",
  });

  const [benefits, setBenefits] = useState([
    {
      title: "",
    },
  ]);

  const [prerequisites, setPrerequisites] = useState([
    {
      title: "",
    },
  ]);

  const [courseData, setCourseData] = useState([
    {
      title: "",
      description: "",
      videoUrl: "",
      videoSection: "",
      videoLength: "",
    },
  ]);

  // ==========================================
  // BASIC INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // BENEFITS
  // ==========================================

  const handleBenefitChange = (index, value) => {
    const updatedBenefits = [...benefits];

    updatedBenefits[index].title = value;

    setBenefits(updatedBenefits);
  };

  const addBenefit = () => {
    setBenefits([
      ...benefits,
      {
        title: "",
      },
    ]);
  };

  const removeBenefit = (index) => {
    if (benefits.length === 1) return;

    setBenefits(
      benefits.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  // ==========================================
  // PREREQUISITES
  // ==========================================

  const handlePrerequisiteChange = (index, value) => {
    const updatedPrerequisites = [...prerequisites];

    updatedPrerequisites[index].title = value;

    setPrerequisites(updatedPrerequisites);
  };

  const addPrerequisite = () => {
    setPrerequisites([
      ...prerequisites,
      {
        title: "",
      },
    ]);
  };

  const removePrerequisite = (index) => {
    if (prerequisites.length === 1) return;

    setPrerequisites(
      prerequisites.filter(
        (_, itemIndex) => itemIndex !== index
      )
    );
  };

  // ==========================================
  // COURSE DATA / VIDEOS
  // ==========================================

  const handleCourseDataChange = (
    index,
    field,
    value
  ) => {
    const updatedCourseData = [...courseData];

    updatedCourseData[index][field] = value;

    setCourseData(updatedCourseData);
  };

  const addCourseVideo = () => {
    setCourseData([
      ...courseData,
      {
        title: "",
        description: "",
        videoUrl: "",
        videoSection: "",
        videoLength: "",
      },
    ]);
  };

  const removeCourseVideo = (index) => {
    if (courseData.length === 1) return;

    setCourseData(
      courseData.filter(
        (_, itemIndex) => itemIndex !== index
      )
    );
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        name: formData.name.trim(),

        description: formData.description.trim(),

        price: Number(formData.price),

        estimatedPrice: Number(
          formData.estimatedPrice
        ),

        thumbnail: formData.thumbnail.trim(),

        tags: formData.tags.trim(),

        level: formData.level,

        demoUrl: formData.demoUrl.trim(),

        benefits: benefits.filter(
          (item) => item.title.trim() !== ""
        ),

        prerequisites: prerequisites.filter(
          (item) => item.title.trim() !== ""
        ),

        courseData: courseData
          .filter(
            (item) =>
              item.title.trim() !== ""
          )
          .map((item) => ({
            title: item.title.trim(),

            description:
              item.description.trim(),

            videoUrl:
              item.videoUrl.trim(),

            videoSection:
              item.videoSection.trim(),

            videoLength: Number(
              item.videoLength
            ),
          })),
      };

      console.log(
        "CREATE COURSE PAYLOAD:",
        payload
      );

      const response =
        await createCourse(payload);

      console.log(
        "CREATE COURSE RESPONSE:",
        response
      );

      toast.success(
        response?.message ||
          "Course created successfully"
      );

      navigate("/courses");

    } catch (error) {
      console.error(
        "CREATE COURSE ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to create course"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>

      <div className={styles.header}>
        <h1>Create Course</h1>

        <p>
          Create a new course using the course API.
        </p>
      </div>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >

        {/* ================================= */}
        {/* BASIC COURSE INFORMATION */}
        {/* ================================= */}

        <section className={styles.section}>

          <h2>Course Information</h2>

          <div className={styles.grid}>

            <div className={styles.field}>
              <label>
                Course Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter course name"
                required
              />
            </div>


            <div className={styles.field}>
              <label>
                Level
              </label>

              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
              >
                <option value="Beginner">
                  Beginner
                </option>

                <option value="Intermediate">
                  Intermediate
                </option>

                <option value="Advanced">
                  Advanced
                </option>
              </select>
            </div>


            <div className={styles.field}>
              <label>
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="59.99"
                min="0"
                step="0.01"
                required
              />
            </div>


            <div className={styles.field}>
              <label>
                Estimated Price
              </label>

              <input
                type="number"
                name="estimatedPrice"
                value={formData.estimatedPrice}
                onChange={handleChange}
                placeholder="129.99"
                min="0"
                step="0.01"
                required
              />
            </div>

          </div>


          <div className={styles.field}>
            <label>
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your course"
              rows="5"
              required
            />
          </div>


          <div className={styles.field}>
            <label>
              Thumbnail URL
            </label>

            <input
              type="url"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="https://example.com/course.jpg"
              required
            />
          </div>


          <div className={styles.field}>
            <label>
              Tags
            </label>

            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="react, javascript, frontend"
            />

            <small>
              Separate tags with commas.
            </small>
          </div>


          <div className={styles.field}>
            <label>
              Demo URL
            </label>

            <input
              type="url"
              name="demoUrl"
              value={formData.demoUrl}
              onChange={handleChange}
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>

        </section>


        {/* ================================= */}
        {/* BENEFITS */}
        {/* ================================= */}

        <section className={styles.section}>

          <div className={styles.sectionHeader}>

            <h2>
              What Students Will Learn
            </h2>

            <button
              type="button"
              onClick={addBenefit}
              className={styles.secondaryButton}
            >
              + Add Benefit
            </button>

          </div>


          {benefits.map((benefit, index) => (
            <div
              className={styles.dynamicRow}
              key={index}
            >

              <input
                type="text"
                value={benefit.title}
                onChange={(e) =>
                  handleBenefitChange(
                    index,
                    e.target.value
                  )
                }
                placeholder="Example: Build production React applications"
                required
              />

              <button
                type="button"
                onClick={() =>
                  removeBenefit(index)
                }
                className={styles.deleteButton}
              >
                Remove
              </button>

            </div>
          ))}

        </section>


        {/* ================================= */}
        {/* PREREQUISITES */}
        {/* ================================= */}

        <section className={styles.section}>

          <div className={styles.sectionHeader}>

            <h2>
              Prerequisites
            </h2>

            <button
              type="button"
              onClick={addPrerequisite}
              className={styles.secondaryButton}
            >
              + Add Prerequisite
            </button>

          </div>


          {prerequisites.map(
            (prerequisite, index) => (
              <div
                className={styles.dynamicRow}
                key={index}
              >

                <input
                  type="text"
                  value={prerequisite.title}
                  onChange={(e) =>
                    handlePrerequisiteChange(
                      index,
                      e.target.value
                    )
                  }
                  placeholder="Example: Basic JavaScript knowledge"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    removePrerequisite(index)
                  }
                  className={styles.deleteButton}
                >
                  Remove
                </button>

              </div>
            )
          )}

        </section>


        {/* ================================= */}
        {/* COURSE VIDEOS */}
        {/* ================================= */}

        <section className={styles.section}>

          <div className={styles.sectionHeader}>

            <h2>
              Course Content
            </h2>

            <button
              type="button"
              onClick={addCourseVideo}
              className={styles.secondaryButton}
            >
              + Add Video
            </button>

          </div>


          {courseData.map(
            (video, index) => (
              <div
                className={styles.videoCard}
                key={index}
              >

                <div className={styles.videoHeader}>

                  <h3>
                    Video {index + 1}
                  </h3>

                  <button
                    type="button"
                    onClick={() =>
                      removeCourseVideo(index)
                    }
                    className={styles.deleteButton}
                  >
                    Remove
                  </button>

                </div>


                <div className={styles.field}>
                  <label>
                    Video Title
                  </label>

                  <input
                    type="text"
                    value={video.title}
                    onChange={(e) =>
                      handleCourseDataChange(
                        index,
                        "title",
                        e.target.value
                      )
                    }
                    placeholder="Introduction to React"
                    required
                  />
                </div>


                <div className={styles.field}>
                  <label>
                    Video Description
                  </label>

                  <textarea
                    value={video.description}
                    onChange={(e) =>
                      handleCourseDataChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="What this lesson covers"
                    rows="3"
                    required
                  />
                </div>


                <div className={styles.grid}>

                  <div className={styles.field}>
                    <label>
                      Video URL
                    </label>

                    <input
                      type="url"
                      value={video.videoUrl}
                      onChange={(e) =>
                        handleCourseDataChange(
                          index,
                          "videoUrl",
                          e.target.value
                        )
                      }
                      placeholder="https://..."
                      required
                    />
                  </div>


                  <div className={styles.field}>
                    <label>
                      Video Section
                    </label>

                    <input
                      type="text"
                      value={video.videoSection}
                      onChange={(e) =>
                        handleCourseDataChange(
                          index,
                          "videoSection",
                          e.target.value
                        )
                      }
                      placeholder="Introduction"
                      required
                    />
                  </div>


                  <div className={styles.field}>
                    <label>
                      Video Length
                    </label>

                    <input
                      type="number"
                      value={video.videoLength}
                      onChange={(e) =>
                        handleCourseDataChange(
                          index,
                          "videoLength",
                          e.target.value
                        )
                      }
                      placeholder="10"
                      min="0"
                      required
                    />
                  </div>

                </div>

              </div>
            )
          )}

        </section>


        {/* ================================= */}
        {/* SUBMIT */}
        {/* ================================= */}

        <div className={styles.actions}>

          <button
            type="button"
            className={styles.cancelButton}
            onClick={() =>
              navigate("/admin/admin-dashboard")
            }
          >
            Cancel
          </button>


          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading
              ? "Creating Course..."
              : "Create Course"}
          </button>

        </div>

      </form>

    </main>
  );
};

export default CreateCourse;