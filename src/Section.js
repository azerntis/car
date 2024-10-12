import React from "react";
import Table from "./Table";

function Section({ sectionData, onUpdate }) {
  // Pass the `onUpdate` function to each `Table` component to handle changes

  const handleUpdate = (updatedSection) => {
    onUpdate(updatedSection); // Call the `onUpdate` prop when the section changes
  };

  return (
    <div>
      <input
        type="text"
        value={sectionData.title}
        onChange={(e) =>
          handleUpdate({ ...sectionData, title: e.target.value })
        }
        className="section-title-input"
      />
      <div className="tables-container">
        <Table
          label="Athens"
          tableData={sectionData.athensTable}
          onUpdate={handleUpdate}
          sectionData={sectionData}
        />
        <Table
          label="Thessaloniki"
          tableData={sectionData.thessalonikiTable}
          onUpdate={handleUpdate}
          sectionData={sectionData}
        />
      </div>
      <Table
        label="Summary"
        tableData={sectionData.summaryTable}
        onUpdate={handleUpdate}
        sectionData={sectionData}
      />
    </div>
  );
}

export default Section;
