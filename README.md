# MACRO: MySql to AWS S3 Backup Cron Service

This is a small utility to backup MySQL DBs to AWS S3 storage.<br>
This script is based on the package `mysqldump`.<br>
The utility is designed to run as a cron job to execute full DB backups as frequently as you need them.

## Getting Started

run `npm install`

Note : `aws-sdk` is not included in `package.json` because the Lambda runtime already has it preinstalled. The zip archives generated this way are much smaller. If you need to execute this script elsewhere, you will need to include it as a dependency.<br>
Just run `npm install aws-sdk --save`.

You will need to add a config.json file to run the utility that includes the credentials of the MySQL host and the target S3 Bucket.

Sample `config.json`
```
{
    "backup_folder": "Backups",
    "S3": {
        "bucketName": "MyBackups",
        "accessKeyId": "****",
        "secretAccessKey": "****",
        "region": "ap-south-1"
    },

    "MYSQL": {
        "host": "example.com",
        "user": "****",
        "password": "****",
        "database": "****"
    }
}
```

## Lambda Deployment

Run npm run zip and upload the generated Archive.zip file as a Lambda source.
Test the function with any blank event `{}` with maximum memory possible. Then check the actual max memory usage after the lambda function execution completes. You can then set your lambda memory to be the next higher option than your current usage.  Memory required to execute will depend on the size of your database. 

## Backup trigger and frequency

You can set up AWS CloudWatch cron job to trigger this lambda at any specific time and frequency. Select this Lambda function as your target. You can optionally trigger it as an API request using AWS API Gateway to do full backups on demand.

### Example

A Cron expression of  `30 22 * * ? *`
Will trigger it at 10:30 pm GMT every day.<br>
Don't forget to account for your timezone.

![Screenshot](https://raw.githubusercontent.com/BlackcurrantApps/MACRO/master/cloudwatch.png)<br>


Hope this utility helps you out. Any contribution to the source code will be highly appreciated :)

##### Made with ❤️in India
