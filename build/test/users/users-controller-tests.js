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
const chai = require("chai");
const Configs = require("../../src/configurations");
const Server = require("../../src/server");
const Database = require("../../src/database");
const Utils = require("../utils");
const configDb = Configs.getDatabaseConfig();
const database = Database.init(configDb);
const assert = chai.assert;
const serverConfig = Configs.getServerConfigs();
describe("UserController Tests", () => {
    let server;
    before(done => {
        Server.init(serverConfig, database).then(s => {
            server = s;
            done();
        });
    });
    beforeEach(done => {
        Utils.createSeedUserData(database, done);
    });
    afterEach(done => {
        Utils.clearDatabase(database, done);
    });
    it("Create user", () => __awaiter(this, void 0, void 0, function* () {
        var user = {
            email: "user@mail.com",
            name: "John Robot",
            password: "123123"
        };
        const res = yield server.inject({
            method: "POST",
            url: serverConfig.routePrefix + "/users",
            payload: user
        });
        var responseBody = JSON.parse(res.payload);
        assert.equal(201, res.statusCode);
        assert.isNotNull(responseBody.token);
    }));
    it("Create user invalid data", () => __awaiter(this, void 0, void 0, function* () {
        var user = {
            email: "user",
            name: "John Robot",
            password: "123123"
        };
        const res = yield server.inject({
            method: "POST",
            url: serverConfig.routePrefix + "/users",
            payload: user
        });
        assert.equal(400, res.statusCode);
    }));
    it("Create user with same email", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield server.inject({
            method: "POST",
            url: serverConfig.routePrefix + "/users",
            payload: Utils.createUserDummy()
        });
        assert.equal(500, res.statusCode);
    }));
    it("Get user Info", () => __awaiter(this, void 0, void 0, function* () {
        var user = Utils.createUserDummy();
        const loginResponse = yield Utils.login(server, serverConfig, user);
        assert.equal(200, loginResponse.statusCode);
        var login = JSON.parse(loginResponse.payload);
        const res = yield server.inject({
            method: "GET",
            url: serverConfig.routePrefix + "/users/info",
            headers: { authorization: login.token }
        });
        var responseBody = JSON.parse(res.payload);
        assert.equal(200, res.statusCode);
        assert.equal(user.email, responseBody.email);
    }));
    it("Get User Info Unauthorized", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield server.inject({
            method: "GET",
            url: serverConfig.routePrefix + "/users/info",
            headers: { authorization: "dummy token" }
        });
        assert.equal(401, res.statusCode);
    }));
    it("Delete user", () => __awaiter(this, void 0, void 0, function* () {
        var user = Utils.createUserDummy();
        const loginResponse = yield Utils.login(server, serverConfig, user);
        assert.equal(200, loginResponse.statusCode);
        var login = JSON.parse(loginResponse.payload);
        const res = yield server.inject({
            method: "DELETE",
            url: serverConfig.routePrefix + "/users",
            headers: { authorization: login.token }
        });
        assert.equal(200, res.statusCode);
        var responseBody = JSON.parse(res.payload);
        assert.equal(user.email, responseBody.email);
        const deletedUser = yield database.userModel.findOne({ email: user.email });
        assert.isNull(deletedUser);
    }));
    it("Update user info", () => __awaiter(this, void 0, void 0, function* () {
        var user = Utils.createUserDummy();
        const loginResponse = yield Utils.login(server, serverConfig, user);
        assert.equal(200, loginResponse.statusCode);
        var login = JSON.parse(loginResponse.payload);
        var updateUser = { name: "New Name" };
        const res = yield server.inject({
            method: "PUT",
            url: serverConfig.routePrefix + "/users",
            payload: updateUser,
            headers: { authorization: login.token }
        });
        var responseBody = JSON.parse(res.payload);
        assert.equal(200, res.statusCode);
        assert.equal("New Name", responseBody.name);
    }));
});
//# sourceMappingURL=users-controller-tests.js.map