import React, { useState, useEffect } from "react";
import Table from "./Table";

function Section({ sectionData, onUpdate }) {
  const { athensTable, thessalonikiTable, summaryTable, title, crashedLink } =
    sectionData;

  const [sectionTitle, setSectionTitle] = useState(title);
  const [crashed, setCrashed] = useState(crashedLink || "");

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setSectionTitle(newTitle);

    onUpdate({
      ...sectionData,
      title: newTitle,
    });
  };

  const addRowToAllTables = () => {
    const newRow = {
      one: "",
      two: "",
      mo: "",
      type: "",
      link: "",
    };
    const newSummaryRow = {
      type: "",
      info1: "",
      mobileDe: {
        mobileDe1: "",
        mobileDe2: "",
      },
      autoscout24: "",
      info2: "",
    };

    const updatedAthensTable = [...athensTable, newRow];
    const updatedThessalonikiTable = [...thessalonikiTable, { ...newRow }];
    const updatedSummaryTable = [...summaryTable, newSummaryRow];

    onUpdate({
      ...sectionData,
      athensTable: updatedAthensTable,
      thessalonikiTable: updatedThessalonikiTable,
      summaryTable: updatedSummaryTable,
    });
  };

  const updateTablesTypes = () => {
    const updatedThessalonikiTable = thessalonikiTable.map((row, index) => ({
      ...row,
      type: athensTable[index]?.type || "",
    }));

    const updatedSummaryTable = summaryTable.map((row, index) => ({
      ...row,
      type: athensTable[index]?.type || "",
    }));

    onUpdate({
      ...sectionData,
      thessalonikiTable: updatedThessalonikiTable,
      summaryTable: updatedSummaryTable,
    });
  };

  useEffect(() => {
    if (athensTable.length) {
      updateTablesTypes();
    }
  }, [athensTable]);

  return (
    <div>
      <h2>
        <input
          type="text"
          value={sectionTitle}
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
            value={crashed}
            onChange={(e) => setCrashed(e.target.value)}
            className="crashed-input"
            placeholder="Enter Crashed Link"
          />
        </div>
      </div>

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
      <hr className="section-separator" />
    </div>
  );
}

export default Section;
