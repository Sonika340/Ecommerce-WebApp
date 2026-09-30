import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
    getCourseById,
    editCourse,
} from "../services/api/courseService";

import styles from "./EditCourse.module.css";

const EditCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        thumbnailPublicId: "",
        tags: "",
        level: "Beginner",
        demoUrl: "",
    });

    const [benefits, setBenefits] = useState([{ title: "" }]);
    const [prerequisites, setPrerequisites] = useState([{ title: "" }]);

    const [courseData, setCourseData] = useState([
        {
            title: "",
            description: "",
            videoUrl: "",
            videoSection: "",
            videoLength: 0,
        },
    ]);

    // -----------------------------
    // Fetch course
    // -----------------------------
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);

                const response = await getCourseById(id);

                console.log("EDIT COURSE RESPONSE:", response);

                const course =
                    response?.course ||
                    response?.data?.course ||
                    response?.data ||
                    response;

                console.log("EDIT COURSE DATA:", course);

                if (!course) {
                    toast.error("Course not found");
                    navigate("/courses");
                    return;
                }

                setForm({
                    name: course.name || "",
                    description: course.description || "",
                    price: course.price ?? "",
                    estimatedPrice: course.estimatedPrice ?? "",

                    thumbnail:
                        typeof course.thumbnail === "string"
                            ? course.thumbnail
                            : course.thumbnail?.url || "",

                    thumbnailPublicId:
                        typeof course.thumbnail === "object"
                            ? course.thumbnail?.public_id || ""
                            : "",

                    tags: course.tags || "",
                    level: course.level || "Beginner",
                    demoUrl: course.demoUrl || "",
                });

                setBenefits(
                    course.benefits?.length
                        ? course.benefits.map((item) => ({
                            title:
                                typeof item === "string"
                                    ? item
                                    : item?.title || "",
                        }))
                        : [{ title: "" }]
                );

                setPrerequisites(
                    course.prerequisites?.length
                        ? course.prerequisites.map((item) => ({
                            title:
                                typeof item === "string"
                                    ? item
                                    : item?.title || "",
                        }))
                        : [{ title: "" }]
                );

                setCourseData(
                    course.courseData?.length
                        ? course.courseData.map((video) => ({
                            title: video.title || "",
                            description: video.description || "",
                            videoUrl: video.videoUrl || "",
                            videoSection: video.videoSection || "",
                            videoLength: video.videoLength ?? 0,
                        }))
                        : [
                            {
                                title: "",
                                description: "",
                                videoUrl: "",
                                videoSection: "",
                                videoLength: 0,
                            },
                        ]
                );
            } catch (error) {
                console.error("FETCH COURSE ERROR:", error);
                console.error("ERROR RESPONSE:", error?.response?.data);

                toast.error(
                    error?.response?.data?.message ||
                    "Failed to load course"
                );
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCourse();
        }
    }, [id, navigate]);

    // -----------------------------
    // Basic input handler
    // -----------------------------
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // -----------------------------
    // Benefits
    // -----------------------------
    const handleBenefitChange = (index, value) => {
        setBenefits((prev) =>
            prev.map((item, i) =>
                i === index
                    ? { ...item, title: value }
                    : item
            )
        );
    };

    const addBenefit = () => {
        setBenefits((prev) => [...prev, { title: "" }]);
    };

    const removeBenefit = (index) => {
        if (benefits.length === 1) return;

        setBenefits((prev) =>
            prev.filter((_, i) => i !== index)
        );
    };

    // -----------------------------
    // Prerequisites
    // -----------------------------
    const handlePrerequisiteChange = (index, value) => {
        setPrerequisites((prev) =>
            prev.map((item, i) =>
                i === index
                    ? { ...item, title: value }
                    : item
            )
        );
    };

    const addPrerequisite = () => {
        setPrerequisites((prev) => [
            ...prev,
            { title: "" },
        ]);
    };

    const removePrerequisite = (index) => {
        if (prerequisites.length === 1) return;

        setPrerequisites((prev) =>
            prev.filter((_, i) => i !== index)
        );
    };

    // -----------------------------
    // Course videos
    // -----------------------------
    const handleVideoChange = (
        index,
        field,
        value
    ) => {
        setCourseData((prev) =>
            prev.map((video, i) =>
                i === index
                    ? {
                        ...video,
                        [field]:
                            field === "videoLength"
                                ? Number(value)
                                : value,
                    }
                    : video
            )
        );
    };

    const addVideo = () => {
        setCourseData((prev) => [
            ...prev,
            {
                title: "",
                description: "",
                videoUrl: "",
                videoSection: "",
                videoLength: 0,
            },
        ]);
    };

    const removeVideo = (index) => {
        if (courseData.length === 1) return;

        setCourseData((prev) =>
            prev.filter((_, i) => i !== index)
        );
    };

    // -----------------------------
    // Submit
    // -----------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            const payload = {
                name: form.name,
                description: form.description,
                price: Number(form.price),
                estimatedPrice: Number(form.estimatedPrice),

                tags: form.tags,
                level: form.level,
                demoUrl: form.demoUrl,

                benefits: benefits.filter(
                    (item) => item.title.trim() !== ""
                ),

                prerequisites: prerequisites.filter(
                    (item) => item.title.trim() !== ""
                ),

                courseData: courseData.filter(
                    (video) => video.title.trim() !== ""
                ),
            };

            console.log("EDIT COURSE PAYLOAD:", payload);

            const response = await editCourse(id, payload);

            console.log("EDIT COURSE SUCCESS RESPONSE:", response);

            toast.success("Course updated successfully!");
            console.log("UPDATED COURSE FROM PUT:", response?.course);

            // navigate(`/courses/${id}`);
        } catch (error) {
            console.error("EDIT COURSE ERROR:", error);
            console.error("ERROR RESPONSE:", error?.response?.data);

            toast.error(
                error?.response?.data?.message ||
                "Failed to update course"
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className={styles.status}>
                <h2>Loading course...</h2>
            </div>
        );
    }

    return (
        <section className={styles.page}>
            <div className={styles.container}>
                <button
                    type="button"
                    className={styles.backButton}
                    onClick={() =>
                        navigate(`/courses/${id}`)
                    }
                >
                    ← Back to Course
                </button>

                <h1>Edit Course</h1>

                <form
                    onSubmit={handleSubmit}
                    className={styles.form}
                >
                    {/* BASIC INFORMATION */}
                    <div className={styles.section}>
                        <h2>Basic Information</h2>

                        <label>
                            Course Name
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label>
                            Description
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows="5"
                                required
                            />
                        </label>

                        <div className={styles.grid}>
                            <label>
                                Price
                                <input
                                    type="number"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    min="0"
                                    required
                                />
                            </label>

                            <label>
                                Estimated Price
                                <input
                                    type="number"
                                    name="estimatedPrice"
                                    value={form.estimatedPrice}
                                    onChange={handleChange}
                                    min="0"
                                    required
                                />
                            </label>
                        </div>

                        <label>
                            Thumbnail URL
                            <input
                                type="text"
                                name="thumbnail"
                                value={form.thumbnail}
                                onChange={handleChange}
                                placeholder="https://..."
                            />
                        </label>

                        <label>
                            Tags
                            <input
                                type="text"
                                name="tags"
                                value={form.tags}
                                onChange={handleChange}
                                placeholder="react, javascript, frontend"
                            />
                        </label>

                        <label>
                            Level
                            <select
                                name="level"
                                value={form.level}
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
                        </label>

                        <label>
                            Demo URL
                            <input
                                type="text"
                                name="demoUrl"
                                value={form.demoUrl}
                                onChange={handleChange}
                                placeholder="https://youtube.com/..."
                            />
                        </label>
                    </div>

                    {/* BENEFITS */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2>Benefits</h2>

                            <button
                                type="button"
                                onClick={addBenefit}
                                className={styles.smallButton}
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
                                    placeholder={`Benefit ${index + 1}`}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        removeBenefit(index)
                                    }
                                    className={styles.removeButton}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* PREREQUISITES */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2>Prerequisites</h2>

                            <button
                                type="button"
                                onClick={addPrerequisite}
                                className={styles.smallButton}
                            >
                                + Add Prerequisite
                            </button>
                        </div>

                        {prerequisites.map(
                            (item, index) => (
                                <div
                                    className={styles.dynamicRow}
                                    key={index}
                                >
                                    <input
                                        type="text"
                                        value={item.title}
                                        onChange={(e) =>
                                            handlePrerequisiteChange(
                                                index,
                                                e.target.value
                                            )
                                        }
                                        placeholder={`Prerequisite ${index + 1
                                            }`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removePrerequisite(index)
                                        }
                                        className={
                                            styles.removeButton
                                        }
                                    >
                                        Remove
                                    </button>
                                </div>
                            )
                        )}
                    </div>

                    {/* COURSE CONTENT */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2>Course Content</h2>

                            <button
                                type="button"
                                onClick={addVideo}
                                className={styles.smallButton}
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
                                                removeVideo(index)
                                            }
                                            className={
                                                styles.removeButton
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    <label>
                                        Video Title
                                        <input
                                            type="text"
                                            value={video.title}
                                            onChange={(e) =>
                                                handleVideoChange(
                                                    index,
                                                    "title",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </label>

                                    <label>
                                        Video Description
                                        <textarea
                                            value={video.description}
                                            onChange={(e) =>
                                                handleVideoChange(
                                                    index,
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            rows="3"
                                        />
                                    </label>

                                    <label>
                                        Video URL
                                        <input
                                            type="text"
                                            value={video.videoUrl}
                                            onChange={(e) =>
                                                handleVideoChange(
                                                    index,
                                                    "videoUrl",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="https://..."
                                        />
                                    </label>

                                    <div className={styles.grid}>
                                        <label>
                                            Video Section
                                            <input
                                                type="text"
                                                value={
                                                    video.videoSection
                                                }
                                                onChange={(e) =>
                                                    handleVideoChange(
                                                        index,
                                                        "videoSection",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Introduction"
                                            />
                                        </label>

                                        <label>
                                            Video Length
                                            <input
                                                type="number"
                                                value={
                                                    video.videoLength
                                                }
                                                onChange={(e) =>
                                                    handleVideoChange(
                                                        index,
                                                        "videoLength",
                                                        e.target.value
                                                    )
                                                }
                                                min="0"
                                            />
                                        </label>
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    {/* SUBMIT */}
                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={() =>
                                navigate(`/courses/${id}`)
                            }
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className={styles.saveButton}
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default EditCourse;