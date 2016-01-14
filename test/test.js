'use strict';

// MODULES //

var test = require( 'tape' );
var proxyquire = require( 'proxyquire' );
var isLittleEndian = require( './../lib' );


// TESTS //

test( 'main export is a boolean', function test( t ) {
	t.ok( typeof isLittleEndian === 'boolean', 'main export is a boolean' );
	t.end();
});

test( 'the boolean is `true` if an environment is little endian', function test( t ) {
	var isLittleEndian = proxyquire( './../lib', {
		'./ctors.js': {
			'uint8': Foo
		}
	});

	t.equal( isLittleEndian, true, 'is little endian' );

	t.end();

	// Mock little endian byte order, where least significant bits come first...
	function Foo() {
		/* jshint newcap:false */
		return new Uint8Array( [52,18] );
	}
});

test( 'the boolean is `false` if an environment is not little endian (e.g., big endian)', function test( t ) {
	var isLittleEndian = proxyquire( './../lib', {
		'./ctors.js': {
			'uint8': Foo
		}
	});

	t.equal( isLittleEndian, false, 'is not little endian' );
	t.end();

	// Mock big endian byte order, where most significant bits are first...
	function Foo() {
		/* jshint newcap:false */
		return new Uint8Array( [18,52] );
	}
});
