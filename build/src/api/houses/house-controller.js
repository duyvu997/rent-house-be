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
class TaskController {
    constructor(configs, database) {
        this.configs = configs;
        this.database = database;
    }
    // public async createTask(request: IRequest, h: Hapi.ResponseToolkit) {
    //   var newTask: IHouse = <IHouse>request.payload;
    //   newTask.userId = request.auth.credentials.id;
    //   try {
    //     let task: IHouse = await this.database.taskModel.create(newTask);
    //     return h.response(task).code(201);
    //   } catch (error) {
    //     return Boom.badImplementation(error);
    //   }
    // }
    // public async updateTask(request: IRequest, h: Hapi.ResponseToolkit) {
    //   let userId = request.auth.credentials.id;
    //   let _id = request.params["id"];
    //   try {
    //     let task: IHouse = await this.database.taskModel.findByIdAndUpdate(
    //       { _id, userId }, //ES6 shorthand syntax
    //       { $set: request.payload },
    //       { new: true }
    //     );
    //     if (task) {
    //       return task;
    //     } else {
    //       return Boom.notFound();
    //     }
    //   } catch (error) {
    //     return Boom.badImplementation(error);
    //   }
    // }
    // public async deleteTask(request: IRequest, h: Hapi.ResponseToolkit) {
    //   let id = request.params["id"];
    //   let userId = request["auth"]["credentials"];
    //   let deletedTask = await this.database.taskModel.findOneAndRemove({
    //     _id: id,
    //     userId: userId
    //   });
    //   if (deletedTask) {
    //     return deletedTask;
    //   } else {
    //     return Boom.notFound();
    //   }
    // }
    // public async getTaskById(request: IRequest, h: Hapi.ResponseToolkit) {
    //   let userId = request.auth.credentials.id;
    //   let _id = request.params["id"];
    //   let task = await this.database.taskModel.findOne({ _id, userId })
    //     .lean(true);
    //   if (task) {
    //     return task;
    //   } else {
    //     return Boom.notFound();
    //   }
    // }
    getHouses(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("abc");
            let top = request.query["top"];
            let skip = request.query["skip"];
            let tasks = yield this.database.houseModel
                .find({})
                .lean(true)
                .skip(skip)
                .limit(top);
            console.log(tasks);
            return tasks;
        });
    }
}
exports.default = TaskController;
//# sourceMappingURL=house-controller.js.map