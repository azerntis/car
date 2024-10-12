import React, { useState, useEffect } from "react";
import Table from "./Table";

function Section({ sectionData, onUpdate }) {
  const { athensTable, thessalonikiTable, summaryTable, title } = sectionData;

  // State to hold the editable title
  const [sectionTitle, setSectionTitle] = useState(title);

  // Function to update the section title
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setSectionTitle(newTitle); // Update local state

    // Update the section data with the new title
    onUpdate({
      ...sectionData,
      title: newTitle, // Update the title in the sectionData
    });
  };

  // Function to add a new row to all tables
  const addRowToAllTables = () => {
    const newRow = { one: "", two: "", mo: "", type: "", link: "" };
    const newSummaryRow = {
      type: "", // Will be auto-populated based on Athens table
      info1: "",
      mobileDe: "",
      autoscout24: "",
      info2: "",
    };

    // Create new rows for Athens and Thessaloniki tables
    const updatedAthensTable = [...athensTable, newRow];
    const updatedThessalonikiTable = [...thessalonikiTable, { ...newRow }];
    const updatedSummaryTable = [...summaryTable, newSummaryRow];

    // Call onUpdate to set the new state
    onUpdate({
      ...sectionData,
      athensTable: updatedAthensTable,
      thessalonikiTable: updatedThessalonikiTable,
      summaryTable: updatedSummaryTable,
    });
  };

  // Function to update the types in the summary table based on Athens table
  const updateSummaryTypes = () => {
    const updatedSummaryTable = summaryTable.map((row, index) => ({
      ...row, // Preserve existing data in the Summary table
      type: athensTable[index]?.type || "", // Populate type from Athens table
    }));

    // Update sectionData with the new summary table
    onUpdate({
      ...sectionData,
      summaryTable: updatedSummaryTable,
    });
  };

  // Effect to update summary types whenever Athens table changes
  useEffect(() => {
    updateSummaryTypes();
  }, [athensTable]); // This will run whenever athensTable changes

  return (
    <div>
      <h2>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="section-title-input"
          placeholder="Section Title"
        />
      </h2>
      <button className="add-row-button" onClick={addRowToAllTables}>
        Add Row to All Tables +
      </button>

      {/* Flex container to hold Athens and Thessaloniki side by side */}
      <div className="tables-container">
        <Table
          label="Athens"
          tableData={athensTable}
          onUpdate={onUpdate}
          sectionData={sectionData}
        />
        <Table
          label="Thessaloniki"
          tableData={thessalonikiTable}
          onUpdate={onUpdate}
          sectionData={sectionData}
        />
      </div>

      <Table
        label="Summary"
        tableData={summaryTable}
        onUpdate={onUpdate}
        sectionData={sectionData}
      />
    </div>
  );
}

export default Section;
