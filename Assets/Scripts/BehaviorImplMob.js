#pragma strict

// Mob's implementation of behavior
class MobBehavior extends NPCBehavior {
	
	function MobBehavior(go : GameObject) {
		super(go);
		// Used this to spice things up while sight/patrolling is unimplemented
		super.setTarget(GameObject.Find("Sidekick"), 3);
	}
	
	function GotHit(attacker : GameObject) {
		super.GotHit(attacker);
		if (1 < super.targetPriority) {
			// Which should always be true, because no one else can hit you besides the hero
			this.FoundNewTarget(attacker, 1);
		}
	}
	
	function TargetDead() {
		super.TargetDead();
		// Freak out! I Just killed a hero or sidekick! (unless for some reason I was targeting another mob)
	}
	
	function FoundNewTarget(newTarget : GameObject, priority : int) {
		if (priority >= super.targetPriority) {
			// Whatever it is, it isn't more important than what I'm targeting now
			return;
		}
		// Otherwise, it's more important
		super.setTarget(newTarget, priority);
	}
	
	function Update() {
		// NPCBehavior will move me closer to my target if I have one
		super.Update();
	}
}