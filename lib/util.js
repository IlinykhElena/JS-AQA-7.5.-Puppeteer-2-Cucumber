const { clickElement } = require("./commands.js");

module.exports = {
  selectDateTime: async function (page, day, time) {
    await clickElement(page, day);
    await clickElement(page, time);
  },

  chooseSeat: async function (page, row, ...seats) {
    await page.waitForSelector(".buying-scheme__legend");
    for (let i = 0; i < seats.length; i++) {
      await clickElement(
        page,
        `div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${seats[i]})`
      );
      await page.waitForSelector(
        `div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${seats[i]}).buying-scheme__chair_selected`
      );
    }
    await clickElement(page, ".acceptin-button");
    await page.waitForSelector(".ticket__check-title");
    return (choosenSeat = [row, seats[i]]);
  },

  orderTickets: async function (page, row, ...seats) {
    await page.waitForSelector(".buying-scheme__legend");
    for (let i = 0; i < seats.length; i++) {
      try {
        this.chooseSeat();
      } catch (error) {
        throw new Error(`Taken seat(s)`);
      }
    }
    await clickElement(page, ".acceptin-button");
    await page.waitForSelector(".ticket__check-title");
    await clickElement(page, ".acceptin-button");
  },

  orderTickets: async function (page, row, ...seats) {
    await page.waitForSelector(".buying-scheme__legend");
    try {
      this.chooseSeat();
      this.chooseSeat();
    } catch (error) {
      throw new Error(`Taken seat(s)`);
    }
    await clickElement(page, ".acceptin-button");
    await page.waitForSelector(".ticket__check-title");
    await clickElement(page, ".acceptin-button");
  },

  checkSeatIsTaken: async function (page, row, ...seats) {
    await page.waitForSelector(".buying-scheme__wrapper");
    try {
      for (let i = 0; i < seats.length; i++) {
        await page.waitForSelector(
          `div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${seats[i]}).buying-scheme__chair_taken`
        );
      }
    } catch (error) {
      throw new Error("Free seat(s)");
    }
  },
};
