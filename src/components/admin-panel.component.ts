
// import { Component, inject, signal } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { TenantService } from '../services/tenant.service';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-admin-panel',
//   imports: [CommonModule, FormsModule],
//   template: `
//     <div class="p-6 max-w-7xl mx-auto">
//       <header class="flex justify-between items-center mb-8">
//         <div>
//           <h1 class="text-3xl font-bold text-slate-900">Admin Console</h1>
//           <p class="text-slate-500">Manage your company AI, data, and configuration.</p>
//         </div>
        
//         <div class="flex gap-4">
//           <select 
//             [ngModel]="tenantService.currentTenantId()" 
//             (ngModelChange)="tenantService.currentTenantId.set($event)"
//             class="bg-white border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
//           >
//             @for (t of tenantService.allTenants(); track t.id) {
//               <option [value]="t.id">{{t.name}}</option>
//             }
//           </select>
//           <button 
//             (click)="createNewTenant()"
//             class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
//           >
//             <i class="fas fa-plus mr-2"></i> New Workspace
//           </button>
//         </div>
//       </header>

//       <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <!-- Left: Workspace Settings -->
//         <div class="lg:col-span-1 space-y-6">
//           <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//             <h2 class="text-lg font-semibold mb-4 border-b pb-2">Appearance & Persona</h2>
            
//             <div class="space-y-4">
//               <div>
//                 <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Company Name</label>
//                 <input [(ngModel)]="tenantService.activeTenant().name" class="w-full p-2 border rounded-md text-sm">
//               </div>
//               <div>
//                 <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Brand Color</label>
//                 <div class="flex gap-2">
//                   <input type="color" [(ngModel)]="tenantService.activeTenant().primaryColor" class="h-9 w-12 border rounded">
//                   <input [(ngModel)]="tenantService.activeTenant().primaryColor" class="flex-1 p-2 border rounded-md text-sm">
//                 </div>
//               </div>
//               <div>
//                 <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Welcome Message</label>
//                 <input [(ngModel)]="tenantService.activeTenant().greeting" class="w-full p-2 border rounded-md text-sm">
//               </div>
//               <div>
//                 <label class="block text-xs font-bold text-slate-500 uppercase mb-1">System Instructions (RAG Prompt)</label>
//                 <textarea rows="4" [(ngModel)]="tenantService.activeTenant().systemInstruction" class="w-full p-2 border rounded-md text-sm"></textarea>
//               </div>
//             </div>
//           </div>

//           <div class="bg-indigo-900 rounded-xl shadow-sm p-6 text-white">
//             <h2 class="text-lg font-semibold mb-4">Embed Your Bot</h2>
//             <p class="text-indigo-200 text-xs mb-4">Paste this code into your website's <code>&lt;head&gt;</code> tag to go live.</p>
//             <div class="bg-slate-900/50 p-3 rounded font-mono text-[10px] overflow-x-auto whitespace-pre">
// {{ getEmbedCode() }}
//             </div>
//             <button class="mt-4 w-full bg-indigo-500 hover:bg-indigo-400 py-2 rounded text-sm font-bold transition">
//               Copy Snippet
//             </button>
//           </div>
//         </div>

//         <!-- Middle: Knowledge Base -->
//         <div class="lg:col-span-2 space-y-6">
//           <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//             <div class="flex justify-between items-center mb-6">
//               <h2 class="text-xl font-bold">Knowledge Base</h2>
//               <button (click)="showUpload = true" class="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-md text-xs font-bold hover:bg-slate-200">
//                 Add Knowledge
//               </button>
//             </div>

//             @if (showUpload) {
//               <div class="mb-6 bg-slate-50 border-2 border-dashed border-slate-200 p-6 rounded-lg">
//                 <h3 class="font-semibold mb-2">Ingest New Data</h3>
//                 <div class="space-y-3">
//                   <input [(ngModel)]="newDoc.title" placeholder="Document Title (e.g. Return Policy)" class="w-full p-2 border rounded text-sm">
//                   <textarea [(ngModel)]="newDoc.content" placeholder="Paste text content or JSON data here..." rows="4" class="w-full p-2 border rounded text-sm"></textarea>
//                   <div class="flex justify-end gap-2">
//                     <button (click)="showUpload = false" class="text-xs text-slate-500 uppercase font-bold px-3">Cancel</button>
//                     <button (click)="saveDocument()" class="bg-indigo-600 text-white text-xs uppercase font-bold px-4 py-2 rounded">Ingest Data</button>
//                   </div>
//                 </div>
//               </div>
//             }

//             <div class="overflow-hidden">
//               <table class="w-full text-left">
//                 <thead>
//                   <tr class="text-xs font-bold text-slate-400 uppercase border-b">
//                     <th class="py-3 px-2">Source</th>
//                     <th class="py-3 px-2">Type</th>
//                     <th class="py-3 px-2">Size</th>
//                     <th class="py-3 px-2">Added</th>
//                     <th class="py-3 px-2 text-right">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody class="divide-y divide-slate-100">
//                   @for (doc of tenantService.tenantDocuments(); track doc.id) {
//                     <tr class="text-sm hover:bg-slate-50 transition">
//                       <td class="py-4 px-2 font-medium text-slate-800">{{doc.title}}</td>
//                       <td class="py-4 px-2">
//                         <span class="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] uppercase font-bold">{{doc.type}}</span>
//                       </td>
//                       <td class="py-4 px-2 text-slate-500 text-xs">{{doc.tokens}} tokens</td>
//                       <td class="py-4 px-2 text-slate-500 text-xs">{{doc.uploadedAt | date:'shortDate'}}</td>
//                       <td class="py-4 px-2 text-right">
//                         <button (click)="tenantService.deleteDocument(doc.id)" class="text-rose-500 hover:text-rose-700">
//                           <i class="fas fa-trash-alt"></i>
//                         </button>
//                       </td>
//                     </tr>
//                   }
//                   @if (tenantService.tenantDocuments().length === 0) {
//                     <tr>
//                       <td colspan="5" class="py-12 text-center text-slate-400">
//                         <i class="fas fa-database fa-3x mb-4 block opacity-20"></i>
//                         No knowledge ingested. Your bot will not be able to answer specific questions.
//                       </td>
//                     </tr>
//                   }
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           <!-- Usage Chart Simulation -->
//           <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//             <h2 class="text-lg font-semibold mb-4">Analytics Overview</h2>
//             <div class="grid grid-cols-3 gap-4 mb-6">
//               <div class="bg-slate-50 p-4 rounded-lg">
//                 <span class="text-xs text-slate-500 uppercase font-bold">API Requests</span>
//                 <p class="text-2xl font-bold">1,240</p>
//                 <span class="text-xs text-emerald-500 font-medium"><i class="fas fa-arrow-up"></i> 12%</span>
//               </div>
//               <div class="bg-slate-50 p-4 rounded-lg">
//                 <span class="text-xs text-slate-500 uppercase font-bold">Total Tokens</span>
//                 <p class="text-2xl font-bold">42.1k</p>
//                 <span class="text-xs text-rose-500 font-medium"><i class="fas fa-arrow-down"></i> 3%</span>
//               </div>
//               <div class="bg-slate-50 p-4 rounded-lg">
//                 <span class="text-xs text-slate-500 uppercase font-bold">Avg Response Time</span>
//                 <p class="text-2xl font-bold">1.2s</p>
//                 <span class="text-xs text-emerald-500 font-medium"><i class="fas fa-check"></i> Optimized</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   `,
//   styles: [`
//     :host { display: block; background: #f8fafc; min-height: 100vh; }
//     textarea { resize: vertical; }
//   `]
// })
// export class AdminPanelComponent {
//   tenantService = inject(TenantService);
//   showUpload = false;
//   newDoc = { title: '', content: '', type: 'text' as const };

//   saveDocument() {
//     if (!this.newDoc.title || !this.newDoc.content) return;
//     this.tenantService.addDocument({
//       tenantId: this.tenantService.currentTenantId(),
//       title: this.newDoc.title,
//       content: this.newDoc.content,
//       type: this.newDoc.type
//     });
//     this.newDoc = { title: '', content: '', type: 'text' };
//     this.showUpload = false;
//   }

//   createNewTenant() {
//     const name = prompt('Enter company name:');
//     if (name) this.tenantService.createTenant(name);
//   }

//   getEmbedCode() {
//     return `<script>
//   window.OmniBotConfig = {
//     tenantId: "${this.tenantService.currentTenantId()}",
//     apiKey: "${this.tenantService.activeTenant().apiKey}",
//     position: "bottom-right"
//   };
// </script>
// <script src="https://cdn.omnibot.ai/widget.js"></script>`;
//   }
// }
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TenantService } from '../services/tenant.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 max-w-7xl mx-auto">
      <!-- Header -->
      <header class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-slate-900">Admin Console</h1>
          <p class="text-slate-500">
            Manage your company AI, data, and configuration.
          </p>
        </div>

        <div class="flex gap-4">
          <select
            [ngModel]="tenantService.currentTenantId()"
            (ngModelChange)="tenantService.selectTenant($event)"
            class="bg-white border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            @for (t of tenantService.allTenants(); track t.id) {
              <option [value]="t.id">{{ t.name }}</option>
            }
          </select>

          <button
            (click)="createNewTenant()"
            class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
          >
            <i class="fas fa-plus mr-2"></i> New Workspace
          </button>
        </div>
      </header>

      @if (tenantService.activeTenant(); as tenant) {
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left: Workspace Settings -->
          <div class="lg:col-span-1 space-y-6">
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 class="text-lg font-semibold mb-4 border-b pb-2">
                Appearance & Persona
              </h2>

              <div class="space-y-4">
                <div>
                  <label class="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Company Name
                  </label>
                  <input
                    [(ngModel)]="tenant.name"
                    class="w-full p-2 border rounded-md text-sm"
                  />
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Brand Color
                  </label>
                  <div class="flex gap-2">
                    <input
                      type="color"
                      [(ngModel)]="tenant.primaryColor"
                      class="h-9 w-12 border rounded"
                    />
                    <input
                      [(ngModel)]="tenant.primaryColor"
                      class="flex-1 p-2 border rounded-md text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Welcome Message
                  </label>
                  <input
                    [(ngModel)]="tenant.greeting"
                    class="w-full p-2 border rounded-md text-sm"
                  />
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-500 uppercase mb-1">
                    System Instructions (RAG Prompt)
                  </label>
                  <textarea
                    rows="4"
                    [(ngModel)]="tenant.systemInstruction"
                    class="w-full p-2 border rounded-md text-sm"
                  ></textarea>
                </div>

                <button
                  (click)="saveTenant()"
                  class="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition w-full"
                >
                  Save Changes
                </button>
              </div>
            </div>

            <!-- Embed -->
            <div class="bg-indigo-900 rounded-xl shadow-sm p-6 text-white">
              <h2 class="text-lg font-semibold mb-4">Embed Your Bot</h2>
              <p class="text-indigo-200 text-xs mb-4">
                Paste this code into your website’s
                <code>&lt;head&gt;</code>
              </p>
              <div
                class="bg-slate-900/50 p-3 rounded font-mono text-[10px] overflow-x-auto whitespace-pre"
              >
{{ getEmbedCode(tenant) }}
              </div>
            </div>
          </div>

          <!-- Right: Knowledge Base -->
          <div class="lg:col-span-2 space-y-6">
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-bold">Knowledge Base</h2>
                <button
                  (click)="showUpload = true"
                  class="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-md text-xs font-bold hover:bg-slate-200"
                >
                  Add Knowledge
                </button>
              </div>

              @if (showUpload) {
                <div
                  class="mb-6 bg-slate-50 border-2 border-dashed border-slate-200 p-6 rounded-lg"
                >
                  <div class="space-y-3">
                    <input
                      [(ngModel)]="newDoc.title"
                      placeholder="Document Title"
                      class="w-full p-2 border rounded text-sm"
                    />
                    <textarea
                      [(ngModel)]="newDoc.content"
                      placeholder="Paste content here..."
                      rows="4"
                      class="w-full p-2 border rounded text-sm"
                    ></textarea>

                    <div class="flex justify-end gap-2">
                      <button
                        (click)="showUpload = false"
                        class="text-xs text-slate-500 uppercase font-bold px-3"
                      >
                        Cancel
                      </button>
                      <button
                        (click)="saveDocument()"
                        class="bg-indigo-600 text-white text-xs uppercase font-bold px-4 py-2 rounded"
                      >
                        Ingest Data
                      </button>
                    </div>
                  </div>
                </div>
              }

              <table class="w-full text-left">
                <tbody class="divide-y divide-slate-100">
                  @for (doc of tenantService.tenantDocuments(); track doc.id) {
                    <tr class="text-sm">
                      <td class="py-3 font-medium">{{ doc.title }}</td>
                      <td class="py-3 text-right">
                        <button
                          (click)="tenantService.deleteDocument(doc.id)"
                          class="text-rose-500 hover:text-rose-700"
                        >
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class AdminPanelComponent implements OnInit {
  tenantService = inject(TenantService);

  
ngOnInit() {
    this.tenantService.loadTenants(); // 🔥 FORCE LOAD
  }

  showUpload = false;
  newDoc = { title: '', content: '', type: 'text' as const };

  constructor() {
    this.tenantService.loadTenants();
  }

  createNewTenant() {
    const name = prompt('Enter company name');
    if (name) this.tenantService.createTenant(name);
  }

  saveTenant() {
    const tenant = this.tenantService.activeTenant();
    if (tenant) this.tenantService.updateTenant(tenant);
  }

  saveDocument() {
    if (!this.newDoc.title || !this.newDoc.content) return;

    this.tenantService.addDocument({
      tenantId: this.tenantService.currentTenantId()!,
      title: this.newDoc.title,
      content: this.newDoc.content,
      type: this.newDoc.type
    });

    this.newDoc = { title: '', content: '', type: 'text' };
    this.showUpload = false;
  }

  getEmbedCode(tenant: any) {
    return `<script>
  window.OmniBotConfig = {
    tenantId: "${tenant.id}",
    apiKey: "${tenant.apiKey}",
    position: "bottom-right"
  };
</script>
<script src="https://cdn.omnibot.ai/widget.js"></script>`;
  }
}
