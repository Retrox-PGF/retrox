export const doughnutOptions = {
  plugins: {
    tooltip : {
      displayColors: false,
    }
  }
}

const backgroundColor = ["#0700CF", "#1900CF", "#2A00CE", "#3C00CE",
                          "#4D00CE", "#5E00CD", "#7000CD", "#8100CD",
                          "#9200CC", "#A900D3", "#8900CA", "#6B00C1",
                          "#4F00B8", "#3500AF", "#1E00A6", "#09009D",
                          "#000BA2", "#0020A7", "#0036AC", "#004EB1",
                          "#0066B6", "#0080BA", "#0098BF"]

const hoverBackgroundColor = ["#0700CF80", "#1900CF80", "#2A00CE80", "#3C00CE80",
                          "#4D00CE80", "#5E00CD80", "#7000CD80", "#8100CD80",
                          "#9200CC80", "#A900D380", "#8900CA80", "#6B00C180",
                          "#4F00B880", "#3500AF80", "#1E00A680", "#09009D80",
                          "#000BA280", "#0020A780", "#0036AC80", "#004EB180",
                          "#0066B680", "#0080BA80", "#0098BF80"]

export function createDoughnutData(project) {
  console.log("project", project)
  if (project === undefined) {
    project = [];
  }
  const returnData = {
  labels: [],
  datasets: [{
    data: [],
    borderWidth: 0.5,
    backgroundColor:  backgroundColor,
    hoverBackgroundColor: hoverBackgroundColor,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }]};
  for (const [key, value] of Object.entries(project)) {
    // if (key > Object.entries(project).length - 5) {
    //   break
    // }
    if (value != null) {
      returnData.datasets[0].data.push(value);
      returnData.labels.push(key);
    }
  }
  console.log(returnData);
  return returnData;
}

export function createDoughnutRoundData(voteData) {
  let voteDataCopy = JSON.parse(JSON.stringify(voteData.nominationVotes));
  console.log(voteDataCopy);
  //delete voteDataCopy.Badgeholder;
  const returnData = {
  labels: [],
  datasets: [{
    data: [],
    borderWidth: 0.5,
    backgroundColor:  backgroundColor,
    hoverBackgroundColor: hoverBackgroundColor,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }]};
  for (const [key, value] of Object.entries(voteDataCopy)) {
    if (key == 'SUM'){
      break
    }
    if (value != null) {
      returnData.datasets[0].data.push(value);
      console.log(value)
      returnData.labels.push(key);
    }
  }
  return returnData;
}
