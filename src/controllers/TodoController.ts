import { Request, Response } from "express"
import IController from "./ControllerInterface"
import TodoService from './../services/TodoService';


class TodoController implements IController {
  async index(req: Request, res: Response): Promise<Response> {
    const service: TodoService = new TodoService(req)
    const todos = await service.getAll()

    return res.send({
      data: todos,
      message: "List todos",
    })
  }
  async create(req: Request, res: Response): Promise<Response> {
    const service: TodoService = new TodoService(req)
    const todos = await service.store()

    return res.send({
      data: todos,
      message: "Todo created",
    })
  }
  async show(req: Request, res: Response): Promise<Response> {
    const service: TodoService = new TodoService(req)
    const todo = await service.getOne()

    if (!todo) return res.send(`Todo not found`)

    return res.send({
      data: todo,
      message: "Show todo",
    })
  }
  async update(req: Request, res: Response): Promise<Response> {
    const service: TodoService = new TodoService(req)
    const todo = await service.update()
    if (todo[0] != 1) return res.send({ message: "Todo failed to update" })

    return res.send({
      data: "",
      message: "Todo updated",
    })
  }
  async delete(req: Request, res: Response): Promise<Response> {
    const service: TodoService = new TodoService(req)
    const todo = await service.delete()
    
    if (todo != 1) return res.send({ message: "Todo failed to delete" })

    return res.send({
      message: "Todo deleted",
    })
  }
}

export default new TodoController()
