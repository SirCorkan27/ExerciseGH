//create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var http = require('http'); // Import the 'http' module for creating a web server
var fs = require('fs'); // Import the 'fs' module for file system operations
var url = require('url'); // Import the 'url' module for parsing URL
var path = require('path'); // Import the 'path' module for working with file paths
var comments = [];

// Create a web server using the 'http' module
http.createServer(function(req, res){
    // Parse the URL of the incoming request
    var parseUrl = url.parse(req.url, true);
    // Extract the pathname from the parsed URL
    var pathName = parseUrl.pathname;
    
    // Check if the pathname is '/'
    if(pathName === '/'){
        // Read the 'index.html' file
        fs.readFile('./index.html', function(err, data){
            if(err){
                console.log(err);
            }
            // Set the response header to indicate the content type as HTML
            res.writeHead(200, {'Content-Type': 'text/html'});
            // Write the contents of the 'index.html' file to the response
            res.write(data);
            // End the response
            res.end();
        });
    } 
    // Check if the pathname is '/submit'
    else if(pathName === '/submit'){
        // Extract the comment from the query parameters
        var comment = parseUrl.query.comment;
        // Add the comment to the 'comments' array
        comments.push(comment);
        // Set the response header to indicate the content type as plain text
        res.writeHead(200, {'Content-Type': 'text/plain'});
        // Write 'success' to the response
        res.write('success');
        // End the response
        res.end();
    } 
    // Check if the pathname is '/get'
    else if(pathName === '/get'){
        // Set the response header to indicate the content type as plain text
        res.writeHead(200, {'Content-Type': 'text/plain'});
        // Write the 'comments' array as a JSON string to the response
        res.write(JSON.stringify(comments));
        // End the response
        res.end();
    } 
    // For any other pathname
    else {
        // Construct the file path using the current directory and the pathname
        var filePath = path.join(__dirname, pathName);
        // Read the file from the constructed file path
        fs.readFile(filePath, function(err, data){
            if(err){
                console.log(err);
            }
            // Set the response header to indicate the content type as HTML
            res.writeHead(200, {'Content-Type': 'text/html'});
            // Write the contents of the file to the response
            res.write(data);
            // End the response
            res.end();
        });
    }
}).listen(8080);

// Print a message indicating that the server is running
console.log('Server is running at http://localhost:8080/');