import { createContext } from "react"
import type { Auth } from "./types"

export default createContext<Auth>("awaiting")
