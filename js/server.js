var http = require("http"); 
var fs = require('fs'); 
var url = require('url');
var path = require('path')
exports.start = function(){ 
    http.createServer(function(request, response) { 
    var pathname = url.parse(request.url).pathname; 
    //pathname = path.join(__dirname,"images",pathname); 
    //var ext2 = pathname.match(/(\.[^.]+|)$/)[0];//取得后缀名 
    var ext = path.extname(pathname);
    console.log("pathName: "+pathname);
    console.log("ext: "+ext.toString());    
    html_types = {
        ".css": "text/css",
        ".gif": "image/gif",
        ".html": "text/html",
        ".ico": "image/x-icon",
        ".jpeg": "image/jpeg",
        ".jpg": "image/jpeg",
        ".js": "text/javascript",
        ".json": "application/json",
        ".pdf": "application/pdf",
        ".png": "image/png",
        ".svg": "image/svg+xml",
        ".swf": "application/x-shockwave-flash",
        ".tiff": "image/tiff",
        ".txt": "text/plain",
        ".wav": "audio/x-wav",
        ".wma": "audio/x-ms-wma",
        ".wmv": "video/x-ms-wmv",
        ".xml": "text/xml"
    };    
    switch(ext){ 
    case "":    // 127.0.0.1
        fs.exists("."+pathname, function(exists) {
            if(!exists) {
                response.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                response.write("This request URL " + pathname + " was not found on this server.");
                response.end();
                return;
            }
            console.log("."+pathname);
            fs.readFile("./index.html", function(err, data) {
                if (err) throw err; // Fail if the file can't be read.
                response.writeHead(200, { 
                "Content-Type": "text/html"
                }); 
                response.write(data); 
                response.end(); 
            });
        });
        break;
        
    case ".css": 
    case ".js":
        fs.exists("."+pathname, function(exists) {
            if(!exists) {
                response.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                response.write("This request URL " + pathname + " was not found on this server.");
                response.end();
                return;
            }
            fs.readFile("."+request.url, 'utf-8',function (err, data) {//读取内容 
                if (err) throw err; 
                response.writeHead(200, { 
                "Content-Type": html_types[ext] 
                }); 
                response.write(data); 
                response.end(); 
            });
        });
        break;
    
    case ".jpg":
    case ".gif":
    case ".png":
    case ".JPG":
    case ".PNG":
        fs.exists("."+pathname, function(exists) {
            if(!exists) {
                response.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                response.write("This request URL " + pathname + " was not found on this server.");
                response.end();
                return;
            }
            fs.readFile("."+pathname, function(err, data) {
                if (err) throw err; // Fail if the file can't be read.
                response.writeHead(200, { 
                "Content-Type": html_types[ext]
                }); 
                response.write(data); 
                response.end(); 
            });
        });
        break;
        
    case ".html":
    case ".HTML":    
        fs.exists("."+pathname, function(exists) {
            if(!exists) {
                response.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                response.write("This request URL " + pathname + " was not found on this server.");
                response.end();
                return;
            }
            console.log("."+pathname);
            fs.readFile("."+pathname, function(err, data) {
                if (err) throw err; // Fail if the file can't be read.
                response.writeHead(200, { 
                "Content-Type": "text/html"
                }); 
                response.write(data); 
                response.end(); 
            });
        });
        break; 

    default:
        fs.exists("."+pathname, function(exists) {
            if(!exists) {
                response.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                response.write("This request URL " + pathname + " was not found on this server.");
                response.end();
                return;
            }
            console.log("."+pathname);
            fs.readFile("."+pathname, function(err, data) {
                if (err) throw err; // Fail if the file can't be read.
                response.writeHead(200, { 
                "Content-Type": html_types[ext] 
                }); 
                response.write(data); 
                response.end(); 
            });
        });
        break;
    } 
    }).listen(8888); 
    console.log("server start..."); 
} 