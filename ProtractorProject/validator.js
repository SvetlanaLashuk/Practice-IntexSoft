var Ajv = require('ajv');
var ajv = new Ajv({allErrors: true});
var localize = require('ajv-i18n');
var path = require("path");

function validateJSON(key, data) {
    addSchema();
    var schema = ajv.getSchema(key).schema;
    var validate = ajv.compile(schema);
    var valid = ajv.validate(schema, data);
    if (!valid) {
        localize.ru(validate.errors);
        console.log(ajv.errorsText(validate.errors, {separator: '\n'}));
    }
    else console.log("JSON is valid!");
}

function getSchemas() {
    var recursiveReadSync = require('recursive-readdir-sync'), files;
    try {
        files = recursiveReadSync(__dirname);
    } catch (err) {
        if (err.errno === 34) {
            console.log('Path does not exist');
        } else {
            throw err;
        }
    }
    var schemas = [];
    for (var i = 0; i < files.length; i++) {
        if (path.extname(files[i]).match(/^.json/) && (path.dirname(files[i]).search(/node_modules/) === -1) && (path.dirname(files[i]).search(/schemas/) !== -1)) {
            schemas.push(files[i]);
        }
    }
    return schemas;
}

function getKey(str) {
    var res = str.match(/\S\W\\([A-Za-zА-Яа-я]*(\\))*/g);
    return str.replace(res, '').replace('.json', '');
}

function addSchema() {
    var schemas = getSchemas();
    for (var i = 0; i < schemas.length; i++) {
        ajv.addSchema(require(schemas[i]), getKey(schemas[i]))
    }
}

module.exports = {
    validateJSON: validateJSON
};