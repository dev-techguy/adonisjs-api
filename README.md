<p align="center"><a href="https://adonisjs.com/" target="_blank"><img src="https://pbs.twimg.com/profile_images/1389965716388864000/dz4mEx7_.jpg" width="400"></a></p>


AdonisJs REST API with CRUD and Model Relationships covered.

## Guide
- Follow the steps below to get started first go to [AdonisJS Instalation](https://docs.adonisjs.com/guides/installation)
- Clone the project to your local machine.
- Copy *.env.example* to *.env*
- Update the database connection details.
- Then serve the application using ```bash node ace serve --watch ```

### Sample Responses

```json

// post request http://127.0.0.1:3333/api/register
{
	"name":"Test User",
	"email":"test@test.com",
	"password":"12345678"
}

// response
{
  "type": "bearer",
  "token": "MQ.x7zYvG1uZr1VgW1bZB2BEiGJpYgXRit7dCmgD2DXdoyvhG0WQH4FtoWIc2CE",
  "expires_at": "2021-06-18T16:29:26.629+03:00"
}

// post request http://127.0.0.1:3333/api/forums
{
	"title":"Forum One",
	"description":"Hello forum one"
}

// response
{
  "user_id": 1,
  "title": "Forum One",
  "description": "Hello forum one",
  "created_at": "2021-06-08T16:38:47.882+03:00",
  "updated_at": "2021-06-08T16:38:47.882+03:00",
  "id": 1
}

// post request http://127.0.0.1:3333/api/posts
{
	"forum_id":1,
	"title":"Post One",
	"content":"Hello post one"
}

{
  "user_id": 1,
  "title": "Post One",
  "content": "Hello post one",
  "forum_id": 5,
  "created_at": "2021-06-08T16:47:17.951+03:00",
  "updated_at": "2021-06-08T16:47:17.951+03:00",
  "id": 1
}

```
