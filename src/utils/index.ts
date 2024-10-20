import Quill from 'quill';
export const API_URL = `${import.meta.env.VITE_APP_API_URL}`
export const CLOUDINARY_URL = `${import.meta.env.VITE_APP_CLOUDINARY_URL}`

export function initializeQuill(descriptionContainer: HTMLElement, content: string, readOnly = true) {
  const quill = new Quill(descriptionContainer, {
    theme: 'snow',
    readOnly,
    modules: {
      toolbar: !readOnly
    }
  });

  const descriptionContent = JSON.parse(content);
  quill.setContents(descriptionContent);

  if (readOnly) {
    quill.enable(false);
  }

  return quill;
}

export function startMessageRotation(
  messages: string[],
  updateCallback: (message: string) => void,
  interval: number = 3000
): NodeJS.Timeout {
  let index = 0;
  updateCallback(messages[index]);
  const intervalId = setInterval(() => {
    index = (index + 1) % messages.length;
    updateCallback(messages[index]);
  }, interval);
  return intervalId;
}
