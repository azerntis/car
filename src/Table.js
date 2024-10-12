import React from "react";

function Table({ label, tableData = [], onUpdate, sectionData }) {
  if (!tableData.length) {
    return null; // Return null if no data is available to render the table
  }

  const handleInputChange = (e, rowIndex, key) => {
    const updatedTableData = [...tableData];
    updatedTableData[rowIndex][key] = e.target.value;

    if (label === "Athens") {
      const updatedSummaryTable = [...sectionData.summaryTable];
      updatedSummaryTable[rowIndex].type = updatedTableData[rowIndex].type; // Auto-populate summary table type
      const updatedSection = {
        ...sectionData,
        athensTable: updatedTableData,
        summaryTable: updatedSummaryTable,
      };
      onUpdate(updatedSection);
    } else if (label === "Thessaloniki") {
      const updatedSection = {
        ...sectionData,
        thessalonikiTable: updatedTableData,
      };
      onUpdate(updatedSection);
    } else if (label === "Summary") {
      const updatedSection = {
        ...sectionData,
        summaryTable: updatedTableData,
      };
      onUpdate(updatedSection);
    }
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
              <th
                key={index}
                className={
                  header === "MOBILE.DE"
                    ? "mobile-header"
                    : header === "AUTOSCOUT24"
                    ? "autoscout-header"
                    : ""
                }
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(row).map((key, colIndex) => {
                // Define which inputs are editable
                const isEditable =
                  (label === "Summary" && key !== "type") ||
                  label !== "Summary";
                const isDisabled =
                  label !== "Summary" &&
                  (key === "one" || key === "two" || key === "mo");

                return (
                  <td key={colIndex}>
                    <input
                      type="text"
                      value={row[key]}
                      onChange={(e) => handleInputChange(e, rowIndex, key)}
                      className="table-input"
                      disabled={!isEditable || isDisabled} // Disable based on the criteria
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
