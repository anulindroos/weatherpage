const tableBody = document.getElementById("tablebody");
const canvasElement = document.getElementById("myChart");

const myAsyncFunction = async () => {
  console.log("Entering async function..");

  const serverResponse = await fetch(
    "http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed"
  );
  const data = await serverResponse.json();

  console.log("Data:", data);

  tableBody.textContent = "";

  data.forEach((rowData, index) => {
    const row = document.createElement("tr");

    const cellDataArray = [
      index + 1,
      rowData.device_id,
      new Date(rowData.date_time).toLocaleString(),
      "Wind speed",
      rowData.wind_speed,
    ];
    console.log("cellData", cellDataArray);

    for (cellData of cellDataArray) {
      const cell = document.createElement("td");
      const cellText = document.createTextNode(cellData);

      cell.appendChild(cellText);

      row.appendChild(cell);
    }

    tableBody.appendChild(row);
  });
  const myChart = new Chart(canvasElement, {
    type: "line",
    data: {
      labels: data.map((values) => values.date_time),
      datasets: [
        {
          label: "Wind speed (meters/second)",
          data: data.map((values) => values.wind_speed),
          backgroundColor: "#4682B4",
          borderColor: "#663399",
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              tooltipFormat: "d.L.Y HH:MM:SS",
            },
          },
        ],
      },
    },
  });
};

myAsyncFunction();
