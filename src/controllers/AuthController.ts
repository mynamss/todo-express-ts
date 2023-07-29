import { Request, Response } from "express"
import Authentication from "../utils/Authentication"
import { compare } from "bcrypt"
const db = require("../db/models")

class AuthController {
  register = async (req: Request, res: Response): Promise<Response> => {
    let { username, password } = req.body

    // search existing user by username
    const user = await db.user.findOne({
      where: { username },
    })

    if (user) return res.send("User has been registered")

    const hashedPassword: string = await Authentication.passwordHash(password)

    await db.user.create({ username, password: hashedPassword })

    return res.send("Register Success")
  }
  login = async (req: Request, res: Response): Promise<Response> => {
    let { username, password } = req.body

    // search data user by username
    const user = await db.user.findOne({
      where: { username },
    })
    if (!user) return res.send("User not found")

    // check password
    let compare = await Authentication.passwordCompare(password, user.password)

    // generate token
    if (compare) {
      let token = Authentication.generateToken(user.id, username, user.password)
      return res.send({ token })
    }

    return res.send("Wrong password")
  }
  profile = (req: Request, res: Response): Response => {

    return res.send(req.app.locals.credential)
  }
}

export default new AuthController()
