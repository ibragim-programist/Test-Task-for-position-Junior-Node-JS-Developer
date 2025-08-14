import type { Router } from "express";
import { loginRouter } from "./loginRoute.js";
import { registerRouter } from "./registerRoute.js";
import { blockUserRouter } from "./blockUserRoute.js";
import { getUserRouter } from "./getUserRoute.js";
import { getUsersRouter } from "./getUsersRoute.js";

export const routes:Router[] = [
    loginRouter,
    registerRouter,
    getUserRouter,
    getUsersRouter,
    blockUserRouter
];