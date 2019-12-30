import * as Hapi from "hapi";
import * as Joi from "joi";
import HouseController from "./house-controller";
import * as HouseValidator from "./house-validator";
import { jwtValidator } from "../users/user-validator";
import { IDatabase } from "../../database";
import { IServerConfigurations } from "../../configurations";

export default function (
  server: Hapi.Server,
  configs: IServerConfigurations,
  database: IDatabase
) {
  const houseController = new HouseController(configs, database);
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
