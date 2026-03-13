export async function uploadAttachment(file: File, taskId: string) {
  const form = new FormData();
  form.append('file', file);
  form.append('taskId', taskId);

  const res = await fetch('/api/attachments/upload', {
    method: 'POST',
    body: form,
    credentials: 'include',
  });

  return res.json();
}

export async function getAttachments(taskId: string) {
  const res = await fetch(`/api/attachments?taskId=${taskId}`, {
    credentials: 'include',
  });

  return res.json();
}

export async function deleteAttachment(id: string) {
  const res = await fetch(`/api/attachments/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  return res.json();
}
