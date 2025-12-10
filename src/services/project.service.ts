import * as connection from "../config/dbConnect";
import { ResultSetHeader } from "mysql2/promise";
import * as ProjectType from "../types/project.type";
import { logger } from "../config/logger";

export const getAllProject = async (): Promise<ProjectType.Project[]> => {
  try {
    logger.info("Fetching all projects");
    const [rows] = await connection.query<ProjectType.Project[]>(
      "SELECT * FROM tbprojects_main"
    );
    logger.info("Fetched projects", { count: rows.length });
    return rows;
  } catch (error) {
    logger.error("Failed to fetch projects", { error });
    throw error;
  }
};

export async function getProjectById(
  id: number
): Promise<ProjectType.Project | null> {
  try {
    logger.info("Fetching project by id", { id });
    const [rows] = await connection.query<ProjectType.Project[]>(
      "SELECT * FROM tbprojects_main WHERE id = ?",
      [id]
    );
    const project = rows[0] ?? null;
    logger.info("Fetched project by id", { id, found: !!project });
    return project;
  } catch (error) {
    logger.error("Failed to fetch project by id", { id, error });
    throw error;
  }
}
export const createProject = async (
  props: ProjectType.ProjectCreatePayload
): Promise<number> => {
  const { name, description, owner_user_id } = props;
  try {
    logger.info("Creating project", { name, owner_user_id });
    const [result] = await connection.query<ResultSetHeader>(
      "INSERT INTO tbprojects_main (name, description, owner_user_id) VALUES (?, ?, ?)",
      [name, description, owner_user_id]
    );
    logger.info("Project created", { id: result.insertId });
    return result.insertId;
  } catch (error) {
    logger.error("Failed to create project", { name, owner_user_id, error });
    throw error;
  }
};

export const updateProject = async (
  props: ProjectType.ProjectEditPayload
): Promise<boolean> => {
  const { name, description, owner_user_id, is_active, id } = props;
  try {
    logger.info("Updating project", { id, name, owner_user_id, is_active });
    const [result] = await connection.query<ResultSetHeader>(
      "UPDATE tbprojects_main SET name = ?, description = ?, owner_user_id = ?, is_active = ? WHERE id =?",
      [name, description, owner_user_id, is_active, id]
    );
    const updated = result.affectedRows > 0;
    logger.info("Project update result", { id, updated });
    return updated;
  } catch (error) {
    logger.error("Failed to update project", {
      id,
      name,
      owner_user_id,
      is_active,
      error,
    });
    return false;
  }
};

export async function deleteProject(id: number): Promise<boolean> {
  try {
    logger.info("Deleting project", { id });
    const [result] = await connection.query<ResultSetHeader>(
      "DELETE FROM tbprojects_main WHERE id = ?",
      [id]
    );
    const deleted = result.affectedRows > 0;
    logger.info("Project delete result", { id, deleted });
    return deleted;
  } catch (error) {
    logger.error("Failed to delete project", { id, error });
    throw error;
  }
}
