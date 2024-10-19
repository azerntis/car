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

  const handleMobileDeInputChange = (e, rowIndex, subKey) => {
    const updatedTableData = [...tableData];

    // Check if mobileDe is a string and convert it to an object if needed
    if (typeof updatedTableData[rowIndex]["mobileDe"] === "string") {
      updatedTableData[rowIndex]["mobileDe"] = {
        mobileDe1: updatedTableData[rowIndex]["mobileDe"],
        mobileDe2: "", // or some default value
      };
    }

    // Now update the appropriate mobileDe key
    updatedTableData[rowIndex]["mobileDe"] = {
      ...updatedTableData[rowIndex]["mobileDe"],
      [subKey]: e.target.value,
    };

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

  const openLink = (url) => {
    if (url && url.startsWith("http")) {
      console.log("Opening link:", url);
      window.open(url, "_blank");
    } else {
      alert("Invalid URL");
    }
  };

  const headers = {
    Athens: ["1η ΤΙΜΗ", "2η ΤΙΜΗ", "M.O", "ΤΥΠΟΣ", "Link"],
    Thessaloniki: ["1η ΤΙΜΗ", "2η ΤΙΜΗ", "M.O", "ΤΥΠΟΣ", "Link"],
    Summary: ["ΤΥΠΟΣ", "", "MOBILE.DE (1 and 2)", "AUTOSCOUT24", ""],
  };

  const greenBoldColumns = ["one", "two", "mo"];

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
                  header.includes("MOBILE.DE")
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
                  (label === "Athens" && (key === "type" || key === "link")) ||
                  (label === "Thessaloniki" && key === "link") ||
                  (label === "Summary" && key !== "type");

                const isGreenBold = greenBoldColumns.includes(key);

                if (key === "mobileDe") {
                  return (
                    <td key={colIndex}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <input
                          type="text"
                          value={
                            typeof row[key] === "object"
                              ? row[key]?.mobileDe1 || ""
                              : row[key] || ""
                          }
                          onChange={(e) =>
                            handleMobileDeInputChange(e, rowIndex, "mobileDe1")
                          }
                          className="table-input"
                          style={{ marginRight: "8px" }}
                        />
                        <button
                          className="open-link-button"
                          onClick={() =>
                            openLink(
                              typeof row[key] === "object"
                                ? row[key]?.mobileDe1 || ""
                                : row[key] || ""
                            )
                          }
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

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "5px",
                        }}
                      >
                        <input
                          type="text"
                          value={
                            typeof row[key] === "object"
                              ? row[key]?.mobileDe2 || ""
                              : ""
                          }
                          onChange={(e) =>
                            handleMobileDeInputChange(e, rowIndex, "mobileDe2")
                          }
                          className="table-input"
                          style={{ marginRight: "8px" }}
                        />
                        <button
                          className="open-link-button"
                          onClick={() => openLink(row[key]?.mobileDe2)}
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
                    </td>
                  );
                }

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
                      }
                    />
                    {(key === "link" || key === "autoscout24") && (
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
