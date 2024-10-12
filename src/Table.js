import React from "react";

function Table({ label, tableData = [], onUpdate, sectionData }) {
  if (!tableData.length) {
    return null; // Return null if no data is available to render the table
  }

  const handleInputChange = (e, rowIndex, key) => {
    const updatedTableData = [...tableData];
    updatedTableData[rowIndex][key] = e.target.value;

    // Update the section data based on the table being edited
    const updatedSection = {
      ...sectionData,
      [label === "Athens"
        ? "athensTable"
        : label === "Thessaloniki"
        ? "thessalonikiTable"
        : "summaryTable"]: updatedTableData,
    };
    onUpdate(updatedSection);
  };

  // Header titles based on the label
  const headers = {
    Athens: ["1η ΤΙΜΗ", "2η ΤΙΜΗ", "M.O", "ΤΥΠΟΣ", "Link"],
    Thessaloniki: ["1η ΤΙΜΗ", "2η ΤΙΜΗ", "M.O", "ΤΥΠΟΣ", "Link"],
    Summary: ["ΤΥΠΟΣ", "", "MOBILE.DE", "AUTOSCOUT24", ""],
  };

  return (
    <div className="table-container">
      <h3>
        {label === "Athens"
          ? "Αθήνα"
          : label === "Thessaloniki"
          ? "Θεσσαλονίκη"
          : "Summary"}
      </h3>
      <table className="table">
        <thead>
          <tr>
            {headers[label].map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(row).map((key, colIndex) => {
                const isEditable =
                  (label === "Athens" && (key === "type" || key === "link")) || // Editable type and link in Athens
                  (label === "Thessaloniki" &&
                    (key === "type" || key === "link")) || // Editable type and link in Thessaloniki
                  (label === "Summary" && key !== "type"); // All except "type" editable in Summary

                return (
                  <td key={colIndex}>
                    <input
                      type="text"
                      value={row[key]}
                      onChange={(e) => handleInputChange(e, rowIndex, key)}
                      className="table-input"
                      disabled={!isEditable} // Disable based on the criteria
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
