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
const register = (server) => __awaiter(this, void 0, void 0, function* () {
    try {
        return server.register({
            plugin: require("good"),
            options: {
                ops: {
                    interval: 1000
                },
                reporters: {
                    consoleReporter: [
                        {
                            module: "good-squeeze",
                            name: "Squeeze",
                            args: [
                                {
                                    error: "*",
                                    log: "*",
                                    response: "*",
                                    request: "*"
                                }
                            ]
                        },
                        {
                            module: "good-console"
                        },
                        "stdout"
                    ]
                }
            }
        });
    }
    catch (err) {
        console.log(`Error registering logger plugin: ${err}`);
        throw err;
    }
});
exports.default = () => {
    return {
        register,
        info: () => {
            return { name: "Good Logger", version: "1.0.0" };
        }
    };
};
//# sourceMappingURL=index.js.map