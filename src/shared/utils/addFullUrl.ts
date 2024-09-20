export const addFullUrl = (url: string) => {
  return url.replaceAll("/uploads", `http://localhost:4200/uploads`);
};
