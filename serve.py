#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys
from urllib.parse import urlparse

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()
    
    def do_GET(self):
        # For SPA routing, serve index.html for all routes
        if not os.path.exists(self.translate_path(self.path)):
            self.path = '/index.html'
        return super().do_GET()

if __name__ == "__main__":
    PORT = 5173
    
    # Change to the webapp directory
    os.chdir('/home/user/webapp')
    
    Handler = MyHTTPRequestHandler
    with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
        print(f"Serving at http://0.0.0.0:{PORT}")
        print(f"Access via: https://5173-iwb3e0pm3t53yjpa8dsvh-6532622b.e2b.dev")
        httpd.serve_forever()