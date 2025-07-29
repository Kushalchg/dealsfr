# 📘 API Documentation

## `POST /api/accounts/login/`
**Summary:** User Login

Authenticate a user and return JWT access and refresh tokens.

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  phone_number:
    type: string
    minLength: 1
  email:
    type: string
    format: email
    minLength: 1
  password:
    type: string
    minLength: 1
required:
- password

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  phone_number:
    type: string
    minLength: 1
  email:
    type: string
    format: email
    minLength: 1
  password:
    type: string
    minLength: 1
required:
- password

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  phone_number:
    type: string
    minLength: 1
  email:
    type: string
    format: email
    minLength: 1
  password:
    type: string
    minLength: 1
required:
- password

```

**Responses:**
- **Status 200**: Login successful
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  access:
    type: string
  refresh:
    type: string
required:
- access
- refresh

    ```
- **Status 401**: Invalid credentials

---

## `POST /api/accounts/logout/`
**Summary:** Logout User

Blacklist the refresh token to log out the user

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  refresh:
    type: string
    minLength: 1
    description: Refresh token to blacklist
required:
- refresh

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  refresh:
    type: string
    minLength: 1
    description: Refresh token to blacklist
required:
- refresh

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  refresh:
    type: string
    minLength: 1
    description: Refresh token to blacklist
required:
- refresh

```

**Responses:**
- **Status 200**: Logout successful
  - **Content-Type:** `application/json`

---

## `POST /api/accounts/register/`
**Summary:** Register User (Customer or Store Admin)

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  phone_number:
    type: string
    minLength: 1
  first_name:
    type: string
    minLength: 1
  last_name:
    type: string
    minLength: 1
  email:
    type: string
    format: email
    minLength: 1
  password:
    type: string
    writeOnly: true
    minLength: 1
  confirm_password:
    type: string
    writeOnly: true
    minLength: 1
  user_type:
    type: string
    minLength: 1
required:
- confirm_password
- password

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  phone_number:
    type: string
    minLength: 1
  first_name:
    type: string
    minLength: 1
  last_name:
    type: string
    minLength: 1
  email:
    type: string
    format: email
    minLength: 1
  password:
    type: string
    writeOnly: true
    minLength: 1
  confirm_password:
    type: string
    writeOnly: true
    minLength: 1
  user_type:
    type: string
    minLength: 1
required:
- confirm_password
- password

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  phone_number:
    type: string
    minLength: 1
  first_name:
    type: string
    minLength: 1
  last_name:
    type: string
    minLength: 1
  email:
    type: string
    format: email
    minLength: 1
  password:
    type: string
    writeOnly: true
    minLength: 1
  confirm_password:
    type: string
    writeOnly: true
    minLength: 1
  user_type:
    type: string
    minLength: 1
required:
- confirm_password
- password

```

**Responses:**
- **Status 201**: Registration successful
  - **Content-Type:** `application/json`

---

## `GET /api/api/notifications/`

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
required:
- count
- results
properties:
  count:
    type: integer
    example: 123
  next:
    type: string
    nullable: true
    format: uri
    example: http://api.example.org/accounts/?page=4
  previous:
    type: string
    nullable: true
    format: uri
    example: http://api.example.org/accounts/?page=2
  results:
    type: array
    items:
      $ref: '#/components/schemas/Notification'

    ```

---

## `POST /api/api/notifications/`
**Summary:** Create Notification

Create a new notification for the authenticated user.

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  notification_type:
    type: string
    minLength: 1
    maxLength: 50
  message:
    type: string
    minLength: 1
  is_read:
    type: boolean
  user:
    type: integer
required:
- message
- notification_type
- user

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  notification_type:
    type: string
    minLength: 1
    maxLength: 50
  message:
    type: string
    minLength: 1
  is_read:
    type: boolean
  user:
    type: integer
required:
- message
- notification_type
- user

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  notification_type:
    type: string
    minLength: 1
    maxLength: 50
  message:
    type: string
    minLength: 1
  is_read:
    type: boolean
  user:
    type: integer
required:
- message
- notification_type
- user

```

**Responses:**
- **Status 201**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  notification_type:
    type: string
    maxLength: 50
  message:
    type: string
  is_read:
    type: boolean
  created_at:
    type: string
    format: date-time
    readOnly: true
  user:
    type: integer
required:
- created_at
- id
- message
- notification_type
- user

    ```

---

## `GET /api/api/notifications/{id}/`

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  notification_type:
    type: string
    maxLength: 50
  message:
    type: string
  is_read:
    type: boolean
  created_at:
    type: string
    format: date-time
    readOnly: true
  user:
    type: integer
required:
- created_at
- id
- message
- notification_type
- user

    ```

---

## `PUT /api/api/notifications/{id}/`

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  notification_type:
    type: string
    minLength: 1
    maxLength: 50
  message:
    type: string
    minLength: 1
  is_read:
    type: boolean
  user:
    type: integer
required:
- message
- notification_type
- user

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  notification_type:
    type: string
    minLength: 1
    maxLength: 50
  message:
    type: string
    minLength: 1
  is_read:
    type: boolean
  user:
    type: integer
required:
- message
- notification_type
- user

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  notification_type:
    type: string
    minLength: 1
    maxLength: 50
  message:
    type: string
    minLength: 1
  is_read:
    type: boolean
  user:
    type: integer
required:
- message
- notification_type
- user

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  notification_type:
    type: string
    maxLength: 50
  message:
    type: string
  is_read:
    type: boolean
  created_at:
    type: string
    format: date-time
    readOnly: true
  user:
    type: integer
required:
- created_at
- id
- message
- notification_type
- user

    ```

---

## `PATCH /api/api/notifications/{id}/`

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  notification_type:
    type: string
    minLength: 1
    maxLength: 50
  message:
    type: string
    minLength: 1
  is_read:
    type: boolean
  user:
    type: integer

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  notification_type:
    type: string
    minLength: 1
    maxLength: 50
  message:
    type: string
    minLength: 1
  is_read:
    type: boolean
  user:
    type: integer

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  notification_type:
    type: string
    minLength: 1
    maxLength: 50
  message:
    type: string
    minLength: 1
  is_read:
    type: boolean
  user:
    type: integer

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  notification_type:
    type: string
    maxLength: 50
  message:
    type: string
  is_read:
    type: boolean
  created_at:
    type: string
    format: date-time
    readOnly: true
  user:
    type: integer
required:
- created_at
- id
- message
- notification_type
- user

    ```

---

## `DELETE /api/api/notifications/{id}/`
**Summary:** Delete a notification

Deletes a notification by ID if it belongs to the authenticated user.

**Responses:**
- **Status 200**: Notification deleted successfully.
  - **Content-Type:** `application/json`

---

## `POST /api/api/notifications/mark_all_read/`
**Summary:** Mark All Notifications as Read

Mark all unread notifications as read for the authenticated user.

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  notification_type:
    type: string
    minLength: 1
    maxLength: 50
  message:
    type: string
    minLength: 1
  is_read:
    type: boolean
  user:
    type: integer
required:
- message
- notification_type
- user

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  notification_type:
    type: string
    minLength: 1
    maxLength: 50
  message:
    type: string
    minLength: 1
  is_read:
    type: boolean
  user:
    type: integer
required:
- message
- notification_type
- user

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  notification_type:
    type: string
    minLength: 1
    maxLength: 50
  message:
    type: string
    minLength: 1
  is_read:
    type: boolean
  user:
    type: integer
required:
- message
- notification_type
- user

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  notification_type:
    type: string
    maxLength: 50
  message:
    type: string
  is_read:
    type: boolean
  created_at:
    type: string
    format: date-time
    readOnly: true
  user:
    type: integer
required:
- created_at
- id
- message
- notification_type
- user

    ```

---

## `GET /api/api/preferences/`

API endpoint for retrieving and updating user notification preferences.

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  email_notifications:
    type: boolean

    ```

---

## `PUT /api/api/preferences/`

API endpoint for retrieving and updating user notification preferences.

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  email_notifications:
    type: boolean

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  email_notifications:
    type: boolean

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  email_notifications:
    type: boolean

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  email_notifications:
    type: boolean

    ```

---

## `PATCH /api/api/preferences/`

API endpoint for retrieving and updating user notification preferences.

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  email_notifications:
    type: boolean

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  email_notifications:
    type: boolean

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  email_notifications:
    type: boolean

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  email_notifications:
    type: boolean

    ```

---

## `GET /api/banner/`

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
required:
- count
- results
properties:
  count:
    type: integer
    example: 123
  next:
    type: string
    nullable: true
    format: uri
    example: http://api.example.org/accounts/?page=4
  previous:
    type: string
    nullable: true
    format: uri
    example: http://api.example.org/accounts/?page=2
  results:
    type: array
    items:
      $ref: '#/components/schemas/Banner'

    ```

---

## `POST /api/banner/`

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  banner_type:
    $ref: '#/components/schemas/BannerTypeEnum'
  banner_image:
    type: string
    format: binary
    nullable: true
  banner_name:
    type: string
    minLength: 1
    maxLength: 255
  banner_content:
    nullable: true
  selected_banner_id:
    type: integer
    maximum: 9223372036854775807
    minimum: -9223372036854775808
    format: int64
    nullable: true
  theme_id:
    type: integer
    maximum: 9223372036854775807
    minimum: -9223372036854775808
    format: int64
    nullable: true
required:
- banner_name
- banner_type

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  banner_type:
    $ref: '#/components/schemas/BannerTypeEnum'
  banner_image:
    type: string
    format: binary
    nullable: true
  banner_name:
    type: string
    minLength: 1
    maxLength: 255
  banner_content:
    nullable: true
  selected_banner_id:
    type: integer
    maximum: 9223372036854775807
    minimum: -9223372036854775808
    format: int64
    nullable: true
  theme_id:
    type: integer
    maximum: 9223372036854775807
    minimum: -9223372036854775808
    format: int64
    nullable: true
required:
- banner_name
- banner_type

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  banner_type:
    $ref: '#/components/schemas/BannerTypeEnum'
  banner_image:
    type: string
    format: binary
    nullable: true
  banner_name:
    type: string
    minLength: 1
    maxLength: 255
  banner_content:
    nullable: true
  selected_banner_id:
    type: integer
    maximum: 9223372036854775807
    minimum: -9223372036854775808
    format: int64
    nullable: true
  theme_id:
    type: integer
    maximum: 9223372036854775807
    minimum: -9223372036854775808
    format: int64
    nullable: true
required:
- banner_name
- banner_type

```

**Responses:**
- **Status 201**: Banner created successfully.
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  banner_type:
    $ref: '#/components/schemas/BannerTypeEnum'
  banner_image:
    type: string
    format: uri
    nullable: true
  banner_name:
    type: string
    maxLength: 255
  banner_content:
    nullable: true
  selected_banner_id:
    type: integer
    maximum: 9223372036854775807
    minimum: -9223372036854775808
    format: int64
    nullable: true
  theme_id:
    type: integer
    maximum: 9223372036854775807
    minimum: -9223372036854775808
    format: int64
    nullable: true
required:
- banner_name
- banner_type
- id

    ```
- **Status 400**: Validation Error

---

## `GET /api/banner/{id}/`

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  banner_type:
    $ref: '#/components/schemas/BannerTypeEnum'
  banner_image:
    type: string
    format: uri
    nullable: true
  banner_name:
    type: string
    maxLength: 255
  banner_content:
    nullable: true
  selected_banner_id:
    type: integer
    maximum: 9223372036854775807
    minimum: -9223372036854775808
    format: int64
    nullable: true
  theme_id:
    type: integer
    maximum: 9223372036854775807
    minimum: -9223372036854775808
    format: int64
    nullable: true
required:
- banner_name
- banner_type
- id

    ```

---

## `PUT /api/banner/{id}/`

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  banner_type:
    $ref: '#/components/schemas/BannerTypeEnum'
  banner_image:
    type: string
    format: binary
    nullable: true
  banner_name:
    type: string
    minLength: 1
    maxLength: 255
  banner_content:
    nullable: true
  selected_banner_id:
    type: integer
    maximum: 9223372036854775807
    minimum: -9223372036854775808
    format: int64
    nullable: true
  theme_id:
    type: integer
    maximum: 9223372036854775807
    minimum: -9223372036854775808
    format: int64
    nullable: true
required:
- banner_name
- banner_type

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  banner_type:
    $ref: '#/components/schemas/BannerTypeEnum'
  banner_image:
    type: string
    format: binary
    nullable: true
  banner_name:
    type: string
    minLength: 1
    maxLength: 255
  banner_content:
    nullable: true
  selected_banner_id:
    type: integer
    maximum: 9223372036854775807
    minimum: -9223372036854775808
    format: int64
    nullable: true
  theme_id:
    type: integer
    maximum: 9223372036854775807
    minimum: -9223372036854775808
    format: int64
    nullable: true
required:
- banner_name
- banner_type

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  banner_type:
    $ref: '#/components/schemas/BannerTypeEnum'
  banner_image:
    type: string
    format: binary
    nullable: true
  banner_name:
    type: string
    minLength: 1
    maxLength: 255
  banner_content:
    nullable: true
  selected_banner_id:
    type: integer
    maximum: 9223372036854775807
    minimum: -9223372036854775808
    format: int64
    nullable: true
  theme_id:
    type: integer
    maximum: 9223372036854775807
    minimum: -9223372036854775808
    format: int64
    nullable: true
required:
- banner_name
- banner_type

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  banner_type:
    $ref: '#/components/schemas/BannerTypeEnum'
  banner_image:
    type: string
    format: uri
    nullable: true
  banner_name:
    type: string
    maxLength: 255
  banner_content:
    nullable: true
  selected_banner_id:
    type: integer
    maximum: 9223372036854775807
    minimum: -9223372036854775808
    format: int64
    nullable: true
  theme_id:
    type: integer
    maximum: 9223372036854775807
    minimum: -9223372036854775808
    format: int64
    nullable: true
required:
- banner_name
- banner_type
- id

    ```

---

## `PATCH /api/banner/{id}/`

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  banner_type:
    $ref: '#/components/schemas/BannerTypeEnum'
  banner_image:
    type: string
    format: binary
    nullable: true
  banner_name:
    type: string
    minLength: 1
    maxLength: 255
  banner_content:
    nullable: true
  selected_banner_id:
    type: integer
    maximum: 9223372036854775807
    minimum: -9223372036854775808
    format: int64
    nullable: true
  theme_id:
    type: integer
    maximum: 9223372036854775807
    minimum: -9223372036854775808
    format: int64
    nullable: true

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  banner_type:
    $ref: '#/components/schemas/BannerTypeEnum'
  banner_image:
    type: string
    format: binary
    nullable: true
  banner_name:
    type: string
    minLength: 1
    maxLength: 255
  banner_content:
    nullable: true
  selected_banner_id:
    type: integer
    maximum: 9223372036854775807
    minimum: -9223372036854775808
    format: int64
    nullable: true
  theme_id:
    type: integer
    maximum: 9223372036854775807
    minimum: -9223372036854775808
    format: int64
    nullable: true

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  banner_type:
    $ref: '#/components/schemas/BannerTypeEnum'
  banner_image:
    type: string
    format: binary
    nullable: true
  banner_name:
    type: string
    minLength: 1
    maxLength: 255
  banner_content:
    nullable: true
  selected_banner_id:
    type: integer
    maximum: 9223372036854775807
    minimum: -9223372036854775808
    format: int64
    nullable: true
  theme_id:
    type: integer
    maximum: 9223372036854775807
    minimum: -9223372036854775808
    format: int64
    nullable: true

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  banner_type:
    $ref: '#/components/schemas/BannerTypeEnum'
  banner_image:
    type: string
    format: uri
    nullable: true
  banner_name:
    type: string
    maxLength: 255
  banner_content:
    nullable: true
  selected_banner_id:
    type: integer
    maximum: 9223372036854775807
    minimum: -9223372036854775808
    format: int64
    nullable: true
  theme_id:
    type: integer
    maximum: 9223372036854775807
    minimum: -9223372036854775808
    format: int64
    nullable: true
required:
- banner_name
- banner_type
- id

    ```

---

## `DELETE /api/banner/{id}/`
**Summary:** Delete a banner

Deletes a banner by ID.

**Responses:**
- **Status 200**: Banner deleted successfully.

---

## `GET /api/discounts/`
**Summary:** List Discounts

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
required:
- count
- results
properties:
  count:
    type: integer
    example: 123
  next:
    type: string
    nullable: true
    format: uri
    example: http://api.example.org/accounts/?page=4
  previous:
    type: string
    nullable: true
    format: uri
    example: http://api.example.org/accounts/?page=2
  results:
    type: array
    items:
      $ref: '#/components/schemas/Discount'

    ```

---

## `POST /api/discounts/`

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  title:
    type: string
    minLength: 1
    maxLength: 255
  description:
    type: string
  start_date:
    type: string
    format: date-time
  end_date:
    type: string
    format: date-time
  terms_conditions:
    type: string
  status:
    $ref: '#/components/schemas/StatusEnum'
  discount_type:
    $ref: '#/components/schemas/DiscountTypeEnum'
  discount_percent:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,2})?$
  MainCategory:
    type: integer
    nullable: true
  SubCategory:
    type: integer
    nullable: true
required:
- discount_percent
- discount_type
- title

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  title:
    type: string
    minLength: 1
    maxLength: 255
  description:
    type: string
  start_date:
    type: string
    format: date-time
  end_date:
    type: string
    format: date-time
  terms_conditions:
    type: string
  status:
    $ref: '#/components/schemas/StatusEnum'
  discount_type:
    $ref: '#/components/schemas/DiscountTypeEnum'
  discount_percent:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,2})?$
  MainCategory:
    type: integer
    nullable: true
  SubCategory:
    type: integer
    nullable: true
required:
- discount_percent
- discount_type
- title

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  title:
    type: string
    minLength: 1
    maxLength: 255
  description:
    type: string
  start_date:
    type: string
    format: date-time
  end_date:
    type: string
    format: date-time
  terms_conditions:
    type: string
  status:
    $ref: '#/components/schemas/StatusEnum'
  discount_type:
    $ref: '#/components/schemas/DiscountTypeEnum'
  discount_percent:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,2})?$
  MainCategory:
    type: integer
    nullable: true
  SubCategory:
    type: integer
    nullable: true
required:
- discount_percent
- discount_type
- title

```

**Responses:**
- **Status 201**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  store:
    allOf:
    - $ref: '#/components/schemas/Store'
    readOnly: true
  tags:
    type: array
    items:
      $ref: '#/components/schemas/Tag'
    readOnly: true
  title:
    type: string
    maxLength: 255
  description:
    type: string
  start_date:
    type: string
    format: date-time
  end_date:
    type: string
    format: date-time
  terms_conditions:
    type: string
  status:
    $ref: '#/components/schemas/StatusEnum'
  is_active:
    type: boolean
    readOnly: true
  created_at:
    type: string
    format: date-time
    readOnly: true
  updated_at:
    type: string
    format: date-time
    readOnly: true
  discount_type:
    $ref: '#/components/schemas/DiscountTypeEnum'
  discount_percent:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,2})?$
  MainCategory:
    type: integer
    nullable: true
  SubCategory:
    type: integer
    nullable: true
required:
- created_at
- discount_percent
- discount_type
- id
- is_active
- store
- tags
- title
- updated_at

    ```

---

## `GET /api/discounts/{id}/`

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  store:
    allOf:
    - $ref: '#/components/schemas/Store'
    readOnly: true
  tags:
    type: array
    items:
      $ref: '#/components/schemas/Tag'
    readOnly: true
  title:
    type: string
    maxLength: 255
  description:
    type: string
  start_date:
    type: string
    format: date-time
  end_date:
    type: string
    format: date-time
  terms_conditions:
    type: string
  status:
    $ref: '#/components/schemas/StatusEnum'
  is_active:
    type: boolean
    readOnly: true
  created_at:
    type: string
    format: date-time
    readOnly: true
  updated_at:
    type: string
    format: date-time
    readOnly: true
  discount_type:
    $ref: '#/components/schemas/DiscountTypeEnum'
  discount_percent:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,2})?$
  MainCategory:
    type: integer
    nullable: true
  SubCategory:
    type: integer
    nullable: true
required:
- created_at
- discount_percent
- discount_type
- id
- is_active
- store
- tags
- title
- updated_at

    ```

---

## `PUT /api/discounts/{id}/`
**Summary:** Update Discount

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  title:
    type: string
    minLength: 1
    maxLength: 255
  description:
    type: string
  start_date:
    type: string
    format: date-time
  end_date:
    type: string
    format: date-time
  terms_conditions:
    type: string
  status:
    $ref: '#/components/schemas/StatusEnum'
  discount_type:
    $ref: '#/components/schemas/DiscountTypeEnum'
  discount_percent:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,2})?$
  MainCategory:
    type: integer
    nullable: true
  SubCategory:
    type: integer
    nullable: true
required:
- discount_percent
- discount_type
- title

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  title:
    type: string
    minLength: 1
    maxLength: 255
  description:
    type: string
  start_date:
    type: string
    format: date-time
  end_date:
    type: string
    format: date-time
  terms_conditions:
    type: string
  status:
    $ref: '#/components/schemas/StatusEnum'
  discount_type:
    $ref: '#/components/schemas/DiscountTypeEnum'
  discount_percent:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,2})?$
  MainCategory:
    type: integer
    nullable: true
  SubCategory:
    type: integer
    nullable: true
required:
- discount_percent
- discount_type
- title

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  title:
    type: string
    minLength: 1
    maxLength: 255
  description:
    type: string
  start_date:
    type: string
    format: date-time
  end_date:
    type: string
    format: date-time
  terms_conditions:
    type: string
  status:
    $ref: '#/components/schemas/StatusEnum'
  discount_type:
    $ref: '#/components/schemas/DiscountTypeEnum'
  discount_percent:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,2})?$
  MainCategory:
    type: integer
    nullable: true
  SubCategory:
    type: integer
    nullable: true
required:
- discount_percent
- discount_type
- title

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  store:
    allOf:
    - $ref: '#/components/schemas/Store'
    readOnly: true
  tags:
    type: array
    items:
      $ref: '#/components/schemas/Tag'
    readOnly: true
  title:
    type: string
    maxLength: 255
  description:
    type: string
  start_date:
    type: string
    format: date-time
  end_date:
    type: string
    format: date-time
  terms_conditions:
    type: string
  status:
    $ref: '#/components/schemas/StatusEnum'
  is_active:
    type: boolean
    readOnly: true
  created_at:
    type: string
    format: date-time
    readOnly: true
  updated_at:
    type: string
    format: date-time
    readOnly: true
  discount_type:
    $ref: '#/components/schemas/DiscountTypeEnum'
  discount_percent:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,2})?$
  MainCategory:
    type: integer
    nullable: true
  SubCategory:
    type: integer
    nullable: true
required:
- created_at
- discount_percent
- discount_type
- id
- is_active
- store
- tags
- title
- updated_at

    ```

---

## `PATCH /api/discounts/{id}/`

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  title:
    type: string
    minLength: 1
    maxLength: 255
  description:
    type: string
  start_date:
    type: string
    format: date-time
  end_date:
    type: string
    format: date-time
  terms_conditions:
    type: string
  status:
    $ref: '#/components/schemas/StatusEnum'
  discount_type:
    $ref: '#/components/schemas/DiscountTypeEnum'
  discount_percent:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,2})?$
  MainCategory:
    type: integer
    nullable: true
  SubCategory:
    type: integer
    nullable: true

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  title:
    type: string
    minLength: 1
    maxLength: 255
  description:
    type: string
  start_date:
    type: string
    format: date-time
  end_date:
    type: string
    format: date-time
  terms_conditions:
    type: string
  status:
    $ref: '#/components/schemas/StatusEnum'
  discount_type:
    $ref: '#/components/schemas/DiscountTypeEnum'
  discount_percent:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,2})?$
  MainCategory:
    type: integer
    nullable: true
  SubCategory:
    type: integer
    nullable: true

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  title:
    type: string
    minLength: 1
    maxLength: 255
  description:
    type: string
  start_date:
    type: string
    format: date-time
  end_date:
    type: string
    format: date-time
  terms_conditions:
    type: string
  status:
    $ref: '#/components/schemas/StatusEnum'
  discount_type:
    $ref: '#/components/schemas/DiscountTypeEnum'
  discount_percent:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,2})?$
  MainCategory:
    type: integer
    nullable: true
  SubCategory:
    type: integer
    nullable: true

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  store:
    allOf:
    - $ref: '#/components/schemas/Store'
    readOnly: true
  tags:
    type: array
    items:
      $ref: '#/components/schemas/Tag'
    readOnly: true
  title:
    type: string
    maxLength: 255
  description:
    type: string
  start_date:
    type: string
    format: date-time
  end_date:
    type: string
    format: date-time
  terms_conditions:
    type: string
  status:
    $ref: '#/components/schemas/StatusEnum'
  is_active:
    type: boolean
    readOnly: true
  created_at:
    type: string
    format: date-time
    readOnly: true
  updated_at:
    type: string
    format: date-time
    readOnly: true
  discount_type:
    $ref: '#/components/schemas/DiscountTypeEnum'
  discount_percent:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,2})?$
  MainCategory:
    type: integer
    nullable: true
  SubCategory:
    type: integer
    nullable: true
required:
- created_at
- discount_percent
- discount_type
- id
- is_active
- store
- tags
- title
- updated_at

    ```

---

## `DELETE /api/discounts/{id}/`

**Responses:**
- **Status 204**: No response body

---

## `GET /api/discounts/{id}/products/`
**Summary:** Get Products for a Discount

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  discount:
    allOf:
    - $ref: '#/components/schemas/Discount'
    readOnly: true
  product:
    allOf:
    - $ref: '#/components/schemas/DiscountItem'
    readOnly: true
required:
- discount
- id
- product

    ```

---

## `GET /api/discounts/active/products/`
**Summary:** List Stores with Active Discounts (Summary)

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  discount:
    allOf:
    - $ref: '#/components/schemas/Discount'
    readOnly: true
  product:
    allOf:
    - $ref: '#/components/schemas/DiscountItem'
    readOnly: true
required:
- discount
- id
- product

    ```

---

## `POST /api/discounts/add-products/`
**Summary:** Add Items to Discount (Store only)

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  discount_id:
    type: integer
  product_ids:
    type: array
    items:
      type: integer
  new_products:
    type: array
    items:
      $ref: '#/components/schemas/ItemRequest'
required:
- discount_id

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  discount_id:
    type: integer
  product_ids:
    type: array
    items:
      type: integer
  new_products:
    type: array
    items:
      $ref: '#/components/schemas/ItemRequest'
required:
- discount_id

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  discount_id:
    type: integer
  product_ids:
    type: array
    items:
      type: integer
  new_products:
    type: array
    items:
      $ref: '#/components/schemas/ItemRequest'
required:
- discount_id

```

**Responses:**
- **Status 200**: Products added to discount successfully.

---

## `GET /api/discounts/status/active/`
**Summary:** Active Discounts for Customers

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  store:
    allOf:
    - $ref: '#/components/schemas/Store'
    readOnly: true
  tags:
    type: array
    items:
      $ref: '#/components/schemas/Tag'
    readOnly: true
  title:
    type: string
    maxLength: 255
  description:
    type: string
  start_date:
    type: string
    format: date-time
  end_date:
    type: string
    format: date-time
  terms_conditions:
    type: string
  status:
    $ref: '#/components/schemas/StatusEnum'
  is_active:
    type: boolean
    readOnly: true
  created_at:
    type: string
    format: date-time
    readOnly: true
  updated_at:
    type: string
    format: date-time
    readOnly: true
  discount_type:
    $ref: '#/components/schemas/DiscountTypeEnum'
  discount_percent:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,2})?$
  MainCategory:
    type: integer
    nullable: true
  SubCategory:
    type: integer
    nullable: true
required:
- created_at
- discount_percent
- discount_type
- id
- is_active
- store
- tags
- title
- updated_at

    ```

---

## `GET /api/discounts/store/{store_id}/`
**Summary:** Discounts by Store

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  store:
    allOf:
    - $ref: '#/components/schemas/Store'
    readOnly: true
  tags:
    type: array
    items:
      $ref: '#/components/schemas/Tag'
    readOnly: true
  title:
    type: string
    maxLength: 255
  description:
    type: string
  start_date:
    type: string
    format: date-time
  end_date:
    type: string
    format: date-time
  terms_conditions:
    type: string
  status:
    $ref: '#/components/schemas/StatusEnum'
  is_active:
    type: boolean
    readOnly: true
  created_at:
    type: string
    format: date-time
    readOnly: true
  updated_at:
    type: string
    format: date-time
    readOnly: true
  discount_type:
    $ref: '#/components/schemas/DiscountTypeEnum'
  discount_percent:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,2})?$
  MainCategory:
    type: integer
    nullable: true
  SubCategory:
    type: integer
    nullable: true
required:
- created_at
- discount_percent
- discount_type
- id
- is_active
- store
- tags
- title
- updated_at

    ```

---

## `GET /api/favorites/`

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
required:
- count
- results
properties:
  count:
    type: integer
    example: 123
  next:
    type: string
    nullable: true
    format: uri
    example: http://api.example.org/accounts/?page=4
  previous:
    type: string
    nullable: true
    format: uri
    example: http://api.example.org/accounts/?page=2
  results:
    type: array
    items:
      $ref: '#/components/schemas/Favorite'

    ```

---

## `POST /api/favorites/`

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  store:
    type: integer
  item:
    type: integer
required:
- item
- store

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  store:
    type: integer
  item:
    type: integer
required:
- item
- store

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  store:
    type: integer
  item:
    type: integer
required:
- item
- store

```

**Responses:**
- **Status 201**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  created_at:
    type: string
    format: date-time
    readOnly: true
  user:
    type: integer
    readOnly: true
  store:
    type: integer
  item:
    type: integer
required:
- created_at
- id
- item
- store
- user

    ```

---

## `GET /api/favorites/{id}/`

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  created_at:
    type: string
    format: date-time
    readOnly: true
  user:
    type: integer
    readOnly: true
  store:
    type: integer
  item:
    type: integer
required:
- created_at
- id
- item
- store
- user

    ```

---

## `PUT /api/favorites/{id}/`

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  store:
    type: integer
  item:
    type: integer
required:
- item
- store

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  store:
    type: integer
  item:
    type: integer
required:
- item
- store

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  store:
    type: integer
  item:
    type: integer
required:
- item
- store

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  created_at:
    type: string
    format: date-time
    readOnly: true
  user:
    type: integer
    readOnly: true
  store:
    type: integer
  item:
    type: integer
required:
- created_at
- id
- item
- store
- user

    ```

---

## `PATCH /api/favorites/{id}/`

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  store:
    type: integer
  item:
    type: integer

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  store:
    type: integer
  item:
    type: integer

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  store:
    type: integer
  item:
    type: integer

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  created_at:
    type: string
    format: date-time
    readOnly: true
  user:
    type: integer
    readOnly: true
  store:
    type: integer
  item:
    type: integer
required:
- created_at
- id
- item
- store
- user

    ```

---

## `DELETE /api/favorites/{id}/`
**Summary:** Remove from Favorites

Deletes a favorite item (product or discount) for the authenticated user.

**Responses:**
- **Status 200**: Favorite removed successfully.

---

## `GET /api/item/api/`

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
required:
- count
- results
properties:
  count:
    type: integer
    example: 123
  next:
    type: string
    nullable: true
    format: uri
    example: http://api.example.org/accounts/?page=4
  previous:
    type: string
    nullable: true
    format: uri
    example: http://api.example.org/accounts/?page=2
  results:
    type: array
    items:
      $ref: '#/components/schemas/Item'

    ```

---

## `GET /api/item/api/{id}/`

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  main_category:
    type: integer
  sub_category:
    type: integer
  image:
    type: string
    format: uri
  name:
    type: string
    maxLength: 500
  description:
    type: string
    nullable: true
  fixed_price_drop:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    nullable: true
  price:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    nullable: true
  discounted_price:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    readOnly: true
  store_admin:
    type: integer
    readOnly: true
required:
- discounted_price
- id
- main_category
- name
- store_admin
- sub_category

    ```

---

## `GET /api/item/api/filter/`
**Summary:** List Items by Main and Sub Category

Returns items filtered by optional `main_category` and `sub_category` query parameters. If no filters are provided, returns all items.

**Responses:**
- **Status 200**: Filtered item list
  - **Content-Type:** `application/json`

---

## `GET /api/items/`

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
required:
- count
- results
properties:
  count:
    type: integer
    example: 123
  next:
    type: string
    nullable: true
    format: uri
    example: http://api.example.org/accounts/?page=4
  previous:
    type: string
    nullable: true
    format: uri
    example: http://api.example.org/accounts/?page=2
  results:
    type: array
    items:
      $ref: '#/components/schemas/Item'

    ```

---

## `POST /api/items/`
**Summary:** Create an Item (Only by Superuser)

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  main_category:
    type: integer
  sub_category:
    type: integer
  image:
    type: string
    format: binary
  name:
    type: string
    minLength: 1
    maxLength: 500
  description:
    type: string
    nullable: true
  fixed_price_drop:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    nullable: true
  price:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    nullable: true
required:
- main_category
- name
- sub_category

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  main_category:
    type: integer
  sub_category:
    type: integer
  image:
    type: string
    format: binary
  name:
    type: string
    minLength: 1
    maxLength: 500
  description:
    type: string
    nullable: true
  fixed_price_drop:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    nullable: true
  price:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    nullable: true
required:
- main_category
- name
- sub_category

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  main_category:
    type: integer
  sub_category:
    type: integer
  image:
    type: string
    format: binary
  name:
    type: string
    minLength: 1
    maxLength: 500
  description:
    type: string
    nullable: true
  fixed_price_drop:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    nullable: true
  price:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    nullable: true
required:
- main_category
- name
- sub_category

```

**Responses:**
- **Status 201**: Item created.
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  main_category:
    type: integer
  sub_category:
    type: integer
  image:
    type: string
    format: uri
  name:
    type: string
    maxLength: 500
  description:
    type: string
    nullable: true
  fixed_price_drop:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    nullable: true
  price:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    nullable: true
  discounted_price:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    readOnly: true
  store_admin:
    type: integer
    readOnly: true
required:
- discounted_price
- id
- main_category
- name
- store_admin
- sub_category

    ```
- **Status 400**: Validation error.
- **Status 403**: Permission denied.

---

## `GET /api/items/{id}/`

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  main_category:
    type: integer
  sub_category:
    type: integer
  image:
    type: string
    format: uri
  name:
    type: string
    maxLength: 500
  description:
    type: string
    nullable: true
  fixed_price_drop:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    nullable: true
  price:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    nullable: true
  discounted_price:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    readOnly: true
  store_admin:
    type: integer
    readOnly: true
required:
- discounted_price
- id
- main_category
- name
- store_admin
- sub_category

    ```

---

## `PUT /api/items/{id}/`

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  main_category:
    type: integer
  sub_category:
    type: integer
  image:
    type: string
    format: binary
  name:
    type: string
    minLength: 1
    maxLength: 500
  description:
    type: string
    nullable: true
  fixed_price_drop:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    nullable: true
  price:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    nullable: true
required:
- main_category
- name
- sub_category

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  main_category:
    type: integer
  sub_category:
    type: integer
  image:
    type: string
    format: binary
  name:
    type: string
    minLength: 1
    maxLength: 500
  description:
    type: string
    nullable: true
  fixed_price_drop:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    nullable: true
  price:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    nullable: true
required:
- main_category
- name
- sub_category

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  main_category:
    type: integer
  sub_category:
    type: integer
  image:
    type: string
    format: binary
  name:
    type: string
    minLength: 1
    maxLength: 500
  description:
    type: string
    nullable: true
  fixed_price_drop:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    nullable: true
  price:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    nullable: true
required:
- main_category
- name
- sub_category

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  main_category:
    type: integer
  sub_category:
    type: integer
  image:
    type: string
    format: uri
  name:
    type: string
    maxLength: 500
  description:
    type: string
    nullable: true
  fixed_price_drop:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    nullable: true
  price:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    nullable: true
  discounted_price:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    readOnly: true
  store_admin:
    type: integer
    readOnly: true
required:
- discounted_price
- id
- main_category
- name
- store_admin
- sub_category

    ```

---

## `PATCH /api/items/{id}/`

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  main_category:
    type: integer
  sub_category:
    type: integer
  image:
    type: string
    format: binary
  name:
    type: string
    minLength: 1
    maxLength: 500
  description:
    type: string
    nullable: true
  fixed_price_drop:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    nullable: true
  price:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    nullable: true

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  main_category:
    type: integer
  sub_category:
    type: integer
  image:
    type: string
    format: binary
  name:
    type: string
    minLength: 1
    maxLength: 500
  description:
    type: string
    nullable: true
  fixed_price_drop:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    nullable: true
  price:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    nullable: true

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  main_category:
    type: integer
  sub_category:
    type: integer
  image:
    type: string
    format: binary
  name:
    type: string
    minLength: 1
    maxLength: 500
  description:
    type: string
    nullable: true
  fixed_price_drop:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    nullable: true
  price:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    nullable: true

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  main_category:
    type: integer
  sub_category:
    type: integer
  image:
    type: string
    format: uri
  name:
    type: string
    maxLength: 500
  description:
    type: string
    nullable: true
  fixed_price_drop:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    nullable: true
  price:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    nullable: true
  discounted_price:
    type: string
    format: decimal
    pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
    readOnly: true
  store_admin:
    type: integer
    readOnly: true
required:
- discounted_price
- id
- main_category
- name
- store_admin
- sub_category

    ```

---

## `DELETE /api/items/{id}/`
**Summary:** Delete an Item

Deletes an item by ID if it exists. Only accessible to authenticated users.

**Responses:**
- **Status 200**: Item deleted successfully.
  - **Content-Type:** `application/json`

---

## `GET /api/items/search_all/`
**Summary:** Search by main_category, sub_category, or product name

Returns items with category and discount details based on filters.

**Responses:**
- **Status 200**: Filtered items with category and discount data.
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  message:
    type: string
  data:
    type: array
    items:
      $ref: '#/components/schemas/ItemDetails'
required:
- data
- message

    ```

---

## `GET /api/items/store/{store_id}/`
**Summary:** Get Items by Store

Retrieve all items for a specific store by store ID.

**Responses:**
- **Status 200**: List of items
  - **Content-Type:** `application/json`
    ```json
type: object
required:
- count
- results
properties:
  count:
    type: integer
    example: 123
  next:
    type: string
    nullable: true
    format: uri
    example: http://api.example.org/accounts/?page=4
  previous:
    type: string
    nullable: true
    format: uri
    example: http://api.example.org/accounts/?page=2
  results:
    type: array
    items:
      $ref: '#/components/schemas/Item'

    ```
- **Status 404**: No items found for the given store ID

---

## `GET /api/main-categories/`

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
required:
- count
- results
properties:
  count:
    type: integer
    example: 123
  next:
    type: string
    nullable: true
    format: uri
    example: http://api.example.org/accounts/?page=4
  previous:
    type: string
    nullable: true
    format: uri
    example: http://api.example.org/accounts/?page=2
  results:
    type: array
    items:
      $ref: '#/components/schemas/MainCategory'

    ```

---

## `POST /api/main-categories/`
**Summary:** Create a Main Category

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
required:
- name

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
required:
- name

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
required:
- name

```

**Responses:**
- **Status 201**: Main category created.
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  name:
    type: string
    maxLength: 255
required:
- id
- name

    ```
- **Status 400**: Validation error.

---

## `GET /api/main-categories/{id}/`

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  name:
    type: string
    maxLength: 255
required:
- id
- name

    ```

---

## `PUT /api/main-categories/{id}/`

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
required:
- name

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
required:
- name

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
required:
- name

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  name:
    type: string
    maxLength: 255
required:
- id
- name

    ```

---

## `PATCH /api/main-categories/{id}/`

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  name:
    type: string
    maxLength: 255
required:
- id
- name

    ```

---

## `DELETE /api/main-categories/{id}/`
**Summary:** Delete a Main Category

Deletes a main category by ID.

**Responses:**
- **Status 200**: Main category deleted successfully.
  - **Content-Type:** `application/json`
- **Status 404**: Main category not found.
  - **Content-Type:** `application/json`

---

## `GET /api/me/`
**Summary:** Get Authenticated User Info

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  email:
    type: string
    format: email
    maxLength: 254
  first_name:
    type: string
    maxLength: 150
  last_name:
    type: string
    maxLength: 150
  user_type:
    $ref: '#/components/schemas/UserTypeEnum'
  profile_image:
    type: string
    format: uri
    nullable: true
  store:
    allOf:
    - $ref: '#/components/schemas/Store'
    readOnly: true
required:
- email
- id
- store

    ```

---

## `PATCH /api/me/`
**Summary:** Update Profile Image

Allows the authenticated user to upload or update their profile image.

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  profile_image:
    type: string
    format: binary
    nullable: true

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  profile_image:
    type: string
    format: binary
    nullable: true

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  profile_image:
    type: string
    format: binary
    nullable: true

```

**Responses:**
- **Status 200**: Profile image updated successfully
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  profile_image:
    type: string
    format: uri
    nullable: true

    ```
- **Status 400**: Invalid image or no image provided

---

## `GET /api/orders/`

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
required:
- count
- results
properties:
  count:
    type: integer
    example: 123
  next:
    type: string
    nullable: true
    format: uri
    example: http://api.example.org/accounts/?page=4
  previous:
    type: string
    nullable: true
    format: uri
    example: http://api.example.org/accounts/?page=2
  results:
    type: array
    items:
      $ref: '#/components/schemas/Order'

    ```

---

## `POST /api/orders/`

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  store_id:
    type: integer
    writeOnly: true
  order_type:
    $ref: '#/components/schemas/OrderTypeEnum'
  note:
    type: string
    nullable: true
  customer_contact:
    type: string
    minLength: 1
    maxLength: 20
  items:
    type: array
    items:
      $ref: '#/components/schemas/OrderItemRequest'
required:
- customer_contact
- items
- order_type
- store_id

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  store_id:
    type: integer
    writeOnly: true
  order_type:
    $ref: '#/components/schemas/OrderTypeEnum'
  note:
    type: string
    nullable: true
  customer_contact:
    type: string
    minLength: 1
    maxLength: 20
  items:
    type: array
    items:
      $ref: '#/components/schemas/OrderItemRequest'
required:
- customer_contact
- items
- order_type
- store_id

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  store_id:
    type: integer
    writeOnly: true
  order_type:
    $ref: '#/components/schemas/OrderTypeEnum'
  note:
    type: string
    nullable: true
  customer_contact:
    type: string
    minLength: 1
    maxLength: 20
  items:
    type: array
    items:
      $ref: '#/components/schemas/OrderItemRequest'
required:
- customer_contact
- items
- order_type
- store_id

```

**Responses:**
- **Status 201**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  order_type:
    $ref: '#/components/schemas/OrderTypeEnum'
  note:
    type: string
    nullable: true
  customer_contact:
    type: string
    maxLength: 20
  items:
    type: array
    items:
      $ref: '#/components/schemas/OrderItem'
  created_at:
    type: string
    format: date-time
    readOnly: true
required:
- created_at
- customer_contact
- id
- items
- order_type

    ```

---

## `GET /api/orders/{id}/`

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  order_type:
    $ref: '#/components/schemas/OrderTypeEnum'
  note:
    type: string
    nullable: true
  customer_contact:
    type: string
    maxLength: 20
  items:
    type: array
    items:
      $ref: '#/components/schemas/OrderItem'
  created_at:
    type: string
    format: date-time
    readOnly: true
required:
- created_at
- customer_contact
- id
- items
- order_type

    ```

---

## `PUT /api/orders/{id}/`

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  store_id:
    type: integer
    writeOnly: true
  order_type:
    $ref: '#/components/schemas/OrderTypeEnum'
  note:
    type: string
    nullable: true
  customer_contact:
    type: string
    minLength: 1
    maxLength: 20
  items:
    type: array
    items:
      $ref: '#/components/schemas/OrderItemRequest'
required:
- customer_contact
- items
- order_type
- store_id

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  store_id:
    type: integer
    writeOnly: true
  order_type:
    $ref: '#/components/schemas/OrderTypeEnum'
  note:
    type: string
    nullable: true
  customer_contact:
    type: string
    minLength: 1
    maxLength: 20
  items:
    type: array
    items:
      $ref: '#/components/schemas/OrderItemRequest'
required:
- customer_contact
- items
- order_type
- store_id

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  store_id:
    type: integer
    writeOnly: true
  order_type:
    $ref: '#/components/schemas/OrderTypeEnum'
  note:
    type: string
    nullable: true
  customer_contact:
    type: string
    minLength: 1
    maxLength: 20
  items:
    type: array
    items:
      $ref: '#/components/schemas/OrderItemRequest'
required:
- customer_contact
- items
- order_type
- store_id

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  order_type:
    $ref: '#/components/schemas/OrderTypeEnum'
  note:
    type: string
    nullable: true
  customer_contact:
    type: string
    maxLength: 20
  items:
    type: array
    items:
      $ref: '#/components/schemas/OrderItem'
  created_at:
    type: string
    format: date-time
    readOnly: true
required:
- created_at
- customer_contact
- id
- items
- order_type

    ```

---

## `PATCH /api/orders/{id}/`

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  store_id:
    type: integer
    writeOnly: true
  order_type:
    $ref: '#/components/schemas/OrderTypeEnum'
  note:
    type: string
    nullable: true
  customer_contact:
    type: string
    minLength: 1
    maxLength: 20
  items:
    type: array
    items:
      $ref: '#/components/schemas/OrderItemRequest'

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  store_id:
    type: integer
    writeOnly: true
  order_type:
    $ref: '#/components/schemas/OrderTypeEnum'
  note:
    type: string
    nullable: true
  customer_contact:
    type: string
    minLength: 1
    maxLength: 20
  items:
    type: array
    items:
      $ref: '#/components/schemas/OrderItemRequest'

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  store_id:
    type: integer
    writeOnly: true
  order_type:
    $ref: '#/components/schemas/OrderTypeEnum'
  note:
    type: string
    nullable: true
  customer_contact:
    type: string
    minLength: 1
    maxLength: 20
  items:
    type: array
    items:
      $ref: '#/components/schemas/OrderItemRequest'

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  order_type:
    $ref: '#/components/schemas/OrderTypeEnum'
  note:
    type: string
    nullable: true
  customer_contact:
    type: string
    maxLength: 20
  items:
    type: array
    items:
      $ref: '#/components/schemas/OrderItem'
  created_at:
    type: string
    format: date-time
    readOnly: true
required:
- created_at
- customer_contact
- id
- items
- order_type

    ```

---

## `DELETE /api/orders/{id}/`

**Responses:**
- **Status 204**: No response body

---

## `GET /api/orders/stores/{store_id}/orders/`

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  order_type:
    $ref: '#/components/schemas/OrderTypeEnum'
  note:
    type: string
    nullable: true
  customer_contact:
    type: string
    maxLength: 20
  items:
    type: array
    items:
      $ref: '#/components/schemas/OrderItem'
  created_at:
    type: string
    format: date-time
    readOnly: true
required:
- created_at
- customer_contact
- id
- items
- order_type

    ```

---

## `POST /api/referral/generate/`

**Responses:**
- **Status 200**: No response body

---

## `GET /api/referral/stats/`

**Responses:**
- **Status 200**: No response body

---

## `GET /api/stores/`

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
required:
- count
- results
properties:
  count:
    type: integer
    example: 123
  next:
    type: string
    nullable: true
    format: uri
    example: http://api.example.org/accounts/?page=4
  previous:
    type: string
    nullable: true
    format: uri
    example: http://api.example.org/accounts/?page=2
  results:
    type: array
    items:
      $ref: '#/components/schemas/Store'

    ```

---

## `POST /api/stores/`
**Summary:** Create Store

Submit a store registration request. Only authenticated users can register stores.

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    minLength: 1
    maxLength: 50
  district:
    type: string
    minLength: 1
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
    minLength: 1
  phone:
    type: string
    minLength: 1
    maxLength: 20
  email:
    type: string
    format: email
    minLength: 1
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    minLength: 1
    maxLength: 100
  documents:
    type: string
    format: binary
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: binary
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- district
- email
- name
- phone
- store_type
- user

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    minLength: 1
    maxLength: 50
  district:
    type: string
    minLength: 1
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
    minLength: 1
  phone:
    type: string
    minLength: 1
    maxLength: 20
  email:
    type: string
    format: email
    minLength: 1
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    minLength: 1
    maxLength: 100
  documents:
    type: string
    format: binary
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: binary
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- district
- email
- name
- phone
- store_type
- user

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    minLength: 1
    maxLength: 50
  district:
    type: string
    minLength: 1
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
    minLength: 1
  phone:
    type: string
    minLength: 1
    maxLength: 20
  email:
    type: string
    format: email
    minLength: 1
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    minLength: 1
    maxLength: 100
  documents:
    type: string
    format: binary
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: binary
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- district
- email
- name
- phone
- store_type
- user

```

**Responses:**
- **Status 201**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  logo:
    type: string
    format: uri
    readOnly: true
  name:
    type: string
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    maxLength: 50
  district:
    type: string
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
  phone:
    type: string
    maxLength: 20
  email:
    type: string
    format: email
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  created_at:
    type: string
    format: date-time
    readOnly: true
  updated_at:
    type: string
    format: date-time
    readOnly: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    maxLength: 100
  documents:
    type: string
    format: uri
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: uri
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- created_at
- district
- email
- id
- logo
- name
- phone
- store_type
- updated_at
- user

    ```

---

## `GET /api/stores/{id}/`

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  logo:
    type: string
    format: uri
    readOnly: true
  name:
    type: string
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    maxLength: 50
  district:
    type: string
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
  phone:
    type: string
    maxLength: 20
  email:
    type: string
    format: email
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  created_at:
    type: string
    format: date-time
    readOnly: true
  updated_at:
    type: string
    format: date-time
    readOnly: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    maxLength: 100
  documents:
    type: string
    format: uri
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: uri
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- created_at
- district
- email
- id
- logo
- name
- phone
- store_type
- updated_at
- user

    ```

---

## `PUT /api/stores/{id}/`
**Summary:** Update Store

Update store details. Only superusers can change verification status.

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    minLength: 1
    maxLength: 50
  district:
    type: string
    minLength: 1
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
    minLength: 1
  phone:
    type: string
    minLength: 1
    maxLength: 20
  email:
    type: string
    format: email
    minLength: 1
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    minLength: 1
    maxLength: 100
  documents:
    type: string
    format: binary
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: binary
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- district
- email
- name
- phone
- store_type
- user

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    minLength: 1
    maxLength: 50
  district:
    type: string
    minLength: 1
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
    minLength: 1
  phone:
    type: string
    minLength: 1
    maxLength: 20
  email:
    type: string
    format: email
    minLength: 1
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    minLength: 1
    maxLength: 100
  documents:
    type: string
    format: binary
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: binary
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- district
- email
- name
- phone
- store_type
- user

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    minLength: 1
    maxLength: 50
  district:
    type: string
    minLength: 1
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
    minLength: 1
  phone:
    type: string
    minLength: 1
    maxLength: 20
  email:
    type: string
    format: email
    minLength: 1
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    minLength: 1
    maxLength: 100
  documents:
    type: string
    format: binary
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: binary
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- district
- email
- name
- phone
- store_type
- user

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  logo:
    type: string
    format: uri
    readOnly: true
  name:
    type: string
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    maxLength: 50
  district:
    type: string
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
  phone:
    type: string
    maxLength: 20
  email:
    type: string
    format: email
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  created_at:
    type: string
    format: date-time
    readOnly: true
  updated_at:
    type: string
    format: date-time
    readOnly: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    maxLength: 100
  documents:
    type: string
    format: uri
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: uri
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- created_at
- district
- email
- id
- logo
- name
- phone
- store_type
- updated_at
- user

    ```

---

## `PATCH /api/stores/{id}/`

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    minLength: 1
    maxLength: 50
  district:
    type: string
    minLength: 1
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
    minLength: 1
  phone:
    type: string
    minLength: 1
    maxLength: 20
  email:
    type: string
    format: email
    minLength: 1
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    minLength: 1
    maxLength: 100
  documents:
    type: string
    format: binary
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: binary
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    minLength: 1
    maxLength: 50
  district:
    type: string
    minLength: 1
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
    minLength: 1
  phone:
    type: string
    minLength: 1
    maxLength: 20
  email:
    type: string
    format: email
    minLength: 1
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    minLength: 1
    maxLength: 100
  documents:
    type: string
    format: binary
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: binary
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    minLength: 1
    maxLength: 50
  district:
    type: string
    minLength: 1
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
    minLength: 1
  phone:
    type: string
    minLength: 1
    maxLength: 20
  email:
    type: string
    format: email
    minLength: 1
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    minLength: 1
    maxLength: 100
  documents:
    type: string
    format: binary
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: binary
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  logo:
    type: string
    format: uri
    readOnly: true
  name:
    type: string
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    maxLength: 50
  district:
    type: string
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
  phone:
    type: string
    maxLength: 20
  email:
    type: string
    format: email
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  created_at:
    type: string
    format: date-time
    readOnly: true
  updated_at:
    type: string
    format: date-time
    readOnly: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    maxLength: 100
  documents:
    type: string
    format: uri
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: uri
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- created_at
- district
- email
- id
- logo
- name
- phone
- store_type
- updated_at
- user

    ```

---

## `DELETE /api/stores/{id}/`
**Summary:** Delete Store

Delete a store by ID. Only allowed if the user has access.

**Responses:**
- **Status 200**: Store deleted successfully.
  - **Content-Type:** `application/json`

---

## `GET /api/stores/{id}/analytics/`

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  logo:
    type: string
    format: uri
    readOnly: true
  name:
    type: string
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    maxLength: 50
  district:
    type: string
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
  phone:
    type: string
    maxLength: 20
  email:
    type: string
    format: email
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  created_at:
    type: string
    format: date-time
    readOnly: true
  updated_at:
    type: string
    format: date-time
    readOnly: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    maxLength: 100
  documents:
    type: string
    format: uri
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: uri
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- created_at
- district
- email
- id
- logo
- name
- phone
- store_type
- updated_at
- user

    ```

---

## `POST /api/stores/{id}/events/`

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    minLength: 1
    maxLength: 50
  district:
    type: string
    minLength: 1
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
    minLength: 1
  phone:
    type: string
    minLength: 1
    maxLength: 20
  email:
    type: string
    format: email
    minLength: 1
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    minLength: 1
    maxLength: 100
  documents:
    type: string
    format: binary
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: binary
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- district
- email
- name
- phone
- store_type
- user

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    minLength: 1
    maxLength: 50
  district:
    type: string
    minLength: 1
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
    minLength: 1
  phone:
    type: string
    minLength: 1
    maxLength: 20
  email:
    type: string
    format: email
    minLength: 1
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    minLength: 1
    maxLength: 100
  documents:
    type: string
    format: binary
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: binary
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- district
- email
- name
- phone
- store_type
- user

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    minLength: 1
    maxLength: 50
  district:
    type: string
    minLength: 1
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
    minLength: 1
  phone:
    type: string
    minLength: 1
    maxLength: 20
  email:
    type: string
    format: email
    minLength: 1
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    minLength: 1
    maxLength: 100
  documents:
    type: string
    format: binary
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: binary
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- district
- email
- name
- phone
- store_type
- user

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  logo:
    type: string
    format: uri
    readOnly: true
  name:
    type: string
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    maxLength: 50
  district:
    type: string
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
  phone:
    type: string
    maxLength: 20
  email:
    type: string
    format: email
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  created_at:
    type: string
    format: date-time
    readOnly: true
  updated_at:
    type: string
    format: date-time
    readOnly: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    maxLength: 100
  documents:
    type: string
    format: uri
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: uri
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- created_at
- district
- email
- id
- logo
- name
- phone
- store_type
- updated_at
- user

    ```

---

## `POST /api/stores/{id}/follow/`

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    minLength: 1
    maxLength: 50
  district:
    type: string
    minLength: 1
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
    minLength: 1
  phone:
    type: string
    minLength: 1
    maxLength: 20
  email:
    type: string
    format: email
    minLength: 1
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    minLength: 1
    maxLength: 100
  documents:
    type: string
    format: binary
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: binary
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- district
- email
- name
- phone
- store_type
- user

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    minLength: 1
    maxLength: 50
  district:
    type: string
    minLength: 1
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
    minLength: 1
  phone:
    type: string
    minLength: 1
    maxLength: 20
  email:
    type: string
    format: email
    minLength: 1
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    minLength: 1
    maxLength: 100
  documents:
    type: string
    format: binary
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: binary
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- district
- email
- name
- phone
- store_type
- user

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    minLength: 1
    maxLength: 50
  district:
    type: string
    minLength: 1
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
    minLength: 1
  phone:
    type: string
    minLength: 1
    maxLength: 20
  email:
    type: string
    format: email
    minLength: 1
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    minLength: 1
    maxLength: 100
  documents:
    type: string
    format: binary
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: binary
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- district
- email
- name
- phone
- store_type
- user

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  logo:
    type: string
    format: uri
    readOnly: true
  name:
    type: string
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    maxLength: 50
  district:
    type: string
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
  phone:
    type: string
    maxLength: 20
  email:
    type: string
    format: email
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  created_at:
    type: string
    format: date-time
    readOnly: true
  updated_at:
    type: string
    format: date-time
    readOnly: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    maxLength: 100
  documents:
    type: string
    format: uri
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: uri
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- created_at
- district
- email
- id
- logo
- name
- phone
- store_type
- updated_at
- user

    ```

---

## `GET /api/stores/{id}/homepage/`
**Summary:** Store Homepage View

Get the public homepage for a store, including store info, discounts, products, and events.

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  store:
    $ref: '#/components/schemas/StoreHomepage'
  discounts:
    type: array
    items:
      $ref: '#/components/schemas/DiscountMini'
  products:
    type: array
    items:
      $ref: '#/components/schemas/ProductMini'
  events:
    type: array
    items:
      $ref: '#/components/schemas/EventMini'
required:
- discounts
- events
- products
- store

    ```

---

## `PATCH /api/stores/{id}/homepage/`
**Summary:** Update Store Homepage

Update store bio, cover image, etc. (Mini CMS)

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  logo:
    type: string
    format: binary
    nullable: true
  cover_image:
    type: string
    format: binary
    nullable: true
  bio:
    type: string
    nullable: true

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  logo:
    type: string
    format: binary
    nullable: true
  cover_image:
    type: string
    format: binary
    nullable: true
  bio:
    type: string
    nullable: true

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  logo:
    type: string
    format: binary
    nullable: true
  cover_image:
    type: string
    format: binary
    nullable: true
  bio:
    type: string
    nullable: true

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  name:
    type: string
    maxLength: 255
  logo:
    type: string
    format: uri
    nullable: true
  cover_image:
    type: string
    format: uri
    nullable: true
  bio:
    type: string
    nullable: true
  followers_count:
    type: string
    readOnly: true
required:
- followers_count
- id
- name

    ```

---

## `GET /api/stores/{id}/reviews/`

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  logo:
    type: string
    format: uri
    readOnly: true
  name:
    type: string
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    maxLength: 50
  district:
    type: string
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
  phone:
    type: string
    maxLength: 20
  email:
    type: string
    format: email
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  created_at:
    type: string
    format: date-time
    readOnly: true
  updated_at:
    type: string
    format: date-time
    readOnly: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    maxLength: 100
  documents:
    type: string
    format: uri
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: uri
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- created_at
- district
- email
- id
- logo
- name
- phone
- store_type
- updated_at
- user

    ```

---

## `POST /api/stores/{id}/reviews/`

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    minLength: 1
    maxLength: 50
  district:
    type: string
    minLength: 1
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
    minLength: 1
  phone:
    type: string
    minLength: 1
    maxLength: 20
  email:
    type: string
    format: email
    minLength: 1
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    minLength: 1
    maxLength: 100
  documents:
    type: string
    format: binary
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: binary
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- district
- email
- name
- phone
- store_type
- user

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    minLength: 1
    maxLength: 50
  district:
    type: string
    minLength: 1
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
    minLength: 1
  phone:
    type: string
    minLength: 1
    maxLength: 20
  email:
    type: string
    format: email
    minLength: 1
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    minLength: 1
    maxLength: 100
  documents:
    type: string
    format: binary
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: binary
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- district
- email
- name
- phone
- store_type
- user

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    minLength: 1
    maxLength: 50
  district:
    type: string
    minLength: 1
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
    minLength: 1
  phone:
    type: string
    minLength: 1
    maxLength: 20
  email:
    type: string
    format: email
    minLength: 1
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    minLength: 1
    maxLength: 100
  documents:
    type: string
    format: binary
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: binary
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- district
- email
- name
- phone
- store_type
- user

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  logo:
    type: string
    format: uri
    readOnly: true
  name:
    type: string
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    maxLength: 50
  district:
    type: string
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
  phone:
    type: string
    maxLength: 20
  email:
    type: string
    format: email
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  created_at:
    type: string
    format: date-time
    readOnly: true
  updated_at:
    type: string
    format: date-time
    readOnly: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    maxLength: 100
  documents:
    type: string
    format: uri
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: uri
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- created_at
- district
- email
- id
- logo
- name
- phone
- store_type
- updated_at
- user

    ```

---

## `GET /api/stores/{id}/stories/`

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  logo:
    type: string
    format: uri
    readOnly: true
  name:
    type: string
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    maxLength: 50
  district:
    type: string
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
  phone:
    type: string
    maxLength: 20
  email:
    type: string
    format: email
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  created_at:
    type: string
    format: date-time
    readOnly: true
  updated_at:
    type: string
    format: date-time
    readOnly: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    maxLength: 100
  documents:
    type: string
    format: uri
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: uri
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- created_at
- district
- email
- id
- logo
- name
- phone
- store_type
- updated_at
- user

    ```

---

## `POST /api/stores/{id}/stories/`

**Request Body:**
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    minLength: 1
    maxLength: 50
  district:
    type: string
    minLength: 1
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
    minLength: 1
  phone:
    type: string
    minLength: 1
    maxLength: 20
  email:
    type: string
    format: email
    minLength: 1
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    minLength: 1
    maxLength: 100
  documents:
    type: string
    format: binary
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: binary
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- district
- email
- name
- phone
- store_type
- user

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    minLength: 1
    maxLength: 50
  district:
    type: string
    minLength: 1
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
    minLength: 1
  phone:
    type: string
    minLength: 1
    maxLength: 20
  email:
    type: string
    format: email
    minLength: 1
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    minLength: 1
    maxLength: 100
  documents:
    type: string
    format: binary
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: binary
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- district
- email
- name
- phone
- store_type
- user

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  logo:
    type: string
    format: uri
    readOnly: true
  name:
    type: string
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    maxLength: 50
  district:
    type: string
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
  phone:
    type: string
    maxLength: 20
  email:
    type: string
    format: email
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  created_at:
    type: string
    format: date-time
    readOnly: true
  updated_at:
    type: string
    format: date-time
    readOnly: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    maxLength: 100
  documents:
    type: string
    format: uri
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: uri
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- created_at
- district
- email
- id
- logo
- name
- phone
- store_type
- updated_at
- user

    ```

---

## `POST /api/stores/{id}/unfollow/`

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    minLength: 1
    maxLength: 50
  district:
    type: string
    minLength: 1
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
    minLength: 1
  phone:
    type: string
    minLength: 1
    maxLength: 20
  email:
    type: string
    format: email
    minLength: 1
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    minLength: 1
    maxLength: 100
  documents:
    type: string
    format: binary
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: binary
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- district
- email
- name
- phone
- store_type
- user

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    minLength: 1
    maxLength: 50
  district:
    type: string
    minLength: 1
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
    minLength: 1
  phone:
    type: string
    minLength: 1
    maxLength: 20
  email:
    type: string
    format: email
    minLength: 1
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    minLength: 1
    maxLength: 100
  documents:
    type: string
    format: binary
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: binary
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- district
- email
- name
- phone
- store_type
- user

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    minLength: 1
    maxLength: 50
  district:
    type: string
    minLength: 1
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
    minLength: 1
  phone:
    type: string
    minLength: 1
    maxLength: 20
  email:
    type: string
    format: email
    minLength: 1
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    minLength: 1
    maxLength: 100
  documents:
    type: string
    format: binary
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: binary
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- district
- email
- name
- phone
- store_type
- user

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  logo:
    type: string
    format: uri
    readOnly: true
  name:
    type: string
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    maxLength: 50
  district:
    type: string
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
  phone:
    type: string
    maxLength: 20
  email:
    type: string
    format: email
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  created_at:
    type: string
    format: date-time
    readOnly: true
  updated_at:
    type: string
    format: date-time
    readOnly: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    maxLength: 100
  documents:
    type: string
    format: uri
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: uri
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- created_at
- district
- email
- id
- logo
- name
- phone
- store_type
- updated_at
- user

    ```

---

## `GET /api/stores/my_stores/`
**Summary:** List My Stores

List stores owned by the authenticated user.

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  logo:
    type: string
    format: uri
    readOnly: true
  name:
    type: string
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    maxLength: 50
  district:
    type: string
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
  phone:
    type: string
    maxLength: 20
  email:
    type: string
    format: email
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  created_at:
    type: string
    format: date-time
    readOnly: true
  updated_at:
    type: string
    format: date-time
    readOnly: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    maxLength: 100
  documents:
    type: string
    format: uri
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: uri
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- created_at
- district
- email
- id
- logo
- name
- phone
- store_type
- updated_at
- user

    ```

---

## `GET /api/stores/user/following/`

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  logo:
    type: string
    format: uri
    readOnly: true
  name:
    type: string
    maxLength: 255
  store_type:
    $ref: '#/components/schemas/StoreTypeEnum'
  city:
    type: string
    maxLength: 50
  district:
    type: string
    maxLength: 50
  location_link:
    type: string
    format: uri
    nullable: true
    maxLength: 255
  address:
    type: string
  phone:
    type: string
    maxLength: 20
  email:
    type: string
    format: email
    maxLength: 254
  social_media_links:
    nullable: true
  latitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  longitude:
    type: string
    format: decimal
    pattern: ^-?\d{0,3}(?:\.\d{0,6})?$
    nullable: true
  created_at:
    type: string
    format: date-time
    readOnly: true
  updated_at:
    type: string
    format: date-time
    readOnly: true
  is_verified:
    type: boolean
  business_registration_number:
    type: string
    maxLength: 100
  documents:
    type: string
    format: uri
    nullable: true
  admin_notes:
    type: string
  views:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  clicks_on_discounts:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  orders_received:
    type: integer
    maximum: 9223372036854775807
    minimum: 0
    format: int64
  cover_image:
    type: string
    format: uri
    nullable: true
  bio:
    type: string
    nullable: true
  user:
    type: integer
  followers:
    type: array
    items:
      type: integer
required:
- address
- city
- created_at
- district
- email
- id
- logo
- name
- phone
- store_type
- updated_at
- user

    ```

---

## `GET /api/sub-categories/`

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
required:
- count
- results
properties:
  count:
    type: integer
    example: 123
  next:
    type: string
    nullable: true
    format: uri
    example: http://api.example.org/accounts/?page=4
  previous:
    type: string
    nullable: true
    format: uri
    example: http://api.example.org/accounts/?page=2
  results:
    type: array
    items:
      $ref: '#/components/schemas/SubCategory'

    ```

---

## `POST /api/sub-categories/`
**Summary:** Create a Sub Category

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  main_category:
    type: string
    minLength: 1
required:
- main_category
- name

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  main_category:
    type: string
    minLength: 1
required:
- main_category
- name

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  main_category:
    type: string
    minLength: 1
required:
- main_category
- name

```

**Responses:**
- **Status 201**: Sub category created.
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  name:
    type: string
    maxLength: 255
  main_category:
    type: string
required:
- id
- main_category
- name

    ```
- **Status 400**: Validation error.

---

## `GET /api/sub-categories/{id}/`

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  name:
    type: string
    maxLength: 255
  main_category:
    type: string
required:
- id
- main_category
- name

    ```

---

## `PUT /api/sub-categories/{id}/`

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  main_category:
    type: string
    minLength: 1
required:
- main_category
- name

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  main_category:
    type: string
    minLength: 1
required:
- main_category
- name

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  main_category:
    type: string
    minLength: 1
required:
- main_category
- name

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  name:
    type: string
    maxLength: 255
  main_category:
    type: string
required:
- id
- main_category
- name

    ```

---

## `PATCH /api/sub-categories/{id}/`

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  main_category:
    type: string
    minLength: 1

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  main_category:
    type: string
    minLength: 1

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 255
  main_category:
    type: string
    minLength: 1

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  name:
    type: string
    maxLength: 255
  main_category:
    type: string
required:
- id
- main_category
- name

    ```

---

## `DELETE /api/sub-categories/{id}/`
**Summary:** Delete a Sub Category

Deletes a sub category by ID.

**Responses:**
- **Status 200**: Sub category deleted successfully.
  - **Content-Type:** `application/json`

---

## `GET /api/tags/`

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
required:
- count
- results
properties:
  count:
    type: integer
    example: 123
  next:
    type: string
    nullable: true
    format: uri
    example: http://api.example.org/accounts/?page=4
  previous:
    type: string
    nullable: true
    format: uri
    example: http://api.example.org/accounts/?page=2
  results:
    type: array
    items:
      $ref: '#/components/schemas/Tag'

    ```

---

## `POST /api/tags/`

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 50
required:
- name

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 50
required:
- name

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 50
required:
- name

```

**Responses:**
- **Status 201**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  name:
    type: string
    maxLength: 50
required:
- id
- name

    ```

---

## `GET /api/tags/{id}/`

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  name:
    type: string
    maxLength: 50
required:
- id
- name

    ```

---

## `PUT /api/tags/{id}/`

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 50
required:
- name

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 50
required:
- name

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 50
required:
- name

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  name:
    type: string
    maxLength: 50
required:
- id
- name

    ```

---

## `PATCH /api/tags/{id}/`

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 50

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 50

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  name:
    type: string
    minLength: 1
    maxLength: 50

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  id:
    type: integer
    readOnly: true
  name:
    type: string
    maxLength: 50
required:
- id
- name

    ```

---

## `DELETE /api/tags/{id}/`
**Summary:** Delete a Tag

Deletes a tag by its ID.

**Responses:**
- **Status 200**: Tag deleted successfully.
  - **Content-Type:** `application/json`

---

## `POST /api/token/refresh/`
**Summary:** Refresh Access Token

Takes a refresh type JSON web token and returns an access type JSON web
token if the refresh token is valid.

**Request Body:**
- **Content-Type:** `application/json`
```json
type: object
properties:
  refresh:
    type: string
    minLength: 1
required:
- refresh

```
- **Content-Type:** `application/x-www-form-urlencoded`
```json
type: object
properties:
  refresh:
    type: string
    minLength: 1
required:
- refresh

```
- **Content-Type:** `multipart/form-data`
```json
type: object
properties:
  refresh:
    type: string
    minLength: 1
required:
- refresh

```

**Responses:**
- **Status 200**: 
  - **Content-Type:** `application/json`
    ```json
type: object
properties:
  access:
    type: string
  refresh:
    type: string
required:
- access
- refresh

    ```

---
