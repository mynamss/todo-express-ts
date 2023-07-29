import { Response } from "express"

export const ok = (code: number, data: object[] | object, res: Response): Response => {
  return res.json({
    success: true,
    code,
    data,
  })
}

export const fail = (code: number, errorList: any[] = [], message: string, res: Response): Response => {
  return res.json({
    success: false,
    code,
    error: {
      message,
      errorList,
    },
  })
}
