import { Router } from "express";
import { getOverduePayments } from "../controllers/over.duration.controller.js";

const overDurationRoutes = Router();

overDurationRoutes.get('/overdue-payments', getOverduePayments);

export default overDurationRoutes;
