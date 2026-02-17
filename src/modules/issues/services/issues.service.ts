import { ApiClient } from "@/lib/api-client";
import type { IssueStatus } from "@/modules/issues/constants/issue-status";
import type { Issue } from "@/modules/issues/interfaces/issue.interface";
import type { CreateIssuePayload } from "@/modules/issues/schemas/create-issue.schema";
import type {
  SearchParams,
  SearchResponse,
} from "@/shared/interfaces/search-params.interface";
import { ApiService } from "@/shared/services/api.service";

const ISSUES_SERVICE_BASE_PATH = "/issues" as const;

class IssuesService extends ApiService {
  async create(payload: CreateIssuePayload) {
    const { data } = await ApiClient.post<Issue | undefined>(
      this.getPath(),
      payload,
    );

    return data;
  }

  async findAll() {
    const { data } = await ApiClient.get<Issue[] | undefined>(this.getPath());

    return data;
  }

  async search(params: SearchParams<Issue | undefined>) {
    const { data } = await ApiClient.post<SearchResponse<Issue | undefined>>(
      this.getPath("/search"),
      params,
    );

    return data;
  }

  async findOne(issueId: string | undefined) {
    if (!issueId) throw new Error("Issue ID is required to deactivate");

    const { data } = await ApiClient.get<Issue | undefined>(
      this.getPath(`/${issueId}`),
    );

    return data;
  }

  async findByProject(projectId: string | undefined) {
    if (!projectId)
      throw new Error("Project ID is required to find issues by project");

    const { data } = await ApiClient.get<Issue[] | undefined>(
      this.getPath(`/project/${projectId}`),
    );

    return data;
  }

  async update(
    issueId: string | undefined,
    payload: Partial<CreateIssuePayload>,
  ) {
    if (!issueId) throw new Error("Issue ID is required to update");

    const { data } = await ApiClient.patch<Issue | undefined>(
      this.getPath(`/${issueId}`),
      payload,
    );

    return data;
  }

  async updateStatus(issueId: string | undefined, status: IssueStatus) {
    if (!issueId) throw new Error("Issue ID is required to update status");

    const { data } = await ApiClient.patch<Issue | undefined>(
      this.getPath(`/${issueId}/status`),
      { status },
    );

    return data;
  }

  async remove(issueId: string | undefined) {
    if (!issueId) throw new Error("Issue ID is required to remove");

    await ApiClient.delete<void>(this.getPath(`/${issueId}`));
  }
}

export default new IssuesService(ISSUES_SERVICE_BASE_PATH);
