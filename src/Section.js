import React from "react";
import Table from "./Table";

function Section({ sectionData, onUpdate }) {
  const { athensTable, thessalonikiTable, summaryTable } = sectionData;

  // Function to add a new row to all tables
  const addRowToAllTables = () => {
    const newRow = { one: "", two: "", mo: "", type: "", link: "" };
    const newSummaryRow = {
      type: "",
      info1: "",
      mobileDe: "",
      autoscout24: "",
      info2: "",
    };

    // Update Athens Table
    const updatedAthensTable = [...athensTable, newRow];
    // Update Thessaloniki Table
    const updatedThessalonikiTable = [...thessalonikiTable, newRow];
    // Update Summary Table
    const updatedSummaryTable = [...summaryTable, newSummaryRow];

    // Call onUpdate to set the new state
    onUpdate({
      ...sectionData,
      athensTable: updatedAthensTable,
      thessalonikiTable: updatedThessalonikiTable,
      summaryTable: updatedSummaryTable,
    });
  };

  return (
    <div>
      <h2>Section Title</h2>
      <button className="add-row-button" onClick={addRowToAllTables}>
        Add Row to All Tables
      </button>
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
