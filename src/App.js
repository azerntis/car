import React, { useState } from "react";
import Section from "./Section";
import initialData from "./data/general.json"; // Import the initial JSON file
import "./App.css";

function App() {
  const [appData, setAppData] = useState(initialData); // Use imported JSON file as initial state

  // Function to reset the application state to initial data
  const resetAppData = () => {
    const emptySection = {
      title: "Section 1",
      athensTable: [{ one: "", two: "", mo: "", type: "", link: "" }],
      thessalonikiTable: [{ one: "", two: "", mo: "", type: "", link: "" }],
      summaryTable: [
        { type: "", info1: "", mobileDe: "", autoscout24: "", info2: "" },
      ],
    };

    // Reset appData with new empty sections
    setAppData({
      ...appData,
      sections: [emptySection], // Start with one empty section
    });
  };

  const addSection = () => {
    const newSection = {
      title: `Section ${appData.sections.length + 1}`,
      athensTable: [{ one: "", two: "", mo: "", type: "", link: "" }],
      thessalonikiTable: [{ one: "", two: "", mo: "", type: "", link: "" }],
      summaryTable: [
        { type: "", info1: "", mobileDe: "", autoscout24: "", info2: "" },
      ],
    };
    setAppData({
      ...appData,
      sections: [...appData.sections, newSection],
    });
  };

  const handleUpdateSection = (updatedSection, index) => {
    const updatedSections = [...appData.sections];
    updatedSections[index] = updatedSection;
    setAppData({
      ...appData,
      sections: updatedSections,
    });
  };

  const handleGeneralTitleChange = (e) => {
    setAppData({ ...appData, generalTitle: e.target.value });
  };

  const saveData = () => {
    const filename = `${appData?.generalTitle}.json`; // Always save as general.json
    const jsonStr = JSON.stringify(appData, null, 2); // Pretty-print JSON with 2 spaces indentation
    const blob = new Blob([jsonStr], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const jsonData = JSON.parse(event.target.result);
          console.log("Parsed JSON Data:", jsonData); // Debugging line
          // Check if jsonData has the expected structure
          if (jsonData && jsonData.sections) {
            setAppData(jsonData); // Set app data with uploaded JSON
          } else {
            throw new Error("Invalid JSON structure");
          }
        } catch (error) {
          alert("Invalid JSON file. Please upload a valid JSON.");
          console.error("Error:", error); // Log error to the console
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSearch = async () => {
    // Create a copy of appData to update state later
    const updatedAppData = { ...appData };

    for (const section of updatedAppData.sections) {
      const { athensTable, thessalonikiTable } = section;
      const links = [...athensTable, ...thessalonikiTable]
        .map((row) => row.link)
        .filter((link) => link); // Extract links
      const baseApiUrl = "https://www.car.gr/api/clsfds/search/?category";

      // Process each link
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        const url = link.split("category")[1];
        const apiUrl = `${baseApiUrl}${url}&per-page=2`;
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();

          // Extract price for the first two objects or 0 if none
          const price1 = data?.data?.results?.rows[0]?.raw_price
            ? parseFloat(data.data.results.rows[0].raw_price)
            : 0;
          const price2 = data?.data?.results?.rows[1]?.raw_price
            ? parseFloat(data.data.results.rows[1].raw_price)
            : 0;

          // Calculate the average
          const average = (price1 + price2) / 2;

          // Update the corresponding rows
          if (i < athensTable.length) {
            section.athensTable = section.athensTable.map((row, index) =>
              index === i
                ? { ...row, one: price1, two: price2, mo: average }
                : row
            );
          } else {
            const thessalonikiIndex = i - athensTable.length;
            section.thessalonikiTable = section.thessalonikiTable.map(
              (row, index) =>
                index === thessalonikiIndex
                  ? { ...row, one: price1, two: price2, mo: average }
                  : row
            );
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          // In case of error, set prices to 0
          if (i < athensTable.length) {
            section.athensTable = section.athensTable.map((row, index) =>
              index === i ? { ...row, one: 0, two: 0, mo: 0 } : row
            );
          } else {
            const thessalonikiIndex = i - athensTable.length;
            section.thessalonikiTable = section.thessalonikiTable.map(
              (row, index) =>
                index === thessalonikiIndex
                  ? { ...row, one: 0, two: 0, mo: 0 }
                  : row
            );
          }
        }
      }
    }

    // Update state with the new data
    setAppData(updatedAppData);
  };

  return (
    <div className="app-container">
      <input
        type="text"
        value={appData.generalTitle}
        onChange={handleGeneralTitleChange}
        className="title-input"
      />
      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="file-upload"
      />
      <button className="save-button" onClick={saveData}>
        Save
      </button>
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
      <button className="reset-button" onClick={resetAppData}>
        Reset All
      </button>
      {appData.sections.map((section, index) => (
        <Section
          key={index}
          sectionData={section}
          onUpdate={(updatedSection) =>
            handleUpdateSection(updatedSection, index)
          }
        />
      ))}
      <button className="add-section-button" onClick={addSection}>
        Add Section +
      </button>
    </div>
  );
}

export default App;
