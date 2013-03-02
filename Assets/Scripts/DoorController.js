#pragma strict

var targetDoor : DoorController;
// Make this a list if multiple objects can come through at once
private var inboundObject : GameObject;

function Start() {
	// If I'm a door that goes somewhere
	if (targetDoor != null) {	
		// render me
		renderer.enabled = true;
		// allow character to pass over me
		collider.isTrigger = true;
	}
}

// Allows doors to tell each other that someone is coming so they don't get stuck in a teleporting loop
function incoming(object : GameObject) {
	inboundObject = object;
}

function arrived() {
	inboundObject.SetActive(true);
}

function OnTriggerEnter(collidee : Collider) {
	var obj = collidee.gameObject;
	
	if (obj == inboundObject) {
		// Whatever just entered came from another door, so don't send it back
		return;
	}
	
	// Otherwise, teleport to the targetdoor
	targetDoor.incoming(obj.gameObject);
	var doorpos : Vector3 = targetDoor.transform.position;
	obj.transform.position.x = doorpos.x;
	obj.transform.position.y = doorpos.y;
	obj.SetActive(false);
	
	// If it's the sidekick, have the camera follow
	if (obj.name == "Sidekick") {
		obj.GetComponent(SidekickMovement).clearTarget();
		Camera.main.GetComponent(GSXPCam).moveToDoor(targetDoor.gameObject);
	}
}

function OnTriggerExit(obj : Collider) {
	if (obj.gameObject == inboundObject) {
		// Whatever came from another room just left, so if he comes back, teleport him
		inboundObject = null;
	}
}