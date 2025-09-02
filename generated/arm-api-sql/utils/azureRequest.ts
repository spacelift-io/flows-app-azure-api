/**
 * Azure Management Plane API utilities
 */

export async function makeAzureRequest(
  input: any,
  url: string,
  method: string,
  body?: any,
  additionalHeaders?: Record<string, string>,
  isBinaryUpload?: boolean,
): Promise<any> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${input.app.config.accessToken}`,
    "Accept-Language": "",
  };

  let requestBody: any = undefined;

  if (body) {
    if (isBinaryUpload) {
      if (typeof body === "string") {
        // For binary uploads, decode base64 and send as raw binary data
        try {
          const binaryString = atob(body);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          requestBody = bytes;
          // Don't set Content-Type here - let additional headers override if needed
        } catch (error) {
          throw new Error(`Invalid base64 data: ${error}`);
        }
      } else {
        throw new Error(
          "Binary data must be provided as base64-encoded string",
        );
      }
    } else {
      // For text content, send as-is (string) or JSON stringify if object
      if (typeof body === "string") {
        requestBody = body;
        // Don't set Content-Type - let additional headers override if needed
      } else {
        requestBody = JSON.stringify(body);
        headers["Content-Type"] = "application/json";
      }
    }
  }

  // Add additional headers if provided (after setting default Content-Type)
  if (additionalHeaders) {
    Object.assign(headers, additionalHeaders);
  }

  const response = await fetch(url, {
    method,
    headers,
    body: requestBody,
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  // Handle empty responses (like 204 No Content)
  const text = await response.text();
  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    // If it's not valid JSON, return the text as-is
    return { data: text };
  }
}
