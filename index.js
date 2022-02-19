"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const csvtojson_1 = __importDefault(require("csvtojson"));
//initialize express
const app = (0, express_1.default)();
//create port
const PORT = 5000;
//conversion route
app.get('/convert', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Get file path
        const csvFilePath = path_1.default.join(`${__dirname}/data.csv`);
        //check if file is a csv file
        if (!(path_1.default.extname(csvFilePath) === '.csv')) {
            //send response
            return res.send('this is not a valid CSV file');
        }
        else {
            // convert CSV to json data
            const jsonArray = yield (0, csvtojson_1.default)().fromFile(csvFilePath);
            // loop through json data
            let result = jsonArray.map((values) => {
                //check for missing phone number
                if (values.phone === undefined) {
                    //assign value to missing phone number
                    values.phone = 'Missing Data';
                }
                //return new data
                return values;
            });
            //send response
            res.send(result);
        }
    }
    catch (err) {
        console.log(err);
    }
}));
app.listen(PORT, 'localhost', () => {
    console.log(`server running on port ${PORT}`);
});
