const express = require('express')
const router = express.Router();

const getNullResponse = () => ({unix: null, natural: null})

const isUnix = date => /^\d+/.test(date);

const getFormattedDate = date => {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return `${monthNames[monthIndex]} ${day}, ${year}`;
};

const getDate = param => {
  // unix timestamps are in seconds, so we need to convert milliseconds,
  // hence multiplying by 1000
  const normalisedDate = isUnix(param) ? parseInt(param, 10) * 1000 : param;
  const d = new Date(normalisedDate); 
  
  return /invalid/i.test(d) ? getNullResponse() : {
    unix: d.getTime(),
    natural: getFormattedDate(d),
  };
};

router.get('/:date', (req, res) => {
  res.json(getDate(req.params.date));
});

module.exports = router;