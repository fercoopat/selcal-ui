import type { Issue } from "@/modules/issues/interfaces/issue.interface";
import type { User } from "@/modules/security/users/interfaces/user.interface";
import type { CommonFields } from "@/shared/interfaces/common.interface";

export interface Comment extends CommonFields {
  content: string;
  files?: CommentFile[];
  issue?: Issue;
}

export interface CommentFile extends CommonFields {
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
  url: string;
  storageType: string;
  bucket?: string;
  uploadedBy: User;
  userId: string;
  entityType: string;
  entityId: string;
  comment: Comment;
}
