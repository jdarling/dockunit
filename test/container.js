/* global describe, it */

'use strict';

var proxyquire = require('proxyquire');
var assert = require('assert');
//var mockSpawn = require('mock-spawn');
var command = require('../lib/command');

//var mySpawn = mockSpawn();

/**
 * Mock the spawn dependency
 *
 * @type {container|exports.container}
 */
//var Container = proxyquire('../lib/container', { child_process: { spawn: mySpawn } }).container;
var Container = require('../lib/container').container;

/**
 * Mock config
 */
command.setGlobals();

var oldExit = process.exit;

describe('container', function() {

    describe('#pullImage()', function() {

        /**
         * Test a simple successful Docker image pull
         */
        it('Test successful Docker image pull', function(done) {
            var json = require('./json/simple-1.json').containers[0];

            var container = new Container(json);

            //mySpawn.setDefault(mySpawn.simple(0));

            var child = container.pullImage(function() {
                done();
            });
        });

        /**
         * Test a simple unsuccessful Docker pull
         */
        it('Test unsuccessful Docker image pull', function(done) {
            var json = require('./json/simple-invalid.json').containers[0];

            var container = new Container(json);

            //mySpawn.setDefault(mySpawn.simple(1));

            process.exit = function(code) {
                if (code === 1) {
                    done();
                }
            };
            container.pullImage(function() {});
        });

    });

    describe('#pullImage()', function() {

        /**
         * Test a simple successful Docker image pull
         */
        it('Test successful Docker start', function(done) {
            var json = require('./json/simple-1.json').containers[0];

            process.exit = oldExit;

            var container = new Container(json);

            //mySpawn.setDefault(mySpawn.simple(0, '24fdgw543ys25'));

            var child = container.startAndMountContainer(function() {
                done();
            });
        });

        /**
         * Test an unsuccessful Docker start where no container ID is provided
         */
        it('Test unsuccessful Docker start where no container ID is provided', function(done) {
            var json = require('./json/simple-invalid.json').containers[0];

            process.exit = oldExit;

            var container = new Container(json);

            //mySpawn.setDefault(mySpawn.simple(0));

            process.exit = function(code) {
                if (code === 1) {
                    done();
                }
            };

            var child = container.startAndMountContainer(function() { });
        });

        /**
         * Test an unsuccessful Docker start where no container ID is provided
         */
        it('Test unsuccessful Docker start the command errored', function(done) {
            var json = require('./json/simple-invalid.json').containers[0];

            process.exit = oldExit;

            var container = new Container(json);

            //mySpawn.setDefault(mySpawn.simple(1));

            process.exit = function(code) {
                if (code === 1) {
                    done();
                }
            };

            var child = container.startAndMountContainer(function() { });
        });
    });

    describe('#stopContainer()', function() {

        /**
         * Test a simple successful Docker container stop
         */
        it('Test successful Docker container stop', function(done) {
            var json = require('./json/simple-1.json').containers[0];

            process.exit = oldExit;

            var container = new Container(json);

            //mySpawn.setDefault(mySpawn.simple(0));

            var child = container.stopContainer(function() {
                done();
            });
        });
    });

    describe('#removeContainer()', function() {

        /**
         * Test a simple successful Docker container remove
         */
        it('Test successful Docker container remove', function(done) {
            var json = require('./json/simple-1.json').containers[0];

            process.exit = oldExit;

            var container = new Container(json);

            //mySpawn.setDefault(mySpawn.simple(0));

            var child = container.removeContainer(function() {
                done();
            });
        });
    });

    describe('#runBeforeScript()', function() {

        /**
         * Test a simple successful before script
         */
        it('Test successful before script', function(done) {
            var json = require('./json/simple-1.json').containers[0];

            process.exit = oldExit;

            var container = new Container(json);

            //mySpawn.setDefault(mySpawn.simple(0));

            var child = container.runBeforeScript(json.beforeScripts[0], function() {
                done();
            });
        });

        /**
         * Test a simple unsuccessful before script
         */
        it('Test unsuccessful before script', function(done) {
            var json = require('./json/simple-1.json').containers[0];

            var container = new Container(json);

            //mySpawn.setDefault(mySpawn.simple(1));

            var child = container.runBeforeScript(json.beforeScripts[0], function(err) {
                if (err) {
                    done();
                }
            });
        });

        /**
         * Test a simple unsuccessful before scripts
         */
        it('Test unsuccessful before scripts', function(done) {
            var json = require('./json/simple-1.json').containers[0];

            var container = new Container(json);

            //mySpawn.setDefault(mySpawn.simple(1));

            var child = container.runBeforeScripts(function(err) {
                if(err){
                    done();
                }
            });
        });
    });

    describe('#runTests()', function() {

        /**
         * Test a simple passed tests
         */
        it('Test passed tests', function(done) {
            var json = require('./json/simple-1.json').containers[0];

            process.exit = oldExit;

            var container = new Container(json);

            //mySpawn.setDefault(mySpawn.simple(0));

            var child = container.runBeforeScript(json.beforeScripts[0], function() {
                done();
            });
        });

        /**
         * Test a simple failed tests
         */
        it('Test failed tests', function(done) {
            var json = require('./json/simple-1.json').containers[0];

            process.exit = oldExit;

            var container = new Container(json);

            //mySpawn.setDefault(mySpawn.simple(0));

            var child = container.runTests(function() {
                done();
            });
        });

        /**
         * Test a simple test error
         */
        it('Test test error', function(done) {
            var json = require('./json/simple-1.json').containers[0];

            var container = new Container(json);

            //mySpawn.setDefault(mySpawn.simple(255));

            var child = container.runTests(function(err) {
                if (err && (err.toString() === 'Error: Not connected')) {
                    done();
                }
            });
        });
    });
});
