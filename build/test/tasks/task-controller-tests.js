"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const Configs = require("../../src/configurations");
const Server = require("../../src/server");
const Database = require("../../src/database");
const Utils = require("../utils");
const configDb = Configs.getDatabaseConfig();
const database = Database.init(configDb);
const assert = chai.assert;
const serverConfig = Configs.getServerConfigs();
describe("TastController Tests", () => {
    let server;
    before(done => {
        Server.init(serverConfig, database).then(s => {
            server = s;
            done();
        });
    });
    beforeEach(done => {
        Utils.createSeedTaskData(database, done);
    });
    afterEach(done => {
        Utils.clearDatabase(database, done);
    });
});
//# sourceMappingURL=task-controller-tests.js.map