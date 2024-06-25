import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const cities = [
  {
    name: "Yapkashnagar",
    distance: 60,
    description: "Glowing alleys and rooftop races, powered by solar energy.",
    imageUrl: "images/Yapkashnagar.png",
  },
  {
    name: "Lihaspur",
    distance: 50,
    description: "Ancient temples shrouded in fog, whispers of forgotten tech.",
    imageUrl: "images/Lihaspur.png",
  },
  {
    name: "Narmis City",
    distance: 40,
    description: "Towering skyscrapers and hidden underground networks.",
    imageUrl: "images/Narmis.png",
  },
  {
    name: "Shekharvati",
    distance: 30,
    description: "Rolling hills and forgotten mining tunnels.",
    imageUrl: "images/Shekharvati.png",
  },
  {
    name: "Nuravgram",
    distance: 20,
    description: "Talking robots and malfunctioning AI guardians.",
    imageUrl: "images/Nuravgram.png",
  },
];

const cops = [
  {
    name: "Cop 1",
    imageUrl: "images/cop1.png",
  },
  {
    name: "Cop 2",
    imageUrl: "images/cop2.png",
  },
  {
    name: "Cop 3",
    imageUrl: "images/cop3.png",
  },
];

const CitySelection = () => {
  const [selections, setSelections] = useState({});
  const navigate = useNavigate();

  const handleSelection = (cop, city) => {
    setSelections((prevSelections) => ({ ...prevSelections, [cop]: city }));
  };

  const handleSubmit = () => {
    const uniqueCities = new Set(Object.values(selections));
    if (uniqueCities.size === Object.keys(selections).length) {
      navigate("/vehicle-selection", { state: { selections } });
    } else {
      alert("Each cop must select a unique city");
    }
  };

  return (
    <div className="city-selection">
      <h2>Select Cities for Each Cop</h2>
      <div className="city-list">
        {cities.map((city) => (
          <div key={city.name} className="city-card">
            <h3>{city.name}</h3>
            <p>{city.description}</p>
            <img
              src={city.imageUrl}
              alt={city.name}
              style={{ width: "200px", height: "150px" }}
            />
          </div>
        ))}
      </div>
      <div className="cop-selections">
        {cops.map((cop) => (
          <div key={cop.name} className="cop-selection">
            <img
              src={cop.imageUrl}
              alt={cop.name}
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
            <label>{cop.name}:</label>
            <select onChange={(e) => handleSelection(cop.name, e.target.value)}>
              <option value="">Select City</option>
              {cities
                .filter((city) => !Object.values(selections).includes(city.name)) // Filter out already selected cities
                .map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
            </select>
            {selections[cop.name] && (
              <p>
                <strong>Selected City:</strong> {selections[cop.name]}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="button-container">
        <button onClick={handleSubmit} className="next-button">Next</button>
      </div>
    </div>
  );
};

export default CitySelection;
