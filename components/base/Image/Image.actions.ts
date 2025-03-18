"use server";
function stripQueryString(str: string = "", andRemoveFirstSlash = false) {
  const urlWithoutParams = str.replace(/\?.*$/, "");
  let url = urlWithoutParams;
  if (andRemoveFirstSlash && urlWithoutParams[0] === "/") {
    url = urlWithoutParams.substring(1);
  }
  return url;
}
export async function getBase64(
  imagePath: string,
  imageHeight: string | null,
  focalPoint: string | null,
) {
  "use server";

  const isAbsoluteUrl = imagePath.startsWith("http");
  const baseUrl = process.env.IMAGE_PROCESSOR_URL || "";
  const sanitizedPath = isAbsoluteUrl
    ? imagePath
    : `${baseUrl}${stripQueryString(imagePath, false)}`;

  const url = new URL(sanitizedPath);
  const searchParams = new URLSearchParams(url.search);

  searchParams.set("width", "10");
  searchParams.set("quality", "10");

  if (focalPoint) {
    searchParams.set("rxy", focalPoint);
  }

  if (imageHeight) {
    searchParams.set("height", imageHeight.toString());
  }

  try {
    const response = await fetch(
      `${url.origin}${url.pathname}?${searchParams.toString()}`,
    );

    if (!response.ok) {
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    return `data:image/jpeg;base64,${arrayBufferToBase64(arrayBuffer)}`;
  } catch (error) {
    console.error("Failed to fetch image", url);
    return null;
  }
}

function arrayBufferToBase64(arrayBuffer: any) {
  const uint8Array = new Uint8Array(arrayBuffer);
  let binaryString = "";
  for (let i = 0; i < uint8Array.length; i++) {
    binaryString += String.fromCharCode(uint8Array[i]);
  }
  return btoa(binaryString);
}
