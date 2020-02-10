"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Endabgabe;
(function (Endabgabe) {
    let highscore;
    let databaseURL;
    let dbName = "Endabgabe_Datenbank";
    let dbCollection = "highscore";
    databaseURL = "mongodb+srv://TestUser:12345@cluster0-y7gg3.mongodb.net/test?retryWrites=true&w=majority";
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    startServer(port);
    console.log("Server starting on port: " + port);
    connectToDatabase(databaseURL);
    function startServer(_port) {
        let server = Http.createServer();
        server.listen(_port);
        server.addListener("request", handleRequest);
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        highscore = mongoClient.db(dbName).collection(dbCollection);
        console.log("Database connection is ", highscore != undefined);
    }
    async function handleRequest(_request, _response) {
        console.log("What's up?");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            // for (let key in url.query) {
            //     _response.write(key + ":" + url.query[key] + "<br/>");
            // }
            if (url.query["command"] == "retrieve") {
                let report = await retrieveHighscore();
                if (report == "We encountered tecnical problems. Please try again later")
                    _response.write(report);
                else
                    _response.write(JSON.stringify(report));
            }
            else {
                console.log("urlQuery: ", url.query);
                let jsonString = JSON.stringify(url.query);
                _response.write(jsonString);
                highscore.insert(url.query); // sagt was in die Collection eingetragen werden soll
                console.log(jsonString);
            }
        }
        _response.end();
    }
    async function retrieveHighscore() {
        // console.log("Asking DB about highscore ", highscore.find());
        let cursor = await highscore.find();
        let answer = await cursor.toArray();
        console.log("DB CursorToArray", answer);
        if (answer != null) {
            return answer;
        }
        else
            return "We encountered tecnical problems. Please try again later";
    }
})(Endabgabe = exports.Endabgabe || (exports.Endabgabe = {}));
// import * as Http from "http";
// import * as Url from "url";
// import * as Mongo from "mongodb";
// export namespace Endabgabe {
//     interface Order {
//         [type: string]: string | string[];
//     }
//     let highscore: Mongo.Collection;
//     let port: number | string | undefined = process.env.PORT;
//     if (port == undefined)
//         port = 5001;
//     let databaseUrl: string = "mongodb+srv://TestUser:12345@cluster0-y7gg3.mongodb.net/test?retryWrites=true&w=majority"; // Mongo DB Account !!
//     startServer(port);
//     connectToDatabase(databaseUrl);
//     function startServer(_port: number | string): void {
//         let server: Http.Server = Http.createServer();
//         console.log("Server starting on port:" + _port);
//         server.listen(_port);
//         server.addListener("request", handleRequest);
//     }
//     async function connectToDatabase(_url: string): Promise<void> {
//         let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
//         let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
//         await mongoClient.connect();
//         highscore = mongoClient.db("Endabgabe_Datenbank").collection("highscore"); // anderer name für datenbank und für collection
//         console.log("Database connection ", highscore != undefined);
//     }
//     function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void { 
//         console.log("What's up?");
//         _response.setHeader("content-type", "text/html; charset=utf-8");
//         _response.setHeader("Access-Control-Allow-Origin", "*");
//         if (_request.url) {
//             let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
//             for (let key in url.query) {
//                 _response.write(key + ":" + url.query[key] + "<br/>");
//             }
//             let jsonString: string = JSON.stringify(url.query);
//             _response.write(jsonString);
//             storeOrder(url.query);
//         }
//         _response.end();
//     }
//     function storeOrder(_order: Order): void {
//         highscore.insert(_order);
//     }
// }
//# sourceMappingURL=server.js.map