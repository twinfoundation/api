# Interface: IUpdatePasswordRequest

Update a users password.

## Properties

### pathParams

> **pathParams**: `object`

The path parameters for the request.

#### email

> **email**: `string`

The user email.

***

### body

> **body**: `object`

The body of the request.

#### currentPassword

> **currentPassword**: `string`

The current password for the user.

#### newPassword

> **newPassword**: `string`

The new password for the user.
