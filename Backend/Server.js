import express from "express";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import mysql from "mysql2/promise";

puppeteer.use(StealthPlugin());



const app = express();
const port = 3000;

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Rumi100!!",
  database: "bazaartrack_db",
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Auto-scroll helper for lazy-loaded products
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

// Generic scraper function
async function scrapeSite(url, productSelectors, marketName, category = "Fruits & Vegetables") {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const products = [];

  try {
    console.log(` Scraping ${marketName}: ${url}`);
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
    await delay(3000);

    await autoScroll(page);

    const { itemSelector, nameSelector, priceSelector, imageSelector } = productSelectors;

    try {
      await page.waitForSelector(itemSelector, { visible: true, timeout: 30000 });
    } catch {
      console.warn(` No products found on ${marketName}`);
      return products;
    }

    const items = await page.evaluate(
      ({ itemSelector, nameSelector, priceSelector, imageSelector }) => {
        return Array.from(document.querySelectorAll(itemSelector)).map((p) => {
          const name = p.querySelector(nameSelector)?.textContent.trim() || "";
          const priceText = p.querySelector(priceSelector)?.textContent || "";
          const image = p.querySelector(imageSelector)?.src || "";
          const match = priceText.match(/[\d,.]+/);
          const price = match ? parseFloat(match[0].replace(/,/g, "")) : null;
          return { name, price, unit: "N/A", image };
        });
      },
      { itemSelector, nameSelector, priceSelector, imageSelector }
    );

    for (const item of items) {
      if (item.name && item.price) {
        products.push({
          name: item.name,
          price: item.price,
          unit: item.unit,
          category,
          product_image_url: item.image,
          market_name: marketName,
          website_url: url,
        });
      }
    }
  } catch (err) {
    console.error(` ${marketName} scrape error:`, err.message);
  } finally {
    await browser.close();
  }

  return products;
}

async function scrapeChaldal() {
  return scrapeSite("https://chaldal.com/fresh-fruit", {
    itemSelector: ".product",
    nameSelector: ".name",
    priceSelector: ".price",
    imageSelector: "img",
  }, "Chaldal");
}

async function scrapeMeenaBazar() {
  return scrapeSite("https://meenabazaronline.com/", {
    itemSelector: ".product-grid-item, .product",
    nameSelector: "h2, h3, .product-title",
    priceSelector: ".price, .product-price",
    imageSelector: "img",
  }, "MeenaBazar");
}

async function scrapeShwapno() {
  return scrapeSite(
    "https://www.shwapno.com/shop/grocery/fruits-vegetables",
    {
      itemSelector: ".product-item",
      nameSelector: ".product-item__title",
      priceSelector: ".product-item__price",
      imageSelector: ".product-item__image img",
    },
    "Shwapno"
  );
}

// For Shwapno 
// itemSelector: ".product-item",
// nameSelector: ".product-item__title",
// priceSelector: ".product-item__price",
// imageSelector: "img",



async function saveProducts(products) {
  for (const p of products) {
    try {
      const [market] = await db.query("SELECT id FROM markets WHERE name = ?", [p.market_name]);
      let marketId = market.length ? market[0].id : null;

      if (!marketId) {
        const [res] = await db.query(
          "INSERT INTO markets (name, website_url) VALUES (?, ?)",
          [p.market_name, p.website_url]
        );
        marketId = res.insertId;
      }

      const [product] = await db.query(
        "SELECT id FROM products WHERE name = ? AND category = ?",
        [p.name, p.category]
      );
      let productId = product.length ? product[0].id : null;

      if (!productId) {
        const [res] = await db.query(
          "INSERT INTO products (name, unit, category, product_image_url) VALUES (?, ?, ?, ?)",
          [p.name, p.unit, p.category, p.product_image_url]
        );
        productId = res.insertId;
      }

      const today = new Date().toISOString().split("T")[0];
      await db.query(
        "INSERT INTO prices (product_id, market_id, price, scraped_date) VALUES (?, ?, ?, ?)",
        [productId, marketId, p.price, today]
      );
    } catch (err) {
      console.error(` Error saving ${p.name}:`, err.message);
    }
  }
}


app.get("/scrape", async (req, res) => {
  console.log(" Starting scraping...");

  const chaldalProducts = await scrapeChaldal();
  const meenaProducts = await scrapeMeenaBazar();
  const shwapnoProducts = await scrapeShwapno();

  const allProducts = [...chaldalProducts, ...meenaProducts, ...shwapnoProducts];
  await saveProducts(allProducts);

  res.json({ message: "Scraping complete", total: allProducts.length });
});

app.get("/products", async (req, res) => {
  const [rows] = await db.query(`
    SELECT p.id, p.name, p.category, p.unit, p.product_image_url,
           m.name AS market, pr.price, pr.scraped_date
    FROM products p
    JOIN prices pr ON p.id = pr.product_id
    JOIN markets m ON pr.market_id = m.id
    WHERE pr.scraped_date = CURDATE()
  `);
  res.json(rows);
});

app.listen(port, () => console.log(` Server running at http://localhost:${port}`));
