import { Component, inject, signal, OnInit } from '@angular/core';
import { ChatService, AllChatMessage } from '../../../services/chat.service';
import { ApiError } from '../../../services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'allchat',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './allchat.html',
})

export class AllChatComponent implements OnInit {
  private readonly chatService = inject(ChatService);

  messages = signal<AllChatMessage[]>([]);
  isLoading = signal(true);
  error = signal('');

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.isLoading.set(true);
    this.chatService.getAllChatMessages().subscribe({
      next: (messages) => {
        this.messages.set(messages);
        this.isLoading.set(false);
      },
      error: (error: ApiError) => {
        this.error.set(error.message);
        this.isLoading.set(false);
      },
    });
  }
}
