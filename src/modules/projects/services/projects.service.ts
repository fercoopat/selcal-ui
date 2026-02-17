import { ApiClient } from "@/lib/api-client";
import type { Project } from "@/modules/projects/interfaces/project.interface";
import type { AddProjectMembersPayload } from "@/modules/projects/schemas/add-project-members.schema";
import type { CreateProjectPayload } from "@/modules/projects/schemas/create-project.schema";
import type {
  SearchParams,
  SearchResponse,
} from "@/shared/interfaces/search-params.interface";
import { ApiService } from "@/shared/services/api.service";

const PROJECTS_SERVICE_BASE_PATH = "/projects" as const;

class ProjectsService extends ApiService {
  async create(payload: CreateProjectPayload) {
    const { data } = await ApiClient.post<Project | undefined>(
      this.getPath(),
      payload,
    );

    return data;
  }

  async findAll() {
    const { data } = await ApiClient.get<Project[]>(this.getPath());

    return data;
  }

  async search(params: SearchParams<Project | undefined>) {
    const { data } = await ApiClient.post<SearchResponse<Project | undefined>>(
      this.getPath("/search"),
      params,
    );

    return data;
  }

  async findOne(projectId: string | undefined) {
    if (!projectId) throw new Error("Project ID is required to deactivate");

    const { data } = await ApiClient.get<Project | undefined>(
      this.getPath(`/${projectId}`),
    );

    return data;
  }

  async update(
    projectId: string | undefined,
    payload: Partial<CreateProjectPayload>,
  ) {
    if (!projectId) throw new Error("Project ID is required to update");

    const { data } = await ApiClient.patch<Project | undefined>(
      this.getPath(`/${projectId}`),
      payload,
    );

    return data;
  }

  async activate(projectId: string | undefined) {
    if (!projectId) throw new Error("Project ID is required to activate");

    await ApiClient.post(this.getPath(`/${projectId}/activate`));
  }

  async deactivate(projectId: string | undefined) {
    if (!projectId) throw new Error("Project ID is required to deactivate");

    await ApiClient.post(this.getPath(`/${projectId}/deactivate`));
  }

  async addMembers(
    projectId: string | undefined,
    payload: AddProjectMembersPayload,
  ) {
    if (!projectId) throw new Error("Project ID is required to add members");

    const { data } = await ApiClient.patch<Project | undefined>(
      this.getPath(`/${projectId}/add-members`),
      payload,
    );

    return data;
  }
}

export default new ProjectsService(PROJECTS_SERVICE_BASE_PATH);
