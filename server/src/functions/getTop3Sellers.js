const puppeteer = require("puppeteer");
const fetch = require("node-fetch");
const connection = require("../database/connection");
module.exports = {
  async getTopSellers() {
    const top3 = [];
    const highlightDay = "2020-06-21";

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      `https://www.amazon.com/charts/${highlightDay}/mostsold/fiction?ref=chrt_bk_nav_fwd`
    );

    for (let i = 1; i <= 3; i++) {
      const [book] = await page.$x(
        `//*[@id="rank${i}"]/div[1]/div[2]/div/a[1]`
      );
      const bookURL = await book.getProperty("href");
      const newURL = await bookURL.jsonValue();

      await page.goto(newURL);

      const [imageUrl] = await page.$x('//*[@id="ebooksImgBlkFront"]');
      const src = await imageUrl.getProperty("src");
      const url = await src.jsonValue();

      const [bookTitle] = await page.$x('//*[@id="productTitle"]');
      const book_title = await bookTitle.getProperty("innerText");
      const untreatedTitle = await book_title.jsonValue();
      const untrimmedTitle = untreatedTitle.replace(/ *\([^)]*\) */g, ""); // remove the parenthesis and the content inside it, like '(A Hunger Games Novel)'
      const title = await untrimmedTitle.trim();

      const OLID = await (async function getBookOLID(title) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const treatedTitle = title.replace(/ /, "+");
        await page.goto(
          `https://openlibrary.org/search?q=title%3A+%22${treatedTitle}%22&mode=everything`
        );

        await page.waitFor("#siteSearch");

        const [OLBook] = await page.$x('//*[@id="siteSearch"]/li[1]/span[1]/a');
        const OLBookSRC = await OLBook.getProperty("href");
        const OLBookURL = await OLBookSRC.jsonValue();

        let OLID = OLBookURL.replace("https://openlibrary.org/works/", "");

        await browser.close();

        return OLID;
      })(title);

      const subjects = await fetch(`https://openlibrary.org/works/${OLID}.json`)
        .then((res) => res.json())
        .then((res) => {
          const subs = res.subjects;
          subs !== undefined ? stringSubs = subs.join(', ') : stringSubs = subs; 
          return stringSubs;
        });

      const frame = page
        .frames()
        .find((frame) => frame.name() === "bookDesc_iframe");
      const description = await frame.$eval(
        "#iframeContent",
        (element) => element.textContent
      );
      
      const [bookAuthor] = await page.$x(
        '//*[@id="authorFollow_feature_div"]/div[1]/div[2]/a'
      );
      const book_author = await bookAuthor.getProperty("innerText");
      const author = await book_author.jsonValue();

      const bestSeller = {
        url,
        title,
        description,
        subjects,
        author,
        position: i,
        OLID,
        highlighted_at: highlightDay,
      };
      top3.push(bestSeller);

      await connection("discover").insert({
        book_olid: OLID,
        book_title: title,
        book_cover_url: url,
        book_description: description,
        book_subjects: subjects,
        position: i,
        book_author: author,
        book_highlighted_at: highlightDay,
      });

      await page.goBack();
    }
    console.log(top3);

    browser.close();
  },
};
