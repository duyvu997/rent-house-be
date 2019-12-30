import * as Hapi from "hapi";
import { IDatabase } from "../../database";
import { IServerConfigurations } from "../../configurations";

export default function (
  server: Hapi.Server,
  configs: IServerConfigurations,
  database: IDatabase
) {
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
