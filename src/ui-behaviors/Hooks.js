(function(b){
	var re = new RegExp("(before|after|insteadof)(.*)"),
		run = function(arr, args){
			var i = arr.length;
			while(i--){
				arr[i].apply(this, args);
			}
		},
		execHooks = function(methodName, args){
			var hooks = this.hooks[methodName];
			if(hooks.b.length){
				run.call(this, hooks.b, args);
			}
			if(hooks.i.length){
				run.call(this, hooks.i, args);
			}else{
				hooks.old.apply(this, args);
			}
			if(hooks.a.length){
				run.call(this, hooks.a, args);
			}
		};
	if(!b.behaviors){
		b.behaviors = {};
	}
	b.behaviors.Hooks = b.behavior(
		"Hooks",
		{
			hooks:{},
			at: function(where, cb){
				var result = where.match(re),
					method, h;
				if(!b.isFunction(cb)){
					throw "The callback to subscribe should be a function";
				}
				if(result){
					method = result[2].charAt(0).toLowerCase() + result[2].slice(1);
					if(b.isFunction(this[method])){
						if(!this.hooks[method]){
							this.hooks[method] = {
								b: [],
								a: [],
								i: [],
								old: this[method]
							};
							this[method] = function(){
								execHooks.call(this, method, arguments);
							};
						}
						h = this.hooks[method];
						switch(result[1]){
							case "before":
								h.b.push(cb);
								break;
							case "after":
								h.a.push(cb);
								break;
							case "insteadof":
								h.i.push(cb);
								break;
						}
						
					}else{
						throw method + " is not a function";
					}
				}
			}
		}
	);
}(bucefalo));