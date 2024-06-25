import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ResultPage = () => {
  const { state } = useLocation();
  const { selections, vehicleSelections } = state || {};
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch('http://localhost:3002/game/result', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            selections,
            vehicleSelections,
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error('Error fetching result:', error);
      }
    };

    fetchResult();
  }, [selections, vehicleSelections]);

  return (
    <div className="result-page">
      <h2>Result</h2>
      {result ? (
        <>
          <p>{result.resultMessage}</p>
          {result.details.map(detail => (
            <p key={detail.cop}>
              <strong>{detail.cop}:</strong> Chose {detail.city} with {detail.vehicle}. 
              {detail.correctCity ? (
                <span> Correctly guessed the city.</span>
              ) : (
                <span> Incorrect city choice.</span>
              )}
              {detail.roundTripRange ? (
                <span> Vehicle has enough range for a round trip.</span>
              ) : (
                <span> Vehicle does not have enough range for a round trip.</span>
              )}
            </p>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ResultPage;
