import { useEffect, useState } from "react";
import { getLayout } from "../services/api/layoutService";
import "./FAQPage.css";

const FAQPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  const fetchFAQs = async () => {
    try {
      const response = await getLayout("faq");

      console.log("FAQ PAGE RESPONSE:", response);

      if (response?.success && response?.layout) {
        setFaqs(response.layout.faq || []);
      }
    } catch (error) {
      console.error("FAQ ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="faq-page">
        <div className="faq-loading">
          <div className="faq-spinner"></div>
          <p>Loading FAQs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="faq-page">

      {/* =========================
          HEADER
      ========================== */}
      <section className="faq-header">

        <span className="faq-tag">
          HELP CENTER
        </span>

        <h1>Frequently Asked Questions</h1>

        <p>
          Find answers to the most common questions about
          our courses, learning platform, and services.
        </p>

      </section>


      {/* =========================
          FAQ LIST
      ========================== */}
      <section className="faq-container">

        {faqs.length === 0 ? (
          <div className="empty-faq">

            <div className="empty-faq-icon">
              ❓
            </div>

            <h2>No FAQs Available</h2>

            <p>
              Frequently asked questions will appear here
              once they are added.
            </p>

          </div>
        ) : (
          <div className="faq-list">

            {faqs.map((faq, index) => (

              <div
                className={`faq-card ${
                  openIndex === index ? "faq-open" : ""
                }`}
                key={faq._id || index}
              >

                {/* Question */}
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >

                  <div className="faq-question-left">

                    <span className="faq-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="question-text">
                      {faq.question}
                    </span>

                  </div>

                  <span className="faq-icon">
                    {openIndex === index ? "−" : "+"}
                  </span>

                </button>


                {/* Answer */}
                {openIndex === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}

              </div>

            ))}

          </div>
        )}

      </section>

    </div>
  );
};

export default FAQPage;