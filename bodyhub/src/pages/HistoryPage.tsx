import React, { useState, useEffect } from "react";

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<BMI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/BMI", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setHistory(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("An error occurred while fetching BMI history:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Your BMI History</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Weight (kg)</th>
              <th>Height (cm)</th>
              <th>BMI Score</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, index) => (
              <tr key={index}>
                <td>{new Date(entry.CreateAt).toLocaleString()}</td>
                <td>{entry.weight}</td>
                <td>{entry.height}</td>
                <td>{entry.BMIScore.toFixed(2)}</td>
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
  BMIScore: number;
  userId: number;
  CreateAt: string;
}
