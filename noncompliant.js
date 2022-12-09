const execa = require('execa');

module.exports.shellsink = async function (req, res) {
  const cmd = "ls "+req.query.cmd; // source
  
  console.log("cmd = "+cmd);
  
  // shellSync
  const {stdout} = await execa.shell(cmd); // Noncompliant
  
  res.json({
    message: "execa shellsink",
    data: stdout,
  });
};

module.exports.shellsyncsink = async function (req, res) {
  const cmd = "ls "+req.query.cmd; // source
  
  console.log("cmd = "+cmd);
  
  // shellSync
  const {stdout} = await execa.shellSync(cmd); // Noncompliant
  
  res.json({
    message: "execa shellSyncsink",
    data: stdout,
  });
};

module.exports.execasink = async function (req, res) {
  const cmd = req.query.cmd; // source
  
  console.log("cmd = "+cmd);
  
  const {stdout} = execa(cmd); // Noncompliant
  
  res.json({
    message: "execa execasink",
    data: stdout,
  });
};

module.exports.stdoutsink = async function (req, res) {
  const cmd = req.query.cmd; // source
  
  console.log("cmd = "+cmd);
  
  const {stdout} = execa.stdout(cmd); // Noncompliant
  
  res.json({
    message: "execa stdoutsink",
    data: stdout,
  });
};

module.exports.stderrsink = async function (req, res) {
  const cmd = req.query.cmd; // source
  
  console.log("cmd = "+cmd);
  
  const {stderr} = execa.stderr(cmd); // Noncompliant
  
  res.json({
    message: "execa stderrsink",
    data: stderr,
  });
};

module.exports.syncsink = async function (req, res) {
  const cmd = req.query.cmd; // source
  
  console.log("cmd = "+cmd);
  
  const {stdout} = execa.sync(cmd); // Noncompliant
  
  res.json({
    message: "execa syncsink",
    data: stdout,
  });
};
