"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Jwt = require("jsonwebtoken");
const configurations_1 = require("../configurations");
const logging_1 = require("../plugins/logging/logging");
let config = configurations_1.getServerConfigs();
//Database logging async call for storing users logs
exports.dbLogger = (userId, payload, response) => __awaiter(this, void 0, void 0, function* () {
    // create a new log
    var newLog = new logging_1.LoggingModel({ userId, payload, response });
    try {
        newLog.save();
    }
    catch (error) {
        console.log("error" + error);
    }
});
//To generate new JWT token using predefined signatire
exports.generateToken = (user) => {
    console.log(config["jwtSecret"]);
    const jwtSecret = config.jwtSecret;
    const jwtExpiration = config.jwtExpiration;
    const payload = { id: user["_id"] };
    return Jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });
};
//To obtain email domain for evaluating office domain
exports.checkEmailFormat = (email) => {
    // custom regular expression to validate email
    let emailRegex = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    let responseSet = {};
    //Preparing response set to customize this method to be more generic.
    //Where "statusCode" defines its validity and,
    //"StatusMessage" defines the message associated with it.
    try {
        let isEmail = emailRegex.test(email);
        if (isEmail) {
            responseSet["statusCode"] = isEmail;
            responseSet["statusMessage"] = "Email format is valid";
        }
        else {
            responseSet["statusCode"] = isEmail;
            responseSet["statusMessage"] = "Email format is not valid";
        }
        return responseSet;
    }
    catch (error) {
        responseSet["statusCode"] = false;
        responseSet["statusMessage"] = "Email format is not valid";
        return responseSet;
    }
};
//Sort array with key element
exports.sortArray = (key) => {
    return function (a, b) {
        if (a[key] > b[key]) {
            return 1;
        }
        else if (a[key] < b[key]) {
            return -1;
        }
        return 0;
    };
};
//Sort array with key element
exports.removeDuplicatesFromArray = (arr, key) => {
    if (!(arr instanceof Array) || key && typeof key !== 'string') {
        return false;
    }
    if (key && typeof key === 'string') {
        return arr.filter((obj, index, arr) => {
            return arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === index;
        });
    }
    else {
        return arr.filter(function (item, index, arr) {
            return arr.indexOf(item) === index;
        });
    }
};
//# sourceMappingURL=helper.js.map