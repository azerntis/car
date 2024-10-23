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

  const removeLastRowFromAllTables = () => {
    if (
      athensTable.length > 0 &&
      thessalonikiTable.length > 0 &&
      summaryTable.length > 0
    ) {
      const updatedAthensTable = athensTable.slice(0, -1);
      const updatedThessalonikiTable = thessalonikiTable.slice(0, -1);
      const updatedSummaryTable = summaryTable.slice(0, -1);

      onUpdate({
        ...sectionData,
        athensTable: updatedAthensTable,
        thessalonikiTable: updatedThessalonikiTable,
        summaryTable: updatedSummaryTable,
      });
    } else {
      alert("No rows to remove!");
    }
  };

  const addRowToAllTables = () => {
    const newRow = {
      one: "",
      two: "",
      mo: "",
      km1: "",
      km2: "",
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

  const openLink = (url) => {
    if (url && url.startsWith("http")) {
      console.log("Opening link:", url);
      window.open(url, "_blank");
    } else {
      alert("Invalid URL");
    }
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
          Add Row +
        </button>
        <button
          className="remove-row-button"
          onClick={removeLastRowFromAllTables}
        >
          Remove Row -
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
          <button
            className="open-link-button"
            onClick={() => openLink(crashed)}
            style={{
              padding: "4px",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            🔗
          </button>
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
