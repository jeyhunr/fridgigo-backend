# Frindgigo backend app

# Enpoints

## Contents

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /api/v1/contents/ | `GET` | Empty | List all contents. |
| /api/v1/contents/new | `POST` | {'header':'foo', 'subheader':'bar', 'paragraph':'lorem', 'footer':'ipsum'} | Create a new content. |
## Users
| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /api/v1/users/register/ | `POST` | {'fullname':'foo bar', 'email':'foo', 'password':'bar', 'repeat_password':'bar} | Register a new user. |
| /api/v1/users/confirm-user/ | `PUT` | {'email':'foo', 'confitmationNumber':'bar'} | Cofirm user registration. |
| /api/v1/users/authenticate/ | `POST` | {'email':'foo', 'password':'bar'} | Authenticate a user. |
| /api/v1/users/request-password/ | `PUT` | {'email':'foo'} | Password forget. |
| /api/v1/users/change-password/ | `PUT` | {'email':'foo', 'password':'bar', 'repeat_password':'bar', 'confirmationNumber':'foo'} | Password forget. |
| /api/v1/users/me/ | `GET` | {'token':'foo'} | Get my information. |
| /auth/api/v1/users/follow-user/ | `PUT` | {'token':'foo', 'targetEmail':'bar'} | Follow user. |


## Posts
| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /auth/api/v1/posts/ | `GET` | Empty | List all posts. |
| /auth/api/v1/posts/new | `POST` | {'email':'foo', postHeader:'bar', postDescription:'some description'} | Share a post. |
| /auth/api/v1/posts/user/:email | `GET` | Epmty | Get posts of a user. |

## Recipe
| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /auth/api/v1/ingredients/list-all-recipes | `GET` | {"token": "foo"} | Lists all recipes. |
| /auth/api/v1/ingredients/add-recipe | `POST` | {"token":"foo","header":"bar", body:{i1,i2,i3}} | Insert recipe into db. |

<hr />

`I used the following packages in this project:`

- JWT  => *for generating token user*
- Mongoose
- Chai
- Mocha