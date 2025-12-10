import { Router } from "express";
import * as ProjectMemberController from "../controllers/projectMember.controller";
const router: Router = Router();

router.get("/", ProjectMemberController.getProjectMember);
router.get("/group", ProjectMemberController.getProjectMemberGrouped);
router.get("/:id", ProjectMemberController.getProjectMemberById);
router.post("/", ProjectMemberController.createProjectMember);
router.put("/:id", ProjectMemberController.updateProjectMember);
router.delete("/:id", ProjectMemberController.deleteProjectMember);

export default router;
