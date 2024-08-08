# SHOE COMMERCE

## Auth Workflow

* Registration using required email, password and name fields.
* We send a verification token email to the user.
* When the user verifies the token from the email, we send them to a page on our frontend, we verify the user and update the isVerified status.
* then we direct the user to the login page.
