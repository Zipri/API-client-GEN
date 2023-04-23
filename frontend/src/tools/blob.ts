export const downloadFileByBlob = (blob: Blob, fileName: string, status?: number, inNewTab?: boolean) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');

  document.body && document.body.appendChild(a);
  a.style.display = 'none';
  a.download = fileName;
  a.href = url;

  if (inNewTab) {
    a.target = 'blank';
  }

  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

export const binaryToBlob = (data: string): Blob => {
  let l = data.length,
    d: string = data,
    array = new Uint8Array(l);

  for (let i = 0; i < l; i++){
    array[i] = d?.charCodeAt(i);
  }

  const blob = new Blob([array], {type: 'application/octet-stream'});
  return blob;
};
