const createUrl = (path: string) => {
  return window.location.origin + path;
};

export const updatedEntry = async (id: string, content: string) => {
  const res = await fetch(new Request(createUrl(`/api/journal/${id}`), {
    method: "PATCH",
    body: JSON.stringify({ content }),
  }));

  if (res.ok) {
    const json = await res.json();
    return json.data;
  }
};

export const createNewEntry = async () => {
  const res = await fetch(new Request(createUrl("/api/journal"), {
    method: "POST",
  }));

  if (res.ok) {
    const json = await res.json();
    return json.data;
  }
};