const covid19ImpactEstimator = (data) => {
  const {
    region: { avgDailyIncomeInUsd },
    reportedCases,
    timeToElapse,
    periodType,
    population,
    totalHospitalBeds
  } = data;


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
  }

  // To estimate the number of infected people 28 days from now, as currently infected people doubles every 3 days i.e 2 to the power of 9
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** timeFactor);


  // To estimate the number of infected people 28 days from now, as currently infected people doubles every 3 days i.e 2 to the power of 9
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** timeFactor);

  // Challenge 2
  const impactRequestedTime = impact.infectionsByRequestedTime * 0.15;
  const severeImpactRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;

  impact.severeCasesByRequestedTime = Math.trunc(impactRequestedTime);
  severeImpact.severeCasesByRequestedTime = Math.trunc(severeImpactRequestedTime);

  const bedsAvailable = totalHospitalBeds * 0.35;
  const impactHospitalBedVal = bedsAvailable - impactRequestedTime;
  const severeImpactHospitalBedVal = bedsAvailable - severeImpactRequestedTime;


  impact.hospitalBedsByRequestedTime = Math.trunc(impactHospitalBedVal);
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(severeImpactHospitalBedVal);

  // Challenge 3
  const impactCasesForICU = impact.infectionsByRequestedTime * 0.5;
  const severeImpactCasesForICU = severeImpact.infectionsByRequestedTime * 0.5;
  const impactVentilator = impact.infectionsByRequestedTime * 0.02;
  const severeImpactVentilator = severeImpact.infectionsByRequestedTime * 0.02;

  impact.casesForICUByRequestedTime = Math.trunc(impactCasesForICU);
  severeImpact.casesForICUByRequestedTime = Math.trunc(severeImpactCasesForICU);

  impact.casesForVentilatorsByRequestedTime = Math.trunc(impactVentilator);
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(severeImpactVentilator);

  let newDay;
  const compute = population * avgDailyIncomeInUsd;
  if (periodType === 'months') {
    newDay = timeToElapse * 30;

    impact.dollarsInFlight = (
      Math.trunc((impact.infectionsByRequestedTime * compute) / newDay)
    );
    severeImpact.dollarsInFlight = (
      Math.trunc((severeImpact.infectionsByRequestedTime * compute) / newDay)
    );
  } else if (periodType === 'weeks') {
    newDay = timeToElapse * 7;

    impact.dollarsInFlight = (
      Math.trunc((impact.infectionsByRequestedTime * compute) / newDay)
    );
    severeImpact.dollarsInFlight = (
      Math.trunc((severeImpact.infectionsByRequestedTime * compute) / newDay)
    );
  } else if (periodType === 'days') {
    newDay = timeToElapse * 1;

    impact.dollarsInFlight = (
      Math.trunc((impact.infectionsByRequestedTime * compute) / newDay)
    );
    severeImpact.dollarsInFlight = (
      Math.trunc((severeImpact.infectionsByRequestedTime * compute) / newDay)
    );
  }

  return {
    data,
    impact,
    severeImpact
  };
};


export default covid19ImpactEstimator;
