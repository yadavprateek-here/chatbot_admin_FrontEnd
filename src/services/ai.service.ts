import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { TenantService } from './tenant.service';

@Injectable({ providedIn: 'root' })
export class AIService {
  private http = inject(HttpClient);
  private tenantService = inject(TenantService);

  // Backend endpoint
  private API_URL = 'http://localhost:4000/chat/message';

  /**
   * THIN CLIENT
   * Sends message to backend and returns AI reply
   */
  // async chat(userMessage: string): Promise<string> {
  //   const tenant = this.tenantService.activeTenant();

  //   const payload = {
  //     companyId: tenant.id,   // tenant identifier only
  //     message: userMessage
  //   };

  //   try {
  //     const response = await firstValueFrom(
  //       this.http.post<{ reply: string }>(this.API_URL, payload)
  //     );

  //     return response.reply;
  //   } catch (error) {
  //     console.error('Frontend API Error:', error);
  //     return 'Unable to reach the server. Please try again later.';
  //   }
  // }
  async chat(userMessage: string): Promise<string> {
  const tenant = this.tenantService.activeTenant();

  if (!tenant || !tenant.id) {
    console.error('No active tenant selected');
    return 'Please select a workspace before chatting.';
  }

  const payload = {
    companyId: tenant.id,
    message: userMessage
  };

  try {
    const response = await firstValueFrom(
      this.http.post<{ reply: string }>(this.API_URL, payload)
    );

    return response.reply;
  } catch (error) {
    console.error('Frontend API Error:', error);
    return 'Unable to reach the server. Please try again later.';
  }
}

}
