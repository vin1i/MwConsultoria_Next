export const getImageUrl = (imageId: string): string => {
    const cloudName = "seu-cloud-name"; // Substitua pelo seu nome no Cloudinary
    return `https://res.cloudinary.com/${cloudName}/image/upload/v1/${imageId}`;
  };
  