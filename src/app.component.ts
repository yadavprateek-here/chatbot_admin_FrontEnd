
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './components/admin-panel.component';
import { ChatWidgetComponent } from './components/chat-widget.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, AdminPanelComponent, ChatWidgetComponent],
  template: `
    <div class="min-h-screen flex flex-col">
      <!-- Top Navigation -->
      <nav class="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-xl border-b border-white/10 sticky top-0 z-50">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <i class="fas fa-robot text-xl"></i>
          </div>
          <span class="text-xl font-black tracking-tighter italic">OmniBot<span class="text-indigo-400">SaaS</span></span>
        </div>
        
        <div class="flex items-center gap-8 font-medium">
          <button 
            (click)="activeTab.set('admin')"
            [class.text-indigo-400]="activeTab() === 'admin'"
            class="hover:text-indigo-300 transition"
          >
            Console
          </button>
          <button 
            (click)="activeTab.set('preview')"
            [class.text-indigo-400]="activeTab() === 'preview'"
            class="hover:text-indigo-300 transition"
          >
            Live Preview
          </button>
          <div class="h-8 w-[1px] bg-white/20"></div>
          <button class="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg hover:bg-white/10 transition">
            <img src="https://picsum.photos/id/64/100/100" class="w-6 h-6 rounded-full border border-white/20">
            <span class="text-sm">John Admin</span>
            <i class="fas fa-chevron-down text-[10px] opacity-50"></i>
          </button>
        </div>
      </nav>

      <main class="flex-1 overflow-auto">
        @if (activeTab() === 'admin') {
          <app-admin-panel class="animate-in fade-in duration-500"></app-admin-panel>
        } @else {
          <!-- Website Simulator View -->
          <div class="p-12 max-w-5xl mx-auto">
            <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden min-h-[600px] flex flex-col">
              <header class="bg-slate-50 border-b p-6 flex justify-between items-center">
                <div class="flex gap-2">
                  <div class="w-3 h-3 rounded-full bg-rose-400"></div>
                  <div class="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div class="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div class="bg-slate-200 px-12 py-1 rounded text-[10px] text-slate-500 font-mono">
                  https://preview.yourcustomer-site.com
                </div>
                <div class="w-8"></div>
              </header>
              <div class="flex-1 p-20 flex flex-col items-center justify-center text-center space-y-6">
                <div class="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-300">
                  <i class="fas fa-globe-americas text-4xl"></i>
                </div>
                <h2 class="text-4xl font-extrabold text-slate-900 tracking-tight">Your Customer's Website</h2>
                <p class="text-xl text-slate-500 max-w-lg">
                  This is a simulation of how the widget integrates into a third-party website using just a script tag.
                </p>
                <div class="flex gap-4">
                  <div class="w-32 h-4 bg-slate-100 rounded-full"></div>
                  <div class="w-24 h-4 bg-slate-100 rounded-full"></div>
                </div>
                <div class="w-64 h-4 bg-slate-50 rounded-full"></div>
                <div class="w-48 h-4 bg-slate-50 rounded-full"></div>
              </div>
            </div>
            
            <div class="mt-12 grid grid-cols-3 gap-8">
              <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div class="text-indigo-600 mb-4"><i class="fas fa-shield-halved fa-2x"></i></div>
                <h3 class="font-bold mb-2">Data Isolation</h3>
                <p class="text-sm text-slate-500">Every tenant has its own vector namespace and encryption keys.</p>
              </div>
              <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div class="text-emerald-600 mb-4"><i class="fas fa-bolt fa-2x"></i></div>
                <h3 class="font-bold mb-2">Instant Ingestion</h3>
                <p class="text-sm text-slate-500">Documents are chunked and indexed in under 5 seconds using Gemini's speed.</p>
              </div>
              <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div class="text-amber-600 mb-4"><i class="fas fa-layer-group fa-2x"></i></div>
                <h3 class="font-bold mb-2">Generic Design</h3>
                <p class="text-sm text-slate-500">No custom code for new customers. Pure configuration-driven UX.</p>
              </div>
            </div>
          </div>
        }
      </main>

      <!-- The Real Plug-and-Play Widget (Visualized) -->
      <app-chat-widget></app-chat-widget>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .fade-in {
      animation: fadeIn 0.5s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `]
})
export class AppComponent {
  activeTab = signal<'admin' | 'preview'>('admin');
}
