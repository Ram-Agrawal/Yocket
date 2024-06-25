import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const initialVehicles = [
  { kind: 'EV Bike', range: 60, count: 2, imageUrl: 'images/ev_bike.png' },
  { kind: 'EV Car', range: 100, count: 1, imageUrl: 'images/ev_car.png' },
  { kind: 'EV SUV', range: 120, count: 1, imageUrl: 'images/ev_suv.png' }
];

const cops = [
  { name: 'Cop 1', imageUrl: 'images/cop1.png' },
  { name: 'Cop 2', imageUrl: 'images/cop2.png' },
  { name: 'Cop 3', imageUrl: 'images/cop3.png' }
];

const VehicleSelection = () => {
  const { state } = useLocation();
  const { selections } = state || {};
  const [vehicleSelections, setVehicleSelections] = useState({});
  const [availableVehicles, setAvailableVehicles] = useState(initialVehicles);
  const navigate = useNavigate();

  useEffect(() => {
    const updatedVehicles = initialVehicles.map(vehicle => ({
      ...vehicle,
      count: vehicle.count - Object.values(vehicleSelections).filter(v => v === vehicle.kind).length
    }));
    setAvailableVehicles(updatedVehicles);
  }, [vehicleSelections]);

  const handleSelection = (cop, vehicleKind) => {
    setVehicleSelections(prevSelections => {
      const previousSelection = prevSelections[cop];

      if (previousSelection) {
        setAvailableVehicles(prevVehicles =>
          prevVehicles.map(vehicle =>
            vehicle.kind === previousSelection
              ? { ...vehicle, count: vehicle.count + 1 }
              : vehicle
          )
        );
      }

      setAvailableVehicles(prevVehicles =>
        prevVehicles.map(vehicle =>
          vehicle.kind === vehicleKind
            ? { ...vehicle, count: vehicle.count - 1 }
            : vehicle
        )
      );

      return { ...prevSelections, [cop]: vehicleKind };
    });
  };

  const handleSubmit = () => {
    navigate('/result', { state: { selections, vehicleSelections } });
  };

  return (
    <div className="vehicle-selection">
      <h2>Select Vehicles for Each Cop</h2>
      <div className="all-vehicles">
        {availableVehicles.map(vehicle => (
          <div key={vehicle.kind} className="vehicle">
            <img
              src={vehicle.imageUrl}
              alt={vehicle.kind}
              className="vehicle-image"
            />
            <p>{vehicle.kind}</p>
          </div>
        ))}
      </div>
      <div className="cop-vehicles">
        {cops.map((cop, index) => (
          <div key={cop.name} className="cop-vehicle">
            <img
              src={cop.imageUrl}
              alt={cop.name}
              className="cop-image"
            />
            <div className="vehicle-select">
              <label>{cop.name}:</label>
              <select
                value={vehicleSelections[cop.name] || ''}
                onChange={(e) => handleSelection(cop.name, e.target.value)}
              >
                <option value="">Select Vehicle</option>
                {availableVehicles
                  .filter(vehicle => vehicle.count > 0 || vehicle.kind === vehicleSelections[cop.name])
                  .map(vehicle => (
                    <option key={vehicle.kind} value={vehicle.kind}>
                      {vehicle.kind}
                    </option>
                  ))}
              </select>
              {vehicleSelections[cop.name] && (
                <div className="vehicle-info">
                  <p>Selected Vehicle: {vehicleSelections[cop.name]}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="button-container">
        <button onClick={handleSubmit} className="next-button">Next</button>
      </div>
    </div>
  );
};

export default VehicleSelection;
