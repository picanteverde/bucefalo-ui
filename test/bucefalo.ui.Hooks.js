var expect = require("chai").expect,
	b = require("../dist/bucefalo-ui.js");

describe("Bucefalo.ui.Hooks", function(){
	var obj, test;
	beforeEach(function(){
		test = 0;
		obj = {
			render: function(data){
				test = data;
			}
		};
		b.behavior.augment(obj, b.behaviors.Hooks);
	});
	it("should to hook a function at before[MethodName]",function(){
		var test2 = 0;
		obj.at("beforeRender", function(data){
			test = data *2;
			expect(test).to.equal(4);
			test2 = 1;
		});
		obj.render(2);
		expect(test2).to.equal(1);
		expect(test).to.equal(2);
	});

	it("should to hook a function at after[MethodName]",function(){
		obj.at("afterRender", function(data){
			test = data *2;
		});
		obj.render(2);
		expect(test).to.equal(4);
	});

	it("should to hook a function at insteadof[MethodName]",function(){
		var test2 = 0;
		obj.at("insteadofRender", function(data){
			test2 = 1;
		});
		obj.render(2);
		expect(test2).to.equal(1);
		expect(test).to.equal(0);
	});
	
});