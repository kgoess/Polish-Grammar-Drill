
default:
	@echo "usage: make (test|...)"

# install node
# install mocha (npm install -g mocha)
# install should (npm install -g should)
test:
	mocha -r should t/01-basic.js

#http://toolbox.no.de/packages/yui3-mocha ?

