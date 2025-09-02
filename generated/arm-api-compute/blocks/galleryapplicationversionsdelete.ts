import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GalleryApplicationVersions_Delete: AppBlock = {
  name: "Gallery Application Versions / Delete",
  description: "Delete a gallery Application Version.",
  category: "Gallery Application Versions",
  inputs: {
    default: {
      config: {
        galleryName: {
          name: "Gallery Name",
          description: "Name of the gallery",
          type: "string",
          required: true,
        },
        galleryApplicationName: {
          name: "Gallery Application Name",
          description: "Name of the gallery application",
          type: "string",
          required: true,
        },
        galleryApplicationVersionName: {
          name: "Gallery Application Version Name",
          description: "Name of the gallery application version",
          type: "string",
          required: true,
        },
        subscriptionId: {
          name: "Subscription ID",
          description:
            "Azure subscription ID (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
        resourceGroupName: {
          name: "Resource Group Name",
          description:
            "Azure resource group name (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/galleries/${input.event.inputConfig.galleryName}/applications/${input.event.inputConfig.galleryApplicationName}/versions/${input.event.inputConfig.galleryApplicationVersionName}` +
          "?api-version=2024-03-03";

        const result = await makeAzureRequest(
          input,
          url,
          "DELETE",
          undefined,
          undefined,
          false,
        );
        await events.emit(result || {});
      },
    },
  },
  outputs: {
    default: {
      possiblePrimaryParents: ["default"],
      type: {
        type: "object",
        additionalProperties: true,
      },
    },
  },
};

export default GalleryApplicationVersions_Delete;
