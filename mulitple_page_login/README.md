S3 Photo Album Upload
=====================

## Quick Setup

Below is three different ways to setup this S3 upload Website with Cognito authentication.

### To allow unauthenticated user role

* Create S3 Bucket
* Create Cognito User Pool
* Create Federated Identity
    * Allow unauthenticated role permission to access `s3:*` to the bucket above
    * Allow authenticated role permission to access `s3:*` to the bucket above
* Populate values in config.js from values above
* Run index.html locally

### To allow authenticated user role to access

* Create S3 Bucket
* Create Cognito User Pool
* Create Federated Identity
    * Do not allow unauthenticated role
    * Allow authenticated role permission to access `s3:*` to the bucket above
* Populate values in config.js from values above
* Run index.html locally

### To control user access with user groups

* Create S3 Bucket
* Create a role for the users group
    * Give it permission to access `s3:*` to the bucket above
* Create Cognito User Pool
    * Create a user group and give the IAM role above
    * Put a user in the group
* Create Federated Identity
    * Do not allow unauthenticated role
    * Do not give authenticated role access to the bucket above
    * For `Authentication Providers`, under the `Cognito` tab, find `Authenticated role selection`.
        * From the drop down, `Choose role from token`
        * **Role resolution**: `Use default Authenticated role`
* Populate values in config.js from values above
* Run index.html locally
* Login with a user in the group


## Sources

* [Build a Serverless Web Application](https://aws.amazon.com/getting-started/serverless-web-app/)
* [Uploading Photos to Amazon S3 from a Browser](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-photo-album.html)