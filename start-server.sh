#!/bin/bash
cd /home/user/webapp
npm run dev > /home/user/webapp/logs/server.log 2>&1 &
echo "Server started with PID $!"
echo "Check logs at /home/user/webapp/logs/server.log"