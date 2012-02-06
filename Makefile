
default:
	@echo "usage: make (test|build|...)"

install-dev:
	@echo install node
	@echo install mocha (npm install -g mocha)
	@echo install should (npm install -g should)
	@echo install nodejs-yui3 (npm install yui3)
#	@echo install yui3 (http://github.com/yui/yui3.git)
#	@echo patch yui3 (make install-dev-patch-yui3)

install-dev-patch-yui3:

test:
	mocha -r should t/01-basic.js

#http://toolbox.no.de/packages/yui3-mocha ?

build:
	perl -np -e '                      '\
	'	if (/\[% INCLUDE (\S+) %\]/){  '\
	'		my $$filename = $$1;       '\
	'		die "bad filename $$_"     '\
	'			unless -e $$filename;  '\
	'		$$_ = `cat $$filename`;    '\
	'	}                              '\
	 noun-verb-object.html.tt > noun-verb-object.html
