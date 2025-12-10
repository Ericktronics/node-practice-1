import { Request, Response } from "express";
import { logger } from "../config/logger";
import * as ProjectService from "../services/project.service";
import * as ProjectType from "../types/project.type";
import { getUserById } from "../services/user.service";

logger.info("Project Controller");

export const getProject = async (req: Request, res: Response) => {
  try {
    logger.info("Getting projects");
    const project = await ProjectService.getAllProject();
    logger.info("Project Fetched", { project });
    return res.status(200).send(project);
  } catch (error) {
    logger.error("Failed to fetch projects", { error });
    return res.status(500).send({ message: "Failed to fetch projects" });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, description, owner_user_id } = req.body;

    if (!name || !owner_user_id) {
      return res
        .status(400)
        .send({ message: "Missing required fields: name and owner_user_id" });
    }

    const user = await getUserById(owner_user_id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const projectCreatePayload: ProjectType.ProjectCreatePayload = {
      name,
      description,
      owner_user_id,
    };

    const projectId = await ProjectService.createProject(projectCreatePayload);

    logger.info("Project created", { projectId });

    return res.status(201).send({ projectId });
  } catch (error) {
    logger.error("Failed to create project", { error });
    return res.status(500).send({ message: "Failed to create project" });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { name, description, owner_user_id, is_active } = req.body;
    const id = +req.params.id!;

    if (!id) {
      return res.status(400).send({ message: "No Project Id!" });
    }

    const project = await ProjectService.getProjectById(id);

    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }

    logger.info("Project found", { project });

    const projectEdit: ProjectType.ProjectEditPayload = {
      id: id ?? project.id,
      name: name ?? project.name,
      description: description ?? project.description,
      owner_user_id: owner_user_id ?? project.owner_user_id,
      is_active: is_active ?? project.is_active,
    };

    const updated = await ProjectService.updateProject(projectEdit);

    if (updated) {
      logger.info("Project updated", { updated });
      return res.status(200).send({ message: "Project updated successfully" });
    }

    logger.error("Failed to update project");
    return res.status(500).send({ message: "Failed to update project" });
  } catch (error) {
    logger.error("Failed to update project", { error });
    return res.status(500).send({ message: "Failed to update project" });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    logger.info("Getting project by ID", { id });
    if (!id) {
      return res.status(400).send({ message: "Missing project ID" });
    }
    const project = await ProjectService.getProjectById(+id);

    if (project) {
      logger.info("Project fetched", { project });
      return res.status(200).send(project);
    }

    return res.status(404).send({ message: "Project not found" });
  } catch (error) {
    logger.error("Failed to fetch project", { error });
    return res.status(500).send({ message: "Failed to fetch project" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    logger.info("Deleting project", { id });
    if (!id) {
      return res.status(400).send({ message: "Missing projectƒ ID" });
    }

    const deleted = await ProjectService.deleteProject(+id);
    
    if (!deleted) {
      logger.error("Project not found");
      return res.status(404).send({ message: "Project not found" });
    }

    logger.info("Project deleted", { deleted });
    return res.status(200).send({ message: "Project deleted successfully" });

  } catch (error) {
    logger.error("Failed to delete project", { error });
    return res.status(500).send({ message: "Failed to delete project" });
  }
};
