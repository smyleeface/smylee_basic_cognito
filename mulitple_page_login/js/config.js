window._config = {
    cognito: {
        userPoolId: 'USER_POOL_ID', // e.g. us-east-2_uXboG5pAb
        userPoolClientId: 'USER_POOL_CLIENT_ID', // e.g. 25ddkmj4v6hfsfvruhpfi7n4hv
        region: 'REGION', // e.g. us-east-2
        identityPoolId: 'us-west-2:50d3394f-46cc-4f2a-8d84-7ce89c28d6ab', // e.g. us-west-2:50d3394f-46cc-4f2a-8d84-5ec78e92b9cd
        idp: 'cognito-idp.REGION.amazonaws.com/USER_POOL_ID',
        customRoleArn: 'ARN OF THE IAM ROLE ASSIGNED TO THE COGNITO GROUP THE USER IS PART OF' //If using permissions with user groups
    },
    upload: {
        bucketName:  'BUCKET NAME'
    }
};