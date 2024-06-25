const express = require("express");
const router = express.Router();
const { cities, vehicles } = require("../gameData");

router.post("/result", (req, res) => {
  const { selections, vehicleSelections } = req.body;
  console.log(selections);
  const fugitiveCity = cities[Math.floor(Math.random() * cities.length)].name;
  let capturedBy = null;
  let allEscaped = true;
  let details = [];

  Object.keys(selections).forEach((cop) => {
    const city = selections[cop];
    const vehicle = vehicles.find((v) => v.kind === vehicleSelections[cop]);
    const cityDistance = cities.find((c) => c.name === city).distance;

    if (vehicle && vehicle.range >= cityDistance) {
      allEscaped = false; // At least one cop can reach the city
      if (city === fugitiveCity) {
        capturedBy = cop;
      }
      details.push({
        cop,
        city,
        vehicle: vehicle.kind,
        correctCity: city === fugitiveCity,
        roundTripRange: vehicle.range >= cityDistance * 2,
      });
    } else {
      details.push({
        cop,
        city,
        vehicle: vehicle.kind,
        correctCity: false,
        roundTripRange: false,
      });
    }
  });

  let resultMessage;
  if (allEscaped) {
    resultMessage = `The fugitive escaped from ${fugitiveCity}. None of the cops reached the city with a vehicle having enough range.`;
  } else if (capturedBy) {
    resultMessage = `The fugitive was captured by ${capturedBy}! They correctly guessed the city ${fugitiveCity}.`;
  } else {
    resultMessage = `No cop reached the city where the fugitive was hiding.`;
  }

  res.json({
    fugitiveCity,
    capturedBy,
    details,
    resultMessage,
  });
});

module.exports = router;
