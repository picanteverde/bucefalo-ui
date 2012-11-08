(function(b){
	if(!b.behaviors){
		b.behaviors = {};
	}
	b.behaviors.EventPublisher = b.behavior(
		"EventPublisher",
		{
			fire: function(evt, data){
				this.mediator.fire(evt, data, this);
			}
		}
	);
}(bucefalo));