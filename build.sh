#!/bin/sh
# will start brunch @ http://localhost:8000 + it's watchers
cd src ; DEBUG='brunch:*' brunch w & node-live-reload --path ../public & cd ../public; nserver
