"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(server, configs, database) {
    server.route({
        method: "GET",
        path: "/",
        options: {
            handler: (responses, h) => {
                return "wellcome to rent-house";
            },
            auth: false
        }
    });
    server.route({
        method: 'GET',
        path: '/favicon.ico',
        handler: (res, h) => {
            return 'favicon.ico';
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map