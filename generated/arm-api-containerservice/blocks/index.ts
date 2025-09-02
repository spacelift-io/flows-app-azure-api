import Operations_List from "./operationslist";
import ManagedClusters_ListKubernetesVersions from "./managedclusterslistkubernetesversions";
import ManagedClusters_List from "./managedclusterslist";
import ManagedClusters_ListByResourceGroup from "./managedclusterslistbyresourcegroup";
import ManagedClusters_GetUpgradeProfile from "./managedclustersgetupgradeprofile";
import ManagedClusters_GetAccessProfile from "./managedclustersgetaccessprofile";
import ManagedClusters_ListClusterAdminCredentials from "./managedclusterslistclusteradmincredentials";
import ManagedClusters_ListClusterUserCredentials from "./managedclusterslistclusterusercredentials";
import ManagedClusters_ListClusterMonitoringUserCredentials from "./managedclusterslistclustermonitoringusercredentials";
import ManagedClusters_Get from "./managedclustersget";
import ManagedClusters_CreateOrUpdate from "./managedclusterscreateorupdate";
import ManagedClusters_UpdateTags from "./managedclustersupdatetags";
import ManagedClusters_Delete from "./managedclustersdelete";
import MaintenanceConfigurations_ListByManagedCluster from "./maintenanceconfigurationslistbymanagedcluster";
import MaintenanceConfigurations_Get from "./maintenanceconfigurationsget";
import MaintenanceConfigurations_CreateOrUpdate from "./maintenanceconfigurationscreateorupdate";
import MaintenanceConfigurations_Delete from "./maintenanceconfigurationsdelete";
import AgentPools_AbortLatestOperation from "./agentpoolsabortlatestoperation";
import AgentPools_List from "./agentpoolslist";
import AgentPools_Get from "./agentpoolsget";
import AgentPools_CreateOrUpdate from "./agentpoolscreateorupdate";
import AgentPools_Delete from "./agentpoolsdelete";
import AgentPools_GetUpgradeProfile from "./agentpoolsgetupgradeprofile";
import AgentPools_DeleteMachines from "./agentpoolsdeletemachines";
import AgentPools_GetAvailableAgentPoolVersions from "./agentpoolsgetavailableagentpoolversions";
import ManagedClusters_ResetServicePrincipalProfile from "./managedclustersresetserviceprincipalprofile";
import ManagedClusters_ResetAADProfile from "./managedclustersresetaadprofile";
import ManagedClusters_RotateClusterCertificates from "./managedclustersrotateclustercertificates";
import ManagedClusters_AbortLatestOperation from "./managedclustersabortlatestoperation";
import ManagedClusters_RotateServiceAccountSigningKeys from "./managedclustersrotateserviceaccountsigningkeys";
import ManagedClusters_Stop from "./managedclustersstop";
import ManagedClusters_Start from "./managedclustersstart";
import PrivateEndpointConnections_List from "./privateendpointconnectionslist";
import PrivateEndpointConnections_Get from "./privateendpointconnectionsget";
import PrivateEndpointConnections_Update from "./privateendpointconnectionsupdate";
import PrivateEndpointConnections_Delete from "./privateendpointconnectionsdelete";
import AgentPools_UpgradeNodeImageVersion from "./agentpoolsupgradenodeimageversion";
import PrivateLinkResources_List from "./privatelinkresourceslist";
import ResolvePrivateLinkServiceId_POST from "./resolveprivatelinkserviceidpost";
import ManagedClusters_RunCommand from "./managedclustersruncommand";
import ManagedClusters_GetCommandResult from "./managedclustersgetcommandresult";
import ManagedClusters_ListOutboundNetworkDependenciesEndpoints from "./managedclusterslistoutboundnetworkdependenciesendpoints";
import Snapshots_List from "./snapshotslist";
import Snapshots_ListByResourceGroup from "./snapshotslistbyresourcegroup";
import Snapshots_Get from "./snapshotsget";
import Snapshots_CreateOrUpdate from "./snapshotscreateorupdate";
import Snapshots_UpdateTags from "./snapshotsupdatetags";
import Snapshots_Delete from "./snapshotsdelete";
import ManagedClusters_ListMeshRevisionProfiles from "./managedclusterslistmeshrevisionprofiles";
import ManagedClusters_GetMeshRevisionProfile from "./managedclustersgetmeshrevisionprofile";
import ManagedClusters_ListMeshUpgradeProfiles from "./managedclusterslistmeshupgradeprofiles";
import ManagedClusters_GetMeshUpgradeProfile from "./managedclustersgetmeshupgradeprofile";
import TrustedAccessRoleBindings_List from "./trustedaccessrolebindingslist";
import TrustedAccessRoleBindings_Get from "./trustedaccessrolebindingsget";
import TrustedAccessRoleBindings_CreateOrUpdate from "./trustedaccessrolebindingscreateorupdate";
import TrustedAccessRoleBindings_Delete from "./trustedaccessrolebindingsdelete";
import TrustedAccessRoles_List from "./trustedaccessroleslist";
import Machines_List from "./machineslist";
import Machines_Get from "./machinesget";
import Fleets_ListBySubscription from "./fleetslistbysubscription";
import Fleets_ListByResourceGroup from "./fleetslistbyresourcegroup";
import Fleets_Get from "./fleetsget";
import Fleets_CreateOrUpdate from "./fleetscreateorupdate";
import Fleets_Update from "./fleetsupdate";
import Fleets_Delete from "./fleetsdelete";
import AutoUpgradeProfiles_ListByFleet from "./autoupgradeprofileslistbyfleet";
import AutoUpgradeProfiles_Get from "./autoupgradeprofilesget";
import AutoUpgradeProfiles_CreateOrUpdate from "./autoupgradeprofilescreateorupdate";
import AutoUpgradeProfiles_Delete from "./autoupgradeprofilesdelete";
import AutoUpgradeProfileOperations_GenerateUpdateRun from "./autoupgradeprofileoperationsgenerateupdaterun";
import Fleets_ListCredentials from "./fleetslistcredentials";
import FleetMembers_ListByFleet from "./fleetmemberslistbyfleet";
import FleetMembers_Get from "./fleetmembersget";
import FleetMembers_Create from "./fleetmemberscreate";
import FleetMembers_Update from "./fleetmembersupdate";
import FleetMembers_Delete from "./fleetmembersdelete";
import UpdateRuns_ListByFleet from "./updaterunslistbyfleet";
import UpdateRuns_Get from "./updaterunsget";
import UpdateRuns_CreateOrUpdate from "./updaterunscreateorupdate";
import UpdateRuns_Delete from "./updaterunsdelete";
import UpdateRuns_Skip from "./updaterunsskip";
import UpdateRuns_Start from "./updaterunsstart";
import UpdateRuns_Stop from "./updaterunsstop";
import FleetUpdateStrategies_ListByFleet from "./fleetupdatestrategieslistbyfleet";
import FleetUpdateStrategies_Get from "./fleetupdatestrategiesget";
import FleetUpdateStrategies_CreateOrUpdate from "./fleetupdatestrategiescreateorupdate";
import FleetUpdateStrategies_Delete from "./fleetupdatestrategiesdelete";
import DeploymentSafeguards_List from "./deploymentsafeguardslist";
import DeploymentSafeguards_Get from "./deploymentsafeguardsget";
import DeploymentSafeguards_Create from "./deploymentsafeguardscreate";
import DeploymentSafeguards_Delete from "./deploymentsafeguardsdelete";

export const blocks = {
  Operations_List,
  ManagedClusters_ListKubernetesVersions,
  ManagedClusters_List,
  ManagedClusters_ListByResourceGroup,
  ManagedClusters_GetUpgradeProfile,
  ManagedClusters_GetAccessProfile,
  ManagedClusters_ListClusterAdminCredentials,
  ManagedClusters_ListClusterUserCredentials,
  ManagedClusters_ListClusterMonitoringUserCredentials,
  ManagedClusters_Get,
  ManagedClusters_CreateOrUpdate,
  ManagedClusters_UpdateTags,
  ManagedClusters_Delete,
  MaintenanceConfigurations_ListByManagedCluster,
  MaintenanceConfigurations_Get,
  MaintenanceConfigurations_CreateOrUpdate,
  MaintenanceConfigurations_Delete,
  AgentPools_AbortLatestOperation,
  AgentPools_List,
  AgentPools_Get,
  AgentPools_CreateOrUpdate,
  AgentPools_Delete,
  AgentPools_GetUpgradeProfile,
  AgentPools_DeleteMachines,
  AgentPools_GetAvailableAgentPoolVersions,
  ManagedClusters_ResetServicePrincipalProfile,
  ManagedClusters_ResetAADProfile,
  ManagedClusters_RotateClusterCertificates,
  ManagedClusters_AbortLatestOperation,
  ManagedClusters_RotateServiceAccountSigningKeys,
  ManagedClusters_Stop,
  ManagedClusters_Start,
  PrivateEndpointConnections_List,
  PrivateEndpointConnections_Get,
  PrivateEndpointConnections_Update,
  PrivateEndpointConnections_Delete,
  AgentPools_UpgradeNodeImageVersion,
  PrivateLinkResources_List,
  ResolvePrivateLinkServiceId_POST,
  ManagedClusters_RunCommand,
  ManagedClusters_GetCommandResult,
  ManagedClusters_ListOutboundNetworkDependenciesEndpoints,
  Snapshots_List,
  Snapshots_ListByResourceGroup,
  Snapshots_Get,
  Snapshots_CreateOrUpdate,
  Snapshots_UpdateTags,
  Snapshots_Delete,
  ManagedClusters_ListMeshRevisionProfiles,
  ManagedClusters_GetMeshRevisionProfile,
  ManagedClusters_ListMeshUpgradeProfiles,
  ManagedClusters_GetMeshUpgradeProfile,
  TrustedAccessRoleBindings_List,
  TrustedAccessRoleBindings_Get,
  TrustedAccessRoleBindings_CreateOrUpdate,
  TrustedAccessRoleBindings_Delete,
  TrustedAccessRoles_List,
  Machines_List,
  Machines_Get,
  Fleets_ListBySubscription,
  Fleets_ListByResourceGroup,
  Fleets_Get,
  Fleets_CreateOrUpdate,
  Fleets_Update,
  Fleets_Delete,
  AutoUpgradeProfiles_ListByFleet,
  AutoUpgradeProfiles_Get,
  AutoUpgradeProfiles_CreateOrUpdate,
  AutoUpgradeProfiles_Delete,
  AutoUpgradeProfileOperations_GenerateUpdateRun,
  Fleets_ListCredentials,
  FleetMembers_ListByFleet,
  FleetMembers_Get,
  FleetMembers_Create,
  FleetMembers_Update,
  FleetMembers_Delete,
  UpdateRuns_ListByFleet,
  UpdateRuns_Get,
  UpdateRuns_CreateOrUpdate,
  UpdateRuns_Delete,
  UpdateRuns_Skip,
  UpdateRuns_Start,
  UpdateRuns_Stop,
  FleetUpdateStrategies_ListByFleet,
  FleetUpdateStrategies_Get,
  FleetUpdateStrategies_CreateOrUpdate,
  FleetUpdateStrategies_Delete,
  DeploymentSafeguards_List,
  DeploymentSafeguards_Get,
  DeploymentSafeguards_Create,
  DeploymentSafeguards_Delete,
};
