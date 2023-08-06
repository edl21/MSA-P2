import React, { useState, useEffect } from "react";
import "./HistoryPage.css";

const HistoryPage: React.FC = () => {
  // Create state for BMI history and loading status
  const [history, setHistory] = useState<BMI[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect to fetch user's BMI history when the component mounts
  useEffect(() => {
    // Retrieves a username from session storage
    const username = sessionStorage.getItem("username");

    // If no username is found, log an error and stop loading
    if (!username) {
      console.error("User not logged in");
      setLoading(false);
      return;
    }

    // Make a GET request to fetch BMI history for the logged in user
    fetch(`http://bodyhub.azurewebsites.net/api/BMI/username/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: BMI[]) => {
        // Log the raw data received from the server
        console.log("Received raw data:", JSON.stringify(data, null, 2));
        // Update the history state with the received data
        setHistory(data);
        // Stop loading
        setLoading(false);
      })
      .catch((error) => {
        // Log any error that occurred while fetching the BMI history
        console.error("An error occurred while fetching BMI history:", error);
        // Stop loading
        setLoading(false);
      });
  }, []);

  return (
    <div className="history-page">
      <h1>Your BMI and TDEE History</h1>
      {loading ? (
        // Show loading text while loading
        <div>Loading...</div>
      ) : (
        // Show history table when done loading
        <table>
          <thead>
            <tr>
              <th>Weight (kg)</th>
              <th>Height (cm)</th>
              <th>BMI Score</th>
              <th>TDEE (kcal)</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, index) => (
              <tr key={index}>
                <td>{entry.weight}</td>
                <td>{entry.height}</td>
                <td>{entry.bmiScore.toFixed(2)}</td>
                <td>{entry.tdee.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoryPage;

interface BMI {
  id: number;
  weight: number;
  height: number;
  bmiScore: number;
  tdee: number;
  Username?: string;
}
