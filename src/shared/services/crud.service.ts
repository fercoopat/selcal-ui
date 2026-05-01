import { ApiClient } from "@/lib/api-client";
import { ApiService } from "@/shared/services/api.service";

/**
 * Generic CRUD service base class.
 * Eliminates boilerplate for modules that only need standard CRUD operations.
 *
 * @template TEntity  - The domain entity type (must extend CommonFields)
 * @template TPayload - The create/update payload type (Zod-inferred)
 */
export class CrudService<TEntity, TPayload> extends ApiService {
  async findAll() {
    const { data } = await ApiClient.get<TEntity[]>(this.getPath());
    return data;
  }

  async findOne(id: string) {
    const { data } = await ApiClient.get<TEntity>(this.getPath(`/${id}`));
    return data;
  }

  async create(payload: TPayload) {
    const { data } = await ApiClient.post<TEntity>(this.getPath(), payload);
    return data;
  }

  async update(id: string, payload: Partial<TPayload>) {
    const { data } = await ApiClient.patch<TEntity>(
      this.getPath(`/${id}`),
      payload,
    );
    return data;
  }

  async remove(id: string | undefined) {
    if (!id) {
      throw new Error("Entity ID is required to remove");
    }

    const { data } = await ApiClient.delete<TEntity>(this.getPath(`/${id}`));

    return data;
  }
}
