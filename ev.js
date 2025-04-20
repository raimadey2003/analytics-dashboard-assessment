document.addEventListener("DOMContentLoaded", () => {
    fetch("Electric_Vehicle_Population_data.csv")
      .then(response => response.text())
      .then(csv => {
        // const rows = csv.split("\n").slice(1); // Skip header
        const rows = csv.trim().split("\n").filter(row => {
          return !row.includes("margin:") && !row.includes("padding:") && !row.includes("outline:") && !row.includes("}");
        });
        // const data = rows.map(row => row.split(","));
  
        const makeMap = {};
        const fuelMap = {};
        const table = document.querySelector("#evTable tbody");
  
        data.slice(0, 10).forEach(row => {
          const [VIN, County, City, State, PostalCode, ModelYear, Make, Model, ElectricRange, BaseMSRP, FuelType] = row;
  
          if (Make) makeMap[Make] = (makeMap[Make] || 0) + 1;
          if (FuelType) fuelMap[FuelType] = (fuelMap[FuelType] || 0) + 1;
  
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${VIN || "-"}</td>
            <td>${Make || "-"}</td>
            <td>${Model || "-"}</td>
            <td>${ElectricRange || "-"}</td>
            <td>${City || "-"}</td>
          `;
          table.appendChild(tr);
        });
  
        renderBarChart("makeChart", makeMap);
        renderPieChart("fuelChart", fuelMap);
      });
  
    function renderBarChart(id, dataMap) {
      const ctx = document.getElementById(id).getContext("2d");
      const labels = Object.keys(dataMap).slice(0, 10);
      const data = Object.values(dataMap).slice(0, 10);
  
      new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [{
            label: "EV Count by Make",
            data,
            backgroundColor: "#3498db"
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: { beginAtZero: true }
          }
        }
      });
    }
  
    function renderPieChart(id, dataMap) {
      const ctx = document.getElementById(id).getContext("2d");
      const labels = Object.keys(dataMap);
      const data = Object.values(dataMap);
      const colors = labels.map((_, i) => `hsl(${i * 40}, 70%, 60%)`);
  
      new Chart(ctx, {
        type: "pie",
        data: {
          labels,
          datasets: [{
            label: "Fuel Type Distribution",
            data,
            backgroundColor: colors
          }]
        },
        options: {
          responsive: true
        }
      });
    }
  });

  
  document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById("makeChart").getContext("2d");
  
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Tesla", "Nissan", "Chevrolet"],
        datasets: [{
          label: "EV Count",
          data: [10, 5, 8],
          backgroundColor: "#3498db"
        }]
      },
      options: {
        responsive: true
      }
    });
  
    document.querySelector("#evTable tbody").innerHTML = `
      <tr>
        <td>12345</td><td>Tesla</td><td>Model 3</td><td>322</td><td>Seattle</td>
      </tr>
      <tr>
        <td>67890</td><td>Nissan</td><td>Leaf</td><td>151</td><td>Bellevue</td>
      </tr>
    `;
   
    
  });
 

  
  