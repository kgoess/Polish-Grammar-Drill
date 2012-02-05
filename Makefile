
default:
	@echo "usage: make (test|build|...)"

# install node
# install mocha (npm install -g mocha)
# install should (npm install -g should)
test:
	mocha -r should t/01-basic.js

#http://toolbox.no.de/packages/yui3-mocha ?

build:
	perl -np -e '                      \
		if (/\[% INCLUDE (\S+) %\]/){     \
			my $$filename = $$1;      \
			die "bad filename $$_"    \
				unless -e $$filename; \
			$$_ = `cat $$filename`;   \
		}                             \
	' noun-verb-object.html.tt > noun-verb-object.html
