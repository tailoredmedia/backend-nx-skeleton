[@webundsoehne/nestjs-keycloak](../README.md) / [restful](../modules/restful.md) / AuthGuard

# Class: AuthGuard

[restful](../modules/restful.md).AuthGuard

Application AuthGuard for Keycloak applications. This only works for REST APIs.

## Hierarchy

- [`BaseAuthGuard`](index.BaseAuthGuard.md)

  ↳ **`AuthGuard`**

## Table of contents

### Constructors

- [constructor](restful.AuthGuard.md#constructor)

### Properties

- [reflector](restful.AuthGuard.md#reflector)

### Methods

- [canActivate](restful.AuthGuard.md#canactivate)
- [getRequest](restful.AuthGuard.md#getrequest)
- [validateRequirements](restful.AuthGuard.md#validaterequirements)

## Constructors

### constructor

• **new AuthGuard**(`keycloak`, `keycloakOptions`, `reflector`)

#### Parameters

| Name              | Type                                                                      |
| :---------------- | :------------------------------------------------------------------------ |
| `keycloak`        | `Keycloak`                                                                |
| `keycloakOptions` | [`KeycloakConnectOptions`](../interfaces/index.KeycloakConnectOptions.md) |
| `reflector`       | `Reflector`                                                               |

#### Inherited from

[BaseAuthGuard](index.BaseAuthGuard.md).[constructor](index.BaseAuthGuard.md#constructor)

#### Defined in

connect/guards/auth-base.guard.ts:26

## Properties

### reflector

• `Readonly` **reflector**: `Reflector`

#### Inherited from

[BaseAuthGuard](index.BaseAuthGuard.md).[reflector](index.BaseAuthGuard.md#reflector)

## Methods

### canActivate

▸ **canActivate**(`context`): `Promise`<`boolean`\>

#### Parameters

| Name      | Type               |
| :-------- | :----------------- |
| `context` | `ExecutionContext` |

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[BaseAuthGuard](index.BaseAuthGuard.md).[canActivate](index.BaseAuthGuard.md#canactivate)

#### Defined in

connect/guards/auth-base.guard.ts:32

---

### getRequest

▸ **getRequest**<`Request`\>(`context`): `Request`

#### Type parameters

| Name | Type |
| :-- | :-- |
| `Request` | extends [`EnrichedExpressRequest`](../modules/index.md#enrichedexpressrequest) \| [`EnrichedFastifyRequest`](../modules/index.md#enrichedfastifyrequest) = [`EnrichedFastifyRequest`](../modules/index.md#enrichedfastifyrequest) |

#### Parameters

| Name      | Type               |
| :-------- | :----------------- |
| `context` | `ExecutionContext` |

#### Returns

`Request`

#### Overrides

[BaseAuthGuard](index.BaseAuthGuard.md).[getRequest](index.BaseAuthGuard.md#getrequest)

#### Defined in

connect/guards/auth-restful.guard.ts:13

---

### validateRequirements

▸ `Protected` **validateRequirements**(`values`, `required?`): `boolean`

Validate given condition to match the required values.

#### Parameters

| Name       | Type       | Default value |
| :--------- | :--------- | :------------ |
| `values`   | `string`[] | `undefined`   |
| `required` | `string`[] | `[]`          |

#### Returns

`boolean`

#### Inherited from

[BaseAuthGuard](index.BaseAuthGuard.md).[validateRequirements](index.BaseAuthGuard.md#validaterequirements)

#### Defined in

connect/guards/auth-base.guard.ts:105
