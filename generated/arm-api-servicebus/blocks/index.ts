import Operations_List from "./operationslist";
import Namespaces_CheckNameAvailability from "./namespaceschecknameavailability";
import DisasterRecoveryConfigs_CheckNameAvailability from "./disasterrecoveryconfigschecknameavailability";
import Namespaces_List from "./namespaceslist";
import Namespaces_ListByResourceGroup from "./namespaceslistbyresourcegroup";
import Namespaces_CreateOrUpdate from "./namespacescreateorupdate";
import Namespaces_Delete from "./namespacesdelete";
import Namespaces_Get from "./namespacesget";
import Namespaces_Update from "./namespacesupdate";
import PrivateEndpointConnections_List from "./privateendpointconnectionslist";
import PrivateEndpointConnections_CreateOrUpdate from "./privateendpointconnectionscreateorupdate";
import PrivateEndpointConnections_Delete from "./privateendpointconnectionsdelete";
import PrivateEndpointConnections_Get from "./privateendpointconnectionsget";
import PrivateLinkResources_Get from "./privatelinkresourcesget";
import Queues_ListByNamespace from "./queueslistbynamespace";
import Queues_CreateOrUpdate from "./queuescreateorupdate";
import Queues_Delete from "./queuesdelete";
import Queues_Get from "./queuesget";
import Topics_ListByNamespace from "./topicslistbynamespace";
import Topics_CreateOrUpdate from "./topicscreateorupdate";
import Topics_Delete from "./topicsdelete";
import Topics_Get from "./topicsget";
import Subscriptions_ListByTopic from "./subscriptionslistbytopic";
import Subscriptions_CreateOrUpdate from "./subscriptionscreateorupdate";
import Subscriptions_Delete from "./subscriptionsdelete";
import Subscriptions_Get from "./subscriptionsget";
import Rules_ListBySubscriptions from "./ruleslistbysubscriptions";
import Rules_CreateOrUpdate from "./rulescreateorupdate";
import Rules_Delete from "./rulesdelete";
import Rules_Get from "./rulesget";
import Namespaces_ListAuthorizationRules from "./namespaceslistauthorizationrules";
import Namespaces_CreateOrUpdateAuthorizationRule from "./namespacescreateorupdateauthorizationrule";
import Namespaces_DeleteAuthorizationRule from "./namespacesdeleteauthorizationrule";
import Namespaces_GetAuthorizationRule from "./namespacesgetauthorizationrule";
import Namespaces_ListKeys from "./namespaceslistkeys";
import Namespaces_RegenerateKeys from "./namespacesregeneratekeys";
import Queues_ListAuthorizationRules from "./queueslistauthorizationrules";
import Queues_CreateOrUpdateAuthorizationRule from "./queuescreateorupdateauthorizationrule";
import Queues_DeleteAuthorizationRule from "./queuesdeleteauthorizationrule";
import Queues_GetAuthorizationRule from "./queuesgetauthorizationrule";
import Queues_ListKeys from "./queueslistkeys";
import Queues_RegenerateKeys from "./queuesregeneratekeys";
import Topics_ListAuthorizationRules from "./topicslistauthorizationrules";
import Topics_CreateOrUpdateAuthorizationRule from "./topicscreateorupdateauthorizationrule";
import Topics_GetAuthorizationRule from "./topicsgetauthorizationrule";
import Topics_DeleteAuthorizationRule from "./topicsdeleteauthorizationrule";
import Topics_ListKeys from "./topicslistkeys";
import Topics_RegenerateKeys from "./topicsregeneratekeys";
import DisasterRecoveryConfigs_ListAuthorizationRules from "./disasterrecoveryconfigslistauthorizationrules";
import DisasterRecoveryConfigs_GetAuthorizationRule from "./disasterrecoveryconfigsgetauthorizationrule";
import DisasterRecoveryConfigs_ListKeys from "./disasterrecoveryconfigslistkeys";
import DisasterRecoveryConfigs_List from "./disasterrecoveryconfigslist";
import DisasterRecoveryConfigs_CreateOrUpdate from "./disasterrecoveryconfigscreateorupdate";
import DisasterRecoveryConfigs_Delete from "./disasterrecoveryconfigsdelete";
import DisasterRecoveryConfigs_Get from "./disasterrecoveryconfigsget";
import DisasterRecoveryConfigs_BreakPairing from "./disasterrecoveryconfigsbreakpairing";
import DisasterRecoveryConfigs_FailOver from "./disasterrecoveryconfigsfailover";
import MigrationConfigs_List from "./migrationconfigslist";
import MigrationConfigs_CreateAndStartMigration from "./migrationconfigscreateandstartmigration";
import MigrationConfigs_Delete from "./migrationconfigsdelete";
import MigrationConfigs_Get from "./migrationconfigsget";
import MigrationConfigs_CompleteMigration from "./migrationconfigscompletemigration";
import MigrationConfigs_Revert from "./migrationconfigsrevert";
import Namespaces_CreateOrUpdateNetworkRuleSet from "./namespacescreateorupdatenetworkruleset";
import Namespaces_GetNetworkRuleSet from "./namespacesgetnetworkruleset";
import Namespaces_ListNetworkRuleSets from "./namespaceslistnetworkrulesets";

export const blocks = {
  Operations_List,
  Namespaces_CheckNameAvailability,
  DisasterRecoveryConfigs_CheckNameAvailability,
  Namespaces_List,
  Namespaces_ListByResourceGroup,
  Namespaces_CreateOrUpdate,
  Namespaces_Delete,
  Namespaces_Get,
  Namespaces_Update,
  PrivateEndpointConnections_List,
  PrivateEndpointConnections_CreateOrUpdate,
  PrivateEndpointConnections_Delete,
  PrivateEndpointConnections_Get,
  PrivateLinkResources_Get,
  Queues_ListByNamespace,
  Queues_CreateOrUpdate,
  Queues_Delete,
  Queues_Get,
  Topics_ListByNamespace,
  Topics_CreateOrUpdate,
  Topics_Delete,
  Topics_Get,
  Subscriptions_ListByTopic,
  Subscriptions_CreateOrUpdate,
  Subscriptions_Delete,
  Subscriptions_Get,
  Rules_ListBySubscriptions,
  Rules_CreateOrUpdate,
  Rules_Delete,
  Rules_Get,
  Namespaces_ListAuthorizationRules,
  Namespaces_CreateOrUpdateAuthorizationRule,
  Namespaces_DeleteAuthorizationRule,
  Namespaces_GetAuthorizationRule,
  Namespaces_ListKeys,
  Namespaces_RegenerateKeys,
  Queues_ListAuthorizationRules,
  Queues_CreateOrUpdateAuthorizationRule,
  Queues_DeleteAuthorizationRule,
  Queues_GetAuthorizationRule,
  Queues_ListKeys,
  Queues_RegenerateKeys,
  Topics_ListAuthorizationRules,
  Topics_CreateOrUpdateAuthorizationRule,
  Topics_GetAuthorizationRule,
  Topics_DeleteAuthorizationRule,
  Topics_ListKeys,
  Topics_RegenerateKeys,
  DisasterRecoveryConfigs_ListAuthorizationRules,
  DisasterRecoveryConfigs_GetAuthorizationRule,
  DisasterRecoveryConfigs_ListKeys,
  DisasterRecoveryConfigs_List,
  DisasterRecoveryConfigs_CreateOrUpdate,
  DisasterRecoveryConfigs_Delete,
  DisasterRecoveryConfigs_Get,
  DisasterRecoveryConfigs_BreakPairing,
  DisasterRecoveryConfigs_FailOver,
  MigrationConfigs_List,
  MigrationConfigs_CreateAndStartMigration,
  MigrationConfigs_Delete,
  MigrationConfigs_Get,
  MigrationConfigs_CompleteMigration,
  MigrationConfigs_Revert,
  Namespaces_CreateOrUpdateNetworkRuleSet,
  Namespaces_GetNetworkRuleSet,
  Namespaces_ListNetworkRuleSets,
};
