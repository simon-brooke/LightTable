var fs = require("fs");
var funcs = {};
var ltpath = "";

var _send = function(obj, msg, res, format) {
  format = format || "json";
  process.send({msg: msg, res: res, obj:obj, format: format});
};

var argsArray = function(args) {
  var final = [];
  for(var i = 0; i < args.length; i++) {
    final.push(args[i]);
  }
  return final;
};

process.on("message", function(m) {
  switch(m.msg) {
    case "init":
      ltpath = m.ltpath;
      global.eval(fs.readFileSync(ltpath + "/js/cljsDeps.js").toString());
      cljs.core._STAR_print_fn_STAR_ = function(x) {
         console.log(clojure.string.trim(x));
      }
      _send(m.obj, "connect");
      break;
    case "register":
      eval("funcs['" + m.name + "'] = " + m.func);
      break;
    case "call":
      try {
        m.params.unshift(m);
        funcs[m.name].apply(null, m.params);
      } catch (e) {
        console.error(e);
        console.error(e.stack);
      }
      break;
  }
});

