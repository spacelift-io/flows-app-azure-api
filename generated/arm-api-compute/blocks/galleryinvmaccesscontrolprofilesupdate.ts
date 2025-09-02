import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GalleryInVMAccessControlProfiles_Update: AppBlock = {
  name: "Gallery In VM Access Control Profiles / Update",
  description: "Update a gallery inVMAccessControlProfile.",
  category: "Gallery In VM Access Control Profiles",
  inputs: {
    default: {
      config: {
        galleryName: {
          name: "Gallery Name",
          description: "Name of the gallery",
          type: "string",
          required: true,
        },
        inVMAccessControlProfileName: {
          name: "In VM Access Control Profile Name",
          description: "Name of the in vmaccess control profile",
          type: "string",
          required: true,
        },
        galleryInVMAccessControlProfile: {
          name: "Gallery In VM Access Control Profile",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  osType: {
                    type: "string",
                  },
                  applicableHostEndpoint: {
                    type: "string",
                  },
                },
                required: ["osType", "applicableHostEndpoint"],
              },
            },
          },
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
        const requestBody =
          input.event.inputConfig.galleryInVMAccessControlProfile;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/galleries/${input.event.inputConfig.galleryName}/inVMAccessControlProfiles/${input.event.inputConfig.inVMAccessControlProfileName}` +
          "?api-version=2024-03-03";

        const result = await makeAzureRequest(
          input,
          url,
          "PATCH",
          requestBody,
          undefined,
          input.event.inputConfig.isBinaryData || false,
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
        properties: {
          properties: {
            type: "object",
            properties: {
              description: {
                type: "string",
              },
              osType: {
                type: "string",
              },
              applicableHostEndpoint: {
                type: "string",
              },
            },
            required: ["osType", "applicableHostEndpoint"],
          },
        },
      },
    },
  },
};

export default GalleryInVMAccessControlProfiles_Update;
