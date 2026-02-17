import { ApiClient } from "@/lib/api-client";
import type { DashboardReports } from "@/modules/dashboard/interfaces/dashboard-reports.interface";
import { ApiService } from "@/shared/services/api.service";

const REPORTS_SERVICE_BASE_PATH = "/reports" as const;

class ReportsService extends ApiService {
  async getDashboardStats() {
    const { data } = await ApiClient.get<DashboardReports>(
      this.getPath("/dashboard-stats"),
    );

    return data;
  }
}

export default new ReportsService(REPORTS_SERVICE_BASE_PATH);
