"use server";
function stripQueryString(str: string = "", andRemoveFirstSlash = false) {
  const urlWithoutParams = str.replace(/\?.*$/, "");
  let url = urlWithoutParams;
  if (andRemoveFirstSlash && urlWithoutParams[0] === "/") {
    url = urlWithoutParams.substring(1);
  }
  return url;
}
export const getBase64 = async (
  imagePath: string,
  imageHeight?: any,
  focalPoint?: any,
) => {
  "use server";
  const imageUrl = imagePath.includes("http")
    ? imagePath
    : `${process.env.IMAGE_PROCESSOR_URL}${stripQueryString(imagePath, true)}`;
  const hasFocalPoint = focalPoint ? `&rxy=${focalPoint}` : "";
  const hasHeight = imageHeight ? `&height=${imageHeight}` : "";
  try {
    const response = await fetch(
      `${imageUrl}?width=10&quality=10${hasFocalPoint}${hasHeight}`,
    );
    if (!response.ok) {
      return null;
    }
    const arrayBuffer = await response.arrayBuffer();
    return `data:image/jpeg;base64,${arrayBufferToBase64(arrayBuffer)}`;
  } catch {
    console.error("Failed to fetch image");
    return null;
  }
};
function arrayBufferToBase64(arrayBuffer: any) {
  const uint8Array = new Uint8Array(arrayBuffer);
  let binaryString = "";
  for (let i = 0; i < uint8Array.length; i++) {
    binaryString += String.fromCharCode(uint8Array[i]);
  }
  return btoa(binaryString);
}
