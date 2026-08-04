-- Chat widget: conversations + messages
-- Run this in the Supabase SQL editor (or `supabase db push` if you use the CLI).
--
-- Mirrors the existing `contact_submissions` pattern in this project: RLS is
-- enabled with no public policies, so all reads/writes go through the
-- service role key on the server (see lib/supabase.ts -> supabaseAdmin).
-- Visitors never talk to Supabase directly; they only hit /api/chat.

create extension if not exists "pgcrypto";

create table if not exists chat_conversations (
  id uuid primary key default gen_random_uuid(),
  visitor_name text,
  visitor_email text,
  status text not null default 'active' check (status in ('active', 'closed')),
  created_at timestamptz not null default now(),
  last_message_at timestamptz not null default now()
);

create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references chat_conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null check (char_length(content) <= 8000),
  created_at timestamptz not null default now()
);

create index if not exists chat_messages_conversation_id_idx
  on chat_messages (conversation_id, created_at);

create index if not exists chat_conversations_last_message_at_idx
  on chat_conversations (last_message_at desc);

alter table chat_conversations enable row level security;
alter table chat_messages enable row level security;

-- No policies added on purpose — service role key (used server-side only)
-- bypasses RLS entirely, same as contact_submissions.
