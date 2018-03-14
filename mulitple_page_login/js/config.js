window._config = {
    cognito: {
        userPoolId: 'us-west-2_DF0PI8Apo', // e.g. us-east-2_uXboG5pAb
        userPoolClientId: '783739v04jdtvp7lfblj6imgks', // e.g. 25ddkmj4v6hfsfvruhpfi7n4hv
        region: 'us-west-2', // e.g. us-east-2
        identityPoolId: 'us-west-2:50d3394f-46cc-4f2a-8d84-7ce89c28d6ab', // e.g. us-west-2:50d3394f-46cc-4f2a-8d84-5ec78e92b9cd
        idp: 'cognito-idp.us-west-2.amazonaws.com/us-west-2_DF0PI8Apo',
        customRoleArn: 'arn:aws:iam::952671759649:role/lambdasharp-cognito-authenticated-role'
    },
    upload: {
        bucketName:  'smylee.com.upload'
    }
};