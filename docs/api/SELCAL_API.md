# SELCAL API Reference

> **For AI Agents building the UI:** Read the [Agent Directives](#agent-directives) section first, then use this document as the single source of truth for all API interactions. Every endpoint, payload shape, and response contract is defined here.

---

## Base URL

```
http://localhost:3000/api
```

Swagger UI: `http://localhost:3000/api/docs`

---

## Authentication

All protected endpoints require a JWT Bearer token in the `Authorization` header:

```
Authorization: Bearer <accessToken>
```

Access tokens expire. Use `POST /api/auth/refresh` to obtain a new one using the `refreshToken`.

---

## Common Response Shape

All entities include these base fields from `CommonEntity`:

```json
{
  "id": "uuid",
  "createdAt": "ISO8601",
  "updatedAt": "ISO8601",
  "isActive": true
}
```

### Error Responses

| Status | Meaning |
|--------|---------|
| 400 | Validation error — check `message` array for field errors |
| 401 | Missing or invalid JWT |
| 403 | Insufficient permissions |
| 404 | Resource not found |
| 409 | Conflict — duplicate resource |
| 429 | Rate limit exceeded |

---

## Modules

1. [Auth](#1-auth)
2. [Users](#2-users)
3. [Roles](#3-roles)
4. [Calibrations](#4-calibrations)
5. [Passes](#5-passes)
6. [Rolling Mills](#6-rolling-mills)
7. [Stands](#7-stands)
8. [Material Grades](#8-material-grades)
9. [Chemical Elements](#9-chemical-elements)
10. [Material Compositions](#10-material-compositions)
11. [Files](#11-files)
12. [Settings — Mill Types](#12-settings--mill-types)
13. [Settings — Profile Types](#13-settings--profile-types)
14. [Settings — Pass Geometry Types](#14-settings--pass-geometry-types)

---

## 1. Auth

**Base path:** `/api/auth`
**Rate limits:** Login 5 req/min · Register 3 req/min

### POST /api/auth/login

Authenticate with email and password. Returns access + refresh tokens.

**Auth required:** No
**Rate limit:** 5 requests / 60 s

**Request body:**
```json
{
  "email": "user@example.com",
  "password": "secret"
}
```

**Response 200:**
```json
{
  "accessToken": "eyJ...",
  "refreshToken": "eyJ...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "lastLogin": "ISO8601",
    "createdAt": "ISO8601",
    "updatedAt": "ISO8601",
    "isActive": true,
    "role": {
      "id": "uuid",
      "name": "Admin",
      "description": "...",
      "permissions": ["CALIBRATIONS:READ"],
      "isSystemRole": true
    }
  }
}
```

**Errors:** 401 Invalid credentials · 429 Rate limit

---

### POST /api/auth/register

Create a new user account.

**Auth required:** No
**Rate limit:** 3 requests / 60 s

**Request body:**
```json
{
  "email": "user@example.com",
  "password": "minimum8chars",
  "firstName": "John",
  "lastName": "Doe",
  "roleId": "uuid"
}
```

| Field | Type | Rules |
|-------|------|-------|
| email | string | valid email, required |
| password | string | min 8 chars, required |
| firstName | string | required |
| lastName | string | required |
| roleId | UUID | required |

**Response 201:** Same shape as login — `{ accessToken, refreshToken, user }`

**Errors:** 409 Email already registered

---

### POST /api/auth/refresh

Exchange a refresh token for a new access token.

**Auth required:** No

**Request body:**
```json
{
  "refreshToken": "eyJ..."
}
```

**Response 200:** Same shape as login — `{ accessToken, refreshToken, user }`

**Errors:** 401 Invalid or expired refresh token

---

### GET /api/auth/me

Get the currently authenticated user's profile with role and permissions.

**Auth required:** Yes

**Response 200:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "createdAt": "ISO8601",
  "updatedAt": "ISO8601",
  "isActive": true,
  "role": {
    "id": "uuid",
    "name": "Admin",
    "description": "...",
    "permissions": ["CALIBRATIONS:READ", "CALIBRATIONS:CREATE"],
    "isSystemRole": true
  }
}
```

---

### POST /api/auth/logout

Invalidate the current access token.

**Auth required:** Yes

**Request:** No body — token is read from `Authorization` header.

**Response 200:**
```json
{ "message": "Logout successful" }
```

---

## 2. Users

**Base path:** `/api/users`
**Auth required:** Yes (JWT + Permissions)

### POST /api/users

Create a new user.

**Permission:** `USERS:CREATE`

**Request body:**
```json
{
  "email": "user@example.com",
  "password": "min6chars",
  "firstName": "Jane",
  "lastName": "Smith",
  "roleId": "uuid"
}
```

| Field | Type | Rules |
|-------|------|-------|
| email | string | valid email, required |
| password | string | min 6 chars, required |
| firstName | string | required |
| lastName | string | required |
| roleId | UUID | required |

**Response 201:** Created user object

---

### GET /api/users

List all users.

**Permission:** `USERS:READ`

**Response 200:** Array of user objects

---

### GET /api/users/public

List non-admin users. No permission required (authenticated only).

**Response 200:** Array of user objects

---

### GET /api/users/:id

Get a user by ID.

**Permission:** `USERS:READ`

**Response 200:** User object
**Errors:** 404

---

### PATCH /api/users/:id

Update a user.

**Permission:** `USERS:UPDATE`

**Request body:** Any subset of `CreateUserDto` fields (all optional)

**Response 200:** Updated user object
**Errors:** 404

---

### PATCH /api/users/:id/update-password

Change a user's password.

**Permission:** `USERS:UPDATE`

**Request body:**
```json
{
  "currentPassword": "oldPassword",
  "newPassword": "StrongP@ss1"
}
```

`newPassword` must satisfy `@IsStrongPassword` (uppercase, lowercase, number, symbol).

**Response 200:** Updated user object
**Errors:** 400 Weak password · 401 Wrong current password · 404

---

### DELETE /api/users/:id

Soft-delete a user (sets `isActive: false`).

**Permission:** `USERS:DELETE`

**Response 200:** Deactivated user object
**Errors:** 404

---

## 3. Roles

**Base path:** `/api/security/roles`
**Auth required:** Yes (JWT + Permissions)

### POST /api/security/roles

Create a new role.

**Permission:** `ROLES:CREATE`

**Request body:**
```json
{
  "name": "Operator",
  "description": "Can view and create calibrations",
  "permissions": ["CALIBRATIONS:READ", "CALIBRATIONS:CREATE"]
}
```

| Field | Type | Rules |
|-------|------|-------|
| name | string | required |
| description | string | optional |
| permissions | string[] | required, non-empty array |

**Response 201:** Created role object
**Errors:** 409 Role name already exists

---

### GET /api/security/roles

List all roles.

**Permission:** `ROLES:READ`

**Response 200:** Array of role objects

---

### GET /api/security/roles/:id

Get a role by ID.

**Permission:** `ROLES:READ`

**Response 200:** Role object
**Errors:** 404

---

### PATCH /api/security/roles/:id

Update a role.

**Permission:** `ROLES:UPDATE`

**Request body:** Any subset of `CreateRoleDto` fields

**Response 200:** Updated role object
**Errors:** 404

---

### POST /api/security/roles/:id/activate

Activate a deactivated role.

**Permission:** `ROLES:UPDATE`

**Response 200:** Activated role object
**Errors:** 404

---

### POST /api/security/roles/:id/deactivate

Deactivate a role.

**Permission:** `ROLES:UPDATE`

**Response 200:** Deactivated role object
**Errors:** 404

---

### DELETE /api/security/roles/:id

Soft-delete a role.

**Permission:** `ROLES:DELETE`

**Response 200:** Deleted role object
**Errors:** 404

---

## 4. Calibrations

**Base path:** `/api/calibrations`
**Auth required:** Yes (JWT + Permissions)

### POST /api/calibrations

Create a new calibration.

**Permission:** `CALIBRATIONS:CREATE`

**Request body:**
```json
{
  "name": "Round Bar 40mm",
  "targetDimension": 40.0,
  "status": "DRAFT",
  "authorId": "uuid",
  "materialGradeId": "uuid",
  "rollingMillId": "uuid"
}
```

| Field | Type | Rules |
|-------|------|-------|
| name | string | required |
| targetDimension | number | required, ≥ 0 |
| status | `DRAFT` \| `APPROVED` | optional, default `DRAFT` |
| authorId | UUID | required |
| materialGradeId | UUID | required |
| rollingMillId | UUID | required |

**Response 201:** Created calibration object
**Errors:** 409 Duplicate name

---

### GET /api/calibrations

List all calibrations.

**Permission:** `CALIBRATIONS:READ`

**Response 200:** Array of calibration objects

---

### GET /api/calibrations/:id

Get a calibration by ID.

**Permission:** `CALIBRATIONS:READ`

**Response 200:** Calibration object with related passes
**Errors:** 404

---

### PATCH /api/calibrations/:id

Update a calibration.

**Permission:** `CALIBRATIONS:UPDATE`

**Request body:** Any subset of `CreateCalibrationDto` fields

**Response 200:** Updated calibration object
**Errors:** 404

---

### DELETE /api/calibrations/:id

Soft-delete a calibration.

**Permission:** `CALIBRATIONS:DELETE`

**Response 200:** Deleted calibration object
**Errors:** 404

---

## 5. Passes

**Base path:** `/api/passes`
**Auth required:** Yes (JWT + Permissions)

Rolling passes belong to a calibration and represent individual reduction steps.

### POST /api/passes

Create a new rolling pass.

**Permission:** `PASSES:CREATE`

**Request body:**
```json
{
  "sequenceOrder": 1,
  "inputHeight": 120.0,
  "outputHeight": 100.0,
  "calculatedForce": null,
  "calculatedPower": null,
  "calibrationId": "uuid"
}
```

| Field | Type | Rules |
|-------|------|-------|
| sequenceOrder | number | required, ≥ 1 |
| inputHeight | number | required, ≥ 0 |
| outputHeight | number | required, ≥ 0 |
| calculatedForce | number \| null | optional, ≥ 0 |
| calculatedPower | number \| null | optional, ≥ 0 |
| calibrationId | UUID | required |

**Response 201:** Created pass object

---

### GET /api/passes

List all passes.

**Permission:** `PASSES:READ`

**Response 200:** Array of pass objects

---

### GET /api/passes/:id

Get a pass by ID.

**Permission:** `PASSES:READ`

**Response 200:** Pass object
**Errors:** 404

---

### PATCH /api/passes/:id

Update a pass.

**Permission:** `PASSES:UPDATE`

**Request body:** Any subset of `CreatePassDto` fields

**Response 200:** Updated pass object
**Errors:** 404

---

### DELETE /api/passes/:id

Soft-delete a pass.

**Permission:** `PASSES:DELETE`

**Response 200:** Deleted pass object
**Errors:** 404

---

## 6. Rolling Mills

**Base path:** `/api/rolling-mills`
**Auth required:** Yes (JWT + Permissions)

### POST /api/rolling-mills

Create a new rolling mill.

**Permission:** `ROLLING_MILLS:CREATE`

**Request body:**
```json
{
  "code": "RM-01",
  "name": "Wire Rod Mill",
  "millTypeId": "uuid"
}
```

| Field | Type | Rules |
|-------|------|-------|
| code | string | required |
| name | string | required |
| millTypeId | UUID | required |

**Response 201:** Created rolling mill object
**Errors:** 409 `code` already exists

List all rolling mills.

**Permission:** `ROLLING_MILLS:READ`

**Response 200:** Array of rolling mill objects

---

### GET /api/rolling-mills/:id

Get a rolling mill by ID.

**Permission:** `ROLLING_MILLS:READ`

**Response 200:** Rolling mill object
**Errors:** 404

---

### PATCH /api/rolling-mills/:id

Update a rolling mill.

**Permission:** `ROLLING_MILLS:UPDATE`

**Request body:** Any subset of `CreateRollingMillDto` fields

**Response 200:** Updated rolling mill object
**Errors:** 404

---

### DELETE /api/rolling-mills/:id

Soft-delete a rolling mill.

**Permission:** `ROLLING_MILLS:DELETE`

**Response 200:** Deleted rolling mill object
**Errors:** 404

---

## 7. Stands

**Base path:** `/api/stands`
**Auth required:** Yes (JWT + Permissions)

### POST /api/stands

Create a new stand.

**Permission:** `STANDS:CREATE`

**Request body:**
```json
{
  "name": "Stand 1",
  "position": 1,
  "motorPower": 500.0
}
```

| Field | Type | Rules |
|-------|------|-------|
| name | string | required |
| position | number | required, ≥ 0 |
| motorPower | number | required, ≥ 0 (kW) |

**Response 201:** Created stand object
**Errors:** 409 `name` already exists

---

### GET /api/stands

List all stands.

**Permission:** `STANDS:READ`

**Response 200:** Array of stand objects

---

### GET /api/stands/:id

Get a stand by ID.

**Permission:** `STANDS:READ`

**Response 200:** Stand object
**Errors:** 404

---

### PATCH /api/stands/:id

Update a stand.

**Permission:** `STANDS:UPDATE`

**Request body:** Any subset of `CreateStandDto` fields

**Response 200:** Updated stand object
**Errors:** 404

---

### DELETE /api/stands/:id

Soft-delete a stand.

**Permission:** `STANDS:DELETE`

**Response 200:** Deleted stand object
**Errors:** 404

---

## 8. Material Grades

**Base path:** `/api/material-grades`
**Auth required:** Yes (JWT + Permissions)

### POST /api/material-grades

Create a new material grade.

**Permission:** `MATERIAL_GRADES:CREATE`

**Request body:**
```json
{
  "gradeCode": "SAE1020",
  "baseResistance": 350.0,
  "properties": {
    "yieldStrength": 210,
    "tensileStrength": 380
  }
}
```

| Field | Type | Rules |
|-------|------|-------|
| gradeCode | string | required |
| baseResistance | number | required, ≥ 0 (MPa) |
| properties | object | required, key-value map of numeric metallurgical properties |

**Response 201:** Created material grade object

---

### GET /api/material-grades

List all material grades.

**Permission:** `MATERIAL_GRADES:READ`

**Response 200:** Array of material grade objects

---

### GET /api/material-grades/:id

Get a material grade by ID.

**Permission:** `MATERIAL_GRADES:READ`

**Response 200:** Material grade object
**Errors:** 404

---

### PATCH /api/material-grades/:id

Update a material grade.

**Permission:** `MATERIAL_GRADES:UPDATE`

**Request body:** Any subset of `CreateMaterialGradeDto` fields

**Response 200:** Updated material grade object
**Errors:** 404

---

### DELETE /api/material-grades/:id

Soft-delete a material grade.

**Permission:** `MATERIAL_GRADES:DELETE`

**Response 200:** Deleted material grade object
**Errors:** 404

---

## 9. Chemical Elements

**Base path:** `/api/chemical-elements`
**Auth required:** Yes (JWT + Permissions)

### POST /api/chemical-elements

Create a new chemical element.

**Permission:** `CHEMICAL_ELEMENTS:CREATE`

**Request body:**
```json
{
  "symbol": "C",
  "name": "Carbon",
  "tableNumber": 6
}
```

| Field | Type | Rules |
|-------|------|-------|
| symbol | string | required |
| name | string | required |
| tableNumber | number | required, ≥ 1 (atomic number) |

**Response 201:** Created chemical element object
**Errors:** 409 `symbol`, `name`, or `tableNumber` already exists (all three are unique)

---

### GET /api/chemical-elements

List all chemical elements.

**Permission:** `CHEMICAL_ELEMENTS:READ`

**Response 200:** Array of chemical element objects

---

### GET /api/chemical-elements/:id

Get a chemical element by ID.

**Permission:** `CHEMICAL_ELEMENTS:READ`

**Response 200:** Chemical element object
**Errors:** 404

---

### PATCH /api/chemical-elements/:id

Update a chemical element.

**Permission:** `CHEMICAL_ELEMENTS:UPDATE`

**Request body:** Any subset of `CreateChemicalElementDto` fields

**Response 200:** Updated chemical element object
**Errors:** 404

---

### DELETE /api/chemical-elements/:id

Soft-delete a chemical element.

**Permission:** `CHEMICAL_ELEMENTS:DELETE`

**Response 200:** Deleted chemical element object
**Errors:** 404

---

## 10. Material Compositions

**Base path:** `/api/material-compositions`
**Auth required:** Yes (JWT + Permissions)

Links a chemical element to a material grade (many-to-many join).

### POST /api/material-compositions

Create a new material composition link.

**Permission:** `MATERIAL_COMPOSITIONS:CREATE`

**Request body:**
```json
{
  "chemicalElementId": "uuid",
  "materialGradeId": "uuid"
}
```

| Field | Type | Rules |
|-------|------|-------|
| chemicalElementId | UUID | required |
| materialGradeId | UUID | required |

**Response 201:** Created composition object

---

### GET /api/material-compositions

List all material compositions.

**Permission:** `MATERIAL_COMPOSITIONS:READ`

**Response 200:** Array of composition objects

---

### GET /api/material-compositions/:id

Get a composition by ID.

**Permission:** `MATERIAL_COMPOSITIONS:READ`

**Response 200:** Composition object
**Errors:** 404

---

### PATCH /api/material-compositions/:id

Update a composition link.

**Permission:** `MATERIAL_COMPOSITIONS:UPDATE`

**Request body:** Any subset of `CreateMaterialCompositionDto` fields

**Response 200:** Updated composition object
**Errors:** 404

---

### DELETE /api/material-compositions/:id

Soft-delete a composition link.

**Permission:** `MATERIAL_COMPOSITIONS:DELETE`

**Response 200:** Deleted composition object
**Errors:** 404

---

## 11. Files

**Base path:** `/api/files`
**Auth required:** Yes (JWT + Permissions)

### POST /api/files/upload

Upload a file. Supports local storage or S3 depending on `STORAGE_TYPE` env var.

**Permission:** `FILES:CREATE`
**Content-Type:** `multipart/form-data`

**Form fields:**

| Field | Type | Required |
|-------|------|----------|
| file | binary | Yes |
| userId | UUID | No |
| entityType | string | No — e.g. `calibration` |
| entityId | UUID | No |
| prefix | string | No — storage path prefix |

**Response 201:**
```json
{
  "id": "uuid",
  "filename": "uuid_timestamp.pdf",
  "originalName": "report.pdf",
  "mimetype": "application/pdf",
  "size": 204800,
  "path": "uploads/...",
  "url": "https://...",
  "storageType": "local",
  "bucket": null,
  "userId": "uuid",
  "entityType": "calibration",
  "entityId": "uuid",
  "createdAt": "ISO8601",
  "updatedAt": "ISO8601",
  "isActive": true
}
```

`storageType` is `"local"` or `"s3"` depending on `STORAGE_TYPE` env var. `url` and `bucket` are populated for S3 storage.

---

### GET /api/files/:id

Download a file as an attachment (`Content-Disposition: attachment`).

**Permission:** `FILES:READ`

**Response 200:** Binary file stream

**Errors:** 404

---

### GET /api/files/:id/view

View a file inline in the browser (`Content-Type` set, no attachment header).

**Permission:** `FILES:READ`

**Response 200:** Binary file stream

**Errors:** 404

---

### GET /api/files/:id/url

Get a pre-signed or direct download URL for a file.

**Permission:** `FILES:READ`

**Response 200:**
```json
{ "url": "https://..." }
```

**Errors:** 404

---

### DELETE /api/files/:id

Delete a file from storage and database.

**Permission:** `FILES:DELETE`

**Response 200:**
```json
{ "message": "File successfully removed" }
```

**Errors:** 404

---

### GET /api/files/entity/:entityType/:entityId

Get all files linked to a specific entity.

**Permission:** `FILES:READ`

**Path params:**
- `entityType` — e.g. `calibration`
- `entityId` — UUID of the entity

**Response 200:** Array of file objects

**Errors:** 404

---

### POST /api/files/:id/link-to-entity

Link an existing file to an entity.

**Permission:** `FILES:UPDATE`

**Request body:**
```json
{
  "entityType": "calibration",
  "entityId": "uuid"
}
```

**Response 200:** Updated file object
**Errors:** 404

---

## 12. Settings — Mill Types

**Base path:** `/api/mill-types`
**Auth required:** Yes (JWT + Permissions)

### POST /api/mill-types

**Permission:** `MILL_TYPES:CREATE`

**Request body:**
```json
{
  "code": "WRM",
  "name": "Wire Rod Mill",
  "description": "High-speed wire rod production",
  "sortOrder": 1
}
```

| Field | Type | Rules |
|-------|------|-------|
| code | string | required |
| name | string | required |
| description | string | optional |
| sortOrder | number | required, ≥ 0 |

**Response 201:** Created mill type object

---

### GET /api/mill-types

**Permission:** `MILL_TYPES:READ`

**Response 200:** Array of mill type objects

---

### GET /api/mill-types/:id

**Permission:** `MILL_TYPES:READ`

**Response 200:** Mill type object · **Errors:** 404

---

### PATCH /api/mill-types/:id

**Permission:** `MILL_TYPES:UPDATE`

**Request body:** Any subset of `CreateMillTypeDto` fields

**Response 200:** Updated mill type object · **Errors:** 404

---

### DELETE /api/mill-types/:id

**Permission:** `MILL_TYPES:DELETE`

**Response 200:** Deleted mill type object · **Errors:** 404

---

## 13. Settings — Profile Types

**Base path:** `/api/profile-types`
**Auth required:** Yes (JWT + Permissions)

### POST /api/profile-types

**Permission:** `PROFILE_TYPES:CREATE`

**Request body:**
```json
{
  "code": "RB",
  "name": "Round Bar",
  "description": "Solid circular cross-section",
  "sortOrder": 1
}
```

Same field rules as Mill Types.

**Response 201:** Created profile type object

---

### GET /api/profile-types

**Permission:** `PROFILE_TYPES:READ`

**Response 200:** Array of profile type objects

---

### GET /api/profile-types/:id

**Permission:** `PROFILE_TYPES:READ`

**Response 200:** Profile type object · **Errors:** 404

---

### PATCH /api/profile-types/:id

**Permission:** `PROFILE_TYPES:UPDATE`

**Response 200:** Updated profile type object · **Errors:** 404

---

### DELETE /api/profile-types/:id

**Permission:** `PROFILE_TYPES:DELETE`

**Response 200:** Deleted profile type object · **Errors:** 404

---

## 14. Settings — Pass Geometry Types

**Base path:** `/api/pass-geometry-types`
**Auth required:** Yes (JWT + Permissions)

### POST /api/pass-geometry-types

**Permission:** `PASS_GEOMETRY_TYPES:CREATE`

**Request body:**
```json
{
  "code": "OV",
  "name": "Oval",
  "description": "Oval pass geometry",
  "sortOrder": 2
}
```

Same field rules as Mill Types.

**Response 201:** Created pass geometry type object

---

### GET /api/pass-geometry-types

**Permission:** `PASS_GEOMETRY_TYPES:READ`

**Response 200:** Array of pass geometry type objects

---

### GET /api/pass-geometry-types/:id

**Permission:** `PASS_GEOMETRY_TYPES:READ`

**Response 200:** Pass geometry type object · **Errors:** 404

---

### PATCH /api/pass-geometry-types/:id

**Permission:** `PASS_GEOMETRY_TYPES:UPDATE`

**Response 200:** Updated pass geometry type object · **Errors:** 404

---

### DELETE /api/pass-geometry-types/:id

**Permission:** `PASS_GEOMETRY_TYPES:DELETE`

**Response 200:** Deleted pass geometry type object · **Errors:** 404

---

## Agent Directives

> These directives are instructions for an AI agent generating the SELCAL-Web frontend UI. Follow them strictly.

### 1. Authentication Flow

- On app load, check for a stored `accessToken`. If present, call `GET /api/auth/me` to validate and hydrate the user session.
- If `GET /api/auth/me` returns 401, attempt `POST /api/auth/refresh` with the stored `refreshToken`.
- If refresh fails, redirect to the login page and clear all stored tokens.
- Store tokens in memory or `httpOnly` cookies — never in `localStorage` for production.
- After successful login, store `accessToken` and `refreshToken`, then redirect to the dashboard.
- Implement a global Axios/fetch interceptor that:
  1. Attaches `Authorization: Bearer <accessToken>` to every request.
  2. On 401 response, attempts token refresh once, retries the original request, then logs out on second failure.

### 2. Permission-Based UI Rendering

- After `GET /api/auth/me`, store `user.role.permissions` as a set in global state.
- Before rendering any action button (Create, Edit, Delete, Activate), check that the required permission is present.
- Permission format: `RESOURCE:ACTION` — e.g. `CALIBRATIONS:CREATE`, `USERS:DELETE`.
- Hide (not just disable) UI elements the user lacks permission for.
- The `ADMIN` permission is a super-user bypass — users with it can access everything.

### 3. API Client Setup

- Base URL: `http://localhost:3000/api` (read from env var `VITE_API_URL` or equivalent).
- All request/response bodies are JSON (`Content-Type: application/json`), except file uploads which use `multipart/form-data`.
- Handle 400 validation errors by mapping the `message` array to per-field error messages in forms.
- Handle 409 conflicts with a user-visible toast/alert: "This record already exists."
- Handle 404 with a "Not found" page or inline message.
- Handle 429 with a "Too many requests, please wait" message.

### 4. Forms and Validation

- Mirror server-side validation in the UI to give instant feedback before submission:
  - `email` fields: valid email format
  - `password` on register: min 8 characters
  - `newPassword` on password change: strong password (uppercase + lowercase + number + symbol)
  - `UUID` fields (roleId, calibrationId, etc.): populated via dropdowns, not free text
  - `number` fields with `Min(0)`: reject negative values
  - `number` fields with `Min(1)`: reject zero and negative values
- All `PATCH` endpoints accept partial updates — only send changed fields.
- For `status` on calibrations, render a dropdown with values: `DRAFT`, `APPROVED`.

### 5. Soft Delete Behavior

- All DELETE endpoints perform soft deletes (`isActive: false`). Records are not removed from the database.
- After a successful delete, remove the item from the UI list without a full page reload.
- Do not show soft-deleted records in lists (the API already filters them with `where: { isActive: true }`).

### 6. File Uploads

- Use `POST /api/files/upload` with `multipart/form-data`.
- Show upload progress if possible.
- After upload, use the returned `id` to display the file or generate a download link via `GET /api/files/:id/url`.
- To display images or PDFs inline, use `GET /api/files/:id/view`.
- To list files for a calibration: `GET /api/files/entity/calibration/:calibrationId`.

### 7. Settings Modules (Mill Types, Profile Types, Pass Geometry Types)

- These are reference/lookup tables. Load them once on app init and cache in global state.
- Render them as dropdowns/selects in forms that reference them.
- Provide a settings admin page for CRUD management.
- `sortOrder` controls display order — sort lists by this field ascending.

### 8. Calibration Workflow

- A calibration has a `status`: `DRAFT` or `APPROVED`.
- Passes belong to a calibration via `calibrationId`. Display them ordered by `sequenceOrder` ascending.
- When displaying a calibration detail page, fetch its passes and display them as a sequence table.
- `calculatedForce` and `calculatedPower` on passes are computed values — display them read-only if present, show "—" if null.

### 9. Error Handling Pattern

```
try {
  const result = await api.post('/calibrations', payload)
  // success
} catch (error) {
  if (error.status === 400) showFieldErrors(error.message)
  else if (error.status === 409) showToast('Already exists')
  else if (error.status === 403) showToast('Permission denied')
  else showToast('Unexpected error, please try again')
}
```

### 10. Roles Management

- When creating/editing a user, load roles via `GET /api/security/roles` and present as a dropdown.
- `isSystemRole: true` roles should be visually distinguished (e.g. badge) and protected from deletion in the UI.
- The `permissions` field on a role is a string array. Provide a multi-select or checkbox list of all available permissions when creating/editing roles.

---

*Last updated: April 2026 — generated from source controllers and DTOs*
