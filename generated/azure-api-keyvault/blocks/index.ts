import GetDeletedKeys from "./getdeletedkeys";
import GetDeletedKey from "./getdeletedkey";
import PurgeDeletedKey from "./purgedeletedkey";
import RecoverDeletedKey from "./recoverdeletedkey";
import GetKeys from "./getkeys";
import ImportKey from "./importkey";
import DeleteKey from "./deletekey";
import GetKey from "./getkey";
import UpdateKey from "./updatekey";
import decrypt from "./decrypt";
import encrypt from "./encrypt";
import release from "./release";
import sign from "./sign";
import unwrapKey from "./unwrapkey";
import verify from "./verify";
import wrapKey from "./wrapkey";
import BackupKey from "./backupkey";
import CreateKey from "./createkey";
import RotateKey from "./rotatekey";
import GetKeyRotationPolicy from "./getkeyrotationpolicy";
import UpdateKeyRotationPolicy from "./updatekeyrotationpolicy";
import GetKeyVersions from "./getkeyversions";
import RestoreKey from "./restorekey";
import GetRandomBytes from "./getrandombytes";
import GetDeletedSecrets from "./getdeletedsecrets";
import GetDeletedSecret from "./getdeletedsecret";
import PurgeDeletedSecret from "./purgedeletedsecret";
import RecoverDeletedSecret from "./recoverdeletedsecret";
import GetSecrets from "./getsecrets";
import SetSecret from "./setsecret";
import DeleteSecret from "./deletesecret";
import GetSecret from "./getsecret";
import UpdateSecret from "./updatesecret";
import BackupSecret from "./backupsecret";
import GetSecretVersions from "./getsecretversions";
import RestoreSecret from "./restoresecret";
import GetCertificates from "./getcertificates";
import DeleteCertificate from "./deletecertificate";
import GetCertificate from "./getcertificate";
import UpdateCertificate from "./updatecertificate";
import BackupCertificate from "./backupcertificate";
import CreateCertificate from "./createcertificate";
import ImportCertificate from "./importcertificate";
import GetCertificateOperation from "./getcertificateoperation";
import UpdateCertificateOperation from "./updatecertificateoperation";
import DeleteCertificateOperation from "./deletecertificateoperation";
import MergeCertificate from "./mergecertificate";
import GetCertificatePolicy from "./getcertificatepolicy";
import UpdateCertificatePolicy from "./updatecertificatepolicy";
import GetCertificateVersions from "./getcertificateversions";
import GetCertificateContacts from "./getcertificatecontacts";
import SetCertificateContacts from "./setcertificatecontacts";
import DeleteCertificateContacts from "./deletecertificatecontacts";
import GetCertificateIssuers from "./getcertificateissuers";
import GetCertificateIssuer from "./getcertificateissuer";
import SetCertificateIssuer from "./setcertificateissuer";
import UpdateCertificateIssuer from "./updatecertificateissuer";
import DeleteCertificateIssuer from "./deletecertificateissuer";
import RestoreCertificate from "./restorecertificate";
import GetDeletedCertificates from "./getdeletedcertificates";
import GetDeletedCertificate from "./getdeletedcertificate";
import PurgeDeletedCertificate from "./purgedeletedcertificate";
import RecoverDeletedCertificate from "./recoverdeletedcertificate";
import GetStorageAccounts from "./getstorageaccounts";
import GetDeletedStorageAccounts from "./getdeletedstorageaccounts";
import GetDeletedStorageAccount from "./getdeletedstorageaccount";
import PurgeDeletedStorageAccount from "./purgedeletedstorageaccount";
import RecoverDeletedStorageAccount from "./recoverdeletedstorageaccount";
import BackupStorageAccount from "./backupstorageaccount";
import RestoreStorageAccount from "./restorestorageaccount";
import DeleteStorageAccount from "./deletestorageaccount";
import GetStorageAccount from "./getstorageaccount";
import SetStorageAccount from "./setstorageaccount";
import UpdateStorageAccount from "./updatestorageaccount";
import RegenerateStorageAccountKey from "./regeneratestorageaccountkey";
import GetSasDefinitions from "./getsasdefinitions";
import GetDeletedSasDefinitions from "./getdeletedsasdefinitions";
import GetDeletedSasDefinition from "./getdeletedsasdefinition";
import RecoverDeletedSasDefinition from "./recoverdeletedsasdefinition";
import DeleteSasDefinition from "./deletesasdefinition";
import GetSasDefinition from "./getsasdefinition";
import SetSasDefinition from "./setsasdefinition";
import UpdateSasDefinition from "./updatesasdefinition";
import FullBackup from "./fullbackup";
import FullBackupStatus from "./fullbackupstatus";
import SelectiveKeyRestoreOperation from "./selectivekeyrestoreoperation";
import FullRestoreOperation from "./fullrestoreoperation";
import RestoreStatus from "./restorestatus";
import RoleAssignments_ListForScope from "./roleassignmentslistforscope";
import RoleAssignments_Get from "./roleassignmentsget";
import RoleAssignments_Create from "./roleassignmentscreate";
import RoleAssignments_Delete from "./roleassignmentsdelete";
import RoleDefinitions_List from "./roledefinitionslist";
import RoleDefinitions_Get from "./roledefinitionsget";
import RoleDefinitions_CreateOrUpdate from "./roledefinitionscreateorupdate";
import RoleDefinitions_Delete from "./roledefinitionsdelete";

export const blocks = {
  GetDeletedKeys,
  GetDeletedKey,
  PurgeDeletedKey,
  RecoverDeletedKey,
  GetKeys,
  ImportKey,
  DeleteKey,
  GetKey,
  UpdateKey,
  decrypt,
  encrypt,
  release,
  sign,
  unwrapKey,
  verify,
  wrapKey,
  BackupKey,
  CreateKey,
  RotateKey,
  GetKeyRotationPolicy,
  UpdateKeyRotationPolicy,
  GetKeyVersions,
  RestoreKey,
  GetRandomBytes,
  GetDeletedSecrets,
  GetDeletedSecret,
  PurgeDeletedSecret,
  RecoverDeletedSecret,
  GetSecrets,
  SetSecret,
  DeleteSecret,
  GetSecret,
  UpdateSecret,
  BackupSecret,
  GetSecretVersions,
  RestoreSecret,
  GetCertificates,
  DeleteCertificate,
  GetCertificate,
  UpdateCertificate,
  BackupCertificate,
  CreateCertificate,
  ImportCertificate,
  GetCertificateOperation,
  UpdateCertificateOperation,
  DeleteCertificateOperation,
  MergeCertificate,
  GetCertificatePolicy,
  UpdateCertificatePolicy,
  GetCertificateVersions,
  GetCertificateContacts,
  SetCertificateContacts,
  DeleteCertificateContacts,
  GetCertificateIssuers,
  GetCertificateIssuer,
  SetCertificateIssuer,
  UpdateCertificateIssuer,
  DeleteCertificateIssuer,
  RestoreCertificate,
  GetDeletedCertificates,
  GetDeletedCertificate,
  PurgeDeletedCertificate,
  RecoverDeletedCertificate,
  GetStorageAccounts,
  GetDeletedStorageAccounts,
  GetDeletedStorageAccount,
  PurgeDeletedStorageAccount,
  RecoverDeletedStorageAccount,
  BackupStorageAccount,
  RestoreStorageAccount,
  DeleteStorageAccount,
  GetStorageAccount,
  SetStorageAccount,
  UpdateStorageAccount,
  RegenerateStorageAccountKey,
  GetSasDefinitions,
  GetDeletedSasDefinitions,
  GetDeletedSasDefinition,
  RecoverDeletedSasDefinition,
  DeleteSasDefinition,
  GetSasDefinition,
  SetSasDefinition,
  UpdateSasDefinition,
  FullBackup,
  FullBackupStatus,
  SelectiveKeyRestoreOperation,
  FullRestoreOperation,
  RestoreStatus,
  RoleAssignments_ListForScope,
  RoleAssignments_Get,
  RoleAssignments_Create,
  RoleAssignments_Delete,
  RoleDefinitions_List,
  RoleDefinitions_Get,
  RoleDefinitions_CreateOrUpdate,
  RoleDefinitions_Delete,
};
