import { ApiClient } from "@/lib/api-client";
import type { Comment } from "@/modules/comments/interfaces/comment.interface";
import type { CreateCommentPayload } from "@/modules/comments/schemas/create-comment.schema";
import { ApiService } from "@/shared/services/api.service";

const COMMENTS_SERVICE_BASE_PATH = "/issues" as const;

class CommentsService extends ApiService {
  async create(
    issueId: string | undefined,
    payload: CreateCommentPayload & {
      files?: File[];
    },
  ): Promise<Comment | undefined> {
    if (!issueId) {
      throw new Error("Issue ID are necessary to create comment");
    }

    const formData = new FormData();

    formData.append("content", payload.content);

    if (payload.files && payload.files.length > 0) {
      payload.files.forEach((file) => {
        formData.append("files", file);
      });
    }

    const { data } = await ApiClient.post<Comment>(
      this.getPath(`/${issueId}/comments`),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return data;
  }

  async findAll(issueId: string | undefined): Promise<Comment[] | undefined> {
    if (!issueId) {
      throw new Error("Issue ID are necessary to find all comments");
    }

    const { data } = await ApiClient.get<Comment[]>(
      this.getPath(`/${issueId}/comments`),
    );

    return data;
  }

  async addFiles(
    issueId: string | undefined,
    commentId: string | undefined,
    files: File[],
  ): Promise<Comment | undefined> {
    if (!issueId || !commentId) {
      throw new Error("Issue ID and Comment ID are necessary to add files");
    }

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    const { data } = await ApiClient.post<Comment>(
      this.getPath(`/${issueId}/comments/${commentId}/files`),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return data;
  }

  async remove(
    issueId: string | undefined,
    commentId: string | undefined,
  ): Promise<void> {
    if (!issueId || !commentId) {
      throw new Error("Issue ID and Comment ID are necessary to remove");
    }

    await ApiClient.delete(this.getPath(`/${issueId}/comments/${commentId}`));
  }

  async update(
    issueId: string | undefined,
    commentId: string | undefined,
    payload: Partial<CreateCommentPayload>,
  ): Promise<Comment | undefined> {
    if (!issueId || !commentId) {
      throw new Error("Issue ID and Comment ID are necessary to update");
    }

    const { data } = await ApiClient.patch<Comment>(
      this.getPath(`/${issueId}/comments/${commentId}`),
      payload,
    );
    return data;
  }
}

export default new CommentsService(COMMENTS_SERVICE_BASE_PATH);
