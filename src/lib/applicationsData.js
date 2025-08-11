let APPS = [];
let seq = 1;

export function createApplication(app) {
  const id = String(seq++);
  const createdAt = new Date().toISOString();
  const record = { id, createdAt, ...app };
  APPS.push(record);
  return record;
}

export function listApplicationsByUser(userId) {
  return APPS.filter((a) => a.userId === userId);
}
