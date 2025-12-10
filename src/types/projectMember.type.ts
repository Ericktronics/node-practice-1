import { RowDataPacket } from "mysql2/promise";

export interface ProjectMemberBase {
  id: number;
  project_id: number;
  user_id: number;

  created_at: Date;
  updated_at: Date;
}

export interface ProjectMember extends ProjectMemberBase, RowDataPacket {}

export interface ProjectDetails {
  id: number;
  name: string;
  description: string | null;
  owner_user_id: number | null;
  is_active: 0 | 1;
  created_at: Date;
  updated_at: Date;
}

// Member record plus nested project details
export interface ProjectMemberWithProject extends ProjectMember {
  project_details: ProjectDetails;
}

export interface ProjectWithMembers extends ProjectDetails {
  members: number[];
}

export type ProjectMemberEditPayload = Omit<
  ProjectMemberBase,
  "updated_at" | "created_at"
>;

export type ProjectMemberCreatePayload = Omit<
  ProjectMemberBase,
  "updated_at" | "created_at" | "id"
>;

export type ProjectJoinedRow = ProjectMember & {
  project_name: string;
  project_description: string | null;
  project_owner_user_id: number | null;
  project_is_active: 0 | 1;
  project_created_at: Date;
  project_updated_at: Date;
};

export interface isProjectMemberTypeResult extends RowDataPacket {
  count: number;
}
