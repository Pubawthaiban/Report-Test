import React from "react";
import "./App.css";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ContentTable, TDocumentDefinitions, TableCell } from "pdfmake/interfaces";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const rowsAction: string[] = [
  "Item",
  "Substance (g/m2)",
  "Type of product",
  "Lot No. (B/R, Sheet, Raw mat.)",
  "NC Date",
  "M/C. No.",
  "Width(mm.)",
  "Length(m.)",
  "Length(mm.)",
  "Number of roll",
  "Number of sheet",
  "Volume (m2)/(kg)",
  "Cost(THB)",
  "Management",
  "Responsibility by",
];
const rowsMaster: string[] = ["M/R No.", "Coater date", "M/C No.", "Team", "Width (mm.)", "Length (m.)", "Number of roll", "Volume (m2) / (kg)", "Cost (THB)", "Management", "Responsibility by"];
const rowsCost: string[] = ["Raw mat.", "Variable cost", "Full cost", "Other"];

function App() {
  const handlePrint = () => {
    console.log("Load PDF");
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
            {
              columns: [
                {
                  table: {
                    body: [
                      ["Attn :", "O Production", "O Finishing", "O Planning", "O WH"],
                      ["", "O WH FGD", "O Purchasing", "O Accounting", "O QC"],
                      ["", "O R&D", "O Sales", "", ""],
                      ["", "", "", "", ""],
                      ["Type :", "O Product in Process", "O Finish Good", "O Packaging", "O Raw Mat."],
                      ["", "O Color", "O Chemical", " ", ""],
                    ],
                  },
                  width: "*",
                  layout: "noBorders",
                },
                {
                  table: {
                    headerRows: 1,
                    widths: [55, 55, 65, 55],
                    heights: ["auto", "auto", 15, 10],
                    body: [
                      [{ text: "Approved", colSpan: 2, alignment: "center" }, {}, { text: "Issued", colSpan: 2, alignment: "center" }, {}],
                      [
                        { text: "Qc mgr.", alignment: "center" },
                        { text: "Related mgr.", alignment: "center" },
                        { text: "Mgr./Asst.mgr.", alignment: "center" },
                        { text: "Supervisor", alignment: "center" },
                      ],
                      ["", "", "", ""],
                      ["", "", "", ""],
                    ],
                  },
                  width: "auto",
                  fontSize: 9,
                },
              ],
              marginTop: 8,
            },
            {
              text: "รายงานวัตถุดิบ/ผลิตภัณฑ์ที่ไม่เป็นไปตามข้อกำหนด : Non-Conforming Report (NCR)",
              alignment: "center",
              margin: [0, 8, 0, 8],
            },
          ],
          fontSize: 7,
        },
        {
          table: {
            widths: "*",
            body: [
              ncTopicShow(),
              [
                {
                  text: "1. NC (Non-Conforming)",
                  bold: true,
                  colSpan: 2,
                },
                "",
              ],
            ],
          },
          fontSize: 7,
        },
      ],
      content: [
        {
          table: {
            widths: ["auto", "*", "*", "*", "*", "*", "*"],
            body: ncrWriteDataToTable(),
          },
          layout: {
            hLineWidth: function (i: number, node: ContentTable) {
              return i === 0 || i === node.table.body.length ? 1 : 1;
            },
            vLineWidth: function (i: number, node: ContentTable) {
              return i === 0 || i === node.table.widths?.length ? 1 : 1;
            },
            hLineColor: function (i: number, node: ContentTable) {
              return i === 0 || i === node.table.body.length ? "black" : "gray";
            },
            vLineColor: function (i: number, node: ContentTable) {
              return i === 0 || i === node.table.widths?.length ? "black" : "gray";
            },
            // hLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            // paddingLeft: function(i, node) { return 4; },
            // paddingRight: function(i, node) { return 4; },
            // paddingTop: function(i, node) { return 2; },
            // paddingBottom: function(i, node) { return 2; },
            // fillColor: function (rowIndex, node, columnIndex) { return null; }
          },
          fontSize: 6,
        },
      ],
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
      pageMargins: [0, 151.2, 0, 60],
    };

    pdfMake.createPdf(pdfDocGenerator).open();
  };

  const ncTopicShow = () => {
    return [
      {
        text: "NC type",
      },
      {
        text: "Topic",
      },
    ];
  };

  const ncrWriteDataToTable = () => {
    let tb1: TableCell[][] = [];

    rowsAction.map((header_text: string, index: number) => {
      tb1.push([
        { text: header_text, border: [true, false, true, true] },
        { text: "", border: [true, false, true, true] },
        { text: "", border: [true, false, true, true] },
        { text: "", border: [true, false, true, true] },
        { text: "", border: [true, false, true, true] },
        { text: "", border: [true, false, true, true] },
        { text: "", border: [true, false, true, true] },
      ]);
    });

    for (let i: number = 0; i <= 2; i++) {
      rowsMaster.map((header_text: string, index: number) => {
        tb1.push([
          { text: header_text, border: [true, false, true, true] },
          { text: "", border: [true, false, true, true] },
          { text: "", border: [true, false, true, true] },
          { text: "", border: [true, false, true, true] },
          { text: "", border: [true, false, true, true] },
          { text: "", border: [true, false, true, true] },
          { text: "", border: [true, false, true, true] },
        ]);
      });
    }

    return tb1;
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
