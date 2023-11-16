const puppeteer = require('puppeteer');
const express = require('express');
const router = express.Router();
const Books = require('../model/books');
module.exports = router;

router.post('/', async (req, res) =>{
  const bookarray = await getBooks('https://www.nytimes.com/books/best-sellers/');
  try {
    const savePromises = [];
    for (let i = 0; i < bookarray.length; i++) {
      const books = new Books(bookarray[i]);
      savePromises.push(books.save());
    }
    await Promise.all(savePromises); 
    res.status(201).json(savePromises);
  }
  catch(Err){
      res.status(400)
  }
})
router.get('/', async(req, res) =>{
  try{
    const allBooks = await Books.find()
    res.json(allBooks)
  }catch(Err){
    res.json({message: Err.message})
  }
})
puppeteer.registerCustomQueryHandler('getByClass',{
    queryAll: (elementOrDocument, selector) => {
      return elementOrDocument.querySelectorAll(`[class="${CSS.escape(selector)}"]`);
    }
})
puppeteer.registerCustomQueryHandler('getByItem',{
  queryAll: (elementOrDocument, selector) => {
    return elementOrDocument.querySelectorAll(`[itemprop="${CSS.escape(selector)}"]`);
  }
})
async function getBooks(url){
  try{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const getUrls = await page.$$eval('::-p-getByClass(css-nzgijy)',
    (values) => values.map(v => v.getAttribute('href')));
    let results = []
    for(const url of getUrls){
      await page.goto(`https://www.nytimes.com${url}`);
      const selectTitle = await page.$$eval('::-p-getByClass(css-5pe77f)',
      (title) => title.map(v => v.textContent));
      const selectDesc = await page.$$eval('::-p-getByClass(css-14lubdp)',
      (desc) => desc.map(v => v.textContent));
      const selectAuth = await page.$$eval('::-p-getByClass(css-hjukut)',
      (auth) => auth.map(v => v.textContent));
      const selectSection = await page.$eval('.css-68u1tu', 
      (element) => {
        for (const span of element.querySelectorAll('span.css-1dv1kvn')) {
          span.remove();
        }
        return element.textContent;
      });
      const selectImg = await page.$$eval('::-p-getByItem(image)', 
      image => image.map(v => v.getAttribute('src')));
      for(let i = 0; selectTitle.length > i; i++){
        results.push({
          Section: selectSection,
          Title: selectTitle[i],
          Description: selectDesc[i],
          Author: selectAuth[i],
          img: selectImg[i],
        });
      }
    }
      await browser.close();
      return results
    }catch(error){
      console.log(error)
    }
}

