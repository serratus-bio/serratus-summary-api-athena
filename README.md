Our use of Athena has been abandoned in favor of Aurora. New API: https://github.com/serratus-bio/serratus-summary-api

# serratus-summary-api-athena

## Endpoints with examples

- `/family/<family_id>`
    - `/family/Coronaviridae`
    - `/family/Coronaviridae?identityMin=80&identityMax=90`
- `/sequence/<sequence_id>`
    - `/sequence/AY874537_3000883`
    - `/sequence/AY874537_3000883?scoreMin=50&scoreMax=100&identityMin=50&identityMax=100`

## Setup

### Elastic Beanstalk instance

- CodePipeline: [`serratus-summary-api`](https://console.aws.amazon.com/codesuite/codepipeline/pipelines/serratus-summary-api/view?region=us-east-1)
    - CodeBuild: [`serratus-summary-api`](https://console.aws.amazon.com/codesuite/codebuild/797308887321/projects/serratus-summary-api/history?region=us-east-1&builds-meta=eyJmIjp7InRleHQiOiIifSwicyI6e30sIm4iOjIwLCJpIjowfQ)
    - Elastic Beanstalk: [`serratus-summary-api`](https://console.aws.amazon.com/elasticbeanstalk/home?region=us-east-1#/application/overview?applicationName=serratus-summary-api)

- IAM `arn:aws:iam::797308887321:role/aws-elasticbeanstalk-ec2-role`
    - Attach policy `AmazonAthenaFullAccess`

### Athena

https://console.aws.amazon.com/athena/home?region=us-east-1

```sql
CREATE DATABASE `summarytest`

CREATE EXTERNAL TABLE `family`(
    famcvg string,
    fam string,
    score int,
    pctid int,
    depth double,
    aln int,
    glb int,
    len int,
    top string,
    topscore int,
    toplen int,
    topname string,
    run string
)
ROW FORMAT SERDE 'org.openx.data.jsonserde.JsonSerDe'
LOCATION 's3://serratus-athena/family/'

CREATE EXTERNAL TABLE `sequence`(
    seqcvg string,
    seq string,
    score int,
    pctid int,
    depth double,
    aln int,
    glb int,
    len int,
    family string,
    name string,
    run string
)
ROW FORMAT SERDE 'org.openx.data.jsonserde.JsonSerDe'
LOCATION 's3://serratus-athena/sequence/'
```

### S3

- `s3://serratus-athena`
    - `family/` : public
    - `sequence/` : public

#### Bucket policy

```json
{
    "Version": "2012-10-17",
    "Id": "SerratusAthena-ElasticBeanstalk",
    "Statement": [
        {
            "Sid": "ListObjectsInBucket",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::797308887321:role/aws-elasticbeanstalk-ec2-role"
            },
            "Action": "s3:ListBucket",
            "Resource": "arn:aws:s3:::serratus-athena"
        },
        {
            "Sid": "AllObjectActions",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::797308887321:role/aws-elasticbeanstalk-ec2-role"
            },
            "Action": "s3:*Object",
            "Resource": "arn:aws:s3:::serratus-athena/*"
        }
    ]
}
```

## TODO

- API
    - add query result caching
    - support nested summary
- AWS
    - DNS: `serratus-summary-api.serratus.io`
