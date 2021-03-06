var dockerode = require('dockerode');
var fs = require('fs');

var dockerode_options = {
    host: nconf.get('swarm_node_ip'),
    port: nconf.get('swarm_node_port'),
    ca: fs.readFileSync(nconf.get('swarm_cert_dir')+"/ca.pem"),
    cert: fs.readFileSync(nconf.get('swarm_cert_dir')+"/cert.pem"),
    key: fs.readFileSync(nconf.get('swarm_cert_dir')+"/key.pem")
  };
docker = new dockerode(dockerode_options);
