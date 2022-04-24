import {Doughnut} from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
ChartJS.register(ArcElement, Tooltip);

function createColor() {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
}

const ChartModal = (props) => {

  const options = {
    plugins: {
      tooltip : {
        displayColors: false,
      }
    }
  }

  function createDoughnutRoundData(voteData) {
    let voteDataCopy = JSON.parse(JSON.stringify(voteData));
    delete voteDataCopy.Badgeholder;
    // if (project === undefined) {
    //   project = [];
    // }
    const returnData = {
    labels: [],
    datasets: [{
      data: [],
      borderWidth: 0.5,
      backgroundColor:  [
      "#0700CF",
      "#1900CF",
      "#2A00CE",
      "#3C00CE",
      "#4D00CE",
      "#5E00CD",
      "#7000CD",
      "#8100CD",
      "#9200CC",
      "#A900D3",
      "#8900CA",
      "#6B00C1",
      "#4F00B8",
      "#3500AF",
      "#1E00A6",
      "#09009D",
      "#000BA2",
      "#0020A7",
      "#0036AC",
      "#004EB1",
      "#0066B6",
      "#0080BA",
      "#0098BF"],
      hoverBackgroundColor: [
        "#0700CF80",
        "#1900CF80",
        "#2A00CE80",
        "#3C00CE80",
        "#4D00CE80",
        "#5E00CD80",
        "#7000CD80",
        "#8100CD80",
        "#9200CC80",
        "#A900D380",
        "#8900CA80",
        "#6B00C180",
        "#4F00B880",
        "#3500AF80",
        "#1E00A680",
        "#09009D80",
        "#000BA280",
        "#0020A780",
        "#0036AC80",
        "#004EB180",
        "#0066B680",
        "#0080BA80",
        "#0098BF80"],
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
        returnData.datasets[0].data.push(value[Object.keys(value).length-4]);
        // console.log(value[`${value.length-4}`]);
        // console.log(`value['${value.length-4}']`);
        console.log(value[Object.keys(value).length-4])
        // console.log(Object.entries(voteDataCopy).length - 4)
        // returnData.labels.push(legend[key]);
        returnData.labels.push(key);
        // returnData.datasets[0].backgroundColor.push(createColor());
        // returnData.datasets[0].hoverBackgroundColor.push(createColor());
      }
    }
    return returnData;
  }

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none py-5" onClick={() => {props.close()}}
      >
        <div className="relative w-auto my-6 mx-auto max-w-full max-h-screen my-5 mx-5 py-5">
          <div className="border rounded-2xl shadow-lg relative bg-white flex flex-col w-full outline-none focus:outline-none" onClick={e => {e.stopPropagation();}}>
            <div className="relative px-20 py-8 flex-auto mx-auto text-center text-xl">
              <h2 className="font-bold text-3xl my-4 text-blue-600">Voting results</h2>
              <div className="flex items-center justify-center p-2 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
                <Doughnut data={createDoughnutRoundData(props.voteData)} width={400} height={400} options={options}/>
              </div>
              <div className="mt-3">Distribution of votes</div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ChartModal;
