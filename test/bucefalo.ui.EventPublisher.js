var expect = require("chai").expect,
	b = require("../dist/bucefalo-ui.js");

describe("Bucefalo.ui.EventsEmitter", function(){
	var em, pub;
	beforeEach(function(){
		em = {};
		b.behavior.augment(em, b.behaviors.EventsEmitter);
		pub = {};
		b.behavior.augment(pub, b.behaviors.EventPublisher);
		pub.mediator = em;
	});
	it("should publish an event",function(){
		var evt = "event1",
			test = 1;
		em.on(evt, function(data, publisher){
			test = data;
			expect(publisher).to.equal(pub);
		});
		pub.fire(evt, 2);
		expect(test).to.equal(2);
	});
});