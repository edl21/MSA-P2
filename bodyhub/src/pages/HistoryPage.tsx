import React, { useState, useEffect } from "react";
import "./HistoryPage.css";

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<BMI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const username = sessionStorage.getItem("username");

    if (!username) {
      console.error("User not logged in");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5127/api/BMI/username/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: BMI[]) => {
        console.log("Received raw data:", JSON.stringify(data, null, 2)); // Log the raw data
        setHistory(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("An error occurred while fetching BMI history:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="history-page">
      <h1>Your BMI and TDEE History</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
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
  bmiScore: number; // Changed from 'bmiScore' to 'BMIScore'
  tdee: number;
  Username?: string;
}
