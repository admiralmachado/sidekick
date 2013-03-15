#pragma strict

// Shared behavioral elements between Hero and Mobs
class NPCBehavior extends IBehavior {
	
	protected var currentTarget : GameObject; // The NPC's current target
	protected var targetPriority : int; // The priority of that target
	protected var combat : Combat; // The NPC's combat component
	protected var movement : NPCMovement; // The NPC's movement component
	protected var stats : Stats; // The NPC's Stats
	
	function NPCBehavior(go : GameObject) {
		super(go);
		combat = gameObject.GetComponent(Combat);
		movement = gameObject.GetComponent(NPCMovement);
		stats = gameObject.GetComponent(Stats);
		targetPriority = 4; // 4 is lowest priority (anything is more important than nothing)
	}
	
	function GotHit(attacker : GameObject) {
		if (stats.getHealth() > 0) {
			// If I'm still alive, just play the hurt sound
			AudioSource.PlayClipAtPoint(hurtSound, Camera.main.transform.position);
		} else {
			// Otherwise I'M DEAD!!!
			AudioSource.PlayClipAtPoint(dieSound, Camera.main.transform.position);
			// Tell my room I died
			super.currentRoom.GetComponent(RoomController).OnTriggerExit(gameObject.collider);
			GameObject.Destroy(gameObject);
		}
	}
	
	function TargetDead() {
		// Don't have a target
		currentTarget = null;
		targetPriority = 4;
		// Don't follow anything
		movement.clearTarget();
	}
	
	// Only used to simplify assignment and link combat targeting
	// DOESN'T COMPARE AGAINST CURRENT TARGET PRIORITY
	function setTarget(newTarget : GameObject, priority : int) {
		currentTarget = newTarget;
		targetPriority = priority;
		combat.target = currentTarget;
	}
	
	// Makes sure the Movement Componenet always has the most current position of the target
	// Could be better by giving movement the actual game object... but then movement would poll every update instead.
	function Update() {
		if (currentTarget != null) {
			movement.setTarget(currentTarget.transform.position);
		}
	}
}