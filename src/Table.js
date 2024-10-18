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

  // List of headers to apply bold and green color
  const greenBoldColumns = ["one", "two", "mo"];

  // Function to open the link in a new tab
  const openLink = (url) => {
    if (url && url.startsWith("http")) {
      window.open(url, "_blank");
    } else {
      alert("Invalid URL");
    }
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
                className={
                  header === "MOBILE.DE"
                    ? "mobile-header"
                    : header === "AUTOSCOUT24"
                    ? "autoscout-header"
                    : ""
                }
                key={index}
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
                const isEditable =
                  (label === "Athens" && (key === "type" || key === "link")) || // Editable type and link in Athens
                  (label === "Thessaloniki" && key === "link") || // Editable link only in Thessaloniki
                  (label === "Summary" && key !== "type");

                const isGreenBold = greenBoldColumns.includes(key);

                const isLinkColumn =
                  key === "mobileDe" || key === "autoscout24" || key === "link";

                return (
                  <td key={colIndex}>
                    <input
                      type="text"
                      value={row[key]}
                      onChange={(e) => handleInputChange(e, rowIndex, key)}
                      className={`table-input ${
                        isGreenBold ? "green-bold" : ""
                      }`}
                      disabled={
                        !isEditable ||
                        (label === "Thessaloniki" && key === "type")
                      } // Disable "type" in Thessaloniki
                    />
                    {isLinkColumn && (
                      <button
                        className="open-link-button"
                        onClick={() => openLink(row[key])}
                        style={{
                          marginLeft: "8px",
                          padding: "4px",
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        🔗
                      </button>
                    )}
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
