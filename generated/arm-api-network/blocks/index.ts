import ApplicationGateways_Delete from "./applicationgatewaysdelete";
import ApplicationGateways_Get from "./applicationgatewaysget";
import ApplicationGateways_CreateOrUpdate from "./applicationgatewayscreateorupdate";
import ApplicationGateways_UpdateTags from "./applicationgatewaysupdatetags";
import ApplicationGateways_List from "./applicationgatewayslist";
import ApplicationGateways_ListAll from "./applicationgatewayslistall";
import ApplicationGateways_Start from "./applicationgatewaysstart";
import ApplicationGateways_Stop from "./applicationgatewaysstop";
import ApplicationGateways_BackendHealth from "./applicationgatewaysbackendhealth";
import ApplicationGateways_BackendHealthOnDemand from "./applicationgatewaysbackendhealthondemand";
import ApplicationGatewayPrivateLinkResources_List from "./applicationgatewayprivatelinkresourceslist";
import ApplicationGatewayPrivateEndpointConnections_Delete from "./applicationgatewayprivateendpointconnectionsdelete";
import ApplicationGatewayPrivateEndpointConnections_Update from "./applicationgatewayprivateendpointconnectionsupdate";
import ApplicationGatewayPrivateEndpointConnections_Get from "./applicationgatewayprivateendpointconnectionsget";
import ApplicationGatewayPrivateEndpointConnections_List from "./applicationgatewayprivateendpointconnectionslist";
import ApplicationGateways_ListAvailableServerVariables from "./applicationgatewayslistavailableservervariables";
import ApplicationGateways_ListAvailableRequestHeaders from "./applicationgatewayslistavailablerequestheaders";
import ApplicationGateways_ListAvailableResponseHeaders from "./applicationgatewayslistavailableresponseheaders";
import ApplicationGateways_ListAvailableWafRuleSets from "./applicationgatewayslistavailablewafrulesets";
import ApplicationGateways_ListAvailableSslOptions from "./applicationgatewayslistavailablessloptions";
import ApplicationGateways_ListAvailableSslPredefinedPolicies from "./applicationgatewayslistavailablesslpredefinedpolicies";
import ApplicationGateways_GetSslPredefinedPolicy from "./applicationgatewaysgetsslpredefinedpolicy";
import ApplicationGatewayWafDynamicManifestsDefault_Get from "./applicationgatewaywafdynamicmanifestsdefaultget";
import ApplicationGatewayWafDynamicManifests_Get from "./applicationgatewaywafdynamicmanifestsget";
import ApplicationSecurityGroups_Delete from "./applicationsecuritygroupsdelete";
import ApplicationSecurityGroups_Get from "./applicationsecuritygroupsget";
import ApplicationSecurityGroups_CreateOrUpdate from "./applicationsecuritygroupscreateorupdate";
import ApplicationSecurityGroups_UpdateTags from "./applicationsecuritygroupsupdatetags";
import ApplicationSecurityGroups_ListAll from "./applicationsecuritygroupslistall";
import ApplicationSecurityGroups_List from "./applicationsecuritygroupslist";
import AvailableDelegations_List from "./availabledelegationslist";
import AvailableResourceGroupDelegations_List from "./availableresourcegroupdelegationslist";
import AvailableServiceAliases_List from "./availableservicealiaseslist";
import AvailableServiceAliases_ListByResourceGroup from "./availableservicealiaseslistbyresourcegroup";
import AzureFirewalls_Delete from "./azurefirewallsdelete";
import AzureFirewalls_Get from "./azurefirewallsget";
import AzureFirewalls_CreateOrUpdate from "./azurefirewallscreateorupdate";
import AzureFirewalls_UpdateTags from "./azurefirewallsupdatetags";
import AzureFirewalls_List from "./azurefirewallslist";
import AzureFirewalls_ListAll from "./azurefirewallslistall";
import AzureFirewalls_ListLearnedPrefixes from "./azurefirewallslistlearnedprefixes";
import AzureFirewalls_PacketCapture from "./azurefirewallspacketcapture";
import AzureFirewalls_PacketCaptureOperation from "./azurefirewallspacketcaptureoperation";
import AzureFirewallFqdnTags_ListAll from "./azurefirewallfqdntagslistall";
import WebCategories_Get from "./webcategoriesget";
import WebCategories_ListBySubscription from "./webcategorieslistbysubscription";
import BastionHosts_Delete from "./bastionhostsdelete";
import BastionHosts_Get from "./bastionhostsget";
import BastionHosts_CreateOrUpdate from "./bastionhostscreateorupdate";
import BastionHosts_UpdateTags from "./bastionhostsupdatetags";
import BastionHosts_List from "./bastionhostslist";
import BastionHosts_ListByResourceGroup from "./bastionhostslistbyresourcegroup";
import PutBastionShareableLink from "./putbastionshareablelink";
import DeleteBastionShareableLink from "./deletebastionshareablelink";
import DeleteBastionShareableLinkByToken from "./deletebastionshareablelinkbytoken";
import GetBastionShareableLink from "./getbastionshareablelink";
import GetActiveSessions from "./getactivesessions";
import DisconnectActiveSessions from "./disconnectactivesessions";
import CheckDnsNameAvailability from "./checkdnsnameavailability";
import NetworkInterfaces_ListCloudServiceRoleInstanceNetworkInterfaces from "./networkinterfaceslistcloudserviceroleinstancenetworkinterfaces";
import NetworkInterfaces_ListCloudServiceNetworkInterfaces from "./networkinterfaceslistcloudservicenetworkinterfaces";
import NetworkInterfaces_GetCloudServiceNetworkInterface from "./networkinterfacesgetcloudservicenetworkinterface";
import PublicIPAddresses_ListCloudServicePublicIPAddresses from "./publicipaddresseslistcloudservicepublicipaddresses";
import PublicIPAddresses_ListCloudServiceRoleInstancePublicIPAddresses from "./publicipaddresseslistcloudserviceroleinstancepublicipaddresses";
import PublicIPAddresses_GetCloudServicePublicIPAddress from "./publicipaddressesgetcloudservicepublicipaddress";
import VipSwap_Get from "./vipswapget";
import VipSwap_Create from "./vipswapcreate";
import VipSwap_List from "./vipswaplist";
import CustomIPPrefixes_Delete from "./customipprefixesdelete";
import CustomIPPrefixes_Get from "./customipprefixesget";
import CustomIPPrefixes_CreateOrUpdate from "./customipprefixescreateorupdate";
import CustomIPPrefixes_UpdateTags from "./customipprefixesupdatetags";
import CustomIPPrefixes_ListAll from "./customipprefixeslistall";
import CustomIPPrefixes_List from "./customipprefixeslist";
import DdosCustomPolicies_Delete from "./ddoscustompoliciesdelete";
import DdosCustomPolicies_Get from "./ddoscustompoliciesget";
import DdosCustomPolicies_CreateOrUpdate from "./ddoscustompoliciescreateorupdate";
import DdosCustomPolicies_UpdateTags from "./ddoscustompoliciesupdatetags";
import DdosProtectionPlans_Delete from "./ddosprotectionplansdelete";
import DdosProtectionPlans_Get from "./ddosprotectionplansget";
import DdosProtectionPlans_CreateOrUpdate from "./ddosprotectionplanscreateorupdate";
import DdosProtectionPlans_UpdateTags from "./ddosprotectionplansupdatetags";
import DdosProtectionPlans_List from "./ddosprotectionplanslist";
import DdosProtectionPlans_ListByResourceGroup from "./ddosprotectionplanslistbyresourcegroup";
import DscpConfiguration_CreateOrUpdate from "./dscpconfigurationcreateorupdate";
import DscpConfiguration_Delete from "./dscpconfigurationdelete";
import DscpConfiguration_Get from "./dscpconfigurationget";
import DscpConfiguration_List from "./dscpconfigurationlist";
import DscpConfiguration_ListAll from "./dscpconfigurationlistall";
import AvailableEndpointServices_List from "./availableendpointserviceslist";
import ExpressRouteCircuitAuthorizations_Delete from "./expressroutecircuitauthorizationsdelete";
import ExpressRouteCircuitAuthorizations_Get from "./expressroutecircuitauthorizationsget";
import ExpressRouteCircuitAuthorizations_CreateOrUpdate from "./expressroutecircuitauthorizationscreateorupdate";
import ExpressRouteCircuitAuthorizations_List from "./expressroutecircuitauthorizationslist";
import ExpressRouteCircuitPeerings_Delete from "./expressroutecircuitpeeringsdelete";
import ExpressRouteCircuitPeerings_Get from "./expressroutecircuitpeeringsget";
import ExpressRouteCircuitPeerings_CreateOrUpdate from "./expressroutecircuitpeeringscreateorupdate";
import ExpressRouteCircuitPeerings_List from "./expressroutecircuitpeeringslist";
import ExpressRouteCircuitConnections_Delete from "./expressroutecircuitconnectionsdelete";
import ExpressRouteCircuitConnections_Get from "./expressroutecircuitconnectionsget";
import ExpressRouteCircuitConnections_CreateOrUpdate from "./expressroutecircuitconnectionscreateorupdate";
import ExpressRouteCircuitConnections_List from "./expressroutecircuitconnectionslist";
import PeerExpressRouteCircuitConnections_Get from "./peerexpressroutecircuitconnectionsget";
import PeerExpressRouteCircuitConnections_List from "./peerexpressroutecircuitconnectionslist";
import ExpressRouteCircuits_Delete from "./expressroutecircuitsdelete";
import ExpressRouteCircuits_Get from "./expressroutecircuitsget";
import ExpressRouteCircuits_CreateOrUpdate from "./expressroutecircuitscreateorupdate";
import ExpressRouteCircuits_UpdateTags from "./expressroutecircuitsupdatetags";
import ExpressRouteCircuits_ListArpTable from "./expressroutecircuitslistarptable";
import ExpressRouteCircuits_ListRoutesTable from "./expressroutecircuitslistroutestable";
import ExpressRouteCircuits_ListRoutesTableSummary from "./expressroutecircuitslistroutestablesummary";
import ExpressRouteCircuits_GetStats from "./expressroutecircuitsgetstats";
import ExpressRouteCircuits_GetPeeringStats from "./expressroutecircuitsgetpeeringstats";
import ExpressRouteCircuits_List from "./expressroutecircuitslist";
import ExpressRouteCircuits_ListAll from "./expressroutecircuitslistall";
import ExpressRouteServiceProviders_List from "./expressrouteserviceproviderslist";
import ExpressRouteCrossConnections_List from "./expressroutecrossconnectionslist";
import ExpressRouteCrossConnections_ListByResourceGroup from "./expressroutecrossconnectionslistbyresourcegroup";
import ExpressRouteCrossConnections_Get from "./expressroutecrossconnectionsget";
import ExpressRouteCrossConnections_CreateOrUpdate from "./expressroutecrossconnectionscreateorupdate";
import ExpressRouteCrossConnections_UpdateTags from "./expressroutecrossconnectionsupdatetags";
import ExpressRouteCrossConnectionPeerings_List from "./expressroutecrossconnectionpeeringslist";
import ExpressRouteCrossConnectionPeerings_Delete from "./expressroutecrossconnectionpeeringsdelete";
import ExpressRouteCrossConnectionPeerings_Get from "./expressroutecrossconnectionpeeringsget";
import ExpressRouteCrossConnectionPeerings_CreateOrUpdate from "./expressroutecrossconnectionpeeringscreateorupdate";
import ExpressRouteCrossConnections_ListArpTable from "./expressroutecrossconnectionslistarptable";
import ExpressRouteCrossConnections_ListRoutesTableSummary from "./expressroutecrossconnectionslistroutestablesummary";
import ExpressRouteCrossConnections_ListRoutesTable from "./expressroutecrossconnectionslistroutestable";
import ExpressRoutePortsLocations_List from "./expressrouteportslocationslist";
import ExpressRoutePortsLocations_Get from "./expressrouteportslocationsget";
import ExpressRoutePorts_Delete from "./expressrouteportsdelete";
import ExpressRoutePorts_Get from "./expressrouteportsget";
import ExpressRoutePorts_CreateOrUpdate from "./expressrouteportscreateorupdate";
import ExpressRoutePorts_UpdateTags from "./expressrouteportsupdatetags";
import ExpressRoutePorts_ListByResourceGroup from "./expressrouteportslistbyresourcegroup";
import ExpressRoutePorts_List from "./expressrouteportslist";
import ExpressRouteLinks_Get from "./expressroutelinksget";
import ExpressRouteLinks_List from "./expressroutelinkslist";
import ExpressRoutePorts_GenerateLOA from "./expressrouteportsgenerateloa";
import ExpressRoutePortAuthorizations_Delete from "./expressrouteportauthorizationsdelete";
import ExpressRoutePortAuthorizations_Get from "./expressrouteportauthorizationsget";
import ExpressRoutePortAuthorizations_CreateOrUpdate from "./expressrouteportauthorizationscreateorupdate";
import ExpressRoutePortAuthorizations_List from "./expressrouteportauthorizationslist";
import ExpressRouteProviderPortsLocation_List from "./expressrouteproviderportslocationlist";
import ExpressRouteProviderPort from "./expressrouteproviderport";
import FirewallPolicies_Delete from "./firewallpoliciesdelete";
import FirewallPolicies_Get from "./firewallpoliciesget";
import FirewallPolicies_CreateOrUpdate from "./firewallpoliciescreateorupdate";
import FirewallPolicies_UpdateTags from "./firewallpoliciesupdatetags";
import FirewallPolicies_List from "./firewallpolicieslist";
import FirewallPolicies_ListAll from "./firewallpolicieslistall";
import FirewallPolicyRuleCollectionGroups_Delete from "./firewallpolicyrulecollectiongroupsdelete";
import FirewallPolicyRuleCollectionGroups_Get from "./firewallpolicyrulecollectiongroupsget";
import FirewallPolicyRuleCollectionGroups_CreateOrUpdate from "./firewallpolicyrulecollectiongroupscreateorupdate";
import FirewallPolicyRuleCollectionGroups_List from "./firewallpolicyrulecollectiongroupslist";
import FirewallPolicyIdpsSignatures_List from "./firewallpolicyidpssignatureslist";
import FirewallPolicyIdpsSignaturesOverrides_Patch from "./firewallpolicyidpssignaturesoverridespatch";
import FirewallPolicyIdpsSignaturesOverrides_Put from "./firewallpolicyidpssignaturesoverridesput";
import FirewallPolicyIdpsSignaturesOverrides_Get from "./firewallpolicyidpssignaturesoverridesget";
import FirewallPolicyIdpsSignaturesFilterValues_List from "./firewallpolicyidpssignaturesfiltervalueslist";
import FirewallPolicyIdpsSignaturesOverrides_List from "./firewallpolicyidpssignaturesoverrideslist";
import FirewallPolicyDrafts_CreateOrUpdate from "./firewallpolicydraftscreateorupdate";
import FirewallPolicyDrafts_Delete from "./firewallpolicydraftsdelete";
import FirewallPolicyDrafts_Get from "./firewallpolicydraftsget";
import FirewallPolicyDeployments_Deploy from "./firewallpolicydeploymentsdeploy";
import FirewallPolicyRuleCollectionGroupDrafts_Delete from "./firewallpolicyrulecollectiongroupdraftsdelete";
import FirewallPolicyRuleCollectionGroupDrafts_CreateOrUpdate from "./firewallpolicyrulecollectiongroupdraftscreateorupdate";
import FirewallPolicyRuleCollectionGroupDrafts_Get from "./firewallpolicyrulecollectiongroupdraftsget";
import IpamPools_List from "./ipampoolslist";
import IpamPools_Create from "./ipampoolscreate";
import IpamPools_Update from "./ipampoolsupdate";
import IpamPools_Get from "./ipampoolsget";
import IpamPools_Delete from "./ipampoolsdelete";
import IpamPools_GetPoolUsage from "./ipampoolsgetpoolusage";
import IpamPools_ListAssociatedResources from "./ipampoolslistassociatedresources";
import StaticCidrs_List from "./staticcidrslist";
import StaticCidrs_Create from "./staticcidrscreate";
import StaticCidrs_Get from "./staticcidrsget";
import StaticCidrs_Delete from "./staticcidrsdelete";
import IpAllocations_Delete from "./ipallocationsdelete";
import IpAllocations_Get from "./ipallocationsget";
import IpAllocations_CreateOrUpdate from "./ipallocationscreateorupdate";
import IpAllocations_UpdateTags from "./ipallocationsupdatetags";
import IpAllocations_List from "./ipallocationslist";
import IpAllocations_ListByResourceGroup from "./ipallocationslistbyresourcegroup";
import IpGroups_Get from "./ipgroupsget";
import IpGroups_CreateOrUpdate from "./ipgroupscreateorupdate";
import IpGroups_UpdateGroups from "./ipgroupsupdategroups";
import IpGroups_Delete from "./ipgroupsdelete";
import IpGroups_ListByResourceGroup from "./ipgroupslistbyresourcegroup";
import IpGroups_List from "./ipgroupslist";
import LoadBalancers_Delete from "./loadbalancersdelete";
import LoadBalancers_Get from "./loadbalancersget";
import LoadBalancers_CreateOrUpdate from "./loadbalancerscreateorupdate";
import LoadBalancers_UpdateTags from "./loadbalancersupdatetags";
import LoadBalancers_ListAll from "./loadbalancerslistall";
import LoadBalancers_List from "./loadbalancerslist";
import LoadBalancerBackendAddressPools_List from "./loadbalancerbackendaddresspoolslist";
import LoadBalancerBackendAddressPools_Get from "./loadbalancerbackendaddresspoolsget";
import LoadBalancerBackendAddressPools_CreateOrUpdate from "./loadbalancerbackendaddresspoolscreateorupdate";
import LoadBalancerBackendAddressPools_Delete from "./loadbalancerbackendaddresspoolsdelete";
import LoadBalancerFrontendIPConfigurations_List from "./loadbalancerfrontendipconfigurationslist";
import LoadBalancerFrontendIPConfigurations_Get from "./loadbalancerfrontendipconfigurationsget";
import InboundNatRules_List from "./inboundnatruleslist";
import InboundNatRules_Delete from "./inboundnatrulesdelete";
import InboundNatRules_Get from "./inboundnatrulesget";
import InboundNatRules_CreateOrUpdate from "./inboundnatrulescreateorupdate";
import LoadBalancerLoadBalancingRules_List from "./loadbalancerloadbalancingruleslist";
import LoadBalancerLoadBalancingRules_Get from "./loadbalancerloadbalancingrulesget";
import LoadBalancerOutboundRules_List from "./loadbalanceroutboundruleslist";
import LoadBalancerOutboundRules_Get from "./loadbalanceroutboundrulesget";
import LoadBalancerNetworkInterfaces_List from "./loadbalancernetworkinterfaceslist";
import LoadBalancerProbes_List from "./loadbalancerprobeslist";
import LoadBalancers_SwapPublicIpAddresses from "./loadbalancersswappublicipaddresses";
import LoadBalancers_ListInboundNatRulePortMappings from "./loadbalancerslistinboundnatruleportmappings";
import LoadBalancerLoadBalancingRules_Health from "./loadbalancerloadbalancingruleshealth";
import LoadBalancerProbes_Get from "./loadbalancerprobesget";
import LoadBalancers_MigrateToIpBased from "./loadbalancersmigratetoipbased";
import NatGateways_Delete from "./natgatewaysdelete";
import NatGateways_Get from "./natgatewaysget";
import NatGateways_CreateOrUpdate from "./natgatewayscreateorupdate";
import NatGateways_UpdateTags from "./natgatewaysupdatetags";
import NatGateways_ListAll from "./natgatewayslistall";
import NatGateways_List from "./natgatewayslist";
import NetworkInterfaces_Delete from "./networkinterfacesdelete";
import NetworkInterfaces_Get from "./networkinterfacesget";
import NetworkInterfaces_CreateOrUpdate from "./networkinterfacescreateorupdate";
import NetworkInterfaces_UpdateTags from "./networkinterfacesupdatetags";
import NetworkInterfaces_ListAll from "./networkinterfaceslistall";
import NetworkInterfaces_List from "./networkinterfaceslist";
import NetworkInterfaces_GetEffectiveRouteTable from "./networkinterfacesgeteffectiveroutetable";
import NetworkInterfaces_ListEffectiveNetworkSecurityGroups from "./networkinterfaceslisteffectivenetworksecuritygroups";
import NetworkInterfaceIPConfigurations_List from "./networkinterfaceipconfigurationslist";
import NetworkInterfaceIPConfigurations_Get from "./networkinterfaceipconfigurationsget";
import NetworkInterfaceLoadBalancers_List from "./networkinterfaceloadbalancerslist";
import NetworkInterfaceTapConfigurations_Delete from "./networkinterfacetapconfigurationsdelete";
import NetworkInterfaceTapConfigurations_Get from "./networkinterfacetapconfigurationsget";
import NetworkInterfaceTapConfigurations_CreateOrUpdate from "./networkinterfacetapconfigurationscreateorupdate";
import NetworkInterfaceTapConfigurations_List from "./networkinterfacetapconfigurationslist";
import NetworkManagers_Get from "./networkmanagersget";
import NetworkManagers_CreateOrUpdate from "./networkmanagerscreateorupdate";
import NetworkManagers_Delete from "./networkmanagersdelete";
import NetworkManagers_Patch from "./networkmanagerspatch";
import NetworkManagerCommits_Post from "./networkmanagercommitspost";
import NetworkManagerDeploymentStatus_List from "./networkmanagerdeploymentstatuslist";
import NetworkManagers_ListBySubscription from "./networkmanagerslistbysubscription";
import NetworkManagers_List from "./networkmanagerslist";
import ListActiveConnectivityConfigurations from "./listactiveconnectivityconfigurations";
import ListActiveSecurityAdminRules from "./listactivesecurityadminrules";
import SubscriptionNetworkManagerConnections_CreateOrUpdate from "./subscriptionnetworkmanagerconnectionscreateorupdate";
import SubscriptionNetworkManagerConnections_Get from "./subscriptionnetworkmanagerconnectionsget";
import SubscriptionNetworkManagerConnections_Delete from "./subscriptionnetworkmanagerconnectionsdelete";
import SubscriptionNetworkManagerConnections_List from "./subscriptionnetworkmanagerconnectionslist";
import ManagementGroupNetworkManagerConnections_CreateOrUpdate from "./managementgroupnetworkmanagerconnectionscreateorupdate";
import ManagementGroupNetworkManagerConnections_Get from "./managementgroupnetworkmanagerconnectionsget";
import ManagementGroupNetworkManagerConnections_Delete from "./managementgroupnetworkmanagerconnectionsdelete";
import ManagementGroupNetworkManagerConnections_List from "./managementgroupnetworkmanagerconnectionslist";
import ConnectivityConfigurations_Get from "./connectivityconfigurationsget";
import ConnectivityConfigurations_CreateOrUpdate from "./connectivityconfigurationscreateorupdate";
import ConnectivityConfigurations_Delete from "./connectivityconfigurationsdelete";
import ConnectivityConfigurations_List from "./connectivityconfigurationslist";
import ListNetworkManagerEffectiveConnectivityConfigurations from "./listnetworkmanagereffectiveconnectivityconfigurations";
import ListNetworkManagerEffectiveSecurityAdminRules from "./listnetworkmanagereffectivesecurityadminrules";
import NetworkGroups_Get from "./networkgroupsget";
import NetworkGroups_CreateOrUpdate from "./networkgroupscreateorupdate";
import NetworkGroups_Delete from "./networkgroupsdelete";
import NetworkGroups_List from "./networkgroupslist";
import StaticMembers_Get from "./staticmembersget";
import StaticMembers_CreateOrUpdate from "./staticmemberscreateorupdate";
import StaticMembers_Delete from "./staticmembersdelete";
import StaticMembers_List from "./staticmemberslist";
import NetworkManagerRoutingConfigurations_List from "./networkmanagerroutingconfigurationslist";
import NetworkManagerRoutingConfigurations_Get from "./networkmanagerroutingconfigurationsget";
import NetworkManagerRoutingConfigurations_CreateOrUpdate from "./networkmanagerroutingconfigurationscreateorupdate";
import NetworkManagerRoutingConfigurations_Delete from "./networkmanagerroutingconfigurationsdelete";
import RoutingRuleCollections_List from "./routingrulecollectionslist";
import RoutingRuleCollections_Get from "./routingrulecollectionsget";
import RoutingRuleCollections_CreateOrUpdate from "./routingrulecollectionscreateorupdate";
import RoutingRuleCollections_Delete from "./routingrulecollectionsdelete";
import RoutingRules_List from "./routingruleslist";
import RoutingRules_Get from "./routingrulesget";
import RoutingRules_CreateOrUpdate from "./routingrulescreateorupdate";
import RoutingRules_Delete from "./routingrulesdelete";
import ScopeConnections_CreateOrUpdate from "./scopeconnectionscreateorupdate";
import ScopeConnections_Get from "./scopeconnectionsget";
import ScopeConnections_Delete from "./scopeconnectionsdelete";
import ScopeConnections_List from "./scopeconnectionslist";
import SecurityAdminConfigurations_List from "./securityadminconfigurationslist";
import SecurityAdminConfigurations_Get from "./securityadminconfigurationsget";
import SecurityAdminConfigurations_CreateOrUpdate from "./securityadminconfigurationscreateorupdate";
import SecurityAdminConfigurations_Delete from "./securityadminconfigurationsdelete";
import AdminRuleCollections_List from "./adminrulecollectionslist";
import AdminRuleCollections_Get from "./adminrulecollectionsget";
import AdminRuleCollections_CreateOrUpdate from "./adminrulecollectionscreateorupdate";
import AdminRuleCollections_Delete from "./adminrulecollectionsdelete";
import AdminRules_List from "./adminruleslist";
import AdminRules_Get from "./adminrulesget";
import AdminRules_CreateOrUpdate from "./adminrulescreateorupdate";
import AdminRules_Delete from "./adminrulesdelete";
import SecurityUserConfigurations_List from "./securityuserconfigurationslist";
import SecurityUserConfigurations_Get from "./securityuserconfigurationsget";
import SecurityUserConfigurations_CreateOrUpdate from "./securityuserconfigurationscreateorupdate";
import SecurityUserConfigurations_Delete from "./securityuserconfigurationsdelete";
import SecurityUserRuleCollections_List from "./securityuserrulecollectionslist";
import SecurityUserRuleCollections_Get from "./securityuserrulecollectionsget";
import SecurityUserRuleCollections_CreateOrUpdate from "./securityuserrulecollectionscreateorupdate";
import SecurityUserRuleCollections_Delete from "./securityuserrulecollectionsdelete";
import SecurityUserRules_List from "./securityuserruleslist";
import SecurityUserRules_Get from "./securityuserrulesget";
import SecurityUserRules_CreateOrUpdate from "./securityuserrulescreateorupdate";
import SecurityUserRules_Delete from "./securityuserrulesdelete";
import NetworkProfiles_Delete from "./networkprofilesdelete";
import NetworkProfiles_Get from "./networkprofilesget";
import NetworkProfiles_CreateOrUpdate from "./networkprofilescreateorupdate";
import NetworkProfiles_UpdateTags from "./networkprofilesupdatetags";
import NetworkProfiles_ListAll from "./networkprofileslistall";
import NetworkProfiles_List from "./networkprofileslist";
import NetworkSecurityGroups_Delete from "./networksecuritygroupsdelete";
import NetworkSecurityGroups_Get from "./networksecuritygroupsget";
import NetworkSecurityGroups_CreateOrUpdate from "./networksecuritygroupscreateorupdate";
import NetworkSecurityGroups_UpdateTags from "./networksecuritygroupsupdatetags";
import NetworkSecurityGroups_ListAll from "./networksecuritygroupslistall";
import NetworkSecurityGroups_List from "./networksecuritygroupslist";
import SecurityRules_Delete from "./securityrulesdelete";
import SecurityRules_Get from "./securityrulesget";
import SecurityRules_CreateOrUpdate from "./securityrulescreateorupdate";
import SecurityRules_List from "./securityruleslist";
import DefaultSecurityRules_List from "./defaultsecurityruleslist";
import DefaultSecurityRules_Get from "./defaultsecurityrulesget";
import NetworkSecurityPerimeters_Get from "./networksecurityperimetersget";
import NetworkSecurityPerimeters_CreateOrUpdate from "./networksecurityperimeterscreateorupdate";
import NetworkSecurityPerimeters_Delete from "./networksecurityperimetersdelete";
import NetworkSecurityPerimeters_Patch from "./networksecurityperimeterspatch";
import NetworkSecurityPerimeters_ListBySubscription from "./networksecurityperimeterslistbysubscription";
import NetworkSecurityPerimeters_List from "./networksecurityperimeterslist";
import NetworkSecurityPerimeterProfiles_Get from "./networksecurityperimeterprofilesget";
import NetworkSecurityPerimeterProfiles_CreateOrUpdate from "./networksecurityperimeterprofilescreateorupdate";
import NetworkSecurityPerimeterProfiles_Delete from "./networksecurityperimeterprofilesdelete";
import NetworkSecurityPerimeterProfiles_List from "./networksecurityperimeterprofileslist";
import NetworkSecurityPerimeterAccessRules_Get from "./networksecurityperimeteraccessrulesget";
import NetworkSecurityPerimeterAccessRules_CreateOrUpdate from "./networksecurityperimeteraccessrulescreateorupdate";
import NetworkSecurityPerimeterAccessRules_Delete from "./networksecurityperimeteraccessrulesdelete";
import NetworkSecurityPerimeterAccessRules_List from "./networksecurityperimeteraccessruleslist";
import NetworkSecurityPerimeterAssociations_Get from "./networksecurityperimeterassociationsget";
import NetworkSecurityPerimeterAssociations_CreateOrUpdate from "./networksecurityperimeterassociationscreateorupdate";
import NetworkSecurityPerimeterAssociations_Delete from "./networksecurityperimeterassociationsdelete";
import NetworkSecurityPerimeterAssociations_List from "./networksecurityperimeterassociationslist";
import NetworkSecurityPerimeterAssociations_Reconcile from "./networksecurityperimeterassociationsreconcile";
import NetworkSecurityPerimeterAssociableResourceTypes_List from "./networksecurityperimeterassociableresourcetypeslist";
import NetworkSecurityPerimeterAccessRules_Reconcile from "./networksecurityperimeteraccessrulesreconcile";
import NetworkSecurityPerimeterLinks_Get from "./networksecurityperimeterlinksget";
import NetworkSecurityPerimeterLinks_CreateOrUpdate from "./networksecurityperimeterlinkscreateorupdate";
import NetworkSecurityPerimeterLinks_Delete from "./networksecurityperimeterlinksdelete";
import NetworkSecurityPerimeterLinks_List from "./networksecurityperimeterlinkslist";
import NetworkSecurityPerimeterLinkReferences_Get from "./networksecurityperimeterlinkreferencesget";
import NetworkSecurityPerimeterLinkReferences_Delete from "./networksecurityperimeterlinkreferencesdelete";
import NetworkSecurityPerimeterLinkReferences_List from "./networksecurityperimeterlinkreferenceslist";
import NetworkSecurityPerimeterLoggingConfigurations_Get from "./networksecurityperimeterloggingconfigurationsget";
import NetworkSecurityPerimeterLoggingConfigurations_CreateOrUpdate from "./networksecurityperimeterloggingconfigurationscreateorupdate";
import NetworkSecurityPerimeterLoggingConfigurations_Delete from "./networksecurityperimeterloggingconfigurationsdelete";
import NetworkSecurityPerimeterLoggingConfigurations_List from "./networksecurityperimeterloggingconfigurationslist";
import NetworkSecurityPerimeterOperationStatuses_Get from "./networksecurityperimeteroperationstatusesget";
import NetworkSecurityPerimeterServiceTags_List from "./networksecurityperimeterservicetagslist";
import ReachabilityAnalysisIntents_List from "./reachabilityanalysisintentslist";
import ReachabilityAnalysisIntents_Get from "./reachabilityanalysisintentsget";
import ReachabilityAnalysisIntents_Create from "./reachabilityanalysisintentscreate";
import ReachabilityAnalysisIntents_Delete from "./reachabilityanalysisintentsdelete";
import ReachabilityAnalysisRuns_List from "./reachabilityanalysisrunslist";
import ReachabilityAnalysisRuns_Get from "./reachabilityanalysisrunsget";
import ReachabilityAnalysisRuns_Create from "./reachabilityanalysisrunscreate";
import ReachabilityAnalysisRuns_Delete from "./reachabilityanalysisrunsdelete";
import VerifierWorkspaces_List from "./verifierworkspaceslist";
import VerifierWorkspaces_Get from "./verifierworkspacesget";
import VerifierWorkspaces_Create from "./verifierworkspacescreate";
import VerifierWorkspaces_Update from "./verifierworkspacesupdate";
import VerifierWorkspaces_Delete from "./verifierworkspacesdelete";
import NetworkVirtualAppliances_Delete from "./networkvirtualappliancesdelete";
import NetworkVirtualAppliances_Get from "./networkvirtualappliancesget";
import NetworkVirtualAppliances_UpdateTags from "./networkvirtualappliancesupdatetags";
import NetworkVirtualAppliances_CreateOrUpdate from "./networkvirtualappliancescreateorupdate";
import NetworkVirtualAppliances_Restart from "./networkvirtualappliancesrestart";
import NetworkVirtualAppliances_Reimage from "./networkvirtualappliancesreimage";
import NetworkVirtualAppliances_GetBootDiagnosticLogs from "./networkvirtualappliancesgetbootdiagnosticlogs";
import NetworkVirtualAppliances_ListByResourceGroup from "./networkvirtualapplianceslistbyresourcegroup";
import NetworkVirtualAppliances_List from "./networkvirtualapplianceslist";
import VirtualApplianceSites_Delete from "./virtualappliancesitesdelete";
import VirtualApplianceSites_Get from "./virtualappliancesitesget";
import VirtualApplianceSites_CreateOrUpdate from "./virtualappliancesitescreateorupdate";
import VirtualApplianceSites_List from "./virtualappliancesiteslist";
import VirtualApplianceSkus_List from "./virtualapplianceskuslist";
import VirtualApplianceSkus_Get from "./virtualapplianceskusget";
import InboundSecurityRule_CreateOrUpdate from "./inboundsecurityrulecreateorupdate";
import InboundSecurityRule_Get from "./inboundsecurityruleget";
import NetworkWatchers_CreateOrUpdate from "./networkwatcherscreateorupdate";
import NetworkWatchers_Get from "./networkwatchersget";
import NetworkWatchers_Delete from "./networkwatchersdelete";
import NetworkWatchers_UpdateTags from "./networkwatchersupdatetags";
import NetworkWatchers_List from "./networkwatcherslist";
import NetworkWatchers_ListAll from "./networkwatcherslistall";
import NetworkWatchers_GetTopology from "./networkwatchersgettopology";
import NetworkWatchers_VerifyIPFlow from "./networkwatchersverifyipflow";
import NetworkWatchers_GetNextHop from "./networkwatchersgetnexthop";
import NetworkWatchers_GetVMSecurityRules from "./networkwatchersgetvmsecurityrules";
import PacketCaptures_Create from "./packetcapturescreate";
import PacketCaptures_Get from "./packetcapturesget";
import PacketCaptures_Delete from "./packetcapturesdelete";
import PacketCaptures_Stop from "./packetcapturesstop";
import PacketCaptures_GetStatus from "./packetcapturesgetstatus";
import PacketCaptures_List from "./packetcaptureslist";
import NetworkWatchers_GetTroubleshooting from "./networkwatchersgettroubleshooting";
import NetworkWatchers_GetTroubleshootingResult from "./networkwatchersgettroubleshootingresult";
import NetworkWatchers_SetFlowLogConfiguration from "./networkwatcherssetflowlogconfiguration";
import NetworkWatchers_GetFlowLogStatus from "./networkwatchersgetflowlogstatus";
import NetworkWatchers_CheckConnectivity from "./networkwatcherscheckconnectivity";
import NetworkWatchers_GetAzureReachabilityReport from "./networkwatchersgetazurereachabilityreport";
import NetworkWatchers_ListAvailableProviders from "./networkwatcherslistavailableproviders";
import NetworkWatchers_GetNetworkConfigurationDiagnostic from "./networkwatchersgetnetworkconfigurationdiagnostic";
import ConnectionMonitors_CreateOrUpdate from "./connectionmonitorscreateorupdate";
import ConnectionMonitors_Get from "./connectionmonitorsget";
import ConnectionMonitors_Delete from "./connectionmonitorsdelete";
import ConnectionMonitors_UpdateTags from "./connectionmonitorsupdatetags";
import ConnectionMonitors_Stop from "./connectionmonitorsstop";
import ConnectionMonitors_List from "./connectionmonitorslist";
import FlowLogs_CreateOrUpdate from "./flowlogscreateorupdate";
import FlowLogs_UpdateTags from "./flowlogsupdatetags";
import FlowLogs_Get from "./flowlogsget";
import FlowLogs_Delete from "./flowlogsdelete";
import FlowLogs_List from "./flowlogslist";
import Operations_List from "./operationslist";
import PrivateEndpoints_Delete from "./privateendpointsdelete";
import PrivateEndpoints_Get from "./privateendpointsget";
import PrivateEndpoints_CreateOrUpdate from "./privateendpointscreateorupdate";
import PrivateEndpoints_List from "./privateendpointslist";
import PrivateEndpoints_ListBySubscription from "./privateendpointslistbysubscription";
import AvailablePrivateEndpointTypes_List from "./availableprivateendpointtypeslist";
import AvailablePrivateEndpointTypes_ListByResourceGroup from "./availableprivateendpointtypeslistbyresourcegroup";
import PrivateDnsZoneGroups_Delete from "./privatednszonegroupsdelete";
import PrivateDnsZoneGroups_Get from "./privatednszonegroupsget";
import PrivateDnsZoneGroups_CreateOrUpdate from "./privatednszonegroupscreateorupdate";
import PrivateDnsZoneGroups_List from "./privatednszonegroupslist";
import PrivateLinkServices_Delete from "./privatelinkservicesdelete";
import PrivateLinkServices_Get from "./privatelinkservicesget";
import PrivateLinkServices_CreateOrUpdate from "./privatelinkservicescreateorupdate";
import PrivateLinkServices_List from "./privatelinkserviceslist";
import PrivateLinkServices_ListBySubscription from "./privatelinkserviceslistbysubscription";
import PrivateLinkServices_GetPrivateEndpointConnection from "./privatelinkservicesgetprivateendpointconnection";
import PrivateLinkServices_UpdatePrivateEndpointConnection from "./privatelinkservicesupdateprivateendpointconnection";
import PrivateLinkServices_DeletePrivateEndpointConnection from "./privatelinkservicesdeleteprivateendpointconnection";
import PrivateLinkServices_ListPrivateEndpointConnections from "./privatelinkserviceslistprivateendpointconnections";
import PrivateLinkServices_CheckPrivateLinkServiceVisibility from "./privatelinkservicescheckprivatelinkservicevisibility";
import PrivateLinkServices_CheckPrivateLinkServiceVisibilityByResourceGroup from "./privatelinkservicescheckprivatelinkservicevisibilitybyresourcegroup";
import PrivateLinkServices_ListAutoApprovedPrivateLinkServices from "./privatelinkserviceslistautoapprovedprivatelinkservices";
import PrivateLinkServices_ListAutoApprovedPrivateLinkServicesByResourceGroup from "./privatelinkserviceslistautoapprovedprivatelinkservicesbyresourcegroup";
import PublicIPAddresses_Delete from "./publicipaddressesdelete";
import PublicIPAddresses_Get from "./publicipaddressesget";
import PublicIPAddresses_CreateOrUpdate from "./publicipaddressescreateorupdate";
import PublicIPAddresses_UpdateTags from "./publicipaddressesupdatetags";
import PublicIPAddresses_ListAll from "./publicipaddresseslistall";
import PublicIPAddresses_List from "./publicipaddresseslist";
import PublicIPAddresses_DdosProtectionStatus from "./publicipaddressesddosprotectionstatus";
import PublicIPPrefixes_Delete from "./publicipprefixesdelete";
import PublicIPPrefixes_Get from "./publicipprefixesget";
import PublicIPPrefixes_CreateOrUpdate from "./publicipprefixescreateorupdate";
import PublicIPPrefixes_UpdateTags from "./publicipprefixesupdatetags";
import PublicIPPrefixes_ListAll from "./publicipprefixeslistall";
import PublicIPPrefixes_List from "./publicipprefixeslist";
import RouteFilters_Delete from "./routefiltersdelete";
import RouteFilters_Get from "./routefiltersget";
import RouteFilters_CreateOrUpdate from "./routefilterscreateorupdate";
import RouteFilters_UpdateTags from "./routefiltersupdatetags";
import RouteFilters_ListByResourceGroup from "./routefilterslistbyresourcegroup";
import RouteFilters_List from "./routefilterslist";
import RouteFilterRules_Delete from "./routefilterrulesdelete";
import RouteFilterRules_Get from "./routefilterrulesget";
import RouteFilterRules_CreateOrUpdate from "./routefilterrulescreateorupdate";
import RouteFilterRules_ListByRouteFilter from "./routefilterruleslistbyroutefilter";
import RouteTables_Delete from "./routetablesdelete";
import RouteTables_Get from "./routetablesget";
import RouteTables_CreateOrUpdate from "./routetablescreateorupdate";
import RouteTables_UpdateTags from "./routetablesupdatetags";
import RouteTables_List from "./routetableslist";
import RouteTables_ListAll from "./routetableslistall";
import Routes_Delete from "./routesdelete";
import Routes_Get from "./routesget";
import Routes_CreateOrUpdate from "./routescreateorupdate";
import Routes_List from "./routeslist";
import SecurityPartnerProviders_Delete from "./securitypartnerprovidersdelete";
import SecurityPartnerProviders_Get from "./securitypartnerprovidersget";
import SecurityPartnerProviders_CreateOrUpdate from "./securitypartnerproviderscreateorupdate";
import SecurityPartnerProviders_UpdateTags from "./securitypartnerprovidersupdatetags";
import SecurityPartnerProviders_ListByResourceGroup from "./securitypartnerproviderslistbyresourcegroup";
import SecurityPartnerProviders_List from "./securitypartnerproviderslist";
import BgpServiceCommunities_List from "./bgpservicecommunitieslist";
import ServiceEndpointPolicies_Delete from "./serviceendpointpoliciesdelete";
import ServiceEndpointPolicies_Get from "./serviceendpointpoliciesget";
import ServiceEndpointPolicies_CreateOrUpdate from "./serviceendpointpoliciescreateorupdate";
import ServiceEndpointPolicies_UpdateTags from "./serviceendpointpoliciesupdatetags";
import ServiceEndpointPolicies_List from "./serviceendpointpolicieslist";
import ServiceEndpointPolicies_ListByResourceGroup from "./serviceendpointpolicieslistbyresourcegroup";
import ServiceEndpointPolicyDefinitions_Delete from "./serviceendpointpolicydefinitionsdelete";
import ServiceEndpointPolicyDefinitions_Get from "./serviceendpointpolicydefinitionsget";
import ServiceEndpointPolicyDefinitions_CreateOrUpdate from "./serviceendpointpolicydefinitionscreateorupdate";
import ServiceEndpointPolicyDefinitions_ListByResourceGroup from "./serviceendpointpolicydefinitionslistbyresourcegroup";
import ServiceTags_List from "./servicetagslist";
import ServiceTagInformation_List from "./servicetaginformationlist";
import Usages_List from "./usageslist";
import VirtualNetworks_Delete from "./virtualnetworksdelete";
import VirtualNetworks_Get from "./virtualnetworksget";
import VirtualNetworks_CreateOrUpdate from "./virtualnetworkscreateorupdate";
import VirtualNetworks_UpdateTags from "./virtualnetworksupdatetags";
import VirtualNetworks_ListAll from "./virtualnetworkslistall";
import VirtualNetworks_List from "./virtualnetworkslist";
import Subnets_Delete from "./subnetsdelete";
import Subnets_Get from "./subnetsget";
import Subnets_CreateOrUpdate from "./subnetscreateorupdate";
import Subnets_PrepareNetworkPolicies from "./subnetspreparenetworkpolicies";
import Subnets_UnprepareNetworkPolicies from "./subnetsunpreparenetworkpolicies";
import ResourceNavigationLinks_List from "./resourcenavigationlinkslist";
import ServiceAssociationLinks_List from "./serviceassociationlinkslist";
import Subnets_List from "./subnetslist";
import VirtualNetworkPeerings_Delete from "./virtualnetworkpeeringsdelete";
import VirtualNetworkPeerings_Get from "./virtualnetworkpeeringsget";
import VirtualNetworkPeerings_CreateOrUpdate from "./virtualnetworkpeeringscreateorupdate";
import VirtualNetworkPeerings_List from "./virtualnetworkpeeringslist";
import VirtualNetworks_CheckIPAddressAvailability from "./virtualnetworkscheckipaddressavailability";
import VirtualNetworks_ListUsage from "./virtualnetworkslistusage";
import VirtualNetworks_ListDdosProtectionStatus from "./virtualnetworkslistddosprotectionstatus";
import VirtualNetworkGateways_CreateOrUpdate from "./virtualnetworkgatewayscreateorupdate";
import VirtualNetworkGateways_Get from "./virtualnetworkgatewaysget";
import VirtualNetworkGateways_Delete from "./virtualnetworkgatewaysdelete";
import VirtualNetworkGateways_UpdateTags from "./virtualnetworkgatewaysupdatetags";
import VirtualNetworkGateways_List from "./virtualnetworkgatewayslist";
import VirtualNetworkGateways_ListConnections from "./virtualnetworkgatewayslistconnections";
import VirtualNetworkGateways_Reset from "./virtualnetworkgatewaysreset";
import VirtualNetworkGateways_ResetVpnClientSharedKey from "./virtualnetworkgatewaysresetvpnclientsharedkey";
import VirtualNetworkGateways_Generatevpnclientpackage from "./virtualnetworkgatewaysgeneratevpnclientpackage";
import VirtualNetworkGateways_GenerateVpnProfile from "./virtualnetworkgatewaysgeneratevpnprofile";
import VirtualNetworkGateways_GetVpnProfilePackageUrl from "./virtualnetworkgatewaysgetvpnprofilepackageurl";
import VirtualNetworkGateways_GetBgpPeerStatus from "./virtualnetworkgatewaysgetbgppeerstatus";
import VirtualNetworkGateways_SupportedVpnDevices from "./virtualnetworkgatewayssupportedvpndevices";
import VirtualNetworkGateways_ListRadiusSecrets from "./virtualnetworkgatewayslistradiussecrets";
import VirtualNetworkGateways_GetLearnedRoutes from "./virtualnetworkgatewaysgetlearnedroutes";
import VirtualNetworkGateways_GetAdvertisedRoutes from "./virtualnetworkgatewaysgetadvertisedroutes";
import VirtualNetworkGateways_GetResiliencyInformation from "./virtualnetworkgatewaysgetresiliencyinformation";
import VirtualNetworkGateways_GetRoutesInformation from "./virtualnetworkgatewaysgetroutesinformation";
import VirtualNetworkGateways_SetVpnclientIpsecParameters from "./virtualnetworkgatewayssetvpnclientipsecparameters";
import VirtualNetworkGateways_GetVpnclientIpsecParameters from "./virtualnetworkgatewaysgetvpnclientipsecparameters";
import VirtualNetworkGateways_VpnDeviceConfigurationScript from "./virtualnetworkgatewaysvpndeviceconfigurationscript";
import VirtualNetworkGateways_StartPacketCapture from "./virtualnetworkgatewaysstartpacketcapture";
import VirtualNetworkGateways_StopPacketCapture from "./virtualnetworkgatewaysstoppacketcapture";
import VirtualNetworkGateways_GetFailoverAllTestDetails from "./virtualnetworkgatewaysgetfailoveralltestdetails";
import VirtualNetworkGateways_GetFailoverSingleTestDetails from "./virtualnetworkgatewaysgetfailoversingletestdetails";
import VirtualNetworkGateways_StartExpressRouteSiteFailoverSimulation from "./virtualnetworkgatewaysstartexpressroutesitefailoversimulation";
import VirtualNetworkGateways_StopExpressRouteSiteFailoverSimulation from "./virtualnetworkgatewaysstopexpressroutesitefailoversimulation";
import VirtualNetworkGatewayConnections_CreateOrUpdate from "./virtualnetworkgatewayconnectionscreateorupdate";
import VirtualNetworkGatewayConnections_Get from "./virtualnetworkgatewayconnectionsget";
import VirtualNetworkGatewayConnections_Delete from "./virtualnetworkgatewayconnectionsdelete";
import VirtualNetworkGatewayConnections_UpdateTags from "./virtualnetworkgatewayconnectionsupdatetags";
import VirtualNetworkGatewayConnections_SetSharedKey from "./virtualnetworkgatewayconnectionssetsharedkey";
import VirtualNetworkGatewayConnections_GetSharedKey from "./virtualnetworkgatewayconnectionsgetsharedkey";
import VirtualNetworkGatewayConnections_List from "./virtualnetworkgatewayconnectionslist";
import VirtualNetworkGatewayConnections_ResetSharedKey from "./virtualnetworkgatewayconnectionsresetsharedkey";
import VirtualNetworkGatewayConnections_StartPacketCapture from "./virtualnetworkgatewayconnectionsstartpacketcapture";
import VirtualNetworkGatewayConnections_StopPacketCapture from "./virtualnetworkgatewayconnectionsstoppacketcapture";
import VirtualNetworkGatewayConnections_GetIkeSas from "./virtualnetworkgatewayconnectionsgetikesas";
import VirtualNetworkGatewayConnections_ResetConnection from "./virtualnetworkgatewayconnectionsresetconnection";
import LocalNetworkGateways_CreateOrUpdate from "./localnetworkgatewayscreateorupdate";
import LocalNetworkGateways_Get from "./localnetworkgatewaysget";
import LocalNetworkGateways_Delete from "./localnetworkgatewaysdelete";
import LocalNetworkGateways_UpdateTags from "./localnetworkgatewaysupdatetags";
import LocalNetworkGateways_List from "./localnetworkgatewayslist";
import VirtualNetworkGateways_GetVpnclientConnectionHealth from "./virtualnetworkgatewaysgetvpnclientconnectionhealth";
import VirtualNetworkGateways_DisconnectVirtualNetworkGatewayVpnConnections from "./virtualnetworkgatewaysdisconnectvirtualnetworkgatewayvpnconnections";
import VirtualNetworkGatewayNatRules_Get from "./virtualnetworkgatewaynatrulesget";
import VirtualNetworkGatewayNatRules_CreateOrUpdate from "./virtualnetworkgatewaynatrulescreateorupdate";
import VirtualNetworkGatewayNatRules_Delete from "./virtualnetworkgatewaynatrulesdelete";
import VirtualNetworkGatewayNatRules_ListByVirtualNetworkGateway from "./virtualnetworkgatewaynatruleslistbyvirtualnetworkgateway";
import VirtualNetworkGateways_InvokePrepareMigration from "./virtualnetworkgatewaysinvokepreparemigration";
import VirtualNetworkGateways_InvokeExecuteMigration from "./virtualnetworkgatewaysinvokeexecutemigration";
import VirtualNetworkGateways_InvokeCommitMigration from "./virtualnetworkgatewaysinvokecommitmigration";
import VirtualNetworkGateways_InvokeAbortMigration from "./virtualnetworkgatewaysinvokeabortmigration";
import VirtualNetworkTaps_Delete from "./virtualnetworktapsdelete";
import VirtualNetworkTaps_Get from "./virtualnetworktapsget";
import VirtualNetworkTaps_CreateOrUpdate from "./virtualnetworktapscreateorupdate";
import VirtualNetworkTaps_UpdateTags from "./virtualnetworktapsupdatetags";
import VirtualNetworkTaps_ListAll from "./virtualnetworktapslistall";
import VirtualNetworkTaps_ListByResourceGroup from "./virtualnetworktapslistbyresourcegroup";
import VirtualRouters_Delete from "./virtualroutersdelete";
import VirtualRouters_Get from "./virtualroutersget";
import VirtualRouters_CreateOrUpdate from "./virtualrouterscreateorupdate";
import VirtualRouters_ListByResourceGroup from "./virtualrouterslistbyresourcegroup";
import VirtualRouters_List from "./virtualrouterslist";
import VirtualRouterPeerings_Delete from "./virtualrouterpeeringsdelete";
import VirtualRouterPeerings_Get from "./virtualrouterpeeringsget";
import VirtualRouterPeerings_CreateOrUpdate from "./virtualrouterpeeringscreateorupdate";
import VirtualRouterPeerings_List from "./virtualrouterpeeringslist";
import VirtualWans_Get from "./virtualwansget";
import VirtualWans_CreateOrUpdate from "./virtualwanscreateorupdate";
import VirtualWans_UpdateTags from "./virtualwansupdatetags";
import VirtualWans_Delete from "./virtualwansdelete";
import VirtualWans_ListByResourceGroup from "./virtualwanslistbyresourcegroup";
import VirtualWans_List from "./virtualwanslist";
import VpnSites_Get from "./vpnsitesget";
import VpnSites_CreateOrUpdate from "./vpnsitescreateorupdate";
import VpnSites_UpdateTags from "./vpnsitesupdatetags";
import VpnSites_Delete from "./vpnsitesdelete";
import VpnSites_ListByResourceGroup from "./vpnsiteslistbyresourcegroup";
import VpnSiteLinks_Get from "./vpnsitelinksget";
import VpnSiteLinks_ListByVpnSite from "./vpnsitelinkslistbyvpnsite";
import VpnSites_List from "./vpnsiteslist";
import VpnSitesConfiguration_Download from "./vpnsitesconfigurationdownload";
import SupportedSecurityProviders from "./supportedsecurityproviders";
import VpnServerConfigurations_Get from "./vpnserverconfigurationsget";
import VpnServerConfigurations_CreateOrUpdate from "./vpnserverconfigurationscreateorupdate";
import VpnServerConfigurations_UpdateTags from "./vpnserverconfigurationsupdatetags";
import VpnServerConfigurations_Delete from "./vpnserverconfigurationsdelete";
import VpnServerConfigurations_ListByResourceGroup from "./vpnserverconfigurationslistbyresourcegroup";
import ConfigurationPolicyGroups_CreateOrUpdate from "./configurationpolicygroupscreateorupdate";
import ConfigurationPolicyGroups_Delete from "./configurationpolicygroupsdelete";
import ConfigurationPolicyGroups_Get from "./configurationpolicygroupsget";
import configurationPolicyGroups_ListByVpnServerConfiguration from "./configurationpolicygroupslistbyvpnserverconfiguration";
import VpnServerConfigurations_List from "./vpnserverconfigurationslist";
import vpnServerConfigurations_ListRadiusSecrets from "./vpnserverconfigurationslistradiussecrets";
import VirtualHubs_Get from "./virtualhubsget";
import VirtualHubs_CreateOrUpdate from "./virtualhubscreateorupdate";
import VirtualHubs_UpdateTags from "./virtualhubsupdatetags";
import VirtualHubs_Delete from "./virtualhubsdelete";
import VirtualHubs_ListByResourceGroup from "./virtualhubslistbyresourcegroup";
import VirtualHubs_List from "./virtualhubslist";
import RouteMaps_Get from "./routemapsget";
import RouteMaps_CreateOrUpdate from "./routemapscreateorupdate";
import RouteMaps_Delete from "./routemapsdelete";
import RouteMaps_List from "./routemapslist";
import HubVirtualNetworkConnections_CreateOrUpdate from "./hubvirtualnetworkconnectionscreateorupdate";
import HubVirtualNetworkConnections_Delete from "./hubvirtualnetworkconnectionsdelete";
import HubVirtualNetworkConnections_Get from "./hubvirtualnetworkconnectionsget";
import HubVirtualNetworkConnections_List from "./hubvirtualnetworkconnectionslist";
import VpnGateways_Get from "./vpngatewaysget";
import VpnGateways_CreateOrUpdate from "./vpngatewayscreateorupdate";
import VpnGateways_UpdateTags from "./vpngatewaysupdatetags";
import VpnGateways_Delete from "./vpngatewaysdelete";
import VpnGateways_Reset from "./vpngatewaysreset";
import VpnGateways_StartPacketCapture from "./vpngatewaysstartpacketcapture";
import VpnGateways_StopPacketCapture from "./vpngatewaysstoppacketcapture";
import VpnLinkConnections_ResetConnection from "./vpnlinkconnectionsresetconnection";
import VpnLinkConnections_GetAllSharedKeys from "./vpnlinkconnectionsgetallsharedkeys";
import VpnLinkConnections_GetDefaultSharedKey from "./vpnlinkconnectionsgetdefaultsharedkey";
import VpnLinkConnections_SetOrInitDefaultSharedKey from "./vpnlinkconnectionssetorinitdefaultsharedkey";
import VpnLinkConnections_ListDefaultSharedKey from "./vpnlinkconnectionslistdefaultsharedkey";
import VpnGateways_ListByResourceGroup from "./vpngatewayslistbyresourcegroup";
import VpnGateways_List from "./vpngatewayslist";
import VpnConnections_Get from "./vpnconnectionsget";
import VpnConnections_CreateOrUpdate from "./vpnconnectionscreateorupdate";
import VpnConnections_Delete from "./vpnconnectionsdelete";
import VpnSiteLinkConnections_Get from "./vpnsitelinkconnectionsget";
import VpnLinkConnections_GetIkeSas from "./vpnlinkconnectionsgetikesas";
import VpnConnections_StartPacketCapture from "./vpnconnectionsstartpacketcapture";
import VpnConnections_StopPacketCapture from "./vpnconnectionsstoppacketcapture";
import VpnConnections_ListByVpnGateway from "./vpnconnectionslistbyvpngateway";
import VpnLinkConnections_ListByVpnConnection from "./vpnlinkconnectionslistbyvpnconnection";
import NatRules_Get from "./natrulesget";
import NatRules_CreateOrUpdate from "./natrulescreateorupdate";
import NatRules_Delete from "./natrulesdelete";
import NatRules_ListByVpnGateway from "./natruleslistbyvpngateway";
import P2sVpnGateways_Get from "./p2svpngatewaysget";
import P2sVpnGateways_CreateOrUpdate from "./p2svpngatewayscreateorupdate";
import P2sVpnGateways_UpdateTags from "./p2svpngatewaysupdatetags";
import P2sVpnGateways_Delete from "./p2svpngatewaysdelete";
import P2sVpnGateways_ListByResourceGroup from "./p2svpngatewayslistbyresourcegroup";
import P2sVpnGateways_List from "./p2svpngatewayslist";
import P2SVpnGateways_Reset from "./p2svpngatewaysreset";
import P2sVpnGateways_GenerateVpnProfile from "./p2svpngatewaysgeneratevpnprofile";
import P2sVpnGateways_GetP2sVpnConnectionHealth from "./p2svpngatewaysgetp2svpnconnectionhealth";
import P2sVpnGateways_GetP2sVpnConnectionHealthDetailed from "./p2svpngatewaysgetp2svpnconnectionhealthdetailed";
import VpnServerConfigurationsAssociatedWithVirtualWan_List from "./vpnserverconfigurationsassociatedwithvirtualwanlist";
import generatevirtualwanvpnserverconfigurationvpnprofile from "./generatevirtualwanvpnserverconfigurationvpnprofile";
import VirtualHubRouteTableV2s_Get from "./virtualhubroutetablev2sget";
import VirtualHubRouteTableV2s_CreateOrUpdate from "./virtualhubroutetablev2screateorupdate";
import VirtualHubRouteTableV2s_Delete from "./virtualhubroutetablev2sdelete";
import VirtualHubRouteTableV2s_List from "./virtualhubroutetablev2slist";
import P2sVpnGateways_DisconnectP2sVpnConnections from "./p2svpngatewaysdisconnectp2svpnconnections";
import ExpressRouteGateways_ListBySubscription from "./expressroutegatewayslistbysubscription";
import ExpressRouteGateways_ListByResourceGroup from "./expressroutegatewayslistbyresourcegroup";
import ExpressRouteGateways_CreateOrUpdate from "./expressroutegatewayscreateorupdate";
import ExpressRouteGateways_UpdateTags from "./expressroutegatewaysupdatetags";
import ExpressRouteGateways_Get from "./expressroutegatewaysget";
import ExpressRouteGateways_Delete from "./expressroutegatewaysdelete";
import ExpressRouteConnections_CreateOrUpdate from "./expressrouteconnectionscreateorupdate";
import ExpressRouteConnections_Get from "./expressrouteconnectionsget";
import ExpressRouteConnections_Delete from "./expressrouteconnectionsdelete";
import ExpressRouteConnections_List from "./expressrouteconnectionslist";
import NetworkVirtualApplianceConnections_CreateOrUpdate from "./networkvirtualapplianceconnectionscreateorupdate";
import NetworkVirtualApplianceConnections_Get from "./networkvirtualapplianceconnectionsget";
import NetworkVirtualApplianceConnections_Delete from "./networkvirtualapplianceconnectionsdelete";
import NetworkVirtualApplianceConnections_List from "./networkvirtualapplianceconnectionslist";
import VirtualHubBgpConnection_Get from "./virtualhubbgpconnectionget";
import VirtualHubBgpConnection_CreateOrUpdate from "./virtualhubbgpconnectioncreateorupdate";
import VirtualHubBgpConnection_Delete from "./virtualhubbgpconnectiondelete";
import VirtualHubBgpConnections_List from "./virtualhubbgpconnectionslist";
import VirtualHubBgpConnections_ListLearnedRoutes from "./virtualhubbgpconnectionslistlearnedroutes";
import VirtualHubBgpConnections_ListAdvertisedRoutes from "./virtualhubbgpconnectionslistadvertisedroutes";
import VirtualHubIpConfiguration_Get from "./virtualhubipconfigurationget";
import VirtualHubIpConfiguration_CreateOrUpdate from "./virtualhubipconfigurationcreateorupdate";
import VirtualHubIpConfiguration_Delete from "./virtualhubipconfigurationdelete";
import VirtualHubIpConfiguration_List from "./virtualhubipconfigurationlist";
import HubRouteTables_CreateOrUpdate from "./hubroutetablescreateorupdate";
import HubRouteTables_Get from "./hubroutetablesget";
import HubRouteTables_Delete from "./hubroutetablesdelete";
import HubRouteTables_List from "./hubroutetableslist";
import VirtualHubs_GetEffectiveVirtualHubRoutes from "./virtualhubsgeteffectivevirtualhubroutes";
import VirtualHubs_GetInboundRoutes from "./virtualhubsgetinboundroutes";
import VirtualHubs_GetOutboundRoutes from "./virtualhubsgetoutboundroutes";
import RoutingIntent_CreateOrUpdate from "./routingintentcreateorupdate";
import RoutingIntent_Get from "./routingintentget";
import RoutingIntent_Delete from "./routingintentdelete";
import RoutingIntent_List from "./routingintentlist";
import NetworkInterfaces_ListVirtualMachineScaleSetVMNetworkInterfaces from "./networkinterfaceslistvirtualmachinescalesetvmnetworkinterfaces";
import NetworkInterfaces_ListVirtualMachineScaleSetNetworkInterfaces from "./networkinterfaceslistvirtualmachinescalesetnetworkinterfaces";
import NetworkInterfaces_GetVirtualMachineScaleSetNetworkInterface from "./networkinterfacesgetvirtualmachinescalesetnetworkinterface";
import NetworkInterfaces_ListVirtualMachineScaleSetIpConfigurations from "./networkinterfaceslistvirtualmachinescalesetipconfigurations";
import NetworkInterfaces_GetVirtualMachineScaleSetIpConfiguration from "./networkinterfacesgetvirtualmachinescalesetipconfiguration";
import PublicIPAddresses_ListVirtualMachineScaleSetPublicIPAddresses from "./publicipaddresseslistvirtualmachinescalesetpublicipaddresses";
import PublicIPAddresses_ListVirtualMachineScaleSetVMPublicIPAddresses from "./publicipaddresseslistvirtualmachinescalesetvmpublicipaddresses";
import PublicIPAddresses_GetVirtualMachineScaleSetPublicIPAddress from "./publicipaddressesgetvirtualmachinescalesetpublicipaddress";
import WebApplicationFirewallPolicies_List from "./webapplicationfirewallpolicieslist";
import WebApplicationFirewallPolicies_ListAll from "./webapplicationfirewallpolicieslistall";
import WebApplicationFirewallPolicies_Get from "./webapplicationfirewallpoliciesget";
import WebApplicationFirewallPolicies_CreateOrUpdate from "./webapplicationfirewallpoliciescreateorupdate";
import WebApplicationFirewallPolicies_Delete from "./webapplicationfirewallpoliciesdelete";

export const blocks = {
  ApplicationGateways_Delete,
  ApplicationGateways_Get,
  ApplicationGateways_CreateOrUpdate,
  ApplicationGateways_UpdateTags,
  ApplicationGateways_List,
  ApplicationGateways_ListAll,
  ApplicationGateways_Start,
  ApplicationGateways_Stop,
  ApplicationGateways_BackendHealth,
  ApplicationGateways_BackendHealthOnDemand,
  ApplicationGatewayPrivateLinkResources_List,
  ApplicationGatewayPrivateEndpointConnections_Delete,
  ApplicationGatewayPrivateEndpointConnections_Update,
  ApplicationGatewayPrivateEndpointConnections_Get,
  ApplicationGatewayPrivateEndpointConnections_List,
  ApplicationGateways_ListAvailableServerVariables,
  ApplicationGateways_ListAvailableRequestHeaders,
  ApplicationGateways_ListAvailableResponseHeaders,
  ApplicationGateways_ListAvailableWafRuleSets,
  ApplicationGateways_ListAvailableSslOptions,
  ApplicationGateways_ListAvailableSslPredefinedPolicies,
  ApplicationGateways_GetSslPredefinedPolicy,
  ApplicationGatewayWafDynamicManifestsDefault_Get,
  ApplicationGatewayWafDynamicManifests_Get,
  ApplicationSecurityGroups_Delete,
  ApplicationSecurityGroups_Get,
  ApplicationSecurityGroups_CreateOrUpdate,
  ApplicationSecurityGroups_UpdateTags,
  ApplicationSecurityGroups_ListAll,
  ApplicationSecurityGroups_List,
  AvailableDelegations_List,
  AvailableResourceGroupDelegations_List,
  AvailableServiceAliases_List,
  AvailableServiceAliases_ListByResourceGroup,
  AzureFirewalls_Delete,
  AzureFirewalls_Get,
  AzureFirewalls_CreateOrUpdate,
  AzureFirewalls_UpdateTags,
  AzureFirewalls_List,
  AzureFirewalls_ListAll,
  AzureFirewalls_ListLearnedPrefixes,
  AzureFirewalls_PacketCapture,
  AzureFirewalls_PacketCaptureOperation,
  AzureFirewallFqdnTags_ListAll,
  WebCategories_Get,
  WebCategories_ListBySubscription,
  BastionHosts_Delete,
  BastionHosts_Get,
  BastionHosts_CreateOrUpdate,
  BastionHosts_UpdateTags,
  BastionHosts_List,
  BastionHosts_ListByResourceGroup,
  PutBastionShareableLink,
  DeleteBastionShareableLink,
  DeleteBastionShareableLinkByToken,
  GetBastionShareableLink,
  GetActiveSessions,
  DisconnectActiveSessions,
  CheckDnsNameAvailability,
  NetworkInterfaces_ListCloudServiceRoleInstanceNetworkInterfaces,
  NetworkInterfaces_ListCloudServiceNetworkInterfaces,
  NetworkInterfaces_GetCloudServiceNetworkInterface,
  PublicIPAddresses_ListCloudServicePublicIPAddresses,
  PublicIPAddresses_ListCloudServiceRoleInstancePublicIPAddresses,
  PublicIPAddresses_GetCloudServicePublicIPAddress,
  VipSwap_Get,
  VipSwap_Create,
  VipSwap_List,
  CustomIPPrefixes_Delete,
  CustomIPPrefixes_Get,
  CustomIPPrefixes_CreateOrUpdate,
  CustomIPPrefixes_UpdateTags,
  CustomIPPrefixes_ListAll,
  CustomIPPrefixes_List,
  DdosCustomPolicies_Delete,
  DdosCustomPolicies_Get,
  DdosCustomPolicies_CreateOrUpdate,
  DdosCustomPolicies_UpdateTags,
  DdosProtectionPlans_Delete,
  DdosProtectionPlans_Get,
  DdosProtectionPlans_CreateOrUpdate,
  DdosProtectionPlans_UpdateTags,
  DdosProtectionPlans_List,
  DdosProtectionPlans_ListByResourceGroup,
  DscpConfiguration_CreateOrUpdate,
  DscpConfiguration_Delete,
  DscpConfiguration_Get,
  DscpConfiguration_List,
  DscpConfiguration_ListAll,
  AvailableEndpointServices_List,
  ExpressRouteCircuitAuthorizations_Delete,
  ExpressRouteCircuitAuthorizations_Get,
  ExpressRouteCircuitAuthorizations_CreateOrUpdate,
  ExpressRouteCircuitAuthorizations_List,
  ExpressRouteCircuitPeerings_Delete,
  ExpressRouteCircuitPeerings_Get,
  ExpressRouteCircuitPeerings_CreateOrUpdate,
  ExpressRouteCircuitPeerings_List,
  ExpressRouteCircuitConnections_Delete,
  ExpressRouteCircuitConnections_Get,
  ExpressRouteCircuitConnections_CreateOrUpdate,
  ExpressRouteCircuitConnections_List,
  PeerExpressRouteCircuitConnections_Get,
  PeerExpressRouteCircuitConnections_List,
  ExpressRouteCircuits_Delete,
  ExpressRouteCircuits_Get,
  ExpressRouteCircuits_CreateOrUpdate,
  ExpressRouteCircuits_UpdateTags,
  ExpressRouteCircuits_ListArpTable,
  ExpressRouteCircuits_ListRoutesTable,
  ExpressRouteCircuits_ListRoutesTableSummary,
  ExpressRouteCircuits_GetStats,
  ExpressRouteCircuits_GetPeeringStats,
  ExpressRouteCircuits_List,
  ExpressRouteCircuits_ListAll,
  ExpressRouteServiceProviders_List,
  ExpressRouteCrossConnections_List,
  ExpressRouteCrossConnections_ListByResourceGroup,
  ExpressRouteCrossConnections_Get,
  ExpressRouteCrossConnections_CreateOrUpdate,
  ExpressRouteCrossConnections_UpdateTags,
  ExpressRouteCrossConnectionPeerings_List,
  ExpressRouteCrossConnectionPeerings_Delete,
  ExpressRouteCrossConnectionPeerings_Get,
  ExpressRouteCrossConnectionPeerings_CreateOrUpdate,
  ExpressRouteCrossConnections_ListArpTable,
  ExpressRouteCrossConnections_ListRoutesTableSummary,
  ExpressRouteCrossConnections_ListRoutesTable,
  ExpressRoutePortsLocations_List,
  ExpressRoutePortsLocations_Get,
  ExpressRoutePorts_Delete,
  ExpressRoutePorts_Get,
  ExpressRoutePorts_CreateOrUpdate,
  ExpressRoutePorts_UpdateTags,
  ExpressRoutePorts_ListByResourceGroup,
  ExpressRoutePorts_List,
  ExpressRouteLinks_Get,
  ExpressRouteLinks_List,
  ExpressRoutePorts_GenerateLOA,
  ExpressRoutePortAuthorizations_Delete,
  ExpressRoutePortAuthorizations_Get,
  ExpressRoutePortAuthorizations_CreateOrUpdate,
  ExpressRoutePortAuthorizations_List,
  ExpressRouteProviderPortsLocation_List,
  ExpressRouteProviderPort,
  FirewallPolicies_Delete,
  FirewallPolicies_Get,
  FirewallPolicies_CreateOrUpdate,
  FirewallPolicies_UpdateTags,
  FirewallPolicies_List,
  FirewallPolicies_ListAll,
  FirewallPolicyRuleCollectionGroups_Delete,
  FirewallPolicyRuleCollectionGroups_Get,
  FirewallPolicyRuleCollectionGroups_CreateOrUpdate,
  FirewallPolicyRuleCollectionGroups_List,
  FirewallPolicyIdpsSignatures_List,
  FirewallPolicyIdpsSignaturesOverrides_Patch,
  FirewallPolicyIdpsSignaturesOverrides_Put,
  FirewallPolicyIdpsSignaturesOverrides_Get,
  FirewallPolicyIdpsSignaturesFilterValues_List,
  FirewallPolicyIdpsSignaturesOverrides_List,
  FirewallPolicyDrafts_CreateOrUpdate,
  FirewallPolicyDrafts_Delete,
  FirewallPolicyDrafts_Get,
  FirewallPolicyDeployments_Deploy,
  FirewallPolicyRuleCollectionGroupDrafts_Delete,
  FirewallPolicyRuleCollectionGroupDrafts_CreateOrUpdate,
  FirewallPolicyRuleCollectionGroupDrafts_Get,
  IpamPools_List,
  IpamPools_Create,
  IpamPools_Update,
  IpamPools_Get,
  IpamPools_Delete,
  IpamPools_GetPoolUsage,
  IpamPools_ListAssociatedResources,
  StaticCidrs_List,
  StaticCidrs_Create,
  StaticCidrs_Get,
  StaticCidrs_Delete,
  IpAllocations_Delete,
  IpAllocations_Get,
  IpAllocations_CreateOrUpdate,
  IpAllocations_UpdateTags,
  IpAllocations_List,
  IpAllocations_ListByResourceGroup,
  IpGroups_Get,
  IpGroups_CreateOrUpdate,
  IpGroups_UpdateGroups,
  IpGroups_Delete,
  IpGroups_ListByResourceGroup,
  IpGroups_List,
  LoadBalancers_Delete,
  LoadBalancers_Get,
  LoadBalancers_CreateOrUpdate,
  LoadBalancers_UpdateTags,
  LoadBalancers_ListAll,
  LoadBalancers_List,
  LoadBalancerBackendAddressPools_List,
  LoadBalancerBackendAddressPools_Get,
  LoadBalancerBackendAddressPools_CreateOrUpdate,
  LoadBalancerBackendAddressPools_Delete,
  LoadBalancerFrontendIPConfigurations_List,
  LoadBalancerFrontendIPConfigurations_Get,
  InboundNatRules_List,
  InboundNatRules_Delete,
  InboundNatRules_Get,
  InboundNatRules_CreateOrUpdate,
  LoadBalancerLoadBalancingRules_List,
  LoadBalancerLoadBalancingRules_Get,
  LoadBalancerOutboundRules_List,
  LoadBalancerOutboundRules_Get,
  LoadBalancerNetworkInterfaces_List,
  LoadBalancerProbes_List,
  LoadBalancers_SwapPublicIpAddresses,
  LoadBalancers_ListInboundNatRulePortMappings,
  LoadBalancerLoadBalancingRules_Health,
  LoadBalancerProbes_Get,
  LoadBalancers_MigrateToIpBased,
  NatGateways_Delete,
  NatGateways_Get,
  NatGateways_CreateOrUpdate,
  NatGateways_UpdateTags,
  NatGateways_ListAll,
  NatGateways_List,
  NetworkInterfaces_Delete,
  NetworkInterfaces_Get,
  NetworkInterfaces_CreateOrUpdate,
  NetworkInterfaces_UpdateTags,
  NetworkInterfaces_ListAll,
  NetworkInterfaces_List,
  NetworkInterfaces_GetEffectiveRouteTable,
  NetworkInterfaces_ListEffectiveNetworkSecurityGroups,
  NetworkInterfaceIPConfigurations_List,
  NetworkInterfaceIPConfigurations_Get,
  NetworkInterfaceLoadBalancers_List,
  NetworkInterfaceTapConfigurations_Delete,
  NetworkInterfaceTapConfigurations_Get,
  NetworkInterfaceTapConfigurations_CreateOrUpdate,
  NetworkInterfaceTapConfigurations_List,
  NetworkManagers_Get,
  NetworkManagers_CreateOrUpdate,
  NetworkManagers_Delete,
  NetworkManagers_Patch,
  NetworkManagerCommits_Post,
  NetworkManagerDeploymentStatus_List,
  NetworkManagers_ListBySubscription,
  NetworkManagers_List,
  ListActiveConnectivityConfigurations,
  ListActiveSecurityAdminRules,
  SubscriptionNetworkManagerConnections_CreateOrUpdate,
  SubscriptionNetworkManagerConnections_Get,
  SubscriptionNetworkManagerConnections_Delete,
  SubscriptionNetworkManagerConnections_List,
  ManagementGroupNetworkManagerConnections_CreateOrUpdate,
  ManagementGroupNetworkManagerConnections_Get,
  ManagementGroupNetworkManagerConnections_Delete,
  ManagementGroupNetworkManagerConnections_List,
  ConnectivityConfigurations_Get,
  ConnectivityConfigurations_CreateOrUpdate,
  ConnectivityConfigurations_Delete,
  ConnectivityConfigurations_List,
  ListNetworkManagerEffectiveConnectivityConfigurations,
  ListNetworkManagerEffectiveSecurityAdminRules,
  NetworkGroups_Get,
  NetworkGroups_CreateOrUpdate,
  NetworkGroups_Delete,
  NetworkGroups_List,
  StaticMembers_Get,
  StaticMembers_CreateOrUpdate,
  StaticMembers_Delete,
  StaticMembers_List,
  NetworkManagerRoutingConfigurations_List,
  NetworkManagerRoutingConfigurations_Get,
  NetworkManagerRoutingConfigurations_CreateOrUpdate,
  NetworkManagerRoutingConfigurations_Delete,
  RoutingRuleCollections_List,
  RoutingRuleCollections_Get,
  RoutingRuleCollections_CreateOrUpdate,
  RoutingRuleCollections_Delete,
  RoutingRules_List,
  RoutingRules_Get,
  RoutingRules_CreateOrUpdate,
  RoutingRules_Delete,
  ScopeConnections_CreateOrUpdate,
  ScopeConnections_Get,
  ScopeConnections_Delete,
  ScopeConnections_List,
  SecurityAdminConfigurations_List,
  SecurityAdminConfigurations_Get,
  SecurityAdminConfigurations_CreateOrUpdate,
  SecurityAdminConfigurations_Delete,
  AdminRuleCollections_List,
  AdminRuleCollections_Get,
  AdminRuleCollections_CreateOrUpdate,
  AdminRuleCollections_Delete,
  AdminRules_List,
  AdminRules_Get,
  AdminRules_CreateOrUpdate,
  AdminRules_Delete,
  SecurityUserConfigurations_List,
  SecurityUserConfigurations_Get,
  SecurityUserConfigurations_CreateOrUpdate,
  SecurityUserConfigurations_Delete,
  SecurityUserRuleCollections_List,
  SecurityUserRuleCollections_Get,
  SecurityUserRuleCollections_CreateOrUpdate,
  SecurityUserRuleCollections_Delete,
  SecurityUserRules_List,
  SecurityUserRules_Get,
  SecurityUserRules_CreateOrUpdate,
  SecurityUserRules_Delete,
  NetworkProfiles_Delete,
  NetworkProfiles_Get,
  NetworkProfiles_CreateOrUpdate,
  NetworkProfiles_UpdateTags,
  NetworkProfiles_ListAll,
  NetworkProfiles_List,
  NetworkSecurityGroups_Delete,
  NetworkSecurityGroups_Get,
  NetworkSecurityGroups_CreateOrUpdate,
  NetworkSecurityGroups_UpdateTags,
  NetworkSecurityGroups_ListAll,
  NetworkSecurityGroups_List,
  SecurityRules_Delete,
  SecurityRules_Get,
  SecurityRules_CreateOrUpdate,
  SecurityRules_List,
  DefaultSecurityRules_List,
  DefaultSecurityRules_Get,
  NetworkSecurityPerimeters_Get,
  NetworkSecurityPerimeters_CreateOrUpdate,
  NetworkSecurityPerimeters_Delete,
  NetworkSecurityPerimeters_Patch,
  NetworkSecurityPerimeters_ListBySubscription,
  NetworkSecurityPerimeters_List,
  NetworkSecurityPerimeterProfiles_Get,
  NetworkSecurityPerimeterProfiles_CreateOrUpdate,
  NetworkSecurityPerimeterProfiles_Delete,
  NetworkSecurityPerimeterProfiles_List,
  NetworkSecurityPerimeterAccessRules_Get,
  NetworkSecurityPerimeterAccessRules_CreateOrUpdate,
  NetworkSecurityPerimeterAccessRules_Delete,
  NetworkSecurityPerimeterAccessRules_List,
  NetworkSecurityPerimeterAssociations_Get,
  NetworkSecurityPerimeterAssociations_CreateOrUpdate,
  NetworkSecurityPerimeterAssociations_Delete,
  NetworkSecurityPerimeterAssociations_List,
  NetworkSecurityPerimeterAssociations_Reconcile,
  NetworkSecurityPerimeterAssociableResourceTypes_List,
  NetworkSecurityPerimeterAccessRules_Reconcile,
  NetworkSecurityPerimeterLinks_Get,
  NetworkSecurityPerimeterLinks_CreateOrUpdate,
  NetworkSecurityPerimeterLinks_Delete,
  NetworkSecurityPerimeterLinks_List,
  NetworkSecurityPerimeterLinkReferences_Get,
  NetworkSecurityPerimeterLinkReferences_Delete,
  NetworkSecurityPerimeterLinkReferences_List,
  NetworkSecurityPerimeterLoggingConfigurations_Get,
  NetworkSecurityPerimeterLoggingConfigurations_CreateOrUpdate,
  NetworkSecurityPerimeterLoggingConfigurations_Delete,
  NetworkSecurityPerimeterLoggingConfigurations_List,
  NetworkSecurityPerimeterOperationStatuses_Get,
  NetworkSecurityPerimeterServiceTags_List,
  ReachabilityAnalysisIntents_List,
  ReachabilityAnalysisIntents_Get,
  ReachabilityAnalysisIntents_Create,
  ReachabilityAnalysisIntents_Delete,
  ReachabilityAnalysisRuns_List,
  ReachabilityAnalysisRuns_Get,
  ReachabilityAnalysisRuns_Create,
  ReachabilityAnalysisRuns_Delete,
  VerifierWorkspaces_List,
  VerifierWorkspaces_Get,
  VerifierWorkspaces_Create,
  VerifierWorkspaces_Update,
  VerifierWorkspaces_Delete,
  NetworkVirtualAppliances_Delete,
  NetworkVirtualAppliances_Get,
  NetworkVirtualAppliances_UpdateTags,
  NetworkVirtualAppliances_CreateOrUpdate,
  NetworkVirtualAppliances_Restart,
  NetworkVirtualAppliances_Reimage,
  NetworkVirtualAppliances_GetBootDiagnosticLogs,
  NetworkVirtualAppliances_ListByResourceGroup,
  NetworkVirtualAppliances_List,
  VirtualApplianceSites_Delete,
  VirtualApplianceSites_Get,
  VirtualApplianceSites_CreateOrUpdate,
  VirtualApplianceSites_List,
  VirtualApplianceSkus_List,
  VirtualApplianceSkus_Get,
  InboundSecurityRule_CreateOrUpdate,
  InboundSecurityRule_Get,
  NetworkWatchers_CreateOrUpdate,
  NetworkWatchers_Get,
  NetworkWatchers_Delete,
  NetworkWatchers_UpdateTags,
  NetworkWatchers_List,
  NetworkWatchers_ListAll,
  NetworkWatchers_GetTopology,
  NetworkWatchers_VerifyIPFlow,
  NetworkWatchers_GetNextHop,
  NetworkWatchers_GetVMSecurityRules,
  PacketCaptures_Create,
  PacketCaptures_Get,
  PacketCaptures_Delete,
  PacketCaptures_Stop,
  PacketCaptures_GetStatus,
  PacketCaptures_List,
  NetworkWatchers_GetTroubleshooting,
  NetworkWatchers_GetTroubleshootingResult,
  NetworkWatchers_SetFlowLogConfiguration,
  NetworkWatchers_GetFlowLogStatus,
  NetworkWatchers_CheckConnectivity,
  NetworkWatchers_GetAzureReachabilityReport,
  NetworkWatchers_ListAvailableProviders,
  NetworkWatchers_GetNetworkConfigurationDiagnostic,
  ConnectionMonitors_CreateOrUpdate,
  ConnectionMonitors_Get,
  ConnectionMonitors_Delete,
  ConnectionMonitors_UpdateTags,
  ConnectionMonitors_Stop,
  ConnectionMonitors_List,
  FlowLogs_CreateOrUpdate,
  FlowLogs_UpdateTags,
  FlowLogs_Get,
  FlowLogs_Delete,
  FlowLogs_List,
  Operations_List,
  PrivateEndpoints_Delete,
  PrivateEndpoints_Get,
  PrivateEndpoints_CreateOrUpdate,
  PrivateEndpoints_List,
  PrivateEndpoints_ListBySubscription,
  AvailablePrivateEndpointTypes_List,
  AvailablePrivateEndpointTypes_ListByResourceGroup,
  PrivateDnsZoneGroups_Delete,
  PrivateDnsZoneGroups_Get,
  PrivateDnsZoneGroups_CreateOrUpdate,
  PrivateDnsZoneGroups_List,
  PrivateLinkServices_Delete,
  PrivateLinkServices_Get,
  PrivateLinkServices_CreateOrUpdate,
  PrivateLinkServices_List,
  PrivateLinkServices_ListBySubscription,
  PrivateLinkServices_GetPrivateEndpointConnection,
  PrivateLinkServices_UpdatePrivateEndpointConnection,
  PrivateLinkServices_DeletePrivateEndpointConnection,
  PrivateLinkServices_ListPrivateEndpointConnections,
  PrivateLinkServices_CheckPrivateLinkServiceVisibility,
  PrivateLinkServices_CheckPrivateLinkServiceVisibilityByResourceGroup,
  PrivateLinkServices_ListAutoApprovedPrivateLinkServices,
  PrivateLinkServices_ListAutoApprovedPrivateLinkServicesByResourceGroup,
  PublicIPAddresses_Delete,
  PublicIPAddresses_Get,
  PublicIPAddresses_CreateOrUpdate,
  PublicIPAddresses_UpdateTags,
  PublicIPAddresses_ListAll,
  PublicIPAddresses_List,
  PublicIPAddresses_DdosProtectionStatus,
  PublicIPPrefixes_Delete,
  PublicIPPrefixes_Get,
  PublicIPPrefixes_CreateOrUpdate,
  PublicIPPrefixes_UpdateTags,
  PublicIPPrefixes_ListAll,
  PublicIPPrefixes_List,
  RouteFilters_Delete,
  RouteFilters_Get,
  RouteFilters_CreateOrUpdate,
  RouteFilters_UpdateTags,
  RouteFilters_ListByResourceGroup,
  RouteFilters_List,
  RouteFilterRules_Delete,
  RouteFilterRules_Get,
  RouteFilterRules_CreateOrUpdate,
  RouteFilterRules_ListByRouteFilter,
  RouteTables_Delete,
  RouteTables_Get,
  RouteTables_CreateOrUpdate,
  RouteTables_UpdateTags,
  RouteTables_List,
  RouteTables_ListAll,
  Routes_Delete,
  Routes_Get,
  Routes_CreateOrUpdate,
  Routes_List,
  SecurityPartnerProviders_Delete,
  SecurityPartnerProviders_Get,
  SecurityPartnerProviders_CreateOrUpdate,
  SecurityPartnerProviders_UpdateTags,
  SecurityPartnerProviders_ListByResourceGroup,
  SecurityPartnerProviders_List,
  BgpServiceCommunities_List,
  ServiceEndpointPolicies_Delete,
  ServiceEndpointPolicies_Get,
  ServiceEndpointPolicies_CreateOrUpdate,
  ServiceEndpointPolicies_UpdateTags,
  ServiceEndpointPolicies_List,
  ServiceEndpointPolicies_ListByResourceGroup,
  ServiceEndpointPolicyDefinitions_Delete,
  ServiceEndpointPolicyDefinitions_Get,
  ServiceEndpointPolicyDefinitions_CreateOrUpdate,
  ServiceEndpointPolicyDefinitions_ListByResourceGroup,
  ServiceTags_List,
  ServiceTagInformation_List,
  Usages_List,
  VirtualNetworks_Delete,
  VirtualNetworks_Get,
  VirtualNetworks_CreateOrUpdate,
  VirtualNetworks_UpdateTags,
  VirtualNetworks_ListAll,
  VirtualNetworks_List,
  Subnets_Delete,
  Subnets_Get,
  Subnets_CreateOrUpdate,
  Subnets_PrepareNetworkPolicies,
  Subnets_UnprepareNetworkPolicies,
  ResourceNavigationLinks_List,
  ServiceAssociationLinks_List,
  Subnets_List,
  VirtualNetworkPeerings_Delete,
  VirtualNetworkPeerings_Get,
  VirtualNetworkPeerings_CreateOrUpdate,
  VirtualNetworkPeerings_List,
  VirtualNetworks_CheckIPAddressAvailability,
  VirtualNetworks_ListUsage,
  VirtualNetworks_ListDdosProtectionStatus,
  VirtualNetworkGateways_CreateOrUpdate,
  VirtualNetworkGateways_Get,
  VirtualNetworkGateways_Delete,
  VirtualNetworkGateways_UpdateTags,
  VirtualNetworkGateways_List,
  VirtualNetworkGateways_ListConnections,
  VirtualNetworkGateways_Reset,
  VirtualNetworkGateways_ResetVpnClientSharedKey,
  VirtualNetworkGateways_Generatevpnclientpackage,
  VirtualNetworkGateways_GenerateVpnProfile,
  VirtualNetworkGateways_GetVpnProfilePackageUrl,
  VirtualNetworkGateways_GetBgpPeerStatus,
  VirtualNetworkGateways_SupportedVpnDevices,
  VirtualNetworkGateways_ListRadiusSecrets,
  VirtualNetworkGateways_GetLearnedRoutes,
  VirtualNetworkGateways_GetAdvertisedRoutes,
  VirtualNetworkGateways_GetResiliencyInformation,
  VirtualNetworkGateways_GetRoutesInformation,
  VirtualNetworkGateways_SetVpnclientIpsecParameters,
  VirtualNetworkGateways_GetVpnclientIpsecParameters,
  VirtualNetworkGateways_VpnDeviceConfigurationScript,
  VirtualNetworkGateways_StartPacketCapture,
  VirtualNetworkGateways_StopPacketCapture,
  VirtualNetworkGateways_GetFailoverAllTestDetails,
  VirtualNetworkGateways_GetFailoverSingleTestDetails,
  VirtualNetworkGateways_StartExpressRouteSiteFailoverSimulation,
  VirtualNetworkGateways_StopExpressRouteSiteFailoverSimulation,
  VirtualNetworkGatewayConnections_CreateOrUpdate,
  VirtualNetworkGatewayConnections_Get,
  VirtualNetworkGatewayConnections_Delete,
  VirtualNetworkGatewayConnections_UpdateTags,
  VirtualNetworkGatewayConnections_SetSharedKey,
  VirtualNetworkGatewayConnections_GetSharedKey,
  VirtualNetworkGatewayConnections_List,
  VirtualNetworkGatewayConnections_ResetSharedKey,
  VirtualNetworkGatewayConnections_StartPacketCapture,
  VirtualNetworkGatewayConnections_StopPacketCapture,
  VirtualNetworkGatewayConnections_GetIkeSas,
  VirtualNetworkGatewayConnections_ResetConnection,
  LocalNetworkGateways_CreateOrUpdate,
  LocalNetworkGateways_Get,
  LocalNetworkGateways_Delete,
  LocalNetworkGateways_UpdateTags,
  LocalNetworkGateways_List,
  VirtualNetworkGateways_GetVpnclientConnectionHealth,
  VirtualNetworkGateways_DisconnectVirtualNetworkGatewayVpnConnections,
  VirtualNetworkGatewayNatRules_Get,
  VirtualNetworkGatewayNatRules_CreateOrUpdate,
  VirtualNetworkGatewayNatRules_Delete,
  VirtualNetworkGatewayNatRules_ListByVirtualNetworkGateway,
  VirtualNetworkGateways_InvokePrepareMigration,
  VirtualNetworkGateways_InvokeExecuteMigration,
  VirtualNetworkGateways_InvokeCommitMigration,
  VirtualNetworkGateways_InvokeAbortMigration,
  VirtualNetworkTaps_Delete,
  VirtualNetworkTaps_Get,
  VirtualNetworkTaps_CreateOrUpdate,
  VirtualNetworkTaps_UpdateTags,
  VirtualNetworkTaps_ListAll,
  VirtualNetworkTaps_ListByResourceGroup,
  VirtualRouters_Delete,
  VirtualRouters_Get,
  VirtualRouters_CreateOrUpdate,
  VirtualRouters_ListByResourceGroup,
  VirtualRouters_List,
  VirtualRouterPeerings_Delete,
  VirtualRouterPeerings_Get,
  VirtualRouterPeerings_CreateOrUpdate,
  VirtualRouterPeerings_List,
  VirtualWans_Get,
  VirtualWans_CreateOrUpdate,
  VirtualWans_UpdateTags,
  VirtualWans_Delete,
  VirtualWans_ListByResourceGroup,
  VirtualWans_List,
  VpnSites_Get,
  VpnSites_CreateOrUpdate,
  VpnSites_UpdateTags,
  VpnSites_Delete,
  VpnSites_ListByResourceGroup,
  VpnSiteLinks_Get,
  VpnSiteLinks_ListByVpnSite,
  VpnSites_List,
  VpnSitesConfiguration_Download,
  SupportedSecurityProviders,
  VpnServerConfigurations_Get,
  VpnServerConfigurations_CreateOrUpdate,
  VpnServerConfigurations_UpdateTags,
  VpnServerConfigurations_Delete,
  VpnServerConfigurations_ListByResourceGroup,
  ConfigurationPolicyGroups_CreateOrUpdate,
  ConfigurationPolicyGroups_Delete,
  ConfigurationPolicyGroups_Get,
  configurationPolicyGroups_ListByVpnServerConfiguration,
  VpnServerConfigurations_List,
  vpnServerConfigurations_ListRadiusSecrets,
  VirtualHubs_Get,
  VirtualHubs_CreateOrUpdate,
  VirtualHubs_UpdateTags,
  VirtualHubs_Delete,
  VirtualHubs_ListByResourceGroup,
  VirtualHubs_List,
  RouteMaps_Get,
  RouteMaps_CreateOrUpdate,
  RouteMaps_Delete,
  RouteMaps_List,
  HubVirtualNetworkConnections_CreateOrUpdate,
  HubVirtualNetworkConnections_Delete,
  HubVirtualNetworkConnections_Get,
  HubVirtualNetworkConnections_List,
  VpnGateways_Get,
  VpnGateways_CreateOrUpdate,
  VpnGateways_UpdateTags,
  VpnGateways_Delete,
  VpnGateways_Reset,
  VpnGateways_StartPacketCapture,
  VpnGateways_StopPacketCapture,
  VpnLinkConnections_ResetConnection,
  VpnLinkConnections_GetAllSharedKeys,
  VpnLinkConnections_GetDefaultSharedKey,
  VpnLinkConnections_SetOrInitDefaultSharedKey,
  VpnLinkConnections_ListDefaultSharedKey,
  VpnGateways_ListByResourceGroup,
  VpnGateways_List,
  VpnConnections_Get,
  VpnConnections_CreateOrUpdate,
  VpnConnections_Delete,
  VpnSiteLinkConnections_Get,
  VpnLinkConnections_GetIkeSas,
  VpnConnections_StartPacketCapture,
  VpnConnections_StopPacketCapture,
  VpnConnections_ListByVpnGateway,
  VpnLinkConnections_ListByVpnConnection,
  NatRules_Get,
  NatRules_CreateOrUpdate,
  NatRules_Delete,
  NatRules_ListByVpnGateway,
  P2sVpnGateways_Get,
  P2sVpnGateways_CreateOrUpdate,
  P2sVpnGateways_UpdateTags,
  P2sVpnGateways_Delete,
  P2sVpnGateways_ListByResourceGroup,
  P2sVpnGateways_List,
  P2SVpnGateways_Reset,
  P2sVpnGateways_GenerateVpnProfile,
  P2sVpnGateways_GetP2sVpnConnectionHealth,
  P2sVpnGateways_GetP2sVpnConnectionHealthDetailed,
  VpnServerConfigurationsAssociatedWithVirtualWan_List,
  generatevirtualwanvpnserverconfigurationvpnprofile,
  VirtualHubRouteTableV2s_Get,
  VirtualHubRouteTableV2s_CreateOrUpdate,
  VirtualHubRouteTableV2s_Delete,
  VirtualHubRouteTableV2s_List,
  P2sVpnGateways_DisconnectP2sVpnConnections,
  ExpressRouteGateways_ListBySubscription,
  ExpressRouteGateways_ListByResourceGroup,
  ExpressRouteGateways_CreateOrUpdate,
  ExpressRouteGateways_UpdateTags,
  ExpressRouteGateways_Get,
  ExpressRouteGateways_Delete,
  ExpressRouteConnections_CreateOrUpdate,
  ExpressRouteConnections_Get,
  ExpressRouteConnections_Delete,
  ExpressRouteConnections_List,
  NetworkVirtualApplianceConnections_CreateOrUpdate,
  NetworkVirtualApplianceConnections_Get,
  NetworkVirtualApplianceConnections_Delete,
  NetworkVirtualApplianceConnections_List,
  VirtualHubBgpConnection_Get,
  VirtualHubBgpConnection_CreateOrUpdate,
  VirtualHubBgpConnection_Delete,
  VirtualHubBgpConnections_List,
  VirtualHubBgpConnections_ListLearnedRoutes,
  VirtualHubBgpConnections_ListAdvertisedRoutes,
  VirtualHubIpConfiguration_Get,
  VirtualHubIpConfiguration_CreateOrUpdate,
  VirtualHubIpConfiguration_Delete,
  VirtualHubIpConfiguration_List,
  HubRouteTables_CreateOrUpdate,
  HubRouteTables_Get,
  HubRouteTables_Delete,
  HubRouteTables_List,
  VirtualHubs_GetEffectiveVirtualHubRoutes,
  VirtualHubs_GetInboundRoutes,
  VirtualHubs_GetOutboundRoutes,
  RoutingIntent_CreateOrUpdate,
  RoutingIntent_Get,
  RoutingIntent_Delete,
  RoutingIntent_List,
  NetworkInterfaces_ListVirtualMachineScaleSetVMNetworkInterfaces,
  NetworkInterfaces_ListVirtualMachineScaleSetNetworkInterfaces,
  NetworkInterfaces_GetVirtualMachineScaleSetNetworkInterface,
  NetworkInterfaces_ListVirtualMachineScaleSetIpConfigurations,
  NetworkInterfaces_GetVirtualMachineScaleSetIpConfiguration,
  PublicIPAddresses_ListVirtualMachineScaleSetPublicIPAddresses,
  PublicIPAddresses_ListVirtualMachineScaleSetVMPublicIPAddresses,
  PublicIPAddresses_GetVirtualMachineScaleSetPublicIPAddress,
  WebApplicationFirewallPolicies_List,
  WebApplicationFirewallPolicies_ListAll,
  WebApplicationFirewallPolicies_Get,
  WebApplicationFirewallPolicies_CreateOrUpdate,
  WebApplicationFirewallPolicies_Delete,
};
