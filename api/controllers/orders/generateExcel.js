const xl = require("excel4node");
const sequelize = require("sequelize");

const { Op } = sequelize;

const OrdersModel = require("../../models/orders");

exports.generate_excel = (req, res) => {
  const { query } = req;

  const paramsToFindAllFx = {};

  // Sorting
  if (query.direction === "desc" || query.direction === "asc") {
    paramsToFindAllFx.order = [[query.active, query.direction]];
  }

  // Filter by date
  if (query.isFilterByDate === "true") {
    paramsToFindAllFx.where = {
      datum: {
        [Op.between]: [query.startDate, query.endDate],
      },
    };
  }

  // Filter by product name
  if (
    query.isFilterByProduct === "true" &&
    paramsToFindAllFx.hasOwnProperty("where") === false
  ) {
    paramsToFindAllFx.where = {
      termekneve: query.productName,
    };
  } else if (
    query.isFilterByProduct === "true" &&
    paramsToFindAllFx.hasOwnProperty("where") === true
  ) {
    paramsToFindAllFx.where.termekneve = query.productName;
  }

  // Filter by billing name
  if (
    query.isFilterByName === "true" &&
    paramsToFindAllFx.hasOwnProperty("where") === false
  ) {
    paramsToFindAllFx.where = {
      szamlazasinev: query.billingName,
    };
  } else if (
    query.isFilterByName === "true" &&
    paramsToFindAllFx.hasOwnProperty("where") === true
  ) {
    paramsToFindAllFx.where.szamlazasinev = query.billingName;
  }

  OrdersModel.findAll(paramsToFindAllFx)
    .then((orders) => {
      // Create a new instance of a Workbook class
      const wb = new xl.Workbook();
      // Add Worksheets to the workbook
      const ws = wb.addWorksheet("Sheet 1");

      const columnHeaders = orders[0]._options.attributes;

      for (let i = 0; i < columnHeaders.length; i += 1) {
        ws.cell(1, i + 1).string(columnHeaders[i]);

        for (let j = 0; j < orders.length; j += 1) {
          const headerNames = columnHeaders[i];

          if (
            typeof orders[j][headerNames] === "number" &&
            headerNames !== "megerkezett"
          ) {
            ws.cell(j + 2, i + 1).number(orders[j][headerNames]);
          } else if (
            typeof orders[j][headerNames] === "number" &&
            headerNames === "megerkezett"
          ) {
            switch (orders[j][headerNames]) {
              case 0:
                ws.cell(j + 2, i + 1).string("nem");
                break;
              case 1:
                ws.cell(j + 2, i + 1).string("igen");
                break;

              default:
                break;
            }
          } else if (
            typeof orders[j][headerNames] === "string" &&
            headerNames !== "allapot"
          ) {
            ws.cell(j + 2, i + 1).string(orders[j][headerNames]);
          } else if (
            typeof orders[j][headerNames] === "string" &&
            headerNames === "allapot"
          ) {
            const states = [
              { name: "Ez az állapot nem létezik! ", value: "missing-status" },
              { name: "Fizetésre vár", value: "on-hold" },
              { name: "Fizetésre vár (készpénz)", value: "processing" },
              { name: "Teljesítve", value: "completed" },
              { name: "Visszamondva", value: "cancelled" },
              { name: "Visszatérítve", value: "refunded" },
              { name: "Sikertelen", value: "failed" },
              { name: "Fizetés folyamatban", value: "pending" },
            ];

            switch (orders[j][headerNames]) {
              case states[0].value:
                ws.cell(j + 2, i + 1).string(states[0].name);
                break;
              case states[1].value:
                ws.cell(j + 2, i + 1).string(states[1].name);
                break;
              case states[2].value:
                ws.cell(j + 2, i + 1).string(states[2].name);
                break;
              case states[3].value:
                ws.cell(j + 2, i + 1).string(states[3].name);
                break;
              case states[4].value:
                ws.cell(j + 2, i + 1).string(states[4].name);
                break;
              case states[5].value:
                ws.cell(j + 2, i + 1).string(states[5].name);
                break;
              case states[6].value:
                ws.cell(j + 2, i + 1).string(states[6].name);
                break;
              case states[7].value:
                ws.cell(j + 2, i + 1).string(states[7].name);
                break;

              default:
                break;
            }
          }
        }
      }
      const date = new Date();
      const excelName = `nodejs-project_rendelesek_${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}-${Date.now()}`;
      wb.write(`${excelName}.xlsx`, res);
    })
    .catch((err) => console.log(err));
};
