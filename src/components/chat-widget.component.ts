import {
  Component,
  inject,
  signal,
  effect,
  ElementRef,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

import { TenantService } from '../services/tenant.service';
import { AIService } from '../services/ai.service';
import { ChatMessage } from '../models/types';

marked.use({ async: false });


@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Floating Bubble -->
    <div class="fixed bottom-6 right-6 z-50 chat-widget">
      @if (!isOpen()) {
        <button
          (click)="isOpen.set(true)"
          [style.backgroundColor]="tenantService.activeTenant().primaryColor"
          class="w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition active:scale-95 cursor-pointer"
        >
          <i class="fas fa-comment-dots text-2xl"></i>
        </button>
      } @else {
        <!-- Chat Window -->
        <div
          class="w-[380px] h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in"
        >
          <!-- Header -->
          <header
            [style.backgroundColor]="tenantService.activeTenant().primaryColor"
            class="p-4 text-white flex justify-between items-center shadow-md"
          >
            <div class="flex items-center gap-3">
              <img
                [src]="tenantService.activeTenant().logoUrl"
                class="w-8 h-8 rounded-full bg-white/20 p-0.5 object-cover"
                alt="Logo"
              />
              <div>
                <h3 class="font-bold text-sm">
                  {{ tenantService.activeTenant().name }} AI
                </h3>
                <div class="flex items-center gap-1.5">
                  <span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span
                    class="text-[10px] opacity-80 uppercase tracking-wider font-bold"
                    >Online</span
                  >
                </div>
              </div>
            </div>
            <button
              (click)="isOpen.set(false)"
              class="p-1 hover:bg-white/10 rounded-full transition"
            >
              <i class="fas fa-times"></i>
            </button>
          </header>

          <!-- Messages -->
          <div
            #messageContainer
            class="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50"
          >
            <!-- Greeting -->
            <div class="flex flex-col items-start max-w-[85%]">
              <div
                class="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-slate-800"
              >
                {{ tenantService.activeTenant().greeting }}
              </div>
              <span class="text-[10px] text-slate-400 mt-1 ml-1">Now</span>
            </div>

            <!-- Messages -->
            @for (msg of messages(); track msg.id) {
              <div
                class="flex flex-col"
                [class.items-end]="msg.role === 'user'"
                [class.items-start]="msg.role === 'assistant'"
              >
                <div
                  [class]="
                    msg.role === 'user'
                      ? 'bg-slate-800 text-white rounded-tr-none'
                      : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
                  "
                  class="max-w-[85%] p-3 rounded-2xl shadow-sm text-sm"
                >
                  <div [innerHTML]="renderMarkdown(msg.content)"></div>
                </div>
                <span class="text-[10px] text-slate-400 mt-1 mx-1">
                  {{ msg.timestamp | date: 'shortTime' }}
                </span>
              </div>
            }

            <!-- Typing -->
            @if (isTyping()) {
              <div class="flex flex-col items-start">
                <div
                  class="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none shadow-sm text-sm flex gap-1"
                >
                  <span class="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                  <span
                    class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"
                  ></span>
                  <span
                    class="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"
                  ></span>
                </div>
              </div>
            }
          </div>

          <!-- Input -->
          <form
            (submit)="sendMessage($event)"
            class="p-3 bg-white border-t border-slate-100 flex gap-2"
          >
            <input
              [(ngModel)]="userInput"
              name="chatInput"
              [disabled]="isTyping()"
              placeholder="Ask anything..."
              class="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              [disabled]="!userInput.trim() || isTyping()"
              [style.backgroundColor]="tenantService.activeTenant().primaryColor"
              class="w-10 h-10 rounded-xl text-white flex items-center justify-center hover:opacity-90 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <i class="fas fa-paper-plane"></i>
            </button>
          </form>

          <footer
            class="py-2 text-center bg-slate-50 border-t border-slate-100"
          >
            <span
              class="text-[10px] text-slate-400 uppercase font-bold tracking-widest"
            >
              Powered by OmniBot AI
            </span>
          </footer>
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .animate-in {
        animation: animateIn 0.3s ease-out forwards;
      }

      @keyframes animateIn {
        from {
          transform: translateY(20px) scale(0.95);
          opacity: 0;
        }
        to {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
      }

      /* Markdown Styling */
      .chat-widget :deep(p) {
        margin-bottom: 0.5rem;
      }

      .chat-widget :deep(ul) {
        padding-left: 1rem;
        list-style-type: disc;
        margin-bottom: 0.5rem;
      }

      .chat-widget :deep(strong) {
        font-weight: 600;
      }
    `
  ]
})
export class ChatWidgetComponent {
  tenantService = inject(TenantService);
  aiService = inject(AIService);
  private sanitizer = inject(DomSanitizer);

  isOpen = signal(false);
  isTyping = signal(false);
  userInput = '';
  messages = signal<ChatMessage[]>([]);

  @ViewChild('messageContainer') private msgContainer!: ElementRef;

  constructor() {
    effect(() => {
      this.tenantService.currentTenantId();
      this.messages.set([]);
    });

    effect(() => {
      if (this.msgContainer) {
        setTimeout(() => {
          this.msgContainer.nativeElement.scrollTop =
            this.msgContainer.nativeElement.scrollHeight;
        }, 50);
      }
    });
  }

renderMarkdown(text: string): SafeHtml {
  const html = marked.parse(text, { breaks: true }) as string;
  return this.sanitizer.bypassSecurityTrustHtml(html);
}
  async sendMessage(event: Event) {
    event.preventDefault();
    if (!this.userInput.trim() || this.isTyping()) return;

    const query = this.userInput;
    this.userInput = '';

    this.messages.update(m => [
      ...m,
      {
        id: Math.random().toString(),
        role: 'user',
        content: query,
        timestamp: new Date(),
        tenantId: this.tenantService.currentTenantId()
      }
    ]);

    this.isTyping.set(true);

    try {
      const response = await this.aiService.chat(query);

      this.messages.update(m => [
        ...m,
        {
          id: Math.random().toString(),
          role: 'assistant',
          content: response,
          timestamp: new Date(),
          tenantId: this.tenantService.currentTenantId()
        }
      ]);
    } finally {
      this.isTyping.set(false);
    }
  }
}
