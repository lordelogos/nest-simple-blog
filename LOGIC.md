- Create an API for managing blog posts and comments.
- Implement user authentication and authorization.
- Include basic data validation and error handling.

## Steps

Models - Author, Posts, Comments, Tags

### Mini approaches

Model Author - Can make posts and comments
Model Posts - [Draft, Published] => Published: can be commented on, Drafts: can't be commented on
Can be categorised by Tags [fetch by tags]
Can be Deleted by Author
Model Comments - can be deleted by (Writer and Article author)

## Advanced concepts

- Authorization (RBAC)
- Data validation
- Error handling
