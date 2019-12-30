"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const house_controller_1 = require("./house-controller");
function default_1(server, configs, database) {
    const houseController = new house_controller_1.default(configs, database);
    server.bind(houseController);
    // server.route({
    //   method: "GET",
    //   path: "/tasks/{id}",
    //   options: {
    //     handler: houseController.getTaskById,
    //     auth: "jwt",
    //     tags: ["api", "tasks"],
    //     description: "Get task by id.",
    //     validate: {
    //       params: {
    //         id: Joi.string().required()
    //       },
    //       headers: jwtValidator
    //     },
    //     plugins: {
    //       "hapi-swagger": {
    //         responses: {
    //           "200": {
    //             description: "Task founded."
    //           },
    //           "404": {
    //             description: "Task does not exists."
    //           }
    //         }
    //       }
    //     }
    //   }
    // });
    server.route({
        method: "GET",
        path: "/houses",
        options: {
            handler: houseController.getHouses,
            auth: false,
            tags: ["api", "house"],
            description: "Get all houses.",
            validate: {
                query: {
                    top: Joi.number().default(5),
                    skip: Joi.number().default(0)
                },
            }
        }
    });
    // server.route({
    //   method: "DELETE",
    //   path: "/tasks/{id}",
    //   options: {
    //     handler: houseController.deleteTask,
    //     auth: "jwt",
    //     tags: ["api", "tasks"],
    //     description: "Delete task by id.",
    //     validate: {
    //       params: {
    //         id: Joi.string().required()
    //       },
    //       headers: jwtValidator
    //     },
    //     plugins: {
    //       "hapi-swagger": {
    //         responses: {
    //           "200": {
    //             description: "Deleted Task."
    //           },
    //           "404": {
    //             description: "Task does not exists."
    //           }
    //         }
    //       }
    //     }
    //   }
    // });
    // server.route({
    //   method: "PUT",
    //   path: "/tasks/{id}",
    //   options: {
    //     handler: houseController.updateTask,
    //     auth: "jwt",
    //     tags: ["api", "tasks"],
    //     description: "Update task by id.",
    //     validate: {
    //       params: {
    //         id: Joi.string().required()
    //       },
    //       payload: HouseValidator.updateTaskModel,
    //       headers: jwtValidator
    //     },
    //     plugins: {
    //       "hapi-swagger": {
    //         responses: {
    //           "200": {
    //             description: "Deleted Task."
    //           },
    //           "404": {
    //             description: "Task does not exists."
    //           }
    //         }
    //       }
    //     }
    //   }
    // });
    // server.route({
    //   method: "POST",
    //   path: "/tasks",
    //   options: {
    //     handler: houseController.createTask,
    //     auth: "jwt",
    //     tags: ["api", "tasks"],
    //     description: "Create a task.",
    //     validate: {
    //       payload: HouseValidator.createTaskModel,
    //       headers: jwtValidator
    //     },
    //     plugins: {
    //       "hapi-swagger": {
    //         responses: {
    //           "201": {
    //             description: "Created Task."
    //           }
    //         }
    //       }
    //     }
    //   }
    // });
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map