const tableBody = document.getElementById("tablebody");

const myAsyncFunction = async () => {
  console.log("Entering async function..");

  const serverResponse = await fetch(
    "http://webapi19sa-1.course.tamk.cloud/v1/weather/limit/50"
  );
  const data = await serverResponse.json();

  console.log("Data:", data);

  tableBody.textContent = "";

  data.forEach((rowData, index) => {
    const row = document.createElement("tr");

    const cellDataArray = [
      index + 1,
      rowData.id,
      rowData.device_id,
      new Date(rowData.date_time).toLocaleString(),
      Object.keys(rowData.data),
      rowData.data[Object.keys(rowData.data)],
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
};

myAsyncFunction();
