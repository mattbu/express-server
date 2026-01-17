type User = { id: number; name: string };

export async function listUsers(): Promise<User[]> {
  return [
    { id: 1, name: "Tom" },
    { id: 2, name: "Jane" },
  ];
}

export async function getUserById(id: number): Promise<User | null> {
  const users = await listUsers();
  return users.find((user) => user.id === id) ?? null;
}
