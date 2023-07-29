import express, { Application, Request, Response } from "express"
import morgan from "morgan"
import compression from "compression"
import helmet from "helmet"
import cors from "cors"
import { config as dotenv } from "dotenv"
const PORT: number = 8000

// Connection
import { Sequelize } from "sequelize"
import { development } from "./config/database"
const { database, username, password, dialect, host } = development

// ROUTERS
import UserRouter from "./routes/UserRoutes"
import AuthRoutes from "./routes/AuthRoutes"
import TodoRoutes from "./routes/TodoRoutes"

class App {
  public app: Application
  constructor() {
    this.app = express()
    this.plugins()
    this.routes()
    dotenv()
    this.connection()
  }

  protected plugins(): void {
    this.app.use(express.json())
    this.app.use(morgan("dev"))
    this.app.use(compression())
    this.app.use(helmet())
    this.app.use(cors())
  }

  protected routes(): void {
    // BaseURL
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("Typescript Implemented")
    })
    this.app.use("/api/v1/users", UserRouter)
    // Auth
    this.app.use("/api/v1/auth", AuthRoutes)
    // TO-DO
    this.app.use('/api/v1/todo',TodoRoutes)
  }

  protected async connection() {
    const sequelize = new Sequelize(`${dialect}://${username}:${password}@${host}:5432/${database}`)
    try {
      await sequelize.authenticate()
      console.log("Database connected...")
    } catch (error) {
      console.error("Unable to connect to the database: ", error)
    }
  }
}

const app = new App().app

app.listen(PORT, () => {
  console.log(`App running at port ${PORT}`)
})
