[@webundsoehne/nestjs-keycloak-seeder](../README.md) / KeycloakSeederService

# Class: KeycloakSeederService

Seeder service to run all the seeds that has been passed to it.

## Table of contents

### Constructors

- [constructor](KeycloakSeederService.md#constructor)

### Properties

- [keycloak](KeycloakSeederService.md#keycloak)
- [logger](KeycloakSeederService.md#logger)
- [seeds](KeycloakSeederService.md#seeds)

### Methods

- [init](KeycloakSeederService.md#init)

## Constructors

### constructor

• **new KeycloakSeederService**(`keycloak`, `seeds`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `keycloak` | [`KeycloakAdminSeederTools`](KeycloakAdminSeederTools.md) |
| `seeds` | `KeycloakSeeds` |

#### Defined in

module/keycloak-seeder.service.ts:15

## Properties

### keycloak

• `Protected` `Readonly` **keycloak**: [`KeycloakAdminSeederTools`](KeycloakAdminSeederTools.md)

___

### logger

• `Protected` `Readonly` **logger**: `Logger`

#### Defined in

module/keycloak-seeder.service.ts:13

___

### seeds

• `Protected` `Readonly` **seeds**: `KeycloakSeeds`

## Methods

### init

▸ **init**(): `Promise`<`void`\>

Run all the seeds.

#### Returns

`Promise`<`void`\>

#### Defined in

module/keycloak-seeder.service.ts:20
