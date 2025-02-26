const express = require('express')
const multer = require('multer')
const cors = require('cors')
const fs = require('fs')
const Tesseract = require("tesseract.js");

const app = express()
const port = 3000

app.use(cors());
const upload = multer({ dest: "uploads/" });


app.get('/', (req, res) => {
  res.json('Server is running')
})

app.post("/ocr", upload.single("image"), async (req, res) => {
  try{
    const { data: { text } } = await Tesseract.recognize(req.file.path, "eng");
    fs.unlinkSync(req.file.path);
    res.json({ extractedText: text });

    console.log('yess')
  }
  catch(error){
    console.log(`something went wrong: ${error}`)
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})