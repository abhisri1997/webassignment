const url = require("url");
const { timeForOneCity } = require("./timeZone");

function serveOneCity(request, response) {
  try {
    const query = url.parse(request.url, true).query;
    const city = query.city;
    const output = JSON.stringify(timeForOneCity(city));
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(output);
  } catch (error) {
    console.error(error);
    response.writeHead(500);
    response.end(error.message);
  }
}
module.exports = serveOneCity;
