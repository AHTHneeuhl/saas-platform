export interface GithubWebhookPayload {
  action: string;
  pull_request?: unknown;
  issue?: unknown;
}
