const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { putText, getText } = require("../../lib/commands.js");

const {
  selectDateTime,
  orderTickets,
  checkSeatIsTaken,
} = require("../../lib/util.js");

let movieTime = "[data-seance-id='142']";
let ticketHint = "p.ticket__hint";

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 60000 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on page", async function () {
  return await this.page.goto(`http://qamid.tmweb.ru/client/index.php`, {
    setTimeout: 900000,
  });
});

When("user choose day and movie", async function () {
  //выбор дня по дате и сеанса
  return await selectDateTime(
    this.page,
    `nav.page-nav > a:nth-child(${2})`,
    movieTime
  );
});

When("user choose row and seat", async function () {
  //выбор ряда и 1 места
  return await orderTickets(this.page, 6, 5);
});

When("select row and seats", async function () {
  //выбор ряда и нескольких мест
  return await orderTickets(this.page, 10, 7, 8);
});

Then("ticket booking is confirmed", async function () {
  //подтверждение бронирования
  const actual = await getText(this.page, ticketHint);
  expect(actual).contains(
    "Покажите QR-код нашему контроллеру для подтверждения бронирования."
  );
});

Then("ticket booking is not possible", async function () {
  const buttonStatus = await this.page.$eval(
    `.acceptin-button`,
    (el) => el.disabled
  );
  expect(buttonStatus).toEqual(true);
});
