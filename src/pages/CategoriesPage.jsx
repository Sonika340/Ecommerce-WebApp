import { useEffect, useState } from "react";
import { getLayout } from "../services/api/layoutService";
import "./CategoriesPage.css";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await getLayout("categories");

      console.log("CATEGORY PAGE RESPONSE:", response);

      if (response?.success && response?.layout) {
        setCategories(response.layout.categories || []);
      }
    } catch (error) {
      console.error("CATEGORY ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="categories-page">
        <div className="categories-loading">
          <div className="loading-spinner"></div>
          <p>Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="categories-page">

      {/* Header */}
      <section className="categories-header">
        <span className="categories-tag">
          EXPLORE & LEARN
        </span>

        <h1>Course Categories</h1>

        <p>
          Explore our wide range of courses and find the right
          learning path for your goals.
        </p>
      </section>


      {/* Categories */}
      <section className="categories-container">

        {categories.length === 0 ? (
          <div className="empty-categories">
            <div className="empty-icon">📚</div>

            <h2>No Categories Available</h2>

            <p>
              Categories will appear here once they are added.
            </p>
          </div>
        ) : (
          <div className="categories-grid">

            {categories.map((category, index) => (
              <div
                className="category-card"
                key={category._id || index}
              >

                {/* Number */}
                <div className="category-number">
                  {String(index + 1).padStart(2, "0")}
                </div>


                {/* Icon */}
                <div className="category-icon">
                  📚
                </div>


                {/* Content */}
                <div className="category-content">

                  <h2>{category.title}</h2>

                  <p>
                    Explore courses and improve your skills
                    in {category.title}.
                  </p>

                </div>


                {/* Arrow */}
                <div className="category-arrow">
                  →
                </div>

              </div>
            ))}

          </div>
        )}

      </section>

    </div>
  );
};

export default CategoriesPage;