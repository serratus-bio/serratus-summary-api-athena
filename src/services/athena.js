const AthenaExpress = require("athena-express")
const aws = require("aws-sdk")
aws.config.update({region: "us-east-1"})

const athenaExpressConfig = {
    aws,
    s3: "s3://serratus-athena/results",
    getStats: true
}

const athenaExpress = new AthenaExpress(athenaExpressConfig)

const resultLimit = 20

const queryFamily = async (id, scoreMin, scoreMax, identityMin, identityMax) => {
    // TODO: sanitize input
    let query = {
        sql: `
            select * from family
            where fam = '${id}'
            and score > ${scoreMin}
            and score < ${scoreMax}
            and pctid > ${identityMin}
            and pctid < ${identityMax}
            limit ${resultLimit}`,
        db: "summarytest",
        getStats: true 
    };

    return await athenaExpress.query(query);
}

const querySequence = async (id, scoreMin, scoreMax, identityMin, identityMax) => {
    // TODO: sanitize input
    let query = {
        sql: `
            select * from sequence
            where seq = '${id}'
            and score > ${scoreMin}
            and score < ${scoreMax}
            and pctid > ${identityMin}
            and pctid < ${identityMax}
            limit ${resultLimit}`,
        db: "summarytest",
        getStats: true 
    };

    return await athenaExpress.query(query);
}

module.exports = {
    queryFamily: queryFamily,
    querySequence: querySequence
}
