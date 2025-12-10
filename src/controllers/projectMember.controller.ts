import { Request, Response } from "express";
import { logger } from "../config/logger";
import * as ProjectMemberType from "../types/projectMember.type";
import * as ProjectMemberService from "../services/projectMember.service";
import * as ProjectService from "../services/project.service";
import * as UserService from "../services/user.service";

logger.info("Project Member Controller");

export const getProjectMember = async (req: Request, res: Response) => {
  try {
    logger.info("Getting project members");
    const members = await ProjectMemberService.getAllProjectMember();
    logger.info("Project members Fetched", { members });
    return res.status(200).send(members);
  } catch (error) {
    logger.error("Failed to fetch project members", { error });
    return res.status(500).send({ message: "Failed to fetch project members" });
  }
};
export const getProjectMemberGrouped = async (req: Request, res: Response) => {
  try {
    logger.info("Getting project members");
    const members = await ProjectMemberService.getAllProjectMemberGrouped();
    logger.info("Project members Fetched", { members });
    return res.status(200).send(members);
  } catch (error) {
    logger.error("Failed to fetch grouped project members", { error });
    return res
      .status(500)
      .send({ message: "Failed to fetch grouped project members" });
  }
};
export const getProjectMemberById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params!;
    logger.info("Getting Project Member ID", { id });

    if (!id) {
      return res.status(400).send({ message: "Missing project ID" });
    }

    const projectMembers = await ProjectMemberService.getProjectMemberById(+id!);

    if (!projectMembers) {
      return res.status(404).send({ message: "Project Members not founds" });
    }

    logger.info("Project Member Fetched", { projectMembers });
    return res.status(200).send(projectMembers);
  } catch (error) {
    logger.error("Failed to fetch project member", { error });
    return res.status(500).send({ message: "Failed to fetch project member" });
  }
};
export const updateProjectMember = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id!;
    const { project_id, user_id } = req.body;

    if (!id) {
      return res.status(400).send({ message: "Missing project member ID" });
    }

    if (!project_id || !user_id) {
      return res
        .status(400)
        .send({ message: "Missing required fields: project_id or user_id" });
    }

    const projectMemeber = await ProjectMemberService.getProjectMemberById(+id);
    if (!projectMemeber) {
      return res.status(404).send({ message: "Project member not found" });
    }

    const project = await ProjectService.getProjectById(project_id);
    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }

    const user = await UserService.getUserById(user_id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    console.log("projectMemeber >>>>>",projectMemeber)
    const projectEdit: ProjectMemberType.ProjectMemberEditPayload = {
      project_id : project_id ?? projectMemeber.project_id,
      user_id: user_id ?? projectMemeber.user_id,
      id: id ?? projectMemeber.id
    }

    const updated = await ProjectMemberService.updateProjectMember(projectEdit);

    if (!updated) {
      logger.error("Failed to update project member", { id });
      return res.status(500).send({ message: "Failed to update project member" });
    }

    logger.info("Project member updated", { id });
    return res.status(200).send({ message: "Project member updated successfully" });
  } catch (error) {
    logger.error("Failed to update project member", { error });
    return res.status(500).send({ message: "Failed to update project member" });
  }
};
export const createProjectMember = async (req: Request, res: Response) => {
  try {
    const { project_id, user_id } = req.body;

    if (!project_id || !user_id) {
      return res
        .status(400)
        .send({ mesasge: "Missing required fields: project_id or user_id" });
    }

    const project = await ProjectService.getProjectById(project_id);

    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }

    const user = await UserService.getUserById(user_id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const projectMemberCreatePayload: ProjectMemberType.ProjectMemberCreatePayload =
      {
        project_id,
        user_id,
      };

    const projectMemberId = await ProjectMemberService.createProjectMember(
      projectMemberCreatePayload
    );

    if (!projectMemberId) {
      return res.status(404).send({ message: "Cannot be added to project" });
    }
    logger.info("Project Member", { projectMemberId });
    return res.status(201).send(projectMemberId);
  } catch (error) {
    logger.error("Failed to create project member", { error });
    return res.status(500).send({ message: "Failed to create project member" });
  }
};

export const deleteProjectMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: "Missing project member ID" });
    }

    const deleted = await ProjectMemberService.deleteProjectMember(+id);

    if (!deleted) {
      logger.error("Project Member not found");
      return res.status(404).send({ message: "Project member not found" });
    }

    logger.info("Project member deleted", { id });
    return res.status(200).send({ message: "Project member deleted successfully" });
  } catch (error) {
    logger.error("Failed to delete project member", { error });
    return res.status(500).send({ message: "Failed to delete project member" });
  }
};
