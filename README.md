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
| /api/v1/users/register/ | `POST` | {'fullname':'foo bar', 'username':'foo', 'password':'bar', 'repeat_password':'bar} | Register a new user. |
| /api/v1/users/authenticate/ | `POST` | {'username':'foo', 'password':'bar'} | Authenticate a user. |

## Posts
| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /auth/api/v1/posts/ | `GET` | Empty | List all posts. |
| /auth/api/v1/posts/new | `POST` | {'username':'foo', postHeader:'bar', postDescription:'some description'} | Share a post. |
| /auth/api/v1/posts/user/:username | `GET` | Epmty | Get posts of a user. |
