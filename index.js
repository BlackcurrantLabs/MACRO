'use strict'
var mysqlDump = require('mysqldump');
var S3 = require('aws-sdk/clients/s3');
var fs = require('fs');
var config = require('./config.json');

exports.handler = function (event, context, callback) {
    console.log(`Running Backup for ${config.MYSQL.user}@${config.MYSQL.host}`)

    var s3 = new S3({
        apiVersion: '2006-03-01',
        accessKeyId: config.S3.accessKeyId,
        secretAccessKey: config.S3.secretAccessKey,
        region: config.S3.region
    });
    mysqlDump({
        connection: {
            host: config.MYSQL.host,
            user: config.MYSQL.user,
            password: config.MYSQL.password,
            database: config.MYSQL.database,
        },
        dumpToFile: '/tmp/data.sql.gz', // destination file 
        compressFile: true,
    }, function (err) {
        if (!err) {
            var backupFile = fs.readFileSync('/tmp/data.sql.gz');
            s3.upload({
                Bucket: config.S3.bucketName,
                Key: `${config.backup_folder}/${config.MYSQL.database}@${config.MYSQL.host} ${new Date().toDateString()} ${new Date().getTime()}.sql.gz`,
                ACL: 'private',
                Body: backupFile,
                ContentType: 'application/sql'
            }).promise().then(complete => {
                callback(null, complete);
            }, failed => {
                callback(failed);
            })
        } else {
            callback(err);
        }
    });
}