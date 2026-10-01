import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getLayout,
  createLayout,
  updateLayout,
} from "../../services/api/layoutService";

import Styles from "./layout.module.css";

const Layout = () => {
  const navigate = useNavigate();

  const [activeType, setActiveType] = useState("banner");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [layoutExists, setLayoutExists] = useState(false);

  // ===============================
  // BANNER STATE
  // ===============================

  const [banner, setBanner] = useState({
    image: "",
    title: "",
    subTitle: "",
  });

  // ===============================
  // FAQ STATE
  // ===============================

  const [faqs, setFaqs] = useState([
    {
      question: "",
      answer: "",
    },
  ]);

  // ===============================
  // CATEGORY STATE
  // ===============================

  const [categories, setCategories] = useState([
    {
      title: "",
    },
  ]);

  // ===============================
  // GET LAYOUT
  // ===============================

  const fetchLayout = async (type) => {
    try {
      setLoading(true);
      setLayoutExists(false);

      const response = await getLayout(type);

      console.log(`${type.toUpperCase()} LAYOUT RESPONSE:`, response);

      if (response?.success && response?.layout) {
        setLayoutExists(true);

        const layout = response.layout;

        // ---------------------------
        // BANNER
        // ---------------------------

        if (type === "banner") {
          setBanner({
            image: layout.image || "",
            title: layout.title || "",
            subTitle: layout.subTitle || "",
          });
        }

        // ---------------------------
        // FAQ
        // ---------------------------

        if (type === "faq") {
          setFaqs(
            Array.isArray(layout.faq) && layout.faq.length > 0
              ? layout.faq
              : [
                  {
                    question: "",
                    answer: "",
                  },
                ]
          );
        }

        // ---------------------------
        // CATEGORIES
        // ---------------------------

        if (type === "categories") {
          setCategories(
            Array.isArray(layout.categories) &&
              layout.categories.length > 0
              ? layout.categories
              : [
                  {
                    title: "",
                  },
                ]
          );
        }
      }
    } catch (error) {
      setLayoutExists(false);

      console.log(
        `${type.toUpperCase()} FETCH ERROR:`,
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // FETCH WHEN TAB CHANGES
  // ===============================

  useEffect(() => {
    fetchLayout(activeType);
  }, [activeType]);

  // ===============================
  // IMAGE TO BASE64
  // ===============================

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Image type validation
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      return;
    }

    // Image size validation - 5 MB
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5 MB");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setBanner((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  // ===============================
  // FAQ HANDLERS
  // ===============================

  const handleFaqChange = (index, field, value) => {
    setFaqs((prev) =>
      prev.map((faq, i) =>
        i === index
          ? {
              ...faq,
              [field]: value,
            }
          : faq
      )
    );
  };

  const addFaq = () => {
    setFaqs((prev) => [
      ...prev,
      {
        question: "",
        answer: "",
      },
    ]);
  };

  const removeFaq = (index) => {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  };

  // ===============================
  // CATEGORY HANDLERS
  // ===============================

  const handleCategoryChange = (index, value) => {
    setCategories((prev) =>
      prev.map((category, i) =>
        i === index
          ? {
              ...category,
              title: value,
            }
          : category
      )
    );
  };

  const addCategory = () => {
    setCategories((prev) => [
      ...prev,
      {
        title: "",
      },
    ]);
  };

  const removeCategory = (index) => {
    setCategories((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // ===============================
  // VALIDATION
  // ===============================

  const validateForm = () => {
    // ---------------------------
    // BANNER VALIDATION
    // ---------------------------

    if (activeType === "banner") {
      if (!banner.image) {
        toast.error("Please select a banner image");
        return false;
      }

      if (!banner.title.trim()) {
        toast.error("Please enter the banner title");
        return false;
      }

      if (!banner.subTitle.trim()) {
        toast.error("Please enter the banner subtitle");
        return false;
      }
    }

    // ---------------------------
    // FAQ VALIDATION
    // ---------------------------

    if (activeType === "faq") {
      const hasEmptyFaq = faqs.some(
        (faq) =>
          !faq.question.trim() ||
          !faq.answer.trim()
      );

      if (hasEmptyFaq) {
        toast.error(
          "Please fill in all FAQ questions and answers"
        );

        return false;
      }
    }

    // ---------------------------
    // CATEGORY VALIDATION
    // ---------------------------

    if (activeType === "categories") {
      const hasEmptyCategory = categories.some(
        (category) => !category.title.trim()
      );

      if (hasEmptyCategory) {
        toast.error("Please enter all category titles");
        return false;
      }
    }

    return true;
  };

  // ===============================
  // SAVE LAYOUT
  // ===============================

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate before API request
    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      let payload;

      // ---------------------------
      // BANNER
      // ---------------------------

      if (activeType === "banner") {
        payload = {
          type: "banner",
          image: banner.image,
          title: banner.title.trim(),
          subTitle: banner.subTitle.trim(),
        };
      }

      // ---------------------------
      // FAQ
      // ---------------------------

      if (activeType === "faq") {
        payload = {
          type: "faq",
          faq: faqs.map((faq) => ({
            question: faq.question.trim(),
            answer: faq.answer.trim(),
          })),
        };
      }

      // ---------------------------
      // CATEGORIES
      // ---------------------------

      if (activeType === "categories") {
        payload = {
          type: "categories",
          categories: categories.map((category) => ({
            title: category.title.trim(),
          })),
        };
      }

      let response;

      // ---------------------------
      // UPDATE EXISTING
      // ---------------------------

      if (layoutExists) {
        response = await updateLayout(payload);
      }

      // ---------------------------
      // CREATE NEW
      // ---------------------------

      else {
        response = await createLayout(payload);
      }

      console.log("LAYOUT SAVE RESPONSE:", response);

      // =============================
      // SUCCESS
      // =============================

      if (response?.success) {
        toast.success(
          response.message ||
            "Operation completed successfully"
        );

        setLayoutExists(true);

        // =================================
        // REDIRECT AFTER SUCCESSFUL SAVE
        // =================================

        if (activeType === "banner") {
          navigate("/");
        }

        if (activeType === "faq") {
          navigate("/faqs");
        }

        if (activeType === "categories") {
          navigate("/categories");
        }
      }
    } catch (error) {
      console.error(
        "Layout save error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  // ===============================
  // RENDER
  // ===============================

  return (
    <section className={Styles.layout}>

      {/* ===============================
          HEADER
      =============================== */}

      <div className={Styles.header}>
        <div>
          <h1>Layout Management</h1>

          <p>
            Manage homepage banner, FAQs and course
            categories
          </p>
        </div>
      </div>

      {/* ===============================
          TABS
      =============================== */}

      <div className={Styles.tabs}>

        <button
          type="button"
          className={
            activeType === "banner"
              ? Styles.activeTab
              : ""
          }
          onClick={() => setActiveType("banner")}
        >
          Banner
        </button>

        <button
          type="button"
          className={
            activeType === "faq"
              ? Styles.activeTab
              : ""
          }
          onClick={() => setActiveType("faq")}
        >
          FAQs
        </button>

        <button
          type="button"
          className={
            activeType === "categories"
              ? Styles.activeTab
              : ""
          }
          onClick={() =>
            setActiveType("categories")
          }
        >
          Categories
        </button>

      </div>

      {/* ===============================
          CONTENT
      =============================== */}

      {loading ? (
        <div className={Styles.loading}>
          Loading layout...
        </div>
      ) : (
        <form
          className={Styles.form}
          onSubmit={handleSubmit}
        >

          {/* =============================
              BANNER
          ============================= */}

          {activeType === "banner" && (
            <>
              <h2>Homepage Banner</h2>

              <div className={Styles.field}>
                <label>Banner Image</label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />

                {banner.image && (
                  <img
                    src={banner.image}
                    alt="Banner preview"
                    className={Styles.preview}
                  />
                )}
              </div>

              <div className={Styles.field}>
                <label>Title</label>

                <input
                  type="text"
                  value={banner.title}
                  onChange={(e) =>
                    setBanner((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  placeholder="Enter banner title"
                />
              </div>

              <div className={Styles.field}>
                <label>Subtitle</label>

                <input
                  type="text"
                  value={banner.subTitle}
                  onChange={(e) =>
                    setBanner((prev) => ({
                      ...prev,
                      subTitle: e.target.value,
                    }))
                  }
                  placeholder="Enter banner subtitle"
                />
              </div>
            </>
          )}

          {/* =============================
              FAQ
          ============================= */}

          {activeType === "faq" && (
            <>
              <div className={Styles.sectionHeader}>
                <h2>Frequently Asked Questions</h2>

                <button
                  type="button"
                  onClick={addFaq}
                  className={Styles.addButton}
                >
                  + Add FAQ
                </button>
              </div>

              {faqs.map((faq, index) => (
                <div
                  className={Styles.card}
                  key={index}
                >
                  <div className={Styles.cardHeader}>
                    <h3>FAQ {index + 1}</h3>

                    {faqs.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeFaq(index)
                        }
                        className={
                          Styles.deleteButton
                        }
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className={Styles.field}>
                    <label>Question</label>

                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) =>
                        handleFaqChange(
                          index,
                          "question",
                          e.target.value
                        )
                      }
                      placeholder="Enter question"
                    />
                  </div>

                  <div className={Styles.field}>
                    <label>Answer</label>

                    <textarea
                      value={faq.answer}
                      onChange={(e) =>
                        handleFaqChange(
                          index,
                          "answer",
                          e.target.value
                        )
                      }
                      placeholder="Enter answer"
                      rows="4"
                    />
                  </div>
                </div>
              ))}
            </>
          )}

          {/* =============================
              CATEGORIES
          ============================= */}

          {activeType === "categories" && (
            <>
              <div className={Styles.sectionHeader}>
                <h2>Course Categories</h2>

                <button
                  type="button"
                  onClick={addCategory}
                  className={Styles.addButton}
                >
                  + Add Category
                </button>
              </div>

              {categories.map(
                (category, index) => (
                  <div
                    className={Styles.categoryRow}
                    key={index}
                  >
                    <input
                      type="text"
                      value={category.title}
                      onChange={(e) =>
                        handleCategoryChange(
                          index,
                          e.target.value
                        )
                      }
                      placeholder="Category title"
                    />

                    {categories.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeCategory(index)
                        }
                        className={
                          Styles.deleteButton
                        }
                      >
                        Remove
                      </button>
                    )}
                  </div>
                )
              )}
            </>
          )}

          {/* =============================
              SAVE
          ============================= */}

          <button
            type="submit"
            className={Styles.saveButton}
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : layoutExists
                ? "Update Layout"
                : "Create Layout"}
          </button>

        </form>
      )}

    </section>
  );
};

export default Layout;