import React, { useState } from "react";
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
