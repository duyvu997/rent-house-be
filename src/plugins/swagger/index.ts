import { IPlugin, IPluginInfo } from "../interfaces";
import * as Hapi from "hapi";

const register = async (server: Hapi.Server): Promise<void> => {
  try {
    return server.register([
      require("inert"),
      require("vision"),
      {
        plugin: require("hapi-swagger"),
        options: {
          info: {
            title: "Rent-House Api",
            description: "Rent-House Api Documentation",
            version: "1.0"
          },
          tags: [
            {
              name: "tasks",
              description: "Api tasks interface."
            },
            {
              name: "users",
              description: "Api users interface."
            },
            {
              name: "houses",
              description: "Api houses interface."
            }
          ],
          swaggerUI: true,
          documentationPage: true,
          documentationPath: "/docs"
        }
      }
    ]);
  } catch (err) {
    console.log(`Error registering swagger plugin: ${err}`);
  }
};

export default (): IPlugin => {
  return {
    register,
    info: () => {
      return { name: "Swagger Documentation", version: "1.0.0" };
    }
  };
};
