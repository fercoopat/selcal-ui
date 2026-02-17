export abstract class ApiService {
  private basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  getPath(path?: string): string {
    if (!path) return this.basePath;

    return this.basePath + path;
  }
}
