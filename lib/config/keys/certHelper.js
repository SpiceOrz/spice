var forge = require('node-forge'),
    crypto = require('crypto'),
    fs = require('fs'),
    path = require('path');

var pki = forge.pki;

var ROOT_KEY_PATH = path.join(__dirname, 'root.key'),
    ROOT_CRT_PATH = path.join(__dirname, 'root.crt')

var ROOT_KEY = fs.readFileSync(ROOT_KEY_PATH),
    ROOT_CRT = fs.readFileSync(ROOT_CRT_PATH);

    ROOT_KEY = pki.privateKeyFromPem(ROOT_KEY);
    ROOT_CRT = pki.certificateFromPem(ROOT_CRT);

function createCert(publicKey, serialNumber) {
    var cert = pki.createCertificate();
        cert.publicKey = publicKey;
        cert.serialNumber = serialNumber || '01';
        cert.validity.notBefore = new Date();
        cert.validity.notAfter = new Date();
        cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 10);
    return cert;
}

function getCertByHostname(hostname) {
    var cert = createCert(pki.setRsaPublicKey(ROOT_KEY.n, ROOT_KEY.e), crypto.createHash('sha1').update(hostname, 'binary').digest('hex'));

    cert.setSubject([{
        name: 'commonName',
        value: hostname
    }]);

    cert.setIssuer(ROOT_CRT.subject.attributes);
    cert.sign(ROOT_KEY, forge.md.sha256.create());
    cert = {
        key: pki.privateKeyToPem(ROOT_KEY),
        cert: pki.certificateToPem(cert)
    };
    return cert;
}

module.exports = {
    getCertByHostname: getCertByHostname
};
