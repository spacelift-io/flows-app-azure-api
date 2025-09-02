import Operations_List from "./operationslist";
import Pools_CheckNameAvailability from "./poolschecknameavailability";
import Sku_ListByLocation from "./skulistbylocation";
import SubscriptionUsages_Usages from "./subscriptionusagesusages";
import Pools_ListBySubscription from "./poolslistbysubscription";
import ImageVersions_ListByImage from "./imageversionslistbyimage";
import Pools_ListByResourceGroup from "./poolslistbyresourcegroup";
import Pools_Get from "./poolsget";
import Pools_CreateOrUpdate from "./poolscreateorupdate";
import Pools_Update from "./poolsupdate";
import Pools_Delete from "./poolsdelete";
import ResourceDetails_ListByPool from "./resourcedetailslistbypool";

export const blocks = {
  Operations_List,
  Pools_CheckNameAvailability,
  Sku_ListByLocation,
  SubscriptionUsages_Usages,
  Pools_ListBySubscription,
  ImageVersions_ListByImage,
  Pools_ListByResourceGroup,
  Pools_Get,
  Pools_CreateOrUpdate,
  Pools_Update,
  Pools_Delete,
  ResourceDetails_ListByPool,
};
