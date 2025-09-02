import ActionGroups_CreateOrUpdate from "./actiongroupscreateorupdate";
import ActionGroups_Get from "./actiongroupsget";
import ActionGroups_Delete from "./actiongroupsdelete";
import ActionGroups_Update from "./actiongroupsupdate";
import ActionGroups_CreateNotificationsAtActionGroupResourceLevel from "./actiongroupscreatenotificationsatactiongroupresourcelevel";
import ActionGroups_GetTestNotificationsAtActionGroupResourceLevel from "./actiongroupsgettestnotificationsatactiongroupresourcelevel";
import ActionGroups_ListBySubscriptionId from "./actiongroupslistbysubscriptionid";
import ActionGroups_ListByResourceGroup from "./actiongroupslistbyresourcegroup";
import ActionGroups_EnableReceiver from "./actiongroupsenablereceiver";
import DataCollectionEndpoints_ListByResourceGroup from "./datacollectionendpointslistbyresourcegroup";
import DataCollectionEndpoints_ListBySubscription from "./datacollectionendpointslistbysubscription";
import DataCollectionEndpoints_Get from "./datacollectionendpointsget";
import DataCollectionEndpoints_Create from "./datacollectionendpointscreate";
import DataCollectionEndpoints_Update from "./datacollectionendpointsupdate";
import DataCollectionEndpoints_Delete from "./datacollectionendpointsdelete";
import DataCollectionRuleAssociations_ListByResource from "./datacollectionruleassociationslistbyresource";
import DataCollectionRuleAssociations_ListByRule from "./datacollectionruleassociationslistbyrule";
import DataCollectionRuleAssociations_ListByDataCollectionEndpoint from "./datacollectionruleassociationslistbydatacollectionendpoint";
import DataCollectionRuleAssociations_Get from "./datacollectionruleassociationsget";
import DataCollectionRuleAssociations_Create from "./datacollectionruleassociationscreate";
import DataCollectionRuleAssociations_Delete from "./datacollectionruleassociationsdelete";
import DataCollectionRules_ListByResourceGroup from "./datacollectionruleslistbyresourcegroup";
import DataCollectionRules_ListBySubscription from "./datacollectionruleslistbysubscription";
import DataCollectionRules_Get from "./datacollectionrulesget";
import DataCollectionRules_Create from "./datacollectionrulescreate";
import DataCollectionRules_Update from "./datacollectionrulesupdate";
import DataCollectionRules_Delete from "./datacollectionrulesdelete";
import MetricDefinitions_ListAtSubscriptionScope from "./metricdefinitionslistatsubscriptionscope";
import MetricDefinitions_List from "./metricdefinitionslist";
import MetricNamespaces_List from "./metricnamespaceslist";
import Metrics_ListAtSubscriptionScope from "./metricslistatsubscriptionscope";
import Metrics_ListAtSubscriptionScopePost from "./metricslistatsubscriptionscopepost";
import Metrics_List from "./metricslist";
import ScheduledQueryRules_ListBySubscription from "./scheduledqueryruleslistbysubscription";
import ScheduledQueryRules_ListByResourceGroup from "./scheduledqueryruleslistbyresourcegroup";
import ScheduledQueryRules_Get from "./scheduledqueryrulesget";
import ScheduledQueryRules_CreateOrUpdate from "./scheduledqueryrulescreateorupdate";
import ScheduledQueryRules_Update from "./scheduledqueryrulesupdate";
import ScheduledQueryRules_Delete from "./scheduledqueryrulesdelete";
import AzureMonitorWorkspaces_ListByResourceGroup from "./azuremonitorworkspaceslistbyresourcegroup";
import AzureMonitorWorkspaces_ListBySubscription from "./azuremonitorworkspaceslistbysubscription";
import AzureMonitorWorkspaces_Get from "./azuremonitorworkspacesget";
import AzureMonitorWorkspaces_Create from "./azuremonitorworkspacescreate";
import AzureMonitorWorkspaces_Update from "./azuremonitorworkspacesupdate";
import AzureMonitorWorkspaces_Delete from "./azuremonitorworkspacesdelete";
import MonitorOperations_List from "./monitoroperationslist";
import Workspaces_List from "./workspaceslist";
import Workspaces_ListByResourceGroup from "./workspaceslistbyresourcegroup";
import Workspaces_CreateOrUpdate from "./workspacescreateorupdate";
import Workspaces_Delete from "./workspacesdelete";
import Workspaces_Get from "./workspacesget";
import Workspaces_Update from "./workspacesupdate";
import DeletedWorkspaces_List from "./deletedworkspaceslist";
import DeletedWorkspaces_ListByResourceGroup from "./deletedworkspaceslistbyresourcegroup";
import WorkspacePurge_Purge from "./workspacepurgepurge";
import WorkspacePurge_GetPurgeStatus from "./workspacepurgegetpurgestatus";
import DataSources_CreateOrUpdate from "./datasourcescreateorupdate";
import DataSources_Delete from "./datasourcesdelete";
import DataSources_Get from "./datasourcesget";
import DataSources_ListByWorkspace from "./datasourceslistbyworkspace";
import IntelligencePacks_Disable from "./intelligencepacksdisable";
import IntelligencePacks_Enable from "./intelligencepacksenable";
import IntelligencePacks_List from "./intelligencepackslist";
import LinkedServices_CreateOrUpdate from "./linkedservicescreateorupdate";
import LinkedServices_Delete from "./linkedservicesdelete";
import LinkedServices_Get from "./linkedservicesget";
import LinkedServices_ListByWorkspace from "./linkedserviceslistbyworkspace";
import LinkedStorageAccounts_CreateOrUpdate from "./linkedstorageaccountscreateorupdate";
import LinkedStorageAccounts_Delete from "./linkedstorageaccountsdelete";
import LinkedStorageAccounts_Get from "./linkedstorageaccountsget";
import LinkedStorageAccounts_ListByWorkspace from "./linkedstorageaccountslistbyworkspace";
import ManagementGroups_List from "./managementgroupslist";
import SavedSearches_Delete from "./savedsearchesdelete";
import SavedSearches_CreateOrUpdate from "./savedsearchescreateorupdate";
import SavedSearches_Get from "./savedsearchesget";
import SavedSearches_ListByWorkspace from "./savedsearcheslistbyworkspace";
import Schema_Get from "./schemaget";
import SharedKeys_GetSharedKeys from "./sharedkeysgetsharedkeys";
import SharedKeys_Regenerate from "./sharedkeysregenerate";
import StorageInsightConfigs_CreateOrUpdate from "./storageinsightconfigscreateorupdate";
import StorageInsightConfigs_Get from "./storageinsightconfigsget";
import StorageInsightConfigs_Delete from "./storageinsightconfigsdelete";
import StorageInsightConfigs_ListByWorkspace from "./storageinsightconfigslistbyworkspace";
import Tables_ListByWorkspace from "./tableslistbyworkspace";
import Tables_CreateOrUpdate from "./tablescreateorupdate";
import Tables_Update from "./tablesupdate";
import Tables_Get from "./tablesget";
import Tables_Delete from "./tablesdelete";
import Tables_Migrate from "./tablesmigrate";
import Tables_CancelSearch from "./tablescancelsearch";
import Usages_List from "./usageslist";
import Workspaces_Failover from "./workspacesfailover";
import Workspaces_Failback from "./workspacesfailback";
import Workspaces_ListNSP from "./workspaceslistnsp";
import Workspaces_GetNSP from "./workspacesgetnsp";
import Workspaces_ReconcileNSP from "./workspacesreconcilensp";

export const blocks = {
  ActionGroups_CreateOrUpdate,
  ActionGroups_Get,
  ActionGroups_Delete,
  ActionGroups_Update,
  ActionGroups_CreateNotificationsAtActionGroupResourceLevel,
  ActionGroups_GetTestNotificationsAtActionGroupResourceLevel,
  ActionGroups_ListBySubscriptionId,
  ActionGroups_ListByResourceGroup,
  ActionGroups_EnableReceiver,
  DataCollectionEndpoints_ListByResourceGroup,
  DataCollectionEndpoints_ListBySubscription,
  DataCollectionEndpoints_Get,
  DataCollectionEndpoints_Create,
  DataCollectionEndpoints_Update,
  DataCollectionEndpoints_Delete,
  DataCollectionRuleAssociations_ListByResource,
  DataCollectionRuleAssociations_ListByRule,
  DataCollectionRuleAssociations_ListByDataCollectionEndpoint,
  DataCollectionRuleAssociations_Get,
  DataCollectionRuleAssociations_Create,
  DataCollectionRuleAssociations_Delete,
  DataCollectionRules_ListByResourceGroup,
  DataCollectionRules_ListBySubscription,
  DataCollectionRules_Get,
  DataCollectionRules_Create,
  DataCollectionRules_Update,
  DataCollectionRules_Delete,
  MetricDefinitions_ListAtSubscriptionScope,
  MetricDefinitions_List,
  MetricNamespaces_List,
  Metrics_ListAtSubscriptionScope,
  Metrics_ListAtSubscriptionScopePost,
  Metrics_List,
  ScheduledQueryRules_ListBySubscription,
  ScheduledQueryRules_ListByResourceGroup,
  ScheduledQueryRules_Get,
  ScheduledQueryRules_CreateOrUpdate,
  ScheduledQueryRules_Update,
  ScheduledQueryRules_Delete,
  AzureMonitorWorkspaces_ListByResourceGroup,
  AzureMonitorWorkspaces_ListBySubscription,
  AzureMonitorWorkspaces_Get,
  AzureMonitorWorkspaces_Create,
  AzureMonitorWorkspaces_Update,
  AzureMonitorWorkspaces_Delete,
  MonitorOperations_List,
  Workspaces_List,
  Workspaces_ListByResourceGroup,
  Workspaces_CreateOrUpdate,
  Workspaces_Delete,
  Workspaces_Get,
  Workspaces_Update,
  DeletedWorkspaces_List,
  DeletedWorkspaces_ListByResourceGroup,
  WorkspacePurge_Purge,
  WorkspacePurge_GetPurgeStatus,
  DataSources_CreateOrUpdate,
  DataSources_Delete,
  DataSources_Get,
  DataSources_ListByWorkspace,
  IntelligencePacks_Disable,
  IntelligencePacks_Enable,
  IntelligencePacks_List,
  LinkedServices_CreateOrUpdate,
  LinkedServices_Delete,
  LinkedServices_Get,
  LinkedServices_ListByWorkspace,
  LinkedStorageAccounts_CreateOrUpdate,
  LinkedStorageAccounts_Delete,
  LinkedStorageAccounts_Get,
  LinkedStorageAccounts_ListByWorkspace,
  ManagementGroups_List,
  SavedSearches_Delete,
  SavedSearches_CreateOrUpdate,
  SavedSearches_Get,
  SavedSearches_ListByWorkspace,
  Schema_Get,
  SharedKeys_GetSharedKeys,
  SharedKeys_Regenerate,
  StorageInsightConfigs_CreateOrUpdate,
  StorageInsightConfigs_Get,
  StorageInsightConfigs_Delete,
  StorageInsightConfigs_ListByWorkspace,
  Tables_ListByWorkspace,
  Tables_CreateOrUpdate,
  Tables_Update,
  Tables_Get,
  Tables_Delete,
  Tables_Migrate,
  Tables_CancelSearch,
  Usages_List,
  Workspaces_Failover,
  Workspaces_Failback,
  Workspaces_ListNSP,
  Workspaces_GetNSP,
  Workspaces_ReconcileNSP,
};
