(function(b){
	var fireHandlers = function(arr, data, publisher){
		var h,i;
		i = arr.length;
		while(i--){
			h = arr[i];
			h.m.call(h.o, data, publisher);
		}
	},
	fireContainer = function(c, data, publisher){
		if(c.f.length > 0){
			fireHandlers(c.f, data, publisher);
		}
		if(c.o.length > 0){
			fireHandlers(c.o, data, publisher);
		}
	};

	if(!b.behaviors){
		b.behaviors ={};
	}
	b.behaviors.EventsEmitter = b.behavior(
		'EventsEmitter',
		{
			evts:{},
			fire: function(evt, data, publisher){
				var evts = this.evts,
					e = evts[evt];
				if(e){
					fireContainer(e, data, publisher);
					if(e.a){
						setTimeout(function(){
							fireContainer(e.a, data, publisher);
						},1);
					}
				}
			},
			on: function(evt, method, obj, async){
				var evts = this.evts,
					type = "function",
					e = evts[evt];
				if(typeof(method) === "string"){
					if(!obj){
						throw "Cannot attach " + method + " if no object is defined";
					}
					if(!b.isFunction(obj[method])){
						throw "Cannot subscribe the member:" + method + " to the event:" + evt + " because is not a function!";
					}
					method = obj[method];
					type = "object";
				}

				if(!e){
					e = evts[evt] = {
						f:[],
						o:[]
					};
				}
				if(async){
					if(!e.a){
						e.a = {
							f:[],
							o:[]
						};
					}
					e = e.a;
				}
				if(type === "object"){
					e = e.o;
				}else{
					e = e.f;
				}

				e.push({
					o: obj,
					m: method
				});
			}
		}
	);
}(bucefalo));