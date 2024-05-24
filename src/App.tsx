import React from "react";
import "./App.css";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function App() {
  const handlePrint = () => {
    let pdfDocGenerator: TDocumentDefinitions = {
      header: [
        {
          stack: [
            {
              columns: [
                {
                  width: "*",
                  text: "OPT",
                },
                {
                  width: "*",
                  text: "OLT",
                },
                {
                  width: "*",
                  text: "NCR",
                },
                {
                  width: "*",
                  text: "Thermal",
                },
                {
                  width: "30%",
                  alignment: "right",
                  text: [{ text: "NCR No. : ", bold: true }, "QC _______________"],
                },
              ],
            },
            {
              alignment: "right",
              marginTop: 8,
              text: [{ text: "NCR No. : ", bold: true }, "_______________"],
            },
            { text: "Column/row spans", alignment: "center" },
            "Each cell-element can set a rowSpan or colSpan",
            {
              style: "tableExample",
              color: "#444",
              table: {
                widths: [200, "auto", "auto"],
                headerRows: 2,
                // keepWithHeaderRows: 1,
                body: [
                  [{ text: "Header with Colspan = 2", style: "tableHeader", colSpan: 2, alignment: "center" }, {}, { text: "Header 3", style: "tableHeader", alignment: "center" }],
                  [
                    { text: "Header 1", style: "tableHeader", alignment: "center" },
                    { text: "Header 2", style: "tableHeader", alignment: "center" },
                    { text: "Header 3", style: "tableHeader", alignment: "center" },
                  ],
                  ["Sample value 1", "Sample value 2", "Sample value 3"],
                  [{ rowSpan: 3, text: "rowSpan set to 3\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor" }, "Sample value 2", "Sample value 3"],
                  ["", "Sample value 2", "Sample value 3"],
                  ["Sample value 1", "Sample value 2", "Sample value 3"],
                  ["Sample value 1", { colSpan: 2, rowSpan: 2, text: "Both:\nrowSpan and colSpan\ncan be defined at the same time" }, ""],
                  ["Sample value 1", "", ""],
                ],
              },
            },
          ],
          fontSize: 10,
        },
      ],
      content: "Detaill",
      footer: {
        columns: ["Left part", { text: "Right part", alignment: "right" }],
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: "black",
        },
      },
      pageSize: "A4",
      pageMargins: [40, 180, 40, 60],
    };

    pdfMake.createPdf(pdfDocGenerator).open();
  };

  return (
    <div className="App-header">
      <button className="btn" onClick={handlePrint}>
        Show Report
      </button>
    </div>
  );
}

export default App;
