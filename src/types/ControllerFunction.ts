import type { Request, Response } from "express"

type ControllerFunction = (req: Request, res: Response) => void | Promise<void>

export default ControllerFunction
