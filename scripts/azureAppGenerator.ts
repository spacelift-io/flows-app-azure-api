#!/usr/bin/env node

/**
 * Azure Flows App Generator
 *
 * Generates Flows apps from Azure REST API specifications (OpenAPI/Swagger)
 * Focuses on creating REST-based blocks with token authentication
 */

import * as fs from "fs";
import * as path from "path";
import { spawn } from "child_process";
import $RefParser from "@apidevtools/json-schema-ref-parser";

// Types for OpenAPI/Swagger 2.0 structure
interface SwaggerSpec {
  swagger: string;
  info: {
    title: string;
    description: string;
    version: string;
  };
  host: string;
  basePath?: string;
  schemes: string[];
  paths: Record<string, PathItem>;
  definitions?: Record<string, SchemaObject>;
}

interface PathItem {
  [method: string]: Operation;
}

interface Operation {
  tags?: string[];
  summary?: string;
  description?: string;
  operationId: string;
  parameters?: Parameter[];
  responses: Record<string, Response>;
  "x-ms-examples"?: Record<string, any>;
  "x-ms-long-running-operation"?: boolean;
}

interface Parameter {
  name: string;
  in: "path" | "query" | "header" | "body" | "formData";
  description?: string;
  required?: boolean;
  type?: string;
  enum?: string[];
  schema?: SchemaObject;
  $ref?: string;
}

interface Response {
  description: string;
  schema?: SchemaObject;
}

interface SchemaObject {
  type?: string;
  format?: string;
  properties?: Record<string, SchemaObject>;
  items?: SchemaObject;
  required?: string[];
  $ref?: string;
  additionalProperties?: boolean | SchemaObject;
}

interface ServiceDefinition {
  name: string;
  description: string;
  operations: OperationDefinition[];
  definitions?: Record<string, SchemaObject>;
  apiVersion?: string; // API version from OpenAPI spec
}

interface OperationDefinition {
  name: string;
  description: string;
  category: string;
  method: string;
  path: string;
  operationId: string;
  parameters: Parameter[];
  responseSchema?: SchemaObject;
  isLongRunning: boolean;
  planeType: "management" | "dataplane";
  apiVersion: string; // API version from OpenAPI spec
}

class AzureAppGenerator {
  private specsPath: string;

  constructor(specsPath: string) {
    this.specsPath = specsPath;
  }

  /**
   * Generate Azure service apps from OpenAPI specifications
   */
  async generateApps(): Promise<void> {
    console.log("Starting Azure app generation...");

    // Generate apps for multiple services
    await this.generateStorageManagementApp();
    await this.generateStorageDataPlaneApp();
    await this.generateComputeApp();
    await this.generateContainerServiceApp();
    await this.generateKeyVaultManagementApp();
    await this.generateKeyVaultDataPlaneApp();
    await this.generateContainerRegistryManagementApp();
    await this.generateContainerRegistryDataPlaneApp();
    await this.generateWebServiceApp();
    await this.generateNetworkManagementApp();
    await this.generateSqlManagementApp();
    await this.generateDevOpsInfrastructureManagementApp();
    await this.generateDevOpsManagementApp();
    await this.generateAppConfigurationManagementApp();
    await this.generateAppConfigurationDataPlaneApp();
    await this.generateServiceBusManagementApp();
    await this.generateServiceBusDataPlaneApp();
    await this.generateMonitorManagementApp();
    await this.generateMonitorDataPlaneApp();
  }

  /**
   * Generate Storage Resource Manager app
   */
  async generateStorageManagementApp(): Promise<void> {
    console.log("Generating Storage Management (ARM) app...");

    const storageSpecDir = path.join(
      this.specsPath,
      "specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01"
    );

    // All Storage Resource Manager spec files
    const storageSpecFiles = [
      "storage.json",
      "blob.json",
      "file.json",
      "queue.json",
      "table.json",
      "privatelinks.json",
      "networkSecurityPerimeter.json",
      "storageTaskAssignments.json",
    ];

    const allOperations: OperationDefinition[] = [];

    // Process each spec file
    for (const specFile of storageSpecFiles) {
      const specPath = path.join(storageSpecDir, specFile);

      if (!fs.existsSync(specPath)) {
        console.warn(`Storage spec not found: ${specFile}`);
        continue;
      }

      console.log(`Processing ${specFile}...`);
      const spec = await this.loadSwaggerSpec(specPath);
      const service = this.parseSwaggerSpec(
        spec,
        "storage-management",
        "management"
      );
      allOperations.push(...service.operations);
    }

    // Create combined service definition
    const combinedService: ServiceDefinition = {
      name: "storage-management",
      description:
        "Azure Storage Resource Manager operations (accounts, containers, policies)",
      operations: allOperations,
    };

    await this.generateServiceApp(combinedService);
  }

  /**
   * Generate Storage Data Plane app
   */
  async generateStorageDataPlaneApp(): Promise<void> {
    console.log("Generating Storage Data Plane app...");

    const dataPlaneDir = path.join(
      this.specsPath,
      "specification/storage/data-plane"
    );

    // Find latest data plane specs
    const blobSpecPath = path.join(
      dataPlaneDir,
      "Microsoft.BlobStorage/stable/2025-07-05/blob.json"
    );
    const fileSpecPath = path.join(
      dataPlaneDir,
      "Microsoft.FileStorage/stable/2025-07-05/file.json"
    );
    const queueSpecPath = path.join(
      dataPlaneDir,
      "Microsoft.QueueStorage/stable/2025-07-05/queue.json"
    );

    const allOperations: OperationDefinition[] = [];

    // Process each data plane spec
    const dataPlaneSpecs = [
      { path: blobSpecPath, name: "blob data plane" },
      { path: fileSpecPath, name: "file data plane" },
      { path: queueSpecPath, name: "queue data plane" },
    ];

    for (const { path: specPath, name } of dataPlaneSpecs) {
      if (!fs.existsSync(specPath)) {
        console.warn(`${name} spec not found: ${path.basename(specPath)}`);
        continue;
      }

      console.log(`Processing ${name}...`);
      const spec = await this.loadSwaggerSpec(specPath);
      const service = this.parseSwaggerSpec(spec, "storage-data", "dataplane");
      allOperations.push(...service.operations);
    }

    // Create combined service definition
    const combinedService: ServiceDefinition = {
      name: "storage-data",
      description:
        "Azure Storage Data Plane operations (blob, file, queue data operations)",
      operations: allOperations,
    };

    await this.generateServiceApp(combinedService);
  }

  /**
   * Generate Compute service app
   */
  async generateComputeApp(): Promise<void> {
    console.log("Generating Compute service app...");

    const computeSpecDir = path.join(
      this.specsPath,
      "specification/compute/resource-manager/Microsoft.Compute"
    );

    // All Compute service spec files with their latest stable versions
    const computeSpecs = [
      { path: "ComputeRP/stable/2024-11-01/ComputeRP.json", name: "ComputeRP" },
      { path: "DiskRP/stable/2025-01-02/DiskRP.json", name: "DiskRP" },
      { path: "GalleryRP/stable/2024-03-03/GalleryRP.json", name: "GalleryRP" },
      {
        path: "RecommenderRP/stable/2025-06-05/RecommenderRP.json",
        name: "RecommenderRP",
      },
      {
        path: "CloudserviceRP/stable/2024-11-04/cloudService.json",
        name: "CloudserviceRP",
      },
      { path: "Skus/stable/2017-09-01/skus.json", name: "Skus" },
    ];

    const allOperations: OperationDefinition[] = [];

    // Process each spec file
    for (const specInfo of computeSpecs) {
      const specPath = path.join(computeSpecDir, specInfo.path);

      if (!fs.existsSync(specPath)) {
        console.warn(
          `Compute spec not found: ${specInfo.name} at ${specInfo.path}`
        );
        continue;
      }

      console.log(`Processing ${specInfo.name}...`);
      const spec = await this.loadSwaggerSpec(specPath);
      const service = this.parseSwaggerSpec(spec, "compute", "management");
      allOperations.push(...service.operations);
    }

    // Create combined service definition
    const combinedService: ServiceDefinition = {
      name: "compute",
      description:
        "Azure Compute services (VMs, disks, galleries, recommendations, cloud services)",
      operations: allOperations,
    };

    await this.generateServiceApp(combinedService);
  }

  /**
   * Generate Container Service app (AKS, Fleet, OpenShift, etc.)
   */
  async generateContainerServiceApp(): Promise<void> {
    console.log("Generating Container Service app...");

    const containerServiceSpecDir = path.join(
      this.specsPath,
      "specification/containerservice/resource-manager/Microsoft.ContainerService"
    );

    // All Container Service spec files with their latest stable versions
    const containerServiceSpecs = [
      {
        path: "aks/stable/2025-07-01/managedClusters.json",
        name: "ManagedClusters",
      },
      { path: "fleet/stable/2025-03-01/fleets.json", name: "Fleets" },
      {
        path: "deploymentsafeguards/stable/2025-07-01/deploymentsafeguards.json",
        name: "DeploymentSafeguards",
      },
    ];

    const allOperations: OperationDefinition[] = [];

    // Process each spec file
    for (const specInfo of containerServiceSpecs) {
      const specPath = path.join(containerServiceSpecDir, specInfo.path);

      if (!fs.existsSync(specPath)) {
        console.warn(
          `Container Service spec not found: ${specInfo.name} at ${specInfo.path}`
        );
        continue;
      }

      console.log(`Processing ${specInfo.name}...`);
      const spec = await this.loadSwaggerSpec(specPath);
      const service = this.parseSwaggerSpec(
        spec,
        "containerservice",
        "management"
      );
      allOperations.push(...service.operations);
    }

    // Create combined service definition
    const combinedService: ServiceDefinition = {
      name: "containerservice",
      description:
        "Azure Container Service (AKS, Fleet, Deployment Safeguards)",
      operations: allOperations,
    };

    await this.generateServiceApp(combinedService);
  }

  /**
   * Generate Key Vault Management app
   */
  async generateKeyVaultManagementApp(): Promise<void> {
    console.log("Generating Key Vault Management app...");

    const keyVaultSpecDir = path.join(
      this.specsPath,
      "specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2023-07-01"
    );

    // Key Vault Resource Manager spec files
    const keyVaultSpecFiles = [
      "keyvault.json",
      "secrets.json",
      "keys.json",
      "managedHsm.json",
    ];

    const allOperations: OperationDefinition[] = [];

    // Process each spec file
    for (const specFile of keyVaultSpecFiles) {
      const specPath = path.join(keyVaultSpecDir, specFile);

      if (!fs.existsSync(specPath)) {
        console.warn(`Key Vault spec not found: ${specFile}`);
        continue;
      }

      console.log(`Processing ${specFile}...`);
      const spec = await this.loadSwaggerSpec(specPath);
      const service = this.parseSwaggerSpec(
        spec,
        "keyvault-management",
        "management"
      );
      allOperations.push(...service.operations);
    }

    // Create combined service definition
    const combinedService: ServiceDefinition = {
      name: "keyvault-management",
      description:
        "Azure Key Vault Resource Manager operations (vaults, keys, secrets, HSM)",
      operations: allOperations,
    };

    await this.generateServiceApp(combinedService);
  }

  /**
   * Generate Container Registry Management app
   */
  async generateContainerRegistryManagementApp(): Promise<void> {
    console.log("Generating Container Registry Management (ARM) app...");

    const containerRegistrySpecDir = path.join(
      this.specsPath,
      "specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/stable/2025-04-01"
    );

    // Container Registry Resource Manager spec files
    const containerRegistrySpecFiles = ["containerregistry.json"];

    const allOperations: OperationDefinition[] = [];

    // Process each spec file
    for (const specFile of containerRegistrySpecFiles) {
      const specPath = path.join(containerRegistrySpecDir, specFile);

      if (!fs.existsSync(specPath)) {
        console.warn(`Container Registry spec not found: ${specFile}`);
        continue;
      }

      console.log(`Processing ${specFile}...`);
      const spec = await this.loadSwaggerSpec(specPath);
      const service = this.parseSwaggerSpec(
        spec,
        "containerregistry-management",
        "management"
      );
      allOperations.push(...service.operations);
    }

    // Create combined service definition
    const combinedService: ServiceDefinition = {
      name: "containerregistry-management",
      description:
        "Azure Container Registry Resource Manager operations (registries, webhooks, replications)",
      operations: allOperations,
    };

    await this.generateServiceApp(combinedService);
  }

  /**
   * Generate Container Registry Data Plane app
   */
  async generateContainerRegistryDataPlaneApp(): Promise<void> {
    console.log("Generating Container Registry Data Plane app...");

    const containerRegistryDataSpecDir = path.join(
      this.specsPath,
      "specification/containerregistry/data-plane/Azure.ContainerRegistry/stable/2021-07-01"
    );

    // Container Registry Data Plane spec files
    const containerRegistryDataSpecs = ["containerregistry.json"];

    const allOperations: OperationDefinition[] = [];

    // Process each data plane spec
    for (const specFile of containerRegistryDataSpecs) {
      const specPath = path.join(containerRegistryDataSpecDir, specFile);

      if (!fs.existsSync(specPath)) {
        console.warn(
          `Container Registry data plane spec not found: ${specFile}`
        );
        continue;
      }

      console.log(`Processing ${specFile}...`);
      const spec = await this.loadSwaggerSpec(specPath);
      const service = this.parseSwaggerSpec(
        spec,
        "containerregistry-data",
        "dataplane"
      );
      allOperations.push(...service.operations);
    }

    // Create combined service definition
    const combinedService: ServiceDefinition = {
      name: "containerregistry-data",
      description:
        "Azure Container Registry Data Plane operations (image catalog, manifests, blobs, repositories)",
      operations: allOperations,
    };

    await this.generateServiceApp(combinedService);
  }

  /**
   * Generate Web service app (App Service, Certificate Registration, Domain Registration)
   */
  async generateWebServiceApp(): Promise<void> {
    console.log("Generating Web Service (ARM) app...");

    const allOperations: OperationDefinition[] = [];

    // Microsoft.Web - App Service, Static Sites, etc.
    const webSpecDir = path.join(
      this.specsPath,
      "specification/web/resource-manager/Microsoft.Web/stable/2024-11-01"
    );

    const webSpecFiles = [
      "AppServiceEnvironments.json",
      "AppServicePlans.json",
      "Certificates.json",
      "DeletedWebApps.json",
      "Diagnostics.json",
      "Global.json",
      "KubeEnvironments.json",
      "Provider.json",
      "Recommendations.json",
      "ResourceHealthMetadata.json",
      "ResourceProvider.json",
      "SiteCertificates.json",
      "StaticSites.json",
      "WebApps.json",
    ];

    // Process Microsoft.Web specs
    for (const specFile of webSpecFiles) {
      const specPath = path.join(webSpecDir, specFile);

      if (!fs.existsSync(specPath)) {
        console.warn(`Web spec not found: ${specFile}`);
        continue;
      }

      console.log(`Processing Microsoft.Web/${specFile}...`);
      const spec = await this.loadSwaggerSpec(specPath);
      const service = this.parseSwaggerSpec(spec, "web", "management");
      allOperations.push(...service.operations);
    }

    // Microsoft.CertificateRegistration
    const certSpecDir = path.join(
      this.specsPath,
      "specification/web/resource-manager/Microsoft.CertificateRegistration/stable/2024-11-01"
    );

    const certSpecFiles = [
      "AppServiceCertificateOrders.json",
      "CertificateOrdersDiagnostics.json",
      "CertificateRegistrationProvider.json",
    ];

    // Process Microsoft.CertificateRegistration specs
    for (const specFile of certSpecFiles) {
      const specPath = path.join(certSpecDir, specFile);

      if (!fs.existsSync(specPath)) {
        console.warn(`Certificate Registration spec not found: ${specFile}`);
        continue;
      }

      console.log(
        `Processing Microsoft.CertificateRegistration/${specFile}...`
      );
      const spec = await this.loadSwaggerSpec(specPath);
      const service = this.parseSwaggerSpec(spec, "web", "management");
      allOperations.push(...service.operations);
    }

    // Microsoft.DomainRegistration
    const domainSpecDir = path.join(
      this.specsPath,
      "specification/web/resource-manager/Microsoft.DomainRegistration/stable/2024-11-01"
    );

    const domainSpecFiles = [
      "DomainRegistrationProvider.json",
      "Domains.json",
      "TopLevelDomains.json",
    ];

    // Process Microsoft.DomainRegistration specs
    for (const specFile of domainSpecFiles) {
      const specPath = path.join(domainSpecDir, specFile);

      if (!fs.existsSync(specPath)) {
        console.warn(`Domain Registration spec not found: ${specFile}`);
        continue;
      }

      console.log(`Processing Microsoft.DomainRegistration/${specFile}...`);
      const spec = await this.loadSwaggerSpec(specPath);
      const service = this.parseSwaggerSpec(spec, "web", "management");
      allOperations.push(...service.operations);
    }

    // Create combined service definition
    const combinedService: ServiceDefinition = {
      name: "web",
      description:
        "Azure Web services (App Service, Certificate Registration, Domain Registration)",
      operations: allOperations,
    };

    await this.generateServiceApp(combinedService);
  }

  /**
   * Generate Monitor Management app (Microsoft.Insights, Microsoft.Monitor, Microsoft.OperationalInsights)
   */
  async generateMonitorManagementApp(): Promise<void> {
    console.log("Generating Monitor Management (ARM) app...");

    const allOperations: OperationDefinition[] = [];

    // Microsoft.Insights - Core monitoring and alerts
    const insightsSpecDir = path.join(
      this.specsPath,
      "specification/monitor/resource-manager/Microsoft.Insights"
    );

    // Use latest stable versions for Microsoft.Insights
    const insightsSpecs = [
      {
        path: "stable/2023-01-01/actionGroups_API.json",
        name: "Action Groups",
      },
      {
        path: "stable/2023-03-11/dataCollectionEndpoints_API.json",
        name: "Data Collection Endpoints",
      },
      {
        path: "stable/2023-03-11/dataCollectionRuleAssociations_API.json",
        name: "Data Collection Rule Associations",
      },
      {
        path: "stable/2023-03-11/dataCollectionRules_API.json",
        name: "Data Collection Rules",
      },
      {
        path: "stable/2024-02-01/metricDefinitions_API.json",
        name: "Metric Definitions",
      },
      {
        path: "stable/2024-02-01/metricNamespaces_API.json",
        name: "Metric Namespaces",
      },
      { path: "stable/2024-02-01/metrics_API.json", name: "Metrics" },
      {
        path: "stable/2023-12-01/scheduledQueryRule_API.json",
        name: "Scheduled Query Rules",
      },
    ];

    // Process Microsoft.Insights specs
    for (const specInfo of insightsSpecs) {
      const specPath = path.join(insightsSpecDir, specInfo.path);

      if (!fs.existsSync(specPath)) {
        console.warn(
          `Insights spec not found: ${specInfo.name} at ${specInfo.path}`
        );
        continue;
      }

      console.log(`Processing Microsoft.Insights/${specInfo.name}...`);
      const spec = await this.loadSwaggerSpec(specPath);
      const service = this.parseSwaggerSpec(
        spec,
        "monitor-management",
        "management"
      );
      allOperations.push(...service.operations);
    }

    // Microsoft.Monitor - Monitoring accounts
    const monitorSpecDir = path.join(
      this.specsPath,
      "specification/monitor/resource-manager/Microsoft.Monitor/stable/2023-04-03"
    );

    const monitorSpecs = ["monitoringAccounts_API.json", "operations_API.json"];

    // Process Microsoft.Monitor specs
    for (const specFile of monitorSpecs) {
      const specPath = path.join(monitorSpecDir, specFile);

      if (!fs.existsSync(specPath)) {
        console.warn(`Monitor spec not found: ${specFile}`);
        continue;
      }

      console.log(`Processing Microsoft.Monitor/${specFile}...`);
      const spec = await this.loadSwaggerSpec(specPath);
      const service = this.parseSwaggerSpec(
        spec,
        "monitor-management",
        "management"
      );
      allOperations.push(...service.operations);
    }

    // Microsoft.OperationalInsights - Log Analytics workspaces
    const operationalInsightsSpecDir = path.join(
      this.specsPath,
      "specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/stable/2025-02-01"
    );

    const operationalInsightsSpecs = [
      "OperationalInsights.json",
      "Workspaces.json",
      "WorkspacePurge.json",
      "DataSources.json",
      "IntelligencePacks.json",
      "LinkedServices.json",
      "LinkedStorageAccounts.json",
      "ManagementGroups.json",
      "SavedSearches.json",
      "Schema.json",
      "SharedKeys.json",
      "StorageInsightConfigs.json",
      "Tables.json",
      "Usages.json",
      "WorkspacesFailover.json",
      "Workspaces_NetworkSecurityPerimeter_API.json",
    ];

    // Process Microsoft.OperationalInsights specs
    for (const specFile of operationalInsightsSpecs) {
      const specPath = path.join(operationalInsightsSpecDir, specFile);

      if (!fs.existsSync(specPath)) {
        console.warn(`OperationalInsights spec not found: ${specFile}`);
        continue;
      }

      console.log(`Processing Microsoft.OperationalInsights/${specFile}...`);
      const spec = await this.loadSwaggerSpec(specPath);
      const service = this.parseSwaggerSpec(
        spec,
        "monitor-management",
        "management"
      );
      allOperations.push(...service.operations);
    }

    // Create combined service definition
    const combinedService: ServiceDefinition = {
      name: "monitor-management",
      description:
        "Azure Monitor Management operations (Insights, Monitor accounts, Operational Insights)",
      operations: allOperations,
    };

    await this.generateServiceApp(combinedService);
  }

  /**
   * Generate Network Management app (Virtual Networks, Load Balancers, Application Gateways, etc.)
   */
  async generateNetworkManagementApp(): Promise<void> {
    console.log("Generating Network Management (ARM) app...");

    const networkSpecDir = path.join(
      this.specsPath,
      "specification/network/resource-manager/Microsoft.Network/stable/2024-10-01"
    );

    // All Network Resource Manager spec files - comprehensive coverage
    const networkSpecFiles = [
      "applicationGateway.json",
      "applicationGatewayWafDynamicManifests.json",
      "applicationSecurityGroup.json",
      "availableDelegations.json",
      "availableServiceAliases.json",
      "azureFirewall.json",
      "azureFirewallFqdnTag.json",
      "azureWebCategory.json",
      "bastionHost.json",
      "checkDnsAvailability.json",
      "cloudServiceNetworkInterface.json",
      "cloudServicePublicIpAddress.json",
      "cloudServiceSwap.json",
      "customIpPrefix.json",
      "ddosCustomPolicy.json",
      "ddosProtectionPlan.json",
      "dscpConfiguration.json",
      "endpointService.json",
      "expressRouteCircuit.json",
      "expressRouteCrossConnection.json",
      "expressRoutePort.json",
      "expressRouteProviderPort.json",
      "firewallPolicy.json",
      "ipAddressManager.json",
      "ipAllocation.json",
      "ipGroups.json",
      "loadBalancer.json",
      "natGateway.json",
      "network.json",
      "networkInterface.json",
      "networkManager.json",
      "networkManagerActiveConfiguration.json",
      "networkManagerConnection.json",
      "networkManagerConnectivityConfiguration.json",
      "networkManagerEffectiveConfiguration.json",
      "networkManagerGroup.json",
      "networkManagerRoutingConfiguration.json",
      "networkManagerScopeConnection.json",
      "networkManagerSecurityAdminConfiguration.json",
      "networkManagerSecurityUserConfiguration.json",
      "networkProfile.json",
      "networkSecurityGroup.json",
      "networkSecurityPerimeter.json",
      "networkVerifier.json",
      "networkVirtualAppliance.json",
      "networkWatcher.json",
      "operation.json",
      "privateEndpoint.json",
      "privateLinkService.json",
      "publicIpAddress.json",
      "publicIpPrefix.json",
      "routeFilter.json",
      "routeTable.json",
      "securityPartnerProvider.json",
      "serviceCommunity.json",
      "serviceEndpointPolicy.json",
      "serviceTags.json",
      "usage.json",
      "virtualNetwork.json",
      "virtualNetworkGateway.json",
      "virtualNetworkTap.json",
      "virtualRouter.json",
      "virtualWan.json",
      "vmssNetworkInterface.json",
      "vmssPublicIpAddress.json",
      "webapplicationfirewall.json",
    ];

    const allOperations: OperationDefinition[] = [];

    // Process each spec file
    for (const specFile of networkSpecFiles) {
      const specPath = path.join(networkSpecDir, specFile);

      if (!fs.existsSync(specPath)) {
        console.warn(`Network spec not found: ${specFile}`);
        continue;
      }

      console.log(`Processing ${specFile}...`);
      const spec = await this.loadSwaggerSpec(specPath);
      const service = this.parseSwaggerSpec(
        spec,
        "network-management",
        "management"
      );
      allOperations.push(...service.operations);
    }

    // Create combined service definition
    const combinedService: ServiceDefinition = {
      name: "network-management",
      description:
        "Azure Network Management operations (Virtual Networks, Load Balancers, Application Gateways, Firewall, ExpressRoute, Network Security Groups, and more)",
      operations: allOperations,
    };

    await this.generateServiceApp(combinedService);
  }

  /**
   * Generate SQL Management app (SQL servers, databases, elastic pools, managed instances, etc.)
   */
  async generateSqlManagementApp(): Promise<void> {
    console.log("Generating SQL Management (ARM) app...");

    const sqlSpecDir = path.join(
      this.specsPath,
      "specification/sql/resource-manager/Microsoft.Sql/stable/2023-08-01"
    );

    // All SQL Resource Manager spec files - comprehensive coverage of SQL services
    const sqlSpecFiles = [
      "BackupShortTermRetentionPolicies.json",
      "BlobAuditing.json",
      "DatabaseAdvancedThreatProtectionSettings.json",
      "DatabaseAdvisors.json",
      "DatabaseAutomaticTuning.json",
      "DatabaseColumns.json",
      "DatabaseEncryptionProtectorRevalidate.json",
      "DatabaseEncryptionProtectorRevert.json",
      "DatabaseExtensions.json",
      "DatabaseOperations.json",
      "DatabaseRecommendedActions.json",
      "Databases.json",
      "DatabaseSchemas.json",
      "DatabaseSecurityAlertPolicies.json",
      "DatabaseSqlVulnerabilityAssessmentBaselines.json",
      "DatabaseSqlVulnerabilityAssessmentExecuteScan.json",
      "DatabaseSqlVulnerabilityAssessmentRuleBaselines.json",
      "DatabaseSqlVulnerabilityAssessmentScanResult.json",
      "DatabaseSqlVulnerabilityAssessmentScans.json",
      "DatabaseSqlVulnerabilityAssessmentsSettings.json",
      "DatabaseTables.json",
      "DatabaseUsages.json",
      "DatabaseVulnerabilityAssessmentRuleBaselines.json",
      "DatabaseVulnerabilityAssessments.json",
      "DatabaseVulnerabilityAssessmentScans.json",
      "DataMaskingPolicies.json",
      "DataMaskingRules.json",
      "DataWarehouseUserActivities.json",
      "DeletedServers.json",
      "DistributedAvailabilityGroups.json",
      "ElasticPoolOperations.json",
      "ElasticPools.json",
      "EncryptionProtectors.json",
      "EndpointCertificates.json",
      "FailoverGroups.json",
      "FirewallRules.json",
      "GeoBackupPolicies.json",
      "InstanceFailoverGroups.json",
      "InstancePools.json",
      "IPv6FirewallRules.json",
      "JobAgents.json",
      "JobCredentials.json",
      "JobExecutions.json",
      "JobPrivateEndpoints.json",
      "Jobs.json",
      "JobStepExecutions.json",
      "JobSteps.json",
      "JobTargetExecutions.json",
      "JobTargetGroups.json",
      "JobVersions.json",
      "LedgerDigestUploads.json",
      "LocationCapabilities.json",
      "LongTermRetentionBackups.json",
      "LongTermRetentionManagedInstanceBackups.json",
      "LongTermRetentionPolicies.json",
      "MaintenanceWindowOptions.json",
      "MaintenanceWindows.json",
      "ManagedBackupShortTermRetentionPolicies.json",
      "ManagedDatabaseAdvancedThreatProtectionSettings.json",
      "ManagedDatabaseColumns.json",
      "ManagedDatabaseMoveOperations.json",
      "ManagedDatabaseQueries.json",
      "ManagedDatabaseRestoreDetails.json",
      "ManagedDatabases.json",
      "ManagedDatabaseSchemas.json",
      "ManagedDatabaseSecurityAlertPolicies.json",
      "ManagedDatabaseSecurityEvents.json",
      "ManagedDatabaseSensitivityLabels.json",
      "ManagedDatabaseTables.json",
      "ManagedDatabaseTransparentDataEncryption.json",
      "ManagedDatabaseVulnerabilityAssessmentRuleBaselines.json",
      "ManagedDatabaseVulnerabilityAssessments.json",
      "ManagedDatabaseVulnerabilityAssessmentScans.json",
      "ManagedInstanceAdministrators.json",
      "ManagedInstanceAdvancedThreatProtectionSettings.json",
      "ManagedInstanceAzureADOnlyAuthentications.json",
      "ManagedInstanceDtcs.json",
      "ManagedInstanceEncryptionProtectors.json",
      "ManagedInstanceKeys.json",
      "ManagedInstanceLongTermRetentionPolicies.json",
      "ManagedInstanceOperations.json",
      "ManagedInstancePrivateEndpointConnections.json",
      "ManagedInstancePrivateLinkResources.json",
      "ManagedInstances.json",
      "ManagedInstanceTdeCertificates.json",
      "ManagedInstanceVulnerabilityAssessments.json",
      "ManagedLedgerDigestUploads.json",
      "ManagedRestorableDroppedDatabaseBackupShortTermRetentionPolicies.json",
      "ManagedServerDnsAliases.json",
      "ManagedServerSecurityAlertPolicies.json",
      "NetworkSecurityPerimeterConfigurations.json",
      "Operations.json",
      "OutboundFirewallRules.json",
      "PrivateEndpointConnections.json",
      "PrivateLinkResources.json",
      "RecoverableDatabases.json",
      "RecoverableManagedDatabases.json",
      "ReplicationLinks.json",
      "RestorableDroppedDatabases.json",
      "RestorableDroppedManagedDatabases.json",
      "RestorePoints.json",
      "SensitivityLabels.json",
      "ServerAdvancedThreatProtectionSettings.json",
      "ServerAdvisors.json",
      "ServerAutomaticTuning.json",
      "ServerAzureADAdministrators.json",
      "ServerAzureADOnlyAuthentications.json",
      "ServerConfigurationOptions.json",
      "ServerConnectionPolicies.json",
      "ServerDevOpsAudit.json",
      "ServerDnsAliases.json",
      "ServerKeys.json",
      "ServerOperations.json",
      "Servers.json",
      "ServerSecurityAlertPolicies.json",
      "ServerTrustCertificates.json",
      "ServerTrustGroups.json",
      "ServerUsages.json",
      "ServerVulnerabilityAssessments.json",
      "SqlAgent.json",
      "SqlVulnerabilityAssessmentBaseline.json",
      "SqlVulnerabilityAssessmentExecuteScan.json",
      "SqlVulnerabilityAssessmentRuleBaseline.json",
      "SqlVulnerabilityAssessmentScanResult.json",
      "SqlVulnerabilityAssessmentScans.json",
      "SqlVulnerabilityAssessmentsSettings.json",
      "StartStopManagedInstanceSchedules.json",
      "SubscriptionUsages.json",
      "SynapseLinkWorkspaces.json",
      "SyncAgents.json",
      "SyncGroups.json",
      "SyncMembers.json",
      "TdeCertificates.json",
      "TimeZones.json",
      "TransparentDataEncryptions.json",
      "Usages.json",
      "VirtualClusters.json",
      "VirtualNetworkRules.json",
      "WorkloadClassifiers.json",
      "WorkloadGroups.json",
    ];

    const allOperations: OperationDefinition[] = [];

    // Process each spec file
    for (const specFile of sqlSpecFiles) {
      const specPath = path.join(sqlSpecDir, specFile);

      if (!fs.existsSync(specPath)) {
        console.warn(`SQL spec not found: ${specFile}`);
        continue;
      }

      console.log(`Processing ${specFile}...`);
      const spec = await this.loadSwaggerSpec(specPath);
      const service = this.parseSwaggerSpec(
        spec,
        "sql-management",
        "management"
      );
      allOperations.push(...service.operations);
    }

    // Create combined service definition
    const combinedService: ServiceDefinition = {
      name: "sql-management",
      description:
        "Azure SQL Management operations (SQL servers, databases, elastic pools, managed instances, security, backup policies, and more)",
      operations: allOperations,
    };

    await this.generateServiceApp(combinedService);
  }

  /**
   * Generate DevOps Infrastructure Management app (Microsoft.DevOpsInfrastructure)
   */
  async generateDevOpsInfrastructureManagementApp(): Promise<void> {
    console.log("Generating DevOps Infrastructure Management (ARM) app...");

    const devOpsInfraSpecDir = path.join(
      this.specsPath,
      "specification/devopsinfrastructure/resource-manager/Microsoft.DevOpsInfrastructure/stable/2025-01-21"
    );

    // DevOps Infrastructure Resource Manager spec files
    const devOpsInfraSpecFiles = ["devopsinfrastructure.json"];

    const allOperations: OperationDefinition[] = [];

    // Process each spec file
    for (const specFile of devOpsInfraSpecFiles) {
      const specPath = path.join(devOpsInfraSpecDir, specFile);

      if (!fs.existsSync(specPath)) {
        console.warn(`DevOps Infrastructure spec not found: ${specFile}`);
        continue;
      }

      console.log(`Processing ${specFile}...`);
      const spec = await this.loadSwaggerSpec(specPath);
      const service = this.parseSwaggerSpec(
        spec,
        "devopsinfrastructure-management",
        "management"
      );
      allOperations.push(...service.operations);
    }

    // Create combined service definition
    const combinedService: ServiceDefinition = {
      name: "devopsinfrastructure-management",
      description:
        "Azure DevOps Infrastructure Management operations (pools, resources, images, skus)",
      operations: allOperations,
    };

    await this.generateServiceApp(combinedService);
  }

  /**
   * Generate DevOps Management app (Microsoft.DevOps - Azure Pipelines)
   */
  async generateDevOpsManagementApp(): Promise<void> {
    console.log("Generating DevOps Management (ARM) app...");

    const devOpsSpecDir = path.join(
      this.specsPath,
      "specification/devops/resource-manager/Microsoft.DevOps/preview/2020-07-13-preview"
    );

    // DevOps Resource Manager spec files
    const devOpsSpecFiles = ["devops.json"];

    const allOperations: OperationDefinition[] = [];

    // Process each spec file
    for (const specFile of devOpsSpecFiles) {
      const specPath = path.join(devOpsSpecDir, specFile);

      if (!fs.existsSync(specPath)) {
        console.warn(`DevOps spec not found: ${specFile}`);
        continue;
      }

      console.log(`Processing ${specFile}...`);
      const spec = await this.loadSwaggerSpec(specPath);
      const service = this.parseSwaggerSpec(
        spec,
        "devops-management",
        "management"
      );
      allOperations.push(...service.operations);
    }

    // Create combined service definition
    const combinedService: ServiceDefinition = {
      name: "devops-management",
      description:
        "Azure DevOps Management operations (pipelines, templates, operations)",
      operations: allOperations,
    };

    await this.generateServiceApp(combinedService);
  }

  /**
   * Generate App Configuration Management app (Microsoft.AppConfiguration - ARM)
   */
  async generateAppConfigurationManagementApp(): Promise<void> {
    console.log("Generating App Configuration Management (ARM) app...");

    const appConfigSpecDir = path.join(
      this.specsPath,
      "specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/stable/2024-06-01"
    );

    // App Configuration Resource Manager spec files
    const appConfigSpecFiles = ["appconfiguration.json"];

    const allOperations: OperationDefinition[] = [];

    // Process each spec file
    for (const specFile of appConfigSpecFiles) {
      const specPath = path.join(appConfigSpecDir, specFile);

      if (!fs.existsSync(specPath)) {
        console.warn(`App Configuration spec not found: ${specFile}`);
        continue;
      }

      console.log(`Processing ${specFile}...`);
      const spec = await this.loadSwaggerSpec(specPath);
      const service = this.parseSwaggerSpec(
        spec,
        "appconfiguration-management",
        "management"
      );
      allOperations.push(...service.operations);
    }

    // Create combined service definition
    const combinedService: ServiceDefinition = {
      name: "appconfiguration-management",
      description:
        "Azure App Configuration Management operations (configuration stores, keys, replicas, private endpoints)",
      operations: allOperations,
    };

    await this.generateServiceApp(combinedService);
  }

  /**
   * Generate App Configuration Data Plane app
   */
  async generateAppConfigurationDataPlaneApp(): Promise<void> {
    console.log("Generating App Configuration Data Plane app...");

    const appConfigDataSpecDir = path.join(
      this.specsPath,
      "specification/appconfiguration/data-plane/Microsoft.AppConfiguration/stable/2024-09-01"
    );

    // App Configuration Data Plane spec files
    const appConfigDataSpecs = ["appconfiguration.json"];

    const allOperations: OperationDefinition[] = [];

    // Process each data plane spec
    for (const specFile of appConfigDataSpecs) {
      const specPath = path.join(appConfigDataSpecDir, specFile);

      if (!fs.existsSync(specPath)) {
        console.warn(
          `App Configuration data plane spec not found: ${specFile}`
        );
        continue;
      }

      console.log(`Processing ${specFile}...`);
      const spec = await this.loadSwaggerSpec(specPath);
      const service = this.parseSwaggerSpec(
        spec,
        "appconfiguration-data",
        "dataplane"
      );
      allOperations.push(...service.operations);
    }

    // Create combined service definition
    const combinedService: ServiceDefinition = {
      name: "appconfiguration-data",
      description:
        "Azure App Configuration Data Plane operations (key-values, labels, locks, revisions)",
      operations: allOperations,
    };

    await this.generateServiceApp(combinedService);
  }

  /**
   * Generate Service Bus Management app (Microsoft.ServiceBus - ARM)
   */
  async generateServiceBusManagementApp(): Promise<void> {
    console.log("Generating Service Bus Management (ARM) app...");

    const serviceBusSpecDir = path.join(
      this.specsPath,
      "specification/servicebus/resource-manager/Microsoft.ServiceBus/stable/2024-01-01"
    );

    // Service Bus Resource Manager spec files
    const serviceBusSpecFiles = [
      "operations.json",
      "CheckNameAvailability.json",
      "namespace-preview.json",
      "Queue.json",
      "topics.json",
      "subscriptions.json",
      "Rules.json",
      "AuthorizationRules.json",
      "DisasterRecoveryConfig.json",
      "migrationconfigs.json",
      "networksets.json",
    ];

    const allOperations: OperationDefinition[] = [];

    // Process each spec file
    for (const specFile of serviceBusSpecFiles) {
      const specPath = path.join(serviceBusSpecDir, specFile);

      if (!fs.existsSync(specPath)) {
        console.warn(`Service Bus spec not found: ${specFile}`);
        continue;
      }

      console.log(`Processing ${specFile}...`);
      const spec = await this.loadSwaggerSpec(specPath);
      const service = this.parseSwaggerSpec(
        spec,
        "servicebus-management",
        "management"
      );
      allOperations.push(...service.operations);
    }

    // Create combined service definition
    const combinedService: ServiceDefinition = {
      name: "servicebus-management",
      description:
        "Azure Service Bus Management operations (namespaces, queues, topics, subscriptions, rules, authorization)",
      operations: allOperations,
    };

    await this.generateServiceApp(combinedService);
  }

  /**
   * Generate Service Bus Data Plane app
   */
  async generateServiceBusDataPlaneApp(): Promise<void> {
    console.log("Generating Service Bus Data Plane app...");

    const serviceBusDataSpecDir = path.join(
      this.specsPath,
      "specification/servicebus/data-plane/Microsoft.ServiceBus/stable/2021-05"
    );

    // Service Bus Data Plane spec files
    const serviceBusDataSpecs = ["servicebus.json"];

    const allOperations: OperationDefinition[] = [];

    // Process each data plane spec
    for (const specFile of serviceBusDataSpecs) {
      const specPath = path.join(serviceBusDataSpecDir, specFile);

      if (!fs.existsSync(specPath)) {
        console.warn(`Service Bus data plane spec not found: ${specFile}`);
        continue;
      }

      console.log(`Processing ${specFile}...`);
      const spec = await this.loadSwaggerSpec(specPath);
      const service = this.parseSwaggerSpec(
        spec,
        "servicebus-data",
        "dataplane"
      );
      allOperations.push(...service.operations);
    }

    // Create combined service definition
    const combinedService: ServiceDefinition = {
      name: "servicebus-data",
      description:
        "Azure Service Bus Data Plane operations (queues, topics, subscriptions management)",
      operations: allOperations,
    };

    await this.generateServiceApp(combinedService);
  }

  /**
   * Generate Monitor Data Plane app
   */
  async generateMonitorDataPlaneApp(): Promise<void> {
    console.log("Generating Monitor Data Plane app...");

    const allOperations: OperationDefinition[] = [];

    // Monitor Ingestion Data Plane
    const ingestionSpecPath = path.join(
      this.specsPath,
      "specification/monitor/data-plane/ingestion/stable/2023-01-01/DataCollectionRules.json"
    );

    if (fs.existsSync(ingestionSpecPath)) {
      console.log(`Processing Monitor Ingestion...`);
      const spec = await this.loadSwaggerSpec(ingestionSpecPath);
      const service = this.parseSwaggerSpec(spec, "monitor-data", "dataplane");
      allOperations.push(...service.operations);
    }

    // Microsoft.Insights Data Plane - Metric batches
    const insightsDataSpecPath = path.join(
      this.specsPath,
      "specification/monitor/data-plane/Microsoft.Insights/stable/2024-02-01/metricBatch.json"
    );

    if (fs.existsSync(insightsDataSpecPath)) {
      console.log(`Processing Microsoft.Insights Data Plane...`);
      const spec = await this.loadSwaggerSpec(insightsDataSpecPath);
      const service = this.parseSwaggerSpec(spec, "monitor-data", "dataplane");
      allOperations.push(...service.operations);
    }

    // Microsoft.OperationalInsights Data Plane - Log queries
    const operationalInsightsDataSpecPath = path.join(
      this.specsPath,
      "specification/operationalinsights/data-plane/Microsoft.OperationalInsights/stable/2022-10-27/OperationalInsights.json"
    );

    if (fs.existsSync(operationalInsightsDataSpecPath)) {
      console.log(`Processing Microsoft.OperationalInsights Data Plane...`);
      const spec = await this.loadSwaggerSpec(operationalInsightsDataSpecPath);
      const service = this.parseSwaggerSpec(spec, "monitor-data", "dataplane");
      allOperations.push(...service.operations);
    }

    // Create combined service definition
    const combinedService: ServiceDefinition = {
      name: "monitor-data",
      description:
        "Azure Monitor Data Plane operations (ingestion, metric batches, log queries)",
      operations: allOperations,
    };

    await this.generateServiceApp(combinedService);
  }

  /**
   * Generate Key Vault Data Plane app
   */
  async generateKeyVaultDataPlaneApp(): Promise<void> {
    console.log("Generating Key Vault Data Plane app...");

    const keyVaultDataSpecDir = path.join(
      this.specsPath,
      "specification/keyvault/data-plane/Microsoft.KeyVault/stable/7.5"
    );

    // Key Vault Data Plane spec files
    const keyVaultDataSpecs = [
      "keys.json",
      "secrets.json",
      "certificates.json",
      "storage.json",
      "backuprestore.json",
      "rbac.json",
    ];

    const allOperations: OperationDefinition[] = [];

    // Process each data plane spec
    for (const specFile of keyVaultDataSpecs) {
      const specPath = path.join(keyVaultDataSpecDir, specFile);

      if (!fs.existsSync(specPath)) {
        console.warn(`Key Vault data plane spec not found: ${specFile}`);
        continue;
      }

      console.log(`Processing ${specFile}...`);
      const spec = await this.loadSwaggerSpec(specPath);
      const service = this.parseSwaggerSpec(spec, "keyvault-data", "dataplane");
      allOperations.push(...service.operations);
    }

    // Create combined service definition
    const combinedService: ServiceDefinition = {
      name: "keyvault-data",
      description:
        "Azure Key Vault Data Plane operations (keys, secrets, certificates data operations)",
      operations: allOperations,
    };

    await this.generateServiceApp(combinedService);
  }

  /**
   * Load and parse Swagger specification file
   */
  private async loadSwaggerSpec(filePath: string): Promise<SwaggerSpec> {
    // Use $RefParser to resolve all $ref references
    const resolvedSpec = (await $RefParser.dereference(
      filePath
    )) as SwaggerSpec;
    return resolvedSpec;
  }

  /**
   * Parse Swagger spec into service definition
   */
  private parseSwaggerSpec(
    spec: SwaggerSpec,
    serviceName: string,
    planeType: "management" | "dataplane" = "management"
  ): ServiceDefinition {
    const operations: OperationDefinition[] = [];

    // Azure data plane specs use x-ms-paths instead of paths
    const pathsToProcess =
      spec.paths && Object.keys(spec.paths).length > 0
        ? spec.paths
        : (spec as any)["x-ms-paths"] || {};

    for (const [pathStr, pathItem] of Object.entries(pathsToProcess)) {
      if (typeof pathItem !== "object" || pathItem === null) continue;

      for (const [method, operation] of Object.entries(pathItem)) {
        if (
          typeof operation !== "object" ||
          operation === null ||
          !("operationId" in operation)
        )
          continue;

        const typedOperation = operation as Operation;
        const responseSchema = typedOperation.responses?.["200"]?.schema;

        const blockName = this.generateBlockName(typedOperation.operationId);
        const category = blockName.includes("/")
          ? blockName.split("/")[0].trim()
          : "General";

        // Combine path-level and operation-level parameters
        const pathLevelParams = (pathItem as any).parameters || [];
        const operationLevelParams = typedOperation.parameters || [];
        const allParameters = [...pathLevelParams, ...operationLevelParams];

        const opDef: OperationDefinition = {
          name: blockName,
          description: this.escapeDescription(
            typedOperation.description || typedOperation.summary || ""
          ),
          category: category,
          method: method.toUpperCase(),
          path: pathStr,
          operationId: typedOperation.operationId,
          parameters: allParameters,
          responseSchema: responseSchema,
          isLongRunning: typedOperation["x-ms-long-running-operation"] || false,
          planeType: planeType,
          apiVersion: spec.info.version, // Extract API version from spec
        };

        operations.push(opDef);
      }
    }

    return {
      name: serviceName,
      description: spec.info.description,
      operations,
      definitions: spec.definitions, // Store definitions for $ref resolution
      apiVersion: spec.info.version, // Extract API version from spec
    };
  }

  /**
   * Generate readable block name from operation ID
   */
  private generateBlockName(operationId: string): string {
    // Convert "StorageAccounts_Create" -> "Storage Accounts / Create"
    // Handle abbreviations properly (URL, HTTP, SAS, etc.)
    let result = operationId
      .replace(/_/g, " / ") // Replace underscores with spaced forward slash
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between lowercase and uppercase
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") // Handle acronyms like "HTTPSConfig" -> "HTTPS Config"
      .trim()
      .replace(/\s+/g, " "); // Clean up multiple spaces

    // Fix known abbreviations that got broken up
    const abbreviations = [
      "U R L",
      "H T T P",
      "H T T P S",
      "A P I",
      "J S O N",
      "X M L",
      "H T M L",
      "C S S",
      "S Q L",
      "D B",
      "V M",
      "O S",
      "I P",
      "D N S",
      "S S L",
      "T L S",
      "T C P",
      "U D P",
      "A R M",
      "S A S",
      "A C L",
      "C O R S",
      "R B A C",
      "A D",
      "A A D",
      "S S H",
      "F T P",
      "S M T P",
      "I D",
    ];

    const fullForms = [
      "URL",
      "HTTP",
      "HTTPS",
      "API",
      "JSON",
      "XML",
      "HTML",
      "CSS",
      "SQL",
      "DB",
      "VM",
      "OS",
      "IP",
      "DNS",
      "SSL",
      "TLS",
      "TCP",
      "UDP",
      "ARM",
      "SAS",
      "ACL",
      "CORS",
      "RBAC",
      "AD",
      "AAD",
      "SSH",
      "FTP",
      "SMTP",
      "ID",
    ];

    for (let i = 0; i < abbreviations.length; i++) {
      const pattern = new RegExp(`\\b${abbreviations[i]}\\b`, "g");
      result = result.replace(pattern, fullForms[i]);
    }

    return result;
  }

  /**
   * Generate service app files
   */
  private async generateServiceApp(service: ServiceDefinition): Promise<void> {
    const generatedDir = path.join(process.cwd(), "generated");

    // Determine if this is a data plane service by checking operations
    const isDataPlane = service.operations.some(
      (op) => op.planeType === "dataplane"
    );

    // Generate directory name based on plane type
    const serviceName = service.name
      .replace("-management", "")
      .replace("-data", "");
    const dirPrefix = isDataPlane ? "azure-api" : "arm-api";
    const dirName = `${dirPrefix}-${serviceName}`;

    const appDir = path.join(generatedDir, dirName);

    if (!fs.existsSync(appDir)) {
      fs.mkdirSync(appDir, { recursive: true });
    }

    // Generate main.ts
    await this.generateMainFile(appDir, service);

    // Generate blocks
    await this.generateBlocks(appDir, service);

    // Generate package.json
    await this.generatePackageJson(appDir, service);

    // Generate tsconfig.json
    await this.generateTsConfig(appDir);

    // Install dependencies
    console.log(`Installing dependencies for ${service.name} app...`);
    await this.runNpmInstall(appDir);

    // Format generated code
    console.log(`Formatting code for ${service.name} app...`);
    await this.runNpmFormat(appDir);

    console.log(`Generated ${service.name} app in ${appDir}`);
  }

  /**
   * Run npm install in the specified directory
   */
  private async runNpmInstall(appDir: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const npmProcess = spawn("npm", ["install"], {
        cwd: appDir,
        stdio: "inherit", // Show npm output in console
      });

      npmProcess.on("close", (code) => {
        if (code === 0) {
          console.log("Dependencies installed successfully");
          resolve();
        } else {
          console.error(`npm install failed with code ${code}`);
          reject(new Error(`npm install failed with code ${code}`));
        }
      });

      npmProcess.on("error", (error) => {
        console.error("Failed to start npm install:", error);
        reject(error);
      });
    });
  }

  /**
   * Run npm run format in the specified directory
   */
  private async runNpmFormat(appDir: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const npmProcess = spawn("npm", ["run", "format"], {
        cwd: appDir,
        stdio: "inherit", // Show npm output in console
      });

      npmProcess.on("close", (code) => {
        if (code === 0) {
          console.log("Code formatted successfully");
          resolve();
        } else {
          console.error(`npm run format failed with code ${code}`);
          reject(new Error(`npm run format failed with code ${code}`));
        }
      });

      npmProcess.on("error", (error) => {
        console.error("Failed to start npm run format:", error);
        reject(error);
      });
    });
  }

  /**
   * Generate main.ts file
   */
  private async generateMainFile(
    appDir: string,
    service: ServiceDefinition
  ): Promise<void> {
    const isDataPlane = service.name.includes("data");

    let configFields = `
    accessToken: {
      name: "Azure Access Token",
      description: "Access token from Azure OIDC app",
      type: "string",
      required: true,
      sensitive: true,
    },`;

    if (isDataPlane) {
      // Different config for different data plane services
      if (service.name.includes("containerregistry")) {
        configFields += `
    registryLoginUri: {
      name: "Default Container Registry Login URI",
      description: "Default container registry login URI (e.g., myregistry.azurecr.io) (optional, can be specified per block instead)",
      type: "string",
      required: false,
    },`;
      } else if (service.name.includes("monitor")) {
        configFields += `
    dataCollectionEndpoint: {
      name: "Default Data Collection Endpoint",
      description: "Default data collection endpoint (e.g., https://dce-name.eastus-2.ingest.monitor.azure.com) (optional, can be specified per block instead)",
      type: "string",
      required: false,
    },`;
      } else if (service.name.includes("appconfiguration")) {
        configFields += `
    endpoint: {
      name: "Default App Configuration Endpoint",
      description: "Default App Configuration endpoint (e.g., https://myappconfig.azconfig.io) (optional, can be specified per block instead)",
      type: "string",
      required: false,
    },`;
      } else if (service.name.includes("servicebus")) {
        configFields += `
    endpoint: {
      name: "Default Service Bus Endpoint",
      description: "Default Service Bus endpoint (e.g., https://myservicebus.servicebus.windows.net) (optional, can be specified per block instead)",
      type: "string",
      required: false,
    },`;
      } else {
        configFields += `
    storageAccount: {
      name: "Default Storage Account Name",
      description: "Default storage account name (optional, can be specified per block instead)",
      type: "string",
      required: false,
    },`;
      }
    } else {
      configFields += `
    subscriptionId: {
      name: "Default Subscription ID",
      description: "Default Azure subscription ID (optional, can be specified per block instead)",
      type: "string",
      required: false,
    },
    resourceGroupName: {
      name: "Default Resource Group",
      description: "Default Azure resource group name (optional, can be specified per block instead)",
      type: "string",
      required: false,
    },`;
    }

    const installInstructions = this.generateInstallationInstructions(
      service,
      isDataPlane
    );

    const content = `import { defineApp } from "@slflows/sdk/v1";
import { blocks } from "./blocks";

export const app = defineApp({
  name: "${this.generateAppName(service)}",
  config: {${configFields}
  },
  blocks,
  installationInstructions: \`${installInstructions.replace(/`/g, "\\`").replace(/\${/g, "\\${")}\`,
});
`;

    fs.writeFileSync(path.join(appDir, "main.ts"), content);
  }

  /**
   * Generate installation instructions based on service type
   */
  private generateInstallationInstructions(
    service: ServiceDefinition,
    isDataPlane: boolean
  ): string {
    const serviceName = service.name
      .replace("-management", "")
      .replace("-data", "");

    let tokenScope: string;
    if (isDataPlane) {
      tokenScope =
        serviceName === "containerregistry" ? "containerregistry" : serviceName;
    } else {
      tokenScope = "management";
    }

    return `Get the token from the Azure OIDC app for the \`${tokenScope}\` service using a signal reference like \`ref("signal.azureOidc.accessTokens").${tokenScope}\`.`;
  }

  /**
   * Generate blocks directory and files
   */
  private async generateBlocks(
    appDir: string,
    service: ServiceDefinition
  ): Promise<void> {
    const blocksDir = path.join(appDir, "blocks");

    if (!fs.existsSync(blocksDir)) {
      fs.mkdirSync(blocksDir, { recursive: true });
    }

    // Generate shared utility file first
    await this.generateUtilsFile(appDir, service);

    const blockImports: string[] = [];
    const blockExports: string[] = [];
    const seenOperationIds = new Set<string>();

    // Generate individual block files with deduplication
    for (const operation of service.operations) {
      // Skip duplicate operations (same operationId)
      if (seenOperationIds.has(operation.operationId)) {
        console.warn(`Skipping duplicate operation: ${operation.operationId}`);
        continue;
      }
      seenOperationIds.add(operation.operationId);

      const blockFileName = this.sanitizeFileName(operation.operationId);
      const blockContent = this.generateBlockFile(operation);

      fs.writeFileSync(
        path.join(blocksDir, `${blockFileName}.ts`),
        blockContent
      );

      blockImports.push(
        `import ${operation.operationId} from "./${blockFileName}";`
      );
      blockExports.push(`  ${operation.operationId},`);
    }

    // Generate index.ts
    const indexContent = `${blockImports.join("\n")}

export const blocks = {
${blockExports.join("\n")}
};
`;

    fs.writeFileSync(path.join(blocksDir, "index.ts"), indexContent);
  }

  /**
   * Generate app name based on plane type
   */
  private generateAppName(service: ServiceDefinition): string {
    const isDataPlane = service.name.includes("data");
    const serviceName = service.name
      .replace("-data", "")
      .replace("-management", "");
    const formattedServiceName = this.capitalizeWords(serviceName);

    return isDataPlane
      ? `Azure API ${formattedServiceName}`
      : `ARM API ${formattedServiceName}`;
  }

  /**
   * Generate shared utility file for Azure API requests
   */
  private async generateUtilsFile(
    appDir: string,
    service: ServiceDefinition
  ): Promise<void> {
    const utilsDir = path.join(appDir, "utils");

    if (!fs.existsSync(utilsDir)) {
      fs.mkdirSync(utilsDir, { recursive: true });
    }

    const isDataPlane = service.name.includes("data");

    const utilsContent = isDataPlane
      ? this.generateDataPlaneUtils()
      : this.generateManagementPlaneUtils();

    fs.writeFileSync(path.join(utilsDir, "azureRequest.ts"), utilsContent);
  }

  /**
   * Generate data plane specific utility functions
   */
  private generateDataPlaneUtils(): string {
    return `/**
 * Azure Data Plane API utilities
 */

export async function makeAzureRequest(
  input: any, 
  url: string, 
  method: string,
  body?: any,
  additionalHeaders?: Record<string, string>,
  isBinaryUpload?: boolean
): Promise<any> {
  const headers: Record<string, string> = {
    "Authorization": \`Bearer \${input.app.config.accessToken}\`,
    "Accept-Language": "",
    "x-ms-version": "2025-07-05",
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
          throw new Error(\`Invalid base64 data: \${error}\`);
        }
      } else {
        throw new Error("Binary data must be provided as base64-encoded string");
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
    throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
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
`;
  }

  /**
   * Generate management plane specific utility functions
   */
  private generateManagementPlaneUtils(): string {
    return `/**
 * Azure Management Plane API utilities
 */

export async function makeAzureRequest(
  input: any, 
  url: string, 
  method: string,
  body?: any,
  additionalHeaders?: Record<string, string>,
  isBinaryUpload?: boolean
): Promise<any> {
  const headers: Record<string, string> = {
    "Authorization": \`Bearer \${input.app.config.accessToken}\`,
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
          throw new Error(\`Invalid base64 data: \${error}\`);
        }
      } else {
        throw new Error("Binary data must be provided as base64-encoded string");
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
    throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
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
`;
  }

  /**
   * Generate individual block file
   */
  private generateBlockFile(operation: OperationDefinition): string {
    const configProperties = this.generateConfigProperties(
      operation.parameters,
      operation.path
    );
    const blockLogic = this.generateBlockLogic(operation);
    const outputSchema = this.generateOutputSchema(operation.responseSchema);

    return `import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ${operation.operationId}: AppBlock = {
  name: "${operation.name}",
  description: "${operation.description}",
  category: "${operation.category}",
  inputs: {
    default: {
      config: {${configProperties}
      },
      onEvent: async (input) => {${blockLogic}
      },
    },
  },
  outputs: {
    default: {
      possiblePrimaryParents: ["default"],
      type: ${outputSchema},
    },
  },
};

export default ${operation.operationId};
`;
  }

  /**
   * Generate meaningful description for a parameter
   */
  private generateParameterDescription(
    paramName: string,
    existingDescription?: string,
    isOptional = false
  ): string {
    // If there's a meaningful existing description, use it
    if (
      existingDescription &&
      !existingDescription.toLowerCase().includes("parameter") &&
      existingDescription.trim().length > 10
    ) {
      return this.escapeDescription(existingDescription);
    }

    // Generate contextual descriptions for common Azure parameters
    const lowerName = paramName.toLowerCase();

    if (lowerName === "subscriptionid") {
      return isOptional
        ? "Azure subscription ID (optional, falls back to app-level default if not provided)"
        : "Azure subscription ID";
    }

    if (lowerName === "resourcegroupname") {
      return isOptional
        ? "Azure resource group name (optional, falls back to app-level default if not provided)"
        : "Azure resource group name";
    }

    if (lowerName === "storageaccount") {
      return isOptional
        ? "Storage account name (optional, falls back to app-level default if not provided)"
        : "Storage account name";
    }

    if (lowerName === "url") {
      return isOptional
        ? "Registry login URI (e.g., myregistry.azurecr.io) (optional, falls back to app-level default if not provided)"
        : "Registry login URI (e.g., myregistry.azurecr.io)";
    }

    if (lowerName.endsWith("name")) {
      const entityType = paramName.replace(/name$/i, ""); // Use original paramName, not lowerName
      // Add spaces to camelCase entity names for better readability
      const spacedEntityType = entityType.replace(/([a-z])([A-Z])/g, "$1 $2");
      return `Name of the ${spacedEntityType.toLowerCase()}`;
    }

    if (lowerName === "parameters" || lowerName === "parameter") {
      return "Request parameters";
    }

    if (lowerName === "body") {
      return "Body (base64-encoded)";
    }

    if (lowerName.includes("id") && lowerName !== "subscriptionid") {
      return `Unique identifier`;
    }

    // If we can't generate a meaningful description, omit it
    return "";
  }

  /**
   * Generate configuration properties from parameters
   */
  private generateConfigProperties(
    parameters: Parameter[],
    pathStr: string
  ): string {
    interface ConfigProperty {
      name: string;
      displayName: string;
      description: string;
      type: string;
      required: boolean;
      isPath: boolean;
    }

    const configProperties: ConfigProperty[] = [];

    // Extract path parameters from the URL pattern
    const pathParams = this.extractPathParameters(pathStr);

    // Extract fixed query parameters that should not be exposed as config
    const fixedQueryParams = this.extractFixedQueryParameters(pathStr);
    const fixedQueryParamNames = Object.keys(fixedQueryParams);

    // Add path parameters
    for (const pathParam of pathParams) {
      // For common Azure parameters, make them optional but indicate fallback behavior
      const isCommonParam =
        pathParam === "subscriptionId" || pathParam === "resourceGroupName";
      const isStorageAccount = pathParam === "storageAccount"; // For data plane operations
      const isContainerRegistryUrl = pathParam === "url"; // For Container Registry data plane
      const isOptional =
        isCommonParam || isStorageAccount || isContainerRegistryUrl;
      const sanitizedPathParam = pathParam.replace(/-/g, "_");

      const description = this.generateParameterDescription(
        pathParam,
        undefined,
        isOptional
      );

      configProperties.push({
        name: sanitizedPathParam,
        displayName: this.capitalizeWords(pathParam),
        description,
        type: `"string"`,
        required: !isOptional,
        isPath: true,
      });
    }

    // Add other parameters
    for (const param of parameters) {
      // Skip path parameters (already handled above)
      if (param.in === "path") continue;

      // Skip API version parameter (we hardcode it)
      if (param.name === "api-version") continue;

      // Skip x-ms-version parameter (we hardcode it in makeAzureRequest)
      if (param.name === "x-ms-version") continue;

      // Skip any required header parameter with single enum value (we set it automatically)
      if (
        param.in === "header" &&
        param.required &&
        param.enum &&
        param.enum.length === 1
      )
        continue;

      // Skip query parameters that are fixed in the path (like comp, restype)
      if (param.in === "query" && fixedQueryParamNames.includes(param.name))
        continue;

      if (
        param.in === "query" ||
        param.in === "body" ||
        param.in === "header"
      ) {
        let paramType = param.type || param.schema?.type || "string";

        // Fix type mapping for Flows
        if (paramType === "integer") paramType = "number";

        // Sanitize parameter name for JavaScript
        const sanitizedParamName = param.name.replace(/-/g, "_");

        // Special case: for file type parameters (raw file uploads)
        const isFileParam =
          param.type === "file" ||
          param.schema?.type === "file" ||
          param.schema?.format === "file";
        let description = this.generateParameterDescription(
          param.name,
          param.description
        );
        if (isFileParam) {
          description = "Request body content";
        }

        configProperties.push({
          name: sanitizedParamName,
          displayName: this.capitalizeWords(param.name),
          description,
          type: this.generateFlowsTypeSchema(
            param.schema || { type: paramType }
          ),
          required: param.required || false,
          isPath: false,
        });

        // Add binary encoding flag for body parameters (will be added after all params are processed)
        // This is handled separately below to ensure it's only added once per operation
      }
    }

    // Add binary encoding flag if there's a file type parameter in this operation
    // This is for raw file uploads (type: "file" or format: "file")
    const hasFileParam = parameters.some(
      (param) =>
        param.type === "file" ||
        param.schema?.type === "file" ||
        param.schema?.format === "file"
    );
    if (hasFileParam) {
      configProperties.push({
        name: "isBinaryData",
        displayName: "Is Binary Data",
        description:
          "Whether the body contains binary data (base64-encoded) or text content",
        type: '"boolean"',
        required: false,
        isPath: false,
      });
    }

    // Sort properties: required first, then optional
    // Within each group, keep path parameters first, then other parameters
    configProperties.sort((a, b) => {
      // First sort by required status (required first)
      if (a.required !== b.required) {
        return a.required ? -1 : 1;
      }

      // Within the same required status, path parameters come first
      if (a.isPath !== b.isPath) {
        return a.isPath ? -1 : 1;
      }

      // Otherwise maintain original order
      return 0;
    });

    // Generate config strings
    const configs = configProperties.map((prop) => {
      const descriptionField = prop.description
        ? `
          description: "${prop.description}",`
        : "";

      // Quote property names that contain special characters
      const quotedPropName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(prop.name)
        ? prop.name
        : `"${prop.name}"`;

      return `
        ${quotedPropName}: {
          name: "${prop.displayName}",${descriptionField}
          type: ${prop.type},
          required: ${prop.required},
        },`;
    });

    return configs.join("");
  }

  /**
   * Extract path parameters from URL pattern
   */
  private extractPathParameters(pathStr: string): string[] {
    const matches = pathStr.match(/\{([^}]+)\}/g);
    if (!matches) return [];

    return matches.map((match) => match.slice(1, -1)); // Remove { and }
  }

  /**
   * Extract fixed query parameters from path (like ?comp=lease&restype=container)
   */
  private extractFixedQueryParameters(pathStr: string): Record<string, string> {
    const fixedParams: Record<string, string> = {};
    const queryPart = pathStr.split("?")[1];

    if (!queryPart) return fixedParams;

    // Split by & and parse key=value pairs and standalone values
    const parts = queryPart.split("&");
    for (const part of parts) {
      if (part.includes("=")) {
        // Handle key=value pairs like comp=lease
        const [key, value] = part.split("=");
        fixedParams[key] = value;
      } else {
        // Handle standalone values like 'acquire', 'change', 'BlockBlob'
        // These are often used as action indicators in Azure APIs
        // Skip them as they're usually part of the operation identity, not query params
      }
    }

    return fixedParams;
  }

  /**
   * Generate block logic for REST API call
   */
  private generateBlockLogic(operation: OperationDefinition): string {
    const pathParams = this.extractPathParameters(operation.path);
    const queryParams = operation.parameters.filter((p) => p.in === "query");
    const headerParams = operation.parameters.filter((p) => p.in === "header");
    const bodyParam = operation.parameters.find((p) => p.in === "body");

    // Extract fixed query parameters from the path
    const fixedQueryParams = this.extractFixedQueryParameters(operation.path);
    const fixedQueryParamNames = Object.keys(fixedQueryParams);

    // Different base URLs for different plane types
    // For data plane, remove query parameters from path as they're handled separately
    const cleanPath =
      operation.planeType === "dataplane"
        ? operation.path.split("?")[0] // Remove query parameters from path
        : operation.path;

    let baseUrl: string;
    if (operation.planeType === "dataplane") {
      // Different URL patterns for different data plane services
      if (
        operation.operationId.toLowerCase().includes("containerregistry") ||
        operation.operationId.toLowerCase().includes("authentication")
      ) {
        // Container Registry uses parameterized host with {url} parameter
        baseUrl = `"https://\${input.event.inputConfig.url || input.app.config.registryLoginUri}${cleanPath}"`;
      } else if (
        operation.operationId.toLowerCase().includes("upload") &&
        cleanPath.includes("dataCollectionRules")
      ) {
        // Monitor Ingestion uses parameterized host with {endpoint} parameter
        baseUrl = `"https://\${input.event.inputConfig.endpoint || input.app.config.dataCollectionEndpoint}${cleanPath}"`;
      } else if (
        operation.operationId.toLowerCase().includes("operationalinsights") ||
        cleanPath.includes("/v1/workspaces")
      ) {
        // OperationalInsights uses fixed host api.loganalytics.io
        baseUrl = `"https://api.loganalytics.io${cleanPath}"`;
      } else if (
        operation.path.includes("/keys/") ||
        operation.path.includes("/secrets/") ||
        operation.path.includes("/certificates/") ||
        operation.operationId.toLowerCase().includes("key") ||
        operation.operationId.toLowerCase().includes("secret") ||
        operation.operationId.toLowerCase().includes("certificate")
      ) {
        // Key Vault data plane operations use storageAccount as the vault name
        baseUrl = `"https://\${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.vault.azure.net${cleanPath}"`;
      } else if (
        cleanPath.includes("/kv/") ||
        cleanPath.includes("/labels") ||
        cleanPath.includes("/revisions")
      ) {
        // App Configuration data plane uses parameterized endpoint
        baseUrl = `"\${input.event.inputConfig.endpoint || input.app.config.endpoint}${cleanPath}"`;
      } else if (
        operation.operationId.toLowerCase().includes("entity") ||
        operation.operationId.toLowerCase().includes("subscription") ||
        operation.operationId.toLowerCase().includes("rule") ||
        operation.operationId.toLowerCase().includes("namespace") ||
        (operation.planeType === "dataplane" &&
          (operation.path === "/{entityName}" ||
            operation.path.includes("/subscriptions/")))
      ) {
        // Service Bus data plane uses parameterized endpoint
        baseUrl = `"\${input.event.inputConfig.endpoint || input.app.config.endpoint}${cleanPath}"`;
      } else {
        // Storage data plane
        baseUrl = `"https://\${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net${cleanPath}"`;
      }
    } else {
      // Management plane
      baseUrl = `"https://management.azure.com${operation.path}"`;
    }

    let pathConstruction = baseUrl;

    // Replace path parameters with template literals
    for (const param of pathParams) {
      const isCommonParam =
        param === "subscriptionId" || param === "resourceGroupName";
      const isStorageAccount = param === "storageAccount";
      const isContainerRegistryUrl = param === "url";
      const isMonitorEndpoint = param === "endpoint";
      const isKeyVaultOperation =
        operation.path.includes("/keys/") ||
        operation.path.includes("/secrets/") ||
        operation.path.includes("/certificates/") ||
        operation.operationId.toLowerCase().includes("key") ||
        operation.operationId.toLowerCase().includes("secret") ||
        operation.operationId.toLowerCase().includes("certificate");
      const isAppConfigEndpoint =
        param === "endpoint" &&
        operation.planeType === "dataplane" &&
        !isKeyVaultOperation &&
        (operation.path.includes("/kv/") ||
          operation.path.includes("/keys") ||
          operation.path.includes("/labels"));
      const isServiceBusEndpoint =
        param === "endpoint" &&
        operation.planeType === "dataplane" &&
        (operation.operationId.toLowerCase().includes("entity") ||
          operation.operationId.toLowerCase().includes("subscription") ||
          operation.operationId.toLowerCase().includes("rule") ||
          operation.operationId.toLowerCase().includes("namespace"));
      const isOptional =
        isCommonParam ||
        isStorageAccount ||
        isContainerRegistryUrl ||
        isMonitorEndpoint ||
        isAppConfigEndpoint ||
        isServiceBusEndpoint;

      // Sanitize parameter name for JavaScript access
      const sanitizedParam = param.replace(/-/g, "_");

      let valueExpression: string;
      if (isContainerRegistryUrl) {
        // For Container Registry, 'url' parameter maps to registryLoginUri config
        valueExpression = `\${input.event.inputConfig.${sanitizedParam} || input.app.config.registryLoginUri}`;
      } else if (isMonitorEndpoint) {
        // For Monitor, 'endpoint' parameter maps to dataCollectionEndpoint config
        valueExpression = `\${input.event.inputConfig.${sanitizedParam} || input.app.config.dataCollectionEndpoint}`;
      } else if (isAppConfigEndpoint) {
        // For App Configuration, 'endpoint' parameter maps to endpoint config
        valueExpression = `\${input.event.inputConfig.${sanitizedParam} || input.app.config.endpoint}`;
      } else if (isServiceBusEndpoint) {
        // For Service Bus, 'endpoint' parameter maps to endpoint config
        valueExpression = `\${input.event.inputConfig.${sanitizedParam} || input.app.config.endpoint}`;
      } else if (isOptional) {
        valueExpression = `\${input.event.inputConfig.${sanitizedParam} || input.app.config.${sanitizedParam}}`;
      } else {
        valueExpression = `\${input.event.inputConfig.${sanitizedParam}}`;
      }

      pathConstruction = pathConstruction.replace(
        `{${param}}`,
        valueExpression
      );
    }

    // Convert to template literal
    pathConstruction = "`" + pathConstruction.slice(1, -1) + "`";

    // Add versioning and fixed query parameters based on plane type
    let hasQueryParams = false;
    if (operation.planeType === "dataplane") {
      // For data plane, add fixed query parameters from path
      if (Object.keys(fixedQueryParams).length > 0) {
        const fixedQueryString = Object.entries(fixedQueryParams)
          .map(([key, value]) => `${key}=${value}`)
          .join("&");
        pathConstruction += ` + "?${fixedQueryString}"`;
        hasQueryParams = true;
      }
    } else {
      // Management plane uses api-version query parameter
      pathConstruction += ` + "?api-version=${operation.apiVersion}"`;
      hasQueryParams = true;
    }

    // Add other query parameters (skip fixed ones from path)
    const dynamicQueryParams = queryParams.filter(
      (param) =>
        param.name !== "api-version" &&
        param.name !== "x-ms-version" &&
        !fixedQueryParamNames.includes(param.name)
    );

    if (dynamicQueryParams.length > 0) {
      for (const param of dynamicQueryParams) {
        // Sanitize parameter name for JavaScript
        const sanitizedParamName = param.name.replace(/-/g, "_");

        const separator = hasQueryParams ? "&" : "?";
        pathConstruction += ` + (input.event.inputConfig.${sanitizedParamName} ? \`${separator}${param.name}=\${input.event.inputConfig.${sanitizedParamName}}\` : "")`;
        hasQueryParams = true;
      }
    }

    let bodyCode = "";
    if (bodyParam) {
      const sanitizedBodyParamName = bodyParam.name.replace(/-/g, "_");
      bodyCode = `
        const requestBody = input.event.inputConfig.${sanitizedBodyParamName};`;
    }

    // Generate header construction code
    let headerCode = "";
    if (headerParams.length > 0) {
      headerCode = `
        const additionalHeaders: Record<string, string> = {};`;

      for (const param of headerParams) {
        // Skip API version parameter (we hardcode it)
        if (param.name === "api-version") continue;

        // Skip x-ms-version parameter (we hardcode it in makeAzureRequest)
        if (param.name === "x-ms-version") continue;

        const sanitizedParamName = param.name.replace(/-/g, "_");

        // Auto-set any required header parameter with single enum value
        if (
          param.in === "header" &&
          param.required &&
          param.enum &&
          param.enum.length === 1
        ) {
          headerCode += `
        additionalHeaders["${param.name}"] = "${param.enum[0]}";`;
        } else {
          headerCode += `
        if (input.event.inputConfig.${sanitizedParamName}) {
          additionalHeaders["${param.name}"] = String(input.event.inputConfig.${sanitizedParamName});
        }`;
        }
      }
    }

    const hasBody = bodyParam ? "requestBody" : "undefined";
    const hasHeaders =
      headerParams.length > 0 ? "additionalHeaders" : "undefined";

    // Use the user-specified binary flag only if there's a body parameter
    const isBinaryUpload = bodyParam
      ? "input.event.inputConfig.isBinaryData || false"
      : "false";

    return `${bodyCode}${headerCode}
        
        const url = ${pathConstruction};
        
        const result = await makeAzureRequest(input, url, "${operation.method}", ${hasBody}, ${hasHeaders}, ${isBinaryUpload});
        await events.emit(result || {});`;
  }

  /**
   * Generate package.json
   */
  private async generatePackageJson(
    appDir: string,
    service: ServiceDefinition
  ): Promise<void> {
    const packageJson = {
      name: `azure-${service.name.toLowerCase()}-app`,
      version: "1.0.0",
      description: `Azure ${service.name} service app for Flows`,
      main: "main.ts",
      scripts: {
        typecheck: "npx tsc --noEmit",
        format: "npx prettier --write .",
        bundle: "npx flowctl version bundle -e main.ts",
      },
      dependencies: {
        "@slflows/sdk": "*",
      },
      devDependencies: {
        typescript: "^5.0.0",
        prettier: "^3.0.0",
        "@types/node": "^20.0.0",
        "@useflows/flowctl": "^0.1.1",
      },
      peerDependencies: {
        "@slflows/sdk": "*",
      },
    };

    fs.writeFileSync(
      path.join(appDir, "package.json"),
      JSON.stringify(packageJson, null, 2)
    );
  }

  /**
   * Generate tsconfig.json
   */
  private async generateTsConfig(appDir: string): Promise<void> {
    const tsConfig = {
      compilerOptions: {
        target: "ES2022",
        module: "ESNext",
        moduleResolution: "bundler",
        allowImportingTsExtensions: true,
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: "react-jsx",
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
      },
      include: ["**/*.ts", "**/*.tsx"],
      exclude: ["node_modules"],
    };

    fs.writeFileSync(
      path.join(appDir, "tsconfig.json"),
      JSON.stringify(tsConfig, null, 2)
    );
  }

  /**
   * Generate output schema from OpenAPI response schema
   */
  private generateOutputSchema(responseSchema?: SchemaObject): string {
    if (!responseSchema) {
      return `{
        type: "object",
        additionalProperties: true,
      }`;
    }

    return this.schemaToJsonString(responseSchema);
  }

  /**
   * Convert OpenAPI schema object to JSON Schema string
   */
  private schemaToJsonString(schema: SchemaObject): string {
    // Handle $ref references - for now, fall back to generic object
    if (schema["$ref"]) {
      return `{
        type: "object",
        additionalProperties: true,
      }`;
    }

    const jsonSchema: any = {
      type: schema.type || "object",
    };

    if (schema.properties) {
      jsonSchema.properties = {};
      for (const [key, prop] of Object.entries(schema.properties)) {
        jsonSchema.properties[key] = this.convertSchemaProperty(prop);
      }
    }

    if (schema.required) {
      jsonSchema.required = schema.required;
    }

    if (schema.items) {
      jsonSchema.items = this.convertSchemaProperty(schema.items);
    }

    if (schema.additionalProperties !== undefined) {
      // Handle additionalProperties correctly for JSON Schema
      if (typeof schema.additionalProperties === "boolean") {
        jsonSchema.additionalProperties = schema.additionalProperties;
      } else {
        // For object schemas in additionalProperties, just allow any additional properties
        jsonSchema.additionalProperties = true;
      }
    }

    return JSON.stringify(jsonSchema, null, 8).replace(/^/gm, "      ").trim();
  }

  /**
   * Convert a single schema property
   */
  private convertSchemaProperty(
    prop: SchemaObject,
    visited: Set<SchemaObject> = new Set()
  ): any {
    // Prevent infinite recursion by tracking visited objects
    if (visited.has(prop)) {
      return { type: "object", additionalProperties: true };
    }
    visited.add(prop);
    if (prop["$ref"]) {
      // For references, return a generic object type
      return { type: "object", additionalProperties: true };
    }

    const result: any = {
      type: prop.type || "object",
    };

    if (prop.properties) {
      result.properties = {};
      for (const [key, subProp] of Object.entries(prop.properties)) {
        result.properties[key] = this.convertSchemaProperty(subProp, visited);
      }
    }

    if (prop.items) {
      result.items = this.convertSchemaProperty(prop.items, visited);
    }

    if (prop.required) {
      result.required = prop.required;
    }

    if (prop.additionalProperties !== undefined) {
      // Handle additionalProperties correctly for JSON Schema
      if (typeof prop.additionalProperties === "boolean") {
        result.additionalProperties = prop.additionalProperties;
      } else {
        // For object schemas in additionalProperties, just allow any additional properties
        result.additionalProperties = true;
      }
    }

    return result;
  }

  /**
   * Generate Flows SDK compatible type schema from OpenAPI schema
   */
  private generateFlowsTypeSchema(schema: SchemaObject): string {
    if (!schema || !schema.type) {
      return '"string"';
    }

    let baseType = schema.type;
    if (baseType === "integer") baseType = "number";

    // For primitive types, return as string
    if (["string", "number", "boolean"].includes(baseType)) {
      return `"${baseType}"`;
    }

    // Special case: object with format "file" should be treated as base64 string
    if (baseType === "object" && schema.format === "file") {
      return '"string"';
    }

    // For complex types (object, array), return as type object
    if (baseType === "object") {
      const typeObj: any = { type: "object" };

      if (schema.properties) {
        typeObj.properties = {};
        for (const [key, prop] of Object.entries(schema.properties)) {
          typeObj.properties[key] = this.convertSchemaPropertyForFlows(prop);
        }
      }

      if (schema.required) {
        typeObj.required = schema.required;
      }

      if (schema.additionalProperties !== undefined) {
        typeObj.additionalProperties = schema.additionalProperties;
      }

      return JSON.stringify(typeObj, null, 8).replace(/^/gm, "      ").trim();
    }

    if (baseType === "array") {
      const typeObj: any = { type: "array" };

      if (schema.items) {
        typeObj.items = this.convertSchemaPropertyForFlows(schema.items);
      }

      return JSON.stringify(typeObj, null, 8).replace(/^/gm, "      ").trim();
    }

    return `"${baseType}"`;
  }

  /**
   * Convert a schema property for Flows type system
   */
  private convertSchemaPropertyForFlows(
    prop: SchemaObject,
    visited: Set<SchemaObject> = new Set()
  ): any {
    // Prevent infinite recursion by tracking visited objects
    if (visited.has(prop)) {
      return { type: "object", additionalProperties: true };
    }
    visited.add(prop);
    if (!prop || !prop.type) {
      return { type: "string" };
    }

    let baseType = prop.type;
    if (baseType === "integer") baseType = "number";

    if (["string", "number", "boolean"].includes(baseType)) {
      return { type: baseType };
    }

    const result: any = { type: baseType };

    if (prop.properties) {
      result.properties = {};
      for (const [key, subProp] of Object.entries(prop.properties)) {
        result.properties[key] = this.convertSchemaPropertyForFlows(
          subProp,
          visited
        );
      }
    }

    if (prop.items) {
      result.items = this.convertSchemaPropertyForFlows(prop.items, visited);
    }

    if (prop.required) {
      result.required = prop.required;
    }

    if (prop.additionalProperties !== undefined) {
      // Handle additionalProperties correctly for JSON Schema
      if (typeof prop.additionalProperties === "boolean") {
        result.additionalProperties = prop.additionalProperties;
      } else {
        // For object schemas in additionalProperties, just allow any additional properties
        result.additionalProperties = true;
      }
    }

    return result;
  }

  /**
   * Utility functions
   */
  private sanitizeFileName(name: string): string {
    return name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  }

  private capitalizeWords(str: string): string {
    // Remove $ prefix and other special characters that shouldn't be in human names
    let cleaned = str
      .replace(/^\$/, "") // Remove leading $
      .replace(/^x-ms-/, "") // Remove x-ms- prefix common in Azure specs
      .replace(/^ms-/, ""); // Remove ms- prefix

    // First add spaces between camelCase/PascalCase words
    let withSpaces = cleaned
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Insert space before capital letters
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") // Handle acronyms like "HTTPSConfig"
      .replace(/[-_]/g, " ") // Replace dashes and underscores with spaces
      .trim();

    // Handle common compound words that should be split
    const compoundWords = [
      ["appconfiguration", "app configuration"],
      ["containerregistry", "container registry"],
      ["containerservice", "container service"],
      ["keyvault", "key vault"],
      ["maxresults", "max results"],
      ["minresults", "min results"],
      ["maxpagesize", "max page size"],
      ["minpagesize", "min page size"],
      ["maxsize", "max size"],
      ["minsize", "min size"],
      ["maxitems", "max items"],
      ["minitems", "min items"],
      ["maxlength", "max length"],
      ["minlength", "min length"],
      ["maxvalue", "max value"],
      ["minvalue", "min value"],
      ["maxcount", "max count"],
      ["mincount", "min count"],
      ["starttime", "start time"],
      ["endtime", "end time"],
      ["datetime", "date time"],
      ["filename", "file name"],
      ["pathname", "path name"],
      ["username", "user name"],
      ["groupname", "group name"],
      ["hostname", "host name"],
      ["servername", "server name"],
      ["resourcename", "resource name"],
      ["containername", "container name"],
      ["blobname", "blob name"],
      ["tablename", "table name"],
      ["queuename", "queue name"],
      ["databasename", "database name"],
      ["subscriptionid", "subscription ID"],
      ["resourcegroupname", "resource group name"],
      ["storageaccount", "storage account"],
      ["accesskey", "access key"],
      ["secretkey", "secret key"],
      ["apikey", "API key"],
      ["connectionstring", "connection string"],
      ["contenttype", "content type"],
      ["contentlength", "content length"],
      ["lastmodified", "last modified"],
      ["ifmatch", "if match"],
      ["ifnonematch", "if none match"],
      ["ifmodifiedsince", "if modified since"],
      ["ifunmodifiedsince", "if unmodified since"],
    ];

    // Apply compound word replacements (case insensitive)
    for (const [compound, spaced] of compoundWords) {
      const regex = new RegExp(`\\b${compound}\\b`, "gi");
      withSpaces = withSpaces.replace(regex, spaced);
    }

    // Common abbreviations that should be fully capitalized
    const abbreviations = [
      "ID",
      "URL",
      "HTTP",
      "HTTPS",
      "API",
      "JSON",
      "XML",
      "HTML",
      "CSS",
      "JS",
      "SQL",
      "DB",
      "VM",
      "OS",
      "IP",
      "DNS",
      "SSL",
      "TLS",
      "TCP",
      "UDP",
      "ARM",
      "SAS",
      "ACL",
      "CORS",
      "RBAC",
      "AD",
      "AAD",
      "SSH",
      "FTP",
      "SMTP",
      "MD5",
      "SHA256",
      "CRC64",
    ];

    // Split into words and capitalize appropriately
    return withSpaces
      .split(" ")
      .map((word) => {
        const upperWord = word.toUpperCase();
        // Check if it's a known abbreviation
        if (abbreviations.includes(upperWord)) {
          return upperWord;
        }
        // Otherwise capitalize first letter
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  }

  private escapeDescription(description: string): string {
    // Escape quotes and remove/replace problematic HTML
    return description
      .replace(/"/g, '\\"') // Escape double quotes
      .replace(/<a href="[^"]*">/g, "") // Remove opening <a> tags
      .replace(/<\/a>/g, "") // Remove closing </a> tags
      .replace(/\r?\n/g, " ") // Replace newlines with spaces
      .trim();
  }
}

// Run generator if called directly
async function main() {
  const generator = new AzureAppGenerator("./azure-rest-api-specs");

  // Check for specific service argument
  const serviceArg = process.argv[2];

  switch (serviceArg) {
    case "storage-management":
      await generator.generateStorageManagementApp();
      break;
    case "storage-data":
      await generator.generateStorageDataPlaneApp();
      break;
    case "compute":
      await generator.generateComputeApp();
      break;
    case "containerservice":
      await generator.generateContainerServiceApp();
      break;
    case "keyvault-management":
      await generator.generateKeyVaultManagementApp();
      break;
    case "keyvault-data":
      await generator.generateKeyVaultDataPlaneApp();
      break;
    case "containerregistry-management":
      await generator.generateContainerRegistryManagementApp();
      break;
    case "containerregistry-data":
      await generator.generateContainerRegistryDataPlaneApp();
      break;
    case "web":
      await generator.generateWebServiceApp();
      break;
    case "network-management":
      await generator.generateNetworkManagementApp();
      break;
    case "monitor-management":
      await generator.generateMonitorManagementApp();
      break;
    case "sql-management":
      await generator.generateSqlManagementApp();
      break;
    case "devops-infrastructure-management":
      await generator.generateDevOpsInfrastructureManagementApp();
      break;
    case "devops-management":
      await generator.generateDevOpsManagementApp();
      break;
    case "appconfiguration-management":
      await generator.generateAppConfigurationManagementApp();
      break;
    case "appconfiguration-data":
      await generator.generateAppConfigurationDataPlaneApp();
      break;
    case "servicebus-management":
      await generator.generateServiceBusManagementApp();
      break;
    case "servicebus-data":
      await generator.generateServiceBusDataPlaneApp();
      break;
    case "monitor-data":
      await generator.generateMonitorDataPlaneApp();
      break;
    default:
      // Generate all services if no specific service is provided
      await generator.generateApps();
      break;
  }
}

// Only run if this is the main module
if (process.argv[1]?.endsWith("azureAppGenerator.ts")) {
  main().catch(console.error);
}

export { AzureAppGenerator };
