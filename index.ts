import path from 'path'
import express, { Request, Response } from 'express'

import csv from 'csvtojson'

//initialize express
const app = express()

//create port
const PORT = 5000

//conversion route
app.get('/convert', async (req: Request, res: Response) => {
  try {
    //Get file path
    const csvFilePath = path.join(`${__dirname}/data.csv`)
    //check if file is a csv file
    if (!(path.extname(csvFilePath) === '.csv')) {
      //send response
      return res.send('this is not a valid CSV file')
    } else {
      // convert CSV to json data
      const jsonArray = await csv().fromFile(csvFilePath)
      // loop through json data
      let result = jsonArray.map((values) => {
        //check for missing phone number
        if (values.phone === undefined) {
          //assign value to missing phone number
          values.phone = 'Missing Data'
        }
        //return new data
        return values
      })
      //send response
      res.send(result)
    }
  } catch (err) {
    console.log(err)
  }
})

app.listen(PORT, 'localhost', () => {
  console.log(`server running on port ${PORT}`)
})
