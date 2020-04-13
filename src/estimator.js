const covid19ImpactEstimator = (data) => data;

let impact = {
  currentlyInfected: 0,
  infectionsByRequestedTime: 0
};

let severeImpact = {
    currentlyInfected: 0,
    infectionsByRequestedTime: 0
};

// To estimate the number of currently infected
impact.currentlyInfected = covid19ImpactEstimator.reportedCases * 10;

// To estimate the number of infected people 28 days from now, as currently infected people doubles every 3 days i.e 2 to the power of 9
impact.infectionsByRequestedTime = impact.currentlyInfected * 512;

// To estimate the severe impact
severeImpact.currentlyInfected = covid19ImpactEstimator.reportedCases * 50;

// To estimate the number of infected people 28 days from now, as currently infected people doubles every 3 days i.e 2 to the power of 9
severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 512;
export default covid19ImpactEstimator;
