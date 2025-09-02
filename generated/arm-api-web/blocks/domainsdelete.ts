import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Domains_Delete: AppBlock = {
  name: "Domains / Delete",
  description: "Description for Delete a domain.",
  category: "Domains",
  inputs: {
    default: {
      config: {
        domainName: {
          name: "Domain Name",
          description: "Name of the domain",
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
        forceHardDeleteDomain: {
          name: "Force Hard Delete Domain",
          description:
            "Specify <code>true</code> to delete the domain immediately. The default is <code>false</code> which deletes the domain after 24 hours.",
          type: "boolean",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.DomainRegistration/domains/${input.event.inputConfig.domainName}` +
          "?api-version=2024-11-01" +
          (input.event.inputConfig.forceHardDeleteDomain
            ? `&forceHardDeleteDomain=${input.event.inputConfig.forceHardDeleteDomain}`
            : "");

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

export default Domains_Delete;
