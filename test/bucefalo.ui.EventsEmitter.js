var expect = require("chai").expect,
	b = require("../dist/bucefalo-ui.js");

describe("Bucefalo.ui.EventsEmitter", function(){
	var em;
	beforeEach(function(){
		em = {};
		b.behavior.augment(em, b.behaviors.EventsEmitter);
	});
	it("should create an events emitter",function(){
		expect(em).to.be.ok;
	});

	it("should subscribe a function to an event",function(){
		var evt = "event1",
		test = 1;
		em.on(evt, function(data){
			test = data;
		});
		em.fire(evt,2);
		expect(test).to.equal(2);
	});

	it("should subscribe a function binded, to an event",function(){
		var evt = "event1",
		testObj = {
			test:1
		};
		em.on(evt, function(data){
			this.test = data;
		}, testObj);
		em.fire(evt,2);
		expect(testObj.test).to.equal(2);
	});

	it("should subscribe a method, to an event",function(){
		var evt = "event1",
		testObj = {
			test:1,
			testMethod: function(data){
				this.test = data;
			}
		};
		em.on(evt, "testMethod", testObj);
		em.fire(evt,2);
		expect(testObj.test).to.equal(2);
	});

	it("should subscribe a function to an event, asynchronously",function(done){
		var evt = "event1",
		test = 1;
		em.on(evt, function(data){
				test = data;
				expect(test).to.equal(2);
				done();
			},
			null,
			true
		);
		em.fire(evt,2);
		expect(test).to.equal(1);
	});

	it("should subscribe a function binded, to an event, asynchronously",function(done){
		var evt = "event1",
		testObj = {
			test:1
		};
		em.on(evt, function(data){
				this.test = data;
				expect(this.test).to.equal(2);
				done();
			},
			testObj,
			true);
		em.fire(evt,2);
		expect(testObj.test).to.equal(1);
	});

	it("should subscribe a method, to an event, asynchronously",function(done){
		var evt = "event1",
		testObj = {
			test:1,
			testMethod: function(data){
				this.test = data;
				expect(this.test).to.equal(2);
				done()
			}
		};
		em.on(evt, "testMethod", 
			testObj,
			true);
		em.fire(evt,2);
		expect(testObj.test).to.equal(1);
	});

});