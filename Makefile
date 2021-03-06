
BUILT_AT=$(shell date "+%Y-%m-%d")

help: default

default:
	@echo "usage: make (test|build|install-dev|...)"

install-dev:
	@echo "install node"
	@echo "install mocha (npm install -g mocha)"
	@echo "install should (npm install -g should)"
	@echo "install nodejs-yui3 (npm install yui3)"
#	@echo "install yui3 (http://github.com/yui/yui3.git)"
#	@echo "patch yui3 (make install-dev-patch-yui3)"

install-dev-patch-yui3:

test:
	mocha -r should t/01-adjective.js
	mocha -r should t/02-tester.js
	mocha -r should t/03-prepositions.js

#http://toolbox.no.de/packages/yui3-mocha ?

build:
	# stupid duplication, put this into a script
	echo $(BUILT_AT)
	perl -np -e '                      '\
	'	if (/\[% INCLUDE (\S+) %\]/){  '\
	'		my $$filename = $$1;       '\
	'		die "bad filename $$_"     '\
	'			unless -e $$filename;  '\
	'		$$_ = `cat $$filename`;    '\
	'	}                              '\
	'	s/\[% DateTime.now.ymd %\]/$(BUILT_AT)/'\
	 noun-verb-object.html.tt > noun-verb-object.html
	perl -np -e '                      '\
	'	if (/\[% INCLUDE (\S+) %\]/){  '\
	'		my $$filename = $$1;       '\
	'		die "bad filename $$_"     '\
	'			unless -e $$filename;  '\
	'		$$_ = `cat $$filename`;    '\
	'	}                              '\
	'	s/\[% DateTime.now.ymd %\]/$(BUILT_AT)/'\
	 prepositions.html.tt > prepositions.html
