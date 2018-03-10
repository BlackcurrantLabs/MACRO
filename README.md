# MACRO: MySql to AWS S3 Backup Cron Service

This is a small utility to backup MySQL DBs to AWS S3 storage. 
The utility is designed to run as a cron job to execute backups as frequently as you need them.

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