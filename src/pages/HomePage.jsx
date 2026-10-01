import { useEffect, useState } from "react";
import { getLayout } from "../services/api/layoutService";

const HomePage = () => {
  const [banner, setBanner] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchHomeLayout = async () => {
    setLoading(true);

    // =========================
    // GET BANNER
    // =========================
    try {
      const bannerResponse = await getLayout("banner");

      console.log("BANNER RESPONSE:", bannerResponse);

      if (bannerResponse?.success && bannerResponse?.layout) {
        setBanner(bannerResponse.layout);
      }
    } catch (error) {
      console.error("BANNER ERROR:", error);
      // Banner API is currently failing,
      // but don't stop FAQs and Categories.
      setBanner(null);
    }

    // =========================
    // GET FAQs
    // =========================
    try {
      const faqResponse = await getLayout("faq");

      console.log("FAQ RESPONSE:", faqResponse);

      if (faqResponse?.success && faqResponse?.layout) {
        setFaqs(faqResponse.layout.faq || []);
      }
    } catch (error) {
      console.error("FAQ ERROR:", error);
      setFaqs([]);
    }

    // =========================
    // GET CATEGORIES
    // =========================
    try {
      const categoryResponse = await getLayout("categories");

      console.log("CATEGORY RESPONSE:", categoryResponse);

      if (categoryResponse?.success && categoryResponse?.layout) {
        setCategories(categoryResponse.layout.categories || []);
      }
    } catch (error) {
      console.error("CATEGORY ERROR:", error);
      setCategories([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchHomeLayout();
  }, []);

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div style={styles.center}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>

      {/* =====================================
          BANNER
      ===================================== */}
      {banner ? (
        <section style={styles.bannerSection}>
          {banner.image && (
            <img
              src={banner.image}
              alt={banner.title || "Homepage Banner"}
              style={styles.bannerImage}
            />
          )}

          <div style={styles.bannerContent}>
            <h1>{banner.title}</h1>
            <p>{banner.subTitle}</p>
          </div>
        </section>
      ) : (
        <section style={styles.noBanner}>
          <h2>Banner unavailable</h2>
          <p>
            Banner data could not be loaded from the server.
          </p>
        </section>
      )}

      {/* =====================================
          CATEGORIES
      ===================================== */}
      <section style={styles.section}>
        <h2 style={styles.heading}>Course Categories</h2>

        {categories.length > 0 ? (
          <div style={styles.categoryGrid}>
            {categories.map((category, index) => (
              <div
                key={category._id || index}
                style={styles.categoryCard}
              >
                <h3>{category.title}</h3>
              </div>
            ))}
          </div>
        ) : (
          <p>No categories available.</p>
        )}
      </section>

      {/* =====================================
          FAQs
      ===================================== */}
      <section style={styles.section}>
        <h2 style={styles.heading}>Frequently Asked Questions</h2>

        {faqs.length > 0 ? (
          <div style={styles.faqContainer}>
            {faqs.map((faq, index) => (
              <div
                key={faq._id || index}
                style={styles.faqCard}
              >
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No FAQs available.</p>
        )}
      </section>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    padding: "30px",
    boxSizing: "border-box",
  },

  center: {
    minHeight: "60vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  bannerSection: {
    position: "relative",
    width: "100%",
    minHeight: "300px",
    borderRadius: "12px",
    overflow: "hidden",
    marginBottom: "40px",
  },

  bannerImage: {
    width: "100%",
    height: "350px",
    objectFit: "cover",
    display: "block",
  },

  bannerContent: {
    padding: "20px 0",
  },

  noBanner: {
    padding: "30px",
    marginBottom: "40px",
    borderRadius: "12px",
    background: "#f5f5f5",
    textAlign: "center",
  },

  section: {
    marginBottom: "45px",
  },

  heading: {
    fontSize: "28px",
    marginBottom: "20px",
  },

  categoryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "20px",
  },

  categoryCard: {
    padding: "25px",
    borderRadius: "10px",
    background: "#f5f5f5",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },

  faqContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  faqCard: {
    padding: "20px",
    borderRadius: "10px",
    background: "#f8f8f8",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
};

export default HomePage;