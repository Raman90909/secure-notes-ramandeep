# Secure Notes App by Ramandeep

A basic login + notes app built earlier in the term using Node.js and Express.  
It is now being used for a code security audit in the COMP-3021 Final Project.

## Features
- Register and login with JWT authentication
- Create and view notes

## Issues Identified (as part of audit)
- Passwords stored without hashing
- Hardcoded JWT secret in source code
- No input validation or sanitization
- No rate limiting or secure HTTP headers (Helmet.js)

