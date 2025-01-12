import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SuccessPage.css";

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offlineModal, setOfflineModal] = useState(false);
  const ITEMS_PER_PAGE = 10;

  const handleLogout = () => {
    localStorage.removeItem("uname");
    navigate("/");
  };

  const fetchData = async (page: number) => {
    setIsLoading(true);
    setError(null);
    setOfflineModal(false);

    try {
      console.log(`Fetching data for page ${page}...`);

      const response = await axios.get(
        `https://7f642d9f-42a2-40f3-b22b-3e8202acf71c.mock.pstmn.io/people/?page=${page}`
      );
      console.log("API response:", response.data);


      localStorage.setItem(`page-${page}`, JSON.stringify(response.data));

      setData(response.data.results);
      setTotalPages(Math.ceil(response.data.count / ITEMS_PER_PAGE));
    } catch (err) {
      setError("Failed to fetch data from the API.");
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.onLine) {
      const cachedData = localStorage.getItem(`page-${currentPage}`);
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        setData(parsedData.results);
        setTotalPages(Math.ceil(parsedData.count / ITEMS_PER_PAGE));
      } else {
        fetchData(currentPage);
      }
    } else {
      setOfflineModal(true);
    }
  }, [currentPage]);


  useEffect(() => {
    const handleOnline = () => {
      setOfflineModal(false);
      fetchData(currentPage);
    };

    const handleOffline = () => {
      setOfflineModal(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [currentPage]);

  const handlePageChange = (direction: "next" | "prev") => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="success-page">
      <h1>Welcome to the Star Wars Characters Page!</h1>

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>

      <h2>Star Wars Characters</h2>

      {isLoading && <div className="loader">Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      {!isLoading && !error && (
        <div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mass</th>
                <th>Height</th>
                <th>Hair Color</th>
                <th>Skin Color</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.mass}</td>
                    <td>{item.height}</td>
                    <td>{item.hair_color}</td>
                    <td>{item.skin_color}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No data available</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="pagination">
            <button
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange("next")}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {offlineModal && (
        <div className="offline-modal">
          <div className="modal-content">
            <img
              src="../images/offlinemodal.jpg"
              alt="Offline"
            />
            <p>You are currently offline. Please check your connection.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessPage;
