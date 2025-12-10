import * as connection from "../config/dbConnect";
import { ResultSetHeader } from "mysql2/promise";
import * as ProjectMemberType from "../types/projectMember.type";
import { logger } from "../config/logger";

export const getAllProjectMember = async (): Promise<
  ProjectMemberType.ProjectMember[]
> => {
  try {
    logger.info("Fetching all project members");
    const [rows] = await connection.query<ProjectMemberType.ProjectMember[]>(
      "SELECT * FROM tbproject_members"
    );
    logger.info("Fetched project members", { count: rows.length });
    return rows;
  } catch (error) {
    logger.error("Failed to fetch project members", { error });
    throw error;
  }
};
export const getAllProjectMemberGrouped = async (): Promise<
  ProjectMemberType.ProjectWithMembers[]
> => {
  try {
    logger.info("Fetching grouped project members");
    const [rows] = await connection.query<ProjectMemberType.ProjectJoinedRow[]>(
      `SELECT 
        pm.*, 
        p.name AS project_name,
        p.description AS project_description,
        p.owner_user_id AS project_owner_user_id,
        p.is_active AS project_is_active,
        p.created_at AS project_created_at,
        p.updated_at AS project_updated_at
      FROM tbproject_members pm
      JOIN tbprojects_main p ON p.id = pm.project_id`
    );
    const grouped = rows.reduce<
      Record<number, ProjectMemberType.ProjectWithMembers>
    >((acc, row) => {
      const group =
        acc[row.project_id] ??
        (acc[row.project_id] = {
          id: row.project_id,
          name: row.project_name,
          description: row.project_description,
          owner_user_id: row.project_owner_user_id,
          is_active: row.project_is_active,
          created_at: row.project_created_at,
          updated_at: row.project_updated_at,
          members: [],
        });

      const {
        project_name,
        project_description,
        project_owner_user_id,
        project_is_active,
        project_created_at,
        project_updated_at,
        ...member
      } = row;

      if (typeof member.user_id === "number") {
        (group.members as number[]).push(member.user_id);
      }
      return acc;
    }, {} as Record<number, ProjectMemberType.ProjectWithMembers>);

    const result = Object.values(grouped);
    logger.info("Fetched grouped project members", { groups: result.length });
    return result;
  } catch (error) {
    logger.error("Failed to fetch grouped project members", { error });
    throw error;
  }
};
export const getProjectMemberById = async (
  id: number
): Promise<ProjectMemberType.ProjectMember | null> => {
  try {
    logger.info("Fetching project member by id", { id });
    const [rows] = await connection.query<ProjectMemberType.ProjectJoinedRow[]>(
      "SELECT * FROM tbproject_members WHERE id = ?",
      [id]
    );
    const member = rows[0] ?? null;
    logger.info("Fetched project member by id", { id, found: !!member });
    return member;
  } catch (error) {
    logger.error("Failed to fetch project member by id", { id, error });
    throw error;
  }
};
export const createProjectMember = async (
  props: ProjectMemberType.ProjectMemberCreatePayload
) => {
  const { project_id, user_id } = props;
  try {
    logger.info("Creating project member", { project_id, user_id });
    const [result] = await connection.query<ResultSetHeader>(
      "INSERT INTO tbproject_members (project_id, user_id) VALUES (?, ?)",
      [project_id, user_id]
    );
    logger.info("Project member created", { id: result.insertId });
    return result.insertId;
  } catch (error) {
    logger.error("Failed to create project member", {
      project_id,
      user_id,
      error,
    });
    throw error;
  }
};
export const updateProjectMember = async (
  props: ProjectMemberType.ProjectMemberEditPayload
): Promise<boolean> => {
  const { project_id, user_id, id } = props;
  try {
    logger.info("Updating project member", { id, project_id, user_id });
    const [result] = await connection.query<ResultSetHeader>(
      "UPDATE tbproject_members SET project_id = ?, user_id = ? WHERE id = ?",
      [project_id, user_id, id]
    );
    const updated = result.affectedRows > 0;
    logger.info("Project member update result", { id, updated });
    return updated;
  } catch (error) {
    logger.error("Failed to update project member", {
      id,
      project_id,
      user_id,
      error,
    });
    throw error;
  }
};

export const deleteProjectMember = async (id: number): Promise<boolean> => {
  try {
    logger.info("Deleting project member", { id });
    const [result] = await connection.query<ResultSetHeader>(
      "DELETE FROM tbproject_members WHERE id = ?",
      [id]
    );
    const deleted = result.affectedRows > 0;
    logger.info("Project member delete result", { id, deleted });
    return deleted;
  } catch (error) {
    logger.error("Failed to delete project member", { id, error });
    throw error;
  }
};

export const isProjectMember = async (
  userId: number,
  projectId: number
): Promise<boolean> => {
  try {
    logger.info("Checking project membership", { userId, projectId });

    const [rows] = await connection.query<
      ProjectMemberType.isProjectMemberTypeResult[]
    >(
      "SELECT COUNT(*) as count FROM tbproject_members WHERE user_id = ? AND project_id = ?",
      [userId, projectId]
    );

    const isMember = rows[0]?.count! > 0;

    logger.info("Membership check result", { userId, projectId, isMember });

    return isMember;
  } catch (error) {
    logger.error("Failed membership check", { userId, projectId, error });
    throw error;
  }
};
