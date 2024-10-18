import React, { useState, useEffect } from "react";
import Table from "./Table";

function Section({ sectionData, onUpdate }) {
  const { athensTable, thessalonikiTable, summaryTable, title, crashedLink } =
    sectionData;

  // State to hold the editable title
  const [sectionTitle, setSectionTitle] = useState(title);
  const [crashed, setCrashed] = useState(crashedLink || ""); // Initialize with empty string or existing value

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

  // Function to update the types in both Thessaloniki and Summary tables based on Athens table
  const updateTablesTypes = () => {
    // Update Thessaloniki "type" field based on Athens table
    const updatedThessalonikiTable = thessalonikiTable.map((row, index) => ({
      ...row,
      type: athensTable[index]?.type || "", // Auto-populate type from Athens table
    }));

    // Update Summary "type" field based on Athens table
    const updatedSummaryTable = summaryTable.map((row, index) => ({
      ...row,
      type: athensTable[index]?.type || "", // Auto-populate type from Athens table
    }));

    // Update sectionData with the new Thessaloniki and Summary tables
    onUpdate({
      ...sectionData,
      thessalonikiTable: updatedThessalonikiTable,
      summaryTable: updatedSummaryTable,
    });
  };

  const handleCrashedLinkChange = (e) => {
    const newCrashedLink = e.target.value;
    setCrashed(newCrashedLink);

    // Update sectionData with new Crashed link
    onUpdate({
      ...sectionData,
      crashedLink: newCrashedLink,
    });
  };

  const openCrashedLink = () => {
    if (crashed && crashed.startsWith("http")) {
      window.open(crashed, "_blank");
    } else {
      alert("Invalid URL");
    }
  };

  // Effect to update both Thessaloniki and Summary tables' types whenever Athens table changes
  useEffect(() => {
    // Only update tables when Athens changes
    if (athensTable.length) {
      updateTablesTypes();
    }
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
      <div className="controls">
        <button className="add-row-button" onClick={addRowToAllTables}>
          Add Row to All Tables +
        </button>
        <div>
          <label className="crashed-label">Crashed:</label>
          <input
            type="text"
            value={crashedLink}
            onChange={handleCrashedLinkChange}
            className="crashed-input"
            placeholder="Enter Crashed Link"
          />
          <button className="open-link-button" onClick={openCrashedLink}>
            🔗
          </button>
        </div>
      </div>

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
      {/* Horizontal separation line */}
      <hr className="section-separator" />
    </div>
  );
}

export default Section;
