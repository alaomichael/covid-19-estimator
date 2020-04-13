const covid19ImpactEstimator = (data) => {
  const {
    region: { avgDailyIncomeInUsd },
    reportedCases,
    timeToElapse,
    periodType,
    population,
    totalHospitalBeds
  } = data;
};

const impact = {
  currentlyInfected: 0,
  infectionsByRequestedTime: 0
};

const severeImpact = {
  currentlyInfected: 0,
  infectionsByRequestedTime: 0
};

// To estimate the number of currently infected and taking off the decimal
impact.currentlyInfected = Math.trunc(reportedCases * 10);

// To estimate the severe impact and taking off the decimal
severeImpact.currentlyInfected = Math.trunc(reportedCases * 50);

// Check if the timeToElapse is in days weeks or month
let timeFactor;
switch (periodType.trim().toLowerCase()) {
  case 'months':
    timeFactor = Math.trunc((timeToElapse * 30) / 3);
    break;
  case 'weeks':
    timeFactor = Math.trunc((timeToElapse * 7) / 3);
    break;
  case 'days':
    timeFactor = Math.trunc((timeToElapse) / 3);
    break;
  default:
};

// To estimate the number of infected people 28 days from now, as currently infected people doubles every 3 days i.e 2 to the power of 9
impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** timeFactor);


// To estimate the number of infected people 28 days from now, as currently infected people doubles every 3 days i.e 2 to the power of 9
severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** timeFactor);

export default covid19ImpactEstimator;
