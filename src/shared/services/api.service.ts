export abstract class ApiService {
  private BASE_PATH: string;

  constructor(BASE_PATH: string) {
    this.BASE_PATH = BASE_PATH;
  }

  getPath(path?: string): string {
    if (!path) return this.BASE_PATH;

    return this.BASE_PATH + path;
  }
}
