

import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tenant, Document } from '../models/types';

@Injectable({ providedIn: 'root' })
export class TenantService {
  private apiBase = 'http://localhost:4000/api';

  private tenants = signal<Tenant[]>([]);
  private documents = signal<Document[]>([]);
  currentTenantId = signal<string | null>(null);

  constructor(private http: HttpClient) {
    this.loadTenants(); // ✅ AUTO LOAD
  }

  // ============================
  // TENANTS
  // ============================

  // loadTenants() {
  //   this.http.get<any[]>(`${this.apiBase}/tenants`).subscribe({
  //     next: rawTenants => {
  //       // 🔹 Normalize _id → id
  //       const tenants: Tenant[] = rawTenants.map(t => ({
  //         ...t,
  //         id: t._id
  //       }));

  //       this.tenants.set(tenants);

  //       if (tenants.length && !this.currentTenantId()) {
  //         this.selectTenant(tenants[0].id);
  //       }
  //     },
  //     error: err => console.error('Failed to load tenants', err)
  //   });
  // }
  loadTenants() {
  this.http.get<any[]>(`${this.apiBase}/tenants`).subscribe({
    next: rawTenants => {
      const tenants: Tenant[] = rawTenants.map(t => ({
        ...t,
        id: t._id
      }));

      this.tenants.set(tenants);

      if (tenants.length && !this.currentTenantId()) {
        this.selectTenant(tenants[0].id);
      }
    },
    error: err => console.error('Failed to load tenants', err)
  });
}


  selectTenant(tenantId: string) {
    this.currentTenantId.set(tenantId);
    this.loadDocuments(tenantId);
  }

  createTenant(name: string) {
    this.http.post<any>(`${this.apiBase}/tenants`, { name }).subscribe({
      next: t => {
        const tenant: Tenant = { ...t, id: t._id };
        this.tenants.update(list => [...list, tenant]);
        this.selectTenant(tenant.id);
      },
      error: err => console.error('Failed to create tenant', err)
    });
  }

  updateTenant(tenant: Tenant) {
    this.http.put(`${this.apiBase}/tenants/${tenant.id}`, tenant).subscribe({
      error: err => console.error('Failed to update tenant', err)
    });
  }

  // ============================
  // DOCUMENTS
  // ============================

  loadDocuments(tenantId: string) {
    this.http
      .get<any[]>(`${this.apiBase}/tenants/${tenantId}/documents`)
      .subscribe({
        next: rawDocs => {
          const docs: Document[] = rawDocs.map(d => ({
            ...d,
            id: d._id
          }));
          this.documents.set(docs);
        },
        error: err => console.error('Failed to load documents', err)
      });
  }

  addDocument(doc: {
    tenantId: string;
    title: string;
    content: string;
    type: 'text' | 'faq';
  }) {
    this.http.post<any>(`${this.apiBase}/documents`, doc).subscribe({
      next: d => {
        const saved: Document = { ...d, id: d._id };
        this.documents.update(list => [...list, saved]);
      },
      error: err => console.error('Failed to add document', err)
    });
  }

  deleteDocument(documentId: string) {
    this.http.delete(`${this.apiBase}/documents/${documentId}`).subscribe({
      next: () => {
        this.documents.update(d => d.filter(doc => doc.id !== documentId));
      },
      error: err => console.error('Failed to delete document', err)
    });
  }

  // ============================
  // COMPUTED
  // ============================

  allTenants = computed(() => this.tenants());

  activeTenant = computed(() =>
    this.tenants().find(t => t.id === this.currentTenantId()) || null
  );

  tenantDocuments = computed(() => this.documents());
}
