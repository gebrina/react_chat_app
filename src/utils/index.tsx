let scrollTimeout: ReturnType<typeof setTimeout>;

export const scrollToBottom = (element: HTMLElement) => {
  scrollTimeout && clearTimeout(scrollTimeout);
  setTimeout(() => {
    element.scrollTo({ behavior: "smooth", top: element.scrollHeight });
  }, 50);
};
