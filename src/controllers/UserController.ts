import { Request, Response } from "express"
import IController from "./ControllerInterface"

// dummy
let data: any[] = [
  { id: 1, name: "Udin" },
  { id: 2, name: "Helmy" },
  { id: 3, name: "Vito" },
  { id: 4, name: "Ryan" },
]
class UserController implements IController {
  index(req: Request, res: Response): Response {
    return res.send(data)
  }
  create(req: Request, res: Response): Response {
    const { id, name } = req.body

    data.push({ id, name })
    return res.send("Create Success")
  }
  show(req: Request, res: Response): Response {
      const { id } = req.params
      
      let person = data.find(item => item.id == id)
      
      return res.send(person ? person : "Data Not Found" )
    }
    update(req: Request, res: Response): Response {
        const { id } = req.params
        const { name } = req.body
        
        let person = data.find(item => item.id == id)
        person.name = name

        return res.send('Update Success')
  }
  delete(req: Request, res: Response): Response {
      const { id } = req.params
      
      let people = data.filter(item => item.id != id)

      return res.send(people)
  }
}

export default new UserController()
