import { Router } from "express";
import * as controller from "./controllers/index.js";

export default () => {
  const api = Router();

  api.get("/api/hello", controller.hello);
  api.get("/api/cohort/:cohortId", controller.getCohort);
  api.get("/api/cohort-ids/:account", controller.getCohortIdsFor);
  api.get("/api/claim-data/:cohortId/:account", controller.getClaimData);
  api.get("/api/all-claim-data/:account", controller.getAllClaimData);

  api.post("/api/save-list", controller.saveList);

  api.delete("/api/delete-cohort", controller.deleteCohort);

  return api;
};
