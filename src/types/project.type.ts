import { RowDataPacket } from "mysql2/promise";

export interface BaseProject {
  id: number;
  name: string;
  description: string;
  owner_user_id: number;
  is_active: 0 | 1;
  
  created_at: Date;
  updated_at: Date;
}

export interface Project extends BaseProject, RowDataPacket {}

type OmittedProject = "updated_at" | "created_at" ;

export type ProjectEditPayload = Omit<BaseProject, OmittedProject>;

export type ProjectCreatePayload = Omit<
  BaseProject,
  OmittedProject | "is_active" | "id"
>;
