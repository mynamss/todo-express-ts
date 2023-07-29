import { Request, Response } from "express"
import Authentication from "../utils/Authentication"
const db = require("../db/models")
import { ok, fail } from "../utils/ResponseFormat"

class AuthController {
  register = async (req: Request, res: Response): Promise<Response> => {
    let { username, password } = req.body

    // search existing user by username
    const user = await db.user.findOne({
      where: { username },
    })

    if (user) return fail(422, [], "User has been registered", res)

    const hashedPassword: string = await Authentication.passwordHash(password)

    await db.user.create({ username, password: hashedPassword })

    return ok(200, [], res, "Register Success")
  }
  login = async (req: Request, res: Response): Promise<Response> => {
    let { username, password } = req.body

    // search data user by username
    const user = await db.user.findOne({
      where: { username },
    })
    if (!user) return fail(404, [], "User not found", res)

    // check password
    let compare = await Authentication.passwordCompare(password, user.password)

    // generate token
    if (compare) {
      let token = Authentication.generateToken(user.id, username, user.password)
      return ok(200, { token }, res)
    }

    return fail(422, [], "Wrong Password", res)
  }
  profile = (req: Request, res: Response): Response => {
    return res.send(req.app.locals.credential)
  }
}

export default new AuthController()
