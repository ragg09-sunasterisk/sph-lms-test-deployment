export const MAX_FILE_SIZE = 3145728; // 3MB

export const validFileExtensions = {
  image: ['jpg', 'png', 'jpeg', 'webp'],
};

export const isValidFileType = (fileName: string, fileType: string): boolean => {
  return (
    !!fileName &&
    validFileExtensions[fileType as keyof typeof validFileExtensions].includes(
      fileName.split('.').pop() as string
    )
  );
};
