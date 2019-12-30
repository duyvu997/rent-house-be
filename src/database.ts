import * as Mongoose from "mongoose";
import { IDataConfiguration } from "./configurations";
import { ILogging, LoggingModel } from "./plugins/logging/logging";
import { IUser, UserModel } from "./api/users/user";
import { ITask, TaskModel } from "./api/tasks/task";
import { IHouse, HouseModel } from "./api/houses/house";

export interface IDatabase {
  loggingModel: Mongoose.Model<ILogging>;
  userModel: Mongoose.Model<IUser>;
  taskModel: Mongoose.Model<ITask>;
  houseModel: Mongoose.Model<IHouse>;
}

export function init(config: IDataConfiguration): IDatabase {
  (<any>Mongoose).Promise = Promise;
  Mongoose.connect(process.env.MONGO_URL || config.connectionString);

  let mongoDb = Mongoose.connection;

  mongoDb.on("error", () => {
    console.log(`Unable to connect to database: ${config.connectionString}`);
  });

  mongoDb.once("open", () => {
    console.log(`Connected to database: ${config.connectionString}`);
  });

  return {
    loggingModel: LoggingModel,
    taskModel: TaskModel,
    userModel: UserModel,
    houseModel: HouseModel
  };
}
