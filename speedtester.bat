::
@echo off
if not exist speedtest.py curl https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py -o speedtest.py
@echo on
python speedtest.py
PAUSE