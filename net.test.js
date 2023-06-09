const { clickElement, putText, getText } = require("./lib/commands.js");
const { selectDateTime, orderTickets } = require("./lib/util.js");

let page;
let data = "nav > a:nth-child(2) > span.page-nav__day-number";
let movieTime = "[data-seance-id='156']";
let ticketHint = "p.ticket__hint";
let confirmingText =
  "Покажите QR-код нашему контроллеру для подтверждения бронирования.";

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Cinema tests", () => {
  // test("Booking one ticket for free seat", async () => {
  //   let row = 2;
  //   let seat = 2;
  //   await selectDateTime(page, data, movieTime);
  //   await orderTickets(page, row, seat);
  //   const actual = await getText(page, ticketHint);
  //   expect(actual).toContain(confirmingText);
  // }, 55000);

  test("Booking one ticket for free seat", async () => {
    let row = 2;
    let seat = 2;
    await selectDateTime(page, data, movieTime);
    await chooseSeat(page, row, seat);
    const actual = await getText(page, ticketHint);
    expect(actual).toContain(confirmingText);
  }, 55000);

  test("Booking several tickets for free seats", async () => {
    let row = 10;
    let seat1 = 7;
    let seat2 = 8;
    await selectDateTime(page, data, movieTime);
    await orderTickets(page, row, seat1, seat2);
    const actual = await getText(page, ticketHint);
    expect(actual).toContain(confirmingText);
  }, 55000);

  test("Booking ticket for taken seat ", async () => {
    let row = 7;
    let seat = 4;
    await selectDateTime(page, data, movieTime);
    await orderTickets(page, row, seat);
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await selectDateTime(page, data, movieTime);
    const classExist = await page.$eval(
      `div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${seat})`,
      (el) => el.classList.contains("buying-scheme__chair_taken")
    );
    expect(classExist).toEqual(true);
  }, 55000);
});
