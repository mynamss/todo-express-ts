import { Request, Response } from "express"
import IController from "./ControllerInterface"
import TodoService from "./../services/TodoService"
import { ok, fail } from "../utils/ResponseFormat"

class TodoController implements IController {
  async index(req: Request, res: Response): Promise<Response> {
    const service: TodoService = new TodoService(req)
    const todos = await service.getAll()

    return ok(200, todos, res)
  }
  async create(req: Request, res: Response): Promise<Response> {
    const service: TodoService = new TodoService(req)
    const todos = await service.store()

    return ok(200, todos, res)
  }
  async show(req: Request, res: Response): Promise<Response> {
    const service: TodoService = new TodoService(req)
    const todo = await service.getOne()

    if (!todo) return fail(404, [], "Todo Not Found", res)

    return ok(200, todo, res)
  }
  async update(req: Request, res: Response): Promise<Response> {
    const service: TodoService = new TodoService(req)
    const todo = await service.update()
    if (todo[0] != 1) return fail(422, [], "Todo failed to update", res)

    return ok(200, [], res)
  }
  async delete(req: Request, res: Response): Promise<Response> {
    const service: TodoService = new TodoService(req)
    const todo = await service.delete()

    if (todo != 1) return fail(404, [], "Todo failed to delete", res)

    return ok(200, [], res)
  }
}

export default new TodoController()
